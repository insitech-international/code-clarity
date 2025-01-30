class FileManager {
  // Configure base URL for GitHub Pages
  static BASE_URL = 'https://code-clarity.insitechinternational.com';
  static DATA_PATH = '/static/data';

  // Cached data with proper typing
  static indexData = null;
  static questionCache = new Map();
  static solutionCache = new Map();

  /**
   * Constructs URL for file access with validation
   * @param {string} type - Type of resource (questions/solutions)
   * @param {string} relativePath - Path relative to data directory
   * @returns {string|null} Constructed URL or null if invalid
   */
  static constructUrl(type, relativePath) {
    if (!type || !relativePath) {
      console.error('Invalid parameters for constructUrl:', { type, relativePath });
      return null;
    }
    return `${this.BASE_URL}${this.DATA_PATH}/${type}/${relativePath}`;
  }

  /**
   * Loads and validates index data
   * @returns {Promise<Object>} Processed index data
   */
  static async loadIndexData() {
    if (this.indexData) return this.indexData;

    try {
      const indexUrl = `${this.BASE_URL}${this.DATA_PATH}/index.json`;
      console.log('Fetching index from:', indexUrl);

      const response = await fetch(indexUrl);
      if (!response.ok) throw new Error(`Failed to load index.json: ${response.status}`);

      const rawData = await response.json();
      console.log('Raw index data:', rawData);

      // Validate and process paths
      this.indexData = {
        questions: rawData.questions?.filter(q => q.id != null && q.path) || [],
        solutions: rawData.solutions?.filter(s => s.id != null && s.path).map(s => ({
          id: s.id,
          path: s.path.replace(/^static\/data\/(questions|solutions)\//, '')
        })) || [],
        lastUpdated: rawData.lastUpdated || null
      };
    } catch (error) {
      console.error('Error loading index.json:', error);
      this.indexData = { questions: [], solutions: [], lastUpdated: null };
    }
    return this.indexData;
  }

  /**
   * Reads file content with error handling
   * @param {string} type - Resource type
   * @param {string} relativePath - File path
   * @returns {Promise<string>} File content
   */
  static async readFile(type, relativePath) {
    if (!type || !relativePath) {
      console.error(`readFile received invalid parameters: type=${type}, relativePath=${relativePath}`);
      return "";
    }

    try {
      const url = this.constructUrl(type, relativePath);
      console.log('Reading file:', { type, relativePath, url });
      const response = await fetch(url);
      if (!response.ok) throw new Error(`File not found: ${url} (Status: ${response.status})`);
      return await response.text();
    } catch (error) {
      console.error(`Error reading file ${relativePath}:`, error);
      return "";
    }
  }

  /**
   * Fetches all questions with optional filtering
   * @param {Object} filters - Filter criteria
   * @returns {Promise<Array>} Filtered questions
   */
  static async getAllQuestions(filters = {}) {
    const index = await this.loadIndexData();
    let questions = index.questions;

    if (filters.category) {
      questions = questions.filter(q => q.path.includes(`${filters.category}/`));
    }

    return Promise.all(questions.map(q => this.parseQuestionFile(q.path)));
  }

  /**
   * Parses a question file with caching
   * @param {string} filePath - Path to question file
   * @returns {Promise<Object|null>} Parsed question data
   */
  static async parseQuestionFile(filePath) {
    if (this.questionCache.has(filePath)) return this.questionCache.get(filePath);

    try {
      const content = await this.readFile('questions', filePath);
      if (!content) return null;

      const questionData = this.extractQuestionData(content, filePath);
      this.questionCache.set(filePath, questionData);
      return questionData;
    } catch (error) {
      console.error(`Error parsing question file ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Extracts metadata from question content
   * @param {string} content - File content
   * @param {string} filePath - File path
   * @returns {Object} Extracted question data
   */
  static extractQuestionData(content, filePath) {
    const metadata = this.parseMetadata(content);
    return {
      question_id: metadata.id ? parseInt(metadata.id) : null,
      title: metadata.title || '',
      difficulty: metadata.difficulty || '',
      category: metadata.category || '',
      tags: metadata.tags || [],
      content,
      file_path: filePath
    };
  }

  /**
   * Parses metadata from file content
   * @param {string} content - File content
   * @returns {Object} Parsed metadata
   */
  static parseMetadata(content) {
    const metadata = {};
    content.split('\n').forEach(line => {
      const match = line.match(/^-(\s*[^:]+):\s*(.+)$/);
      if (match) {
        metadata[match[1].trim().toLowerCase().replace(/\s+/g, '_')] = match[2].trim();
      }
    });
    return metadata;
  }

  /**
   * Finds a question by ID
   * @param {number} questionId - Question identifier
   * @returns {Promise<Object|null>} Question data
   */
  static async findQuestionById(questionId) {
    const index = await this.loadIndexData();
    const questionInfo = index.questions.find(q => q.id === questionId);
    return questionInfo ? this.parseQuestionFile(questionInfo.path) : null;
  }

  /**
   * Clears all caches
   */
  static clearCache() {
    this.indexData = null;
    this.questionCache.clear();
    this.solutionCache.clear();
  }

  /**
   * Parses markdown file into sections
   * @param {string} content - Markdown content
   * @returns {Object} Parsed sections
   */
  static parseMarkdownFile(content) {
    const sections = {};
    let currentSection = null;
    let sectionContent = "";

    const lines = content.split('\n');
    const sectionRegex = /^(#{1,3})\s*(.+)/;

    for (const line of lines) {
      const match = line.match(sectionRegex);

      if (match) {
        // Save previous section if it exists
        if (currentSection && sectionContent.trim()) {
          sections[currentSection] = sectionContent.trim();
        }

        // Determine section level and name
        const level = match[1].length;
        const sectionName = match[2].toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '_');

        // Only capture top-level sections
        if (level === 1) {
          currentSection = sectionName;
          sectionContent = "";
        }
      } else if (currentSection) {
        sectionContent += line + '\n';
      }
    }

    // Save last section
    if (currentSection && sectionContent.trim()) {
      sections[currentSection] = sectionContent.trim();
    }

    return sections;
  }

  /**
   * Parses a solution file with caching
   * @param {string} filePath - Path to solution file
   * @returns {Promise<Object|null>} Parsed solution data
   */
  static async parseSolutionFile(filePath) {
    if (this.solutionCache.has(filePath)) {
      return this.solutionCache.get(filePath);
    }

    try {
      const content = await this.readFile('solutions', filePath);
      if (!content) return null;

      const sections = this.parseMarkdownFile(content);
      const metadata = this.parseMetadata(sections.metadata || '');

      const solutionData = {
        question_id: metadata.id ? parseInt(metadata.id) : null,
        category: metadata.category || '',
        subcategory: metadata.subcategory || '',
        classification_rationale: sections.classification_rationale || '',
        introduction: sections.introduction || '',
        mathematical_abstraction: sections.mathematical_abstraction || '',
        pythonic_implementation: sections.pythonic_implementation || '',
        complexity_analysis: sections.complexity_analysis || '',
        real_world_analogies: sections.real_world_analogies || '',
        storytelling_approach: sections.storytelling_approach || '',
        visual_representation: sections.visual_representation || '',
        tags: metadata.tags || [],
        content: content,
        file_path: filePath
      };

      this.solutionCache.set(filePath, solutionData);
      return solutionData;
    } catch (error) {
      console.error(`Error parsing solution file ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Parses problem versions from content
   * @param {string} versionsContent - Content containing versions
   * @returns {Array<string>} Array of version blocks
   */
  static parseProblemVersions(versionsContent) {
    const versionPattern = /##\s*Version\s*\d+:.+?(?=\n##\s*Version|\Z)/gs;
    const versionBlocks = versionsContent.match(versionPattern) || [];
    return versionBlocks.map(block => block.trim());
  }

  /**
   * Parses a section containing a list
   * @param {string} sectionContent - Section content
   * @returns {Array<string>} Parsed list items
   */
  static parseListSection(sectionContent) {
    return sectionContent ?
      sectionContent
        .split('\n')
        .map(item => item.replace(/^[-*]\s*/, '').trim())
        .filter(Boolean)
      : [];
  }

  /**
   * Fetches all solutions with optional filtering
   * @param {Object} filters - Filter criteria
   * @returns {Promise<Array>} Filtered solutions
   */
  static async getAllSolutions(filters = {}) {
    const index = await this.loadIndexData();
    let solutions = index.solutions;

    if (filters.category) {
      solutions = solutions.filter(s =>
        s.path.includes(`/solutions/${filters.category}/`)
      );
    }

    return Promise.all(
      solutions.map(s => this.parseSolutionFile(s.path))
        .filter(Boolean)
    );
  }

  /**
   * Finds a solution by question ID
   * @param {number} questionId - Question identifier
   * @returns {Promise<Object|null>} Solution data
   */
  static async findSolutionById(questionId) {
    const index = await this.loadIndexData();
    const solutionInfo = index.solutions.find(s => s.id === questionId);
    return solutionInfo ? this.parseSolutionFile(solutionInfo.path) : null;
  }
}

export default FileManager;