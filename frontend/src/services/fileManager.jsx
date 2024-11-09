import React from 'react';

class FileManager {
  static indexData = null;

  static async loadIndexData() {
    if (!this.indexData) {
      try {
        const response = await fetch('/static/data/index.json');
        if (!response.ok) {
          throw new Error('Failed to load index.json');
        }
        this.indexData = await response.json();
      } catch (error) {
        console.error('Error loading index.json:', error);
        this.indexData = { questions: [], solutions: [] };
      }
    }
    return this.indexData;
  }

  static async readFile(filePath) {
    try {
      // Convert absolute path to relative path for frontend
      const relativePath = filePath.replace(/^.*?\/static\/data/, '/static/data');
      const response = await fetch(relativePath);
      if (!response.ok) {
        console.error(`File not found: ${filePath}`);
        return "";
      }
      return await response.text();
    } catch (error) {
      console.error(`IO error reading file ${filePath}: ${error.message}`);
      return "";
    }
  }

  static async findFileById(fileId, fileType) {
    try {
      const index = await this.loadIndexData();
      
      // Determine which array to search based on fileType
      const files = fileType === 'questions' ? index.questions : index.solutions;
      
      // Find the file with matching ID and non-null path
      const fileInfo = files.find(file => file.id === fileId && file.path != null);
      
      if (!fileInfo) {
        console.log(`No ${fileType} file found for ID: ${fileId}`);
        return null;
      }

      return fileInfo.path;
    } catch (error) {
      console.error(`Error finding file for ID: ${fileId} in ${fileType}: ${error.message}`);
      return null;
    }
  }

  static parseMarkdownFile(content) {
    const sections = {};
    let currentSection = null;
    let sectionContent = "";

    const lines = content.split('\n');

    for (const line of lines) {
      if (line.startsWith('# ')) {
        if (currentSection && sectionContent.trim()) {
          sections[currentSection] = sectionContent.trim();
        }

        currentSection = line.slice(2).toLowerCase().replace(/ /g, '_');
        sectionContent = "";
      } else {
        sectionContent += line + '\n';
      }
    }

    if (currentSection && sectionContent.trim()) {
      sections[currentSection] = sectionContent.trim();
    }

    return sections;
  }

  static parseMetadata(content) {
    const metadata = {};
    const lines = content.split('\n');

    for (const line of lines) {
      if (line.trim().startsWith('-')) {
        const [key, value] = line.trim().slice(1).split(':', 2).map(str => str.trim());
        const processedKey = key.replace(/\*\*/g, '').toLowerCase().replace(/ /g, '_');

        if (value) {
          if (['similar_questions', 'real_life_domains'].includes(processedKey)) {
            metadata[processedKey] = value.split(',').map(item => item.trim()).filter(Boolean);
          } else {
            metadata[processedKey] = value;
          }
        }
      }
    }
    return metadata;
  }

  static parseProblemVersions(versionsContent) {
    const problemVersions = [];
    const versionPattern = /##\s*Version\s*\d+:.+?(?=\n##\s*Version|\Z)/gs;
    const versionBlocks = versionsContent.match(versionPattern) || [];

    return versionBlocks.map(block => block.trim());
  }

  static async parseQuestionFile(filePath) {
    try {
      const content = await this.readFile(filePath);
      const sections = this.parseMarkdownFile(content);
      const problemVersions = this.parseProblemVersions(sections.versions || '');

      const metadata = this.parseMetadata(sections.metadata || '');
      const questionData = {
        question_id: metadata.id,
        title: metadata.title || '',
        difficulty: metadata.difficulty || '',
        category: metadata.category || '',
        subcategory: metadata.subcategory || '',
        similar_questions: metadata.similar_questions || [],
        real_life_domains: metadata.real_life_domains || [],
        problem_description: sections.problem_description || '',
        problem_versions: problemVersions,
        constraints: (sections.constraints || '').split('\n').map(c => c.trim()).filter(Boolean),
        notes: (sections.notes || '').split('\n').map(n => n.trim()).filter(Boolean),
        content: content
      };

      return questionData;
    } catch (error) {
      console.error(`Error parsing question file ${filePath}:`, error);
      return null;
    }
  }

  static async parseSolutionFile(filePath) {
    try {
      const content = await this.readFile(filePath);
      const sections = this.parseMarkdownFile(content);
      const metadata = this.parseMetadata(sections.metadata || '');
      
      const solutionData = {
        question_id: metadata.id,
        category: metadata.category || '',
        subcategory: metadata.subcategory || '',
        classification_rationale: sections.classification_rationale || '',
        introduction: sections.introduction || '',
        mathematical_abstraction: sections.mathematical_abstraction || '',
        pythonic_implementation: sections.pythonic_implementation || '',
        bucesr_framework: sections.bucesr_framework || '',
        complexity_analysis: sections.complexity_analysis || '',
        real_world_analogies: sections.real_world_analogies || '',
        storytelling_approach: sections.storytelling_approach || '',
        visual_representation: sections.visual_representation || '',
        content: content
      };

      return solutionData;
    } catch (error) {
      console.error(`Error parsing solution file ${filePath}:`, error);
      return null;
    }
  }

  // Helper method to get all available questions
  static async getAllQuestions() {
    const index = await this.loadIndexData();
    return index.questions.filter(q => q.id != null);
  }

  // Helper method to get all available solutions
  static async getAllSolutions() {
    const index = await this.loadIndexData();
    return index.solutions.filter(s => s.id != null);
  }
}

export default FileManager;