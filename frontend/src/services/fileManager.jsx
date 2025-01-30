// frontend\src\services\fileManager.jsx

class FileManager {
  // Configure base URL for GitHub Pages
  static BASE_URL = 'https://code-clarity.insitechinternational.com';
  static DATA_PATH = '/static/data';
  
  // Cached data
  static indexData = null;
  static questionCache = new Map();
  static solutionCache = new Map();

  static constructUrl(type, relativePath) {
    if (!type || !relativePath) {
      console.error('Invalid parameters for constructUrl:', { type, relativePath });
      return null;
    }
  
    const fullUrl = `${this.BASE_URL}${this.DATA_PATH}/${type}/${relativePath}`;
    console.log('Constructed URL:', fullUrl);
    return fullUrl;
  }

  static async loadIndexData() {
    if (!this.indexData) {
      try {
        const indexUrl = `${this.BASE_URL}${this.DATA_PATH}/index.json`;
        console.log('Fetching index from:', indexUrl);
        
        const response = await fetch(indexUrl);
        if (!response.ok) {
          throw new Error(`Failed to load index.json: ${response.status}`);
        }
        
        this.indexData = await response.json();
        console.log('Raw index data:', this.indexData);
        
        // Process and validate paths
        this.indexData.questions = this.indexData.questions
          .filter(q => q.id != null && q.path)
          .map(q => ({
            id: q.id,
            path: q.path
          }));

        this.indexData.solutions = this.indexData.solutions
          .filter(s => s.id != null && s.path)
          .map(s => ({
            id: s.id,
            path: s.path.replace(/^static\/data\/(questions|solutions)\//, '') // Remove prefix if present
          }));

        console.log('Processed questions:', {
          count: this.indexData.questions.length,
          samplePaths: this.indexData.questions.slice(0, 3).map(q => ({
            id: q.id,
            path: q.path,
            fullUrl: this.constructUrl('questions', q.path)
          }))
        });
      } catch (error) {
        console.error('Error loading index.json:', error);
        this.indexData = { 
          questions: [], 
          solutions: [],
          lastUpdated: null 
        };
      }
    }
    return this.indexData;
  }

  static async readFile(type, relativePath) {
    if (!type || !relativePath) {
      console.error(`readFile received invalid parameters: type=${type}, relativePath=${relativePath}`);
      return "";
    }
  
    const url = this.constructUrl(type, relativePath);
    console.log('Reading file:', { type, relativePath, url });
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`File not found: ${url} (Status: ${response.status})`);
        return "";
      }
  
      const content = await response.text();
      console.log(`Content retrieved from ${url} (first 100 chars):`, content.substring(0, 100) + '...');
      return content;
    } catch (error) {
      console.error(`IO error reading file ${relativePath}:`, error);
      return "";
    }
  }

  static async getAllQuestions(filters = {}) {
    const index = await this.loadIndexData();
    let questions = index.questions;

    // Apply filters
    if (filters.category) {
      questions = questions.filter(q => 
        q.path.includes(`${filters.category}/`)
      );
    }

    // Fetch full details for each question
    const promises = questions.map(async q => {
      // Check cache first
      if (this.questionCache.has(q.path)) {
        return this.questionCache.get(q.path);
      }

      // Fetch and parse question
      const content = await this.readFile('questions', q.path);
      if (!content) return null;

      const questionData = {
        ...this.parseMarkdownFile(content),
        id: q.id,
        path: q.path
      };

      // Cache the result
      this.questionCache.set(q.path, questionData);
      return questionData;
    });

    return (await Promise.all(promises)).filter(Boolean);
  }

  // Advanced markdown parsing with improved section detection
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

  // Enhanced metadata parsing with more robust extraction
  static parseMetadata(content) {
    const metadata = {};
    const lines = content.split('\n');
    const metadataRegex = /^-\s*([^:]+):\s*(.+)$/;

    for (const line of lines) {
      const match = line.match(metadataRegex);
      
      if (match) {
        let key = match[1]
          .replace(/\*\*/g, '')  // Remove bold markers
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '_');
        
        let value = match[2].trim();

        // Special handling for list-type fields
        if (['similar_questions', 'real_life_domains', 'tags'].includes(key)) {
          metadata[key] = value
            .split(',')
            .map(item => item.trim())
            .filter(Boolean);
        } else {
          metadata[key] = value;
        }
      }
    }

    return metadata;
  }

  // Comprehensive question file parsing
  static async parseQuestionFile(filePath) {
    // Check cache first
    if (this.questionCache.has(filePath)) {
      return this.questionCache.get(filePath);
    }

    try {
      const content = await this.readFile(filePath);
      const sections = this.parseMarkdownFile(content);
      const metadata = this.parseMetadata(sections.metadata || '');

      const questionData = {
        question_id: metadata.id ? parseInt(metadata.id) : null,
        title: metadata.title || '',
        difficulty: metadata.difficulty || '',
        category: metadata.category || '',
        subcategory: metadata.subcategory || '',
        similar_questions: metadata.similar_questions || [],
        real_life_domains: metadata.real_life_domains || [],
        problem_description: sections.problem_description || sections.description || '',
        problem_versions: this.parseProblemVersions(sections.versions || ''),
        constraints: this.parseListSection(sections.constraints),
        notes: this.parseListSection(sections.notes),
        tags: metadata.tags || [],
        content: content,
        file_path: filePath
      };

      // Cache the result
      this.questionCache.set(filePath, questionData);

      return questionData;
    } catch (error) {
      console.error(`Error parsing question file ${filePath}:`, error);
      return null;
    }
  }

  // Comprehensive solution file parsing
  static async parseSolutionFile(filePath) {
    // Check cache first
    if (this.solutionCache.has(filePath)) {
      return this.solutionCache.get(filePath);
    }

    try {
      const content = await this.readFile(filePath);
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

      // Cache the result
      this.solutionCache.set(filePath, solutionData);

      return solutionData;
    } catch (error) {
      console.error(`Error parsing solution file ${filePath}:`, error);
      return null;
    }
  }

  // Helper method to parse problem versions
  static parseProblemVersions(versionsContent) {
    const problemVersions = [];
    const versionPattern = /##\s*Version\s*\d+:.+?(?=\n##\s*Version|\Z)/gs;
    const versionBlocks = versionsContent.match(versionPattern) || [];

    return versionBlocks.map(block => block.trim());
  }

  // Helper method to parse list-based sections
  static parseListSection(sectionContent) {
    return sectionContent ? 
      sectionContent
        .split('\n')
        .map(item => item.replace(/^[-*]\s*/, '').trim())
        .filter(Boolean)
      : [];
  }

  // Get all questions with optional filtering
  static async getAllQuestions(filters = {}) {
    const index = await this.loadIndexData();
    let questions = index.questions;

    // Apply filters
    if (filters.category) {
      questions = questions.filter(q => 
        q.path.includes(`/questions/${filters.category}/`)
      );
    }

    // Fetch full details for each question
    return Promise.all(
      questions.map(q => this.parseQuestionFile(q.path))
    );
  }

  // Get all solutions with optional filtering
  static async getAllSolutions(filters = {}) {
    const index = await this.loadIndexData();
    let solutions = index.solutions;

    // Apply filters
    if (filters.category) {
      solutions = solutions.filter(s => 
        s.path.includes(`/solutions/${filters.category}/`)
      );
    }

    // Fetch full details for each solution
    return Promise.all(
      solutions.map(s => this.parseSolutionFile(s.path))
    );
  }

  // Find a specific question by ID
  static async findQuestionById(questionId) {
    const index = await this.loadIndexData();
    const questionInfo = index.questions.find(q => q.id === questionId);
    
    if (!questionInfo) {
      return null;
    }

    return await this.parseQuestionFile(questionInfo.path);
  }

  // Find a specific solution by ID
  static async findSolutionById(questionId) {
    const index = await this.loadIndexData();
    const solutionInfo = index.solutions.find(s => s.id === questionId);
    
    if (!solutionInfo) {
      return null;
    }

    return await this.parseSolutionFile(solutionInfo.path);
  }

  // Clear all caches
  static clearCache() {
    this.indexData = null;
    this.questionCache.clear();
    this.solutionCache.clear();
  }
}

export default FileManager;