import type { Language } from '../models/languages/types';
import {languages} from '../models/languages/index/index';

// Mock API service for development
export class MockApiService {
  private languages: Language[] = [...languages];
  
  // Simulate an API request with delay
  private async mockRequest<T>(data: T, delay = 300): Promise<T> {
    return new Promise(resolve => {
      setTimeout(() => resolve(data), delay);
    });
  }
  
  // Get all languages
  async getLanguages(): Promise<Language[]> {
    return this.mockRequest(this.languages);
  }
  
  // Get a language by ID
  async getLanguageById(id: string): Promise<Language | null> {
    const language = this.languages.find(lang => lang.id === id);
    return this.mockRequest(language || null);
  }
  
  // Search languages
  async searchLanguages(query: string): Promise<Language[]> {
    if (!query) {
      return this.getLanguages();
    }
    
    const lowercaseQuery = query.toLowerCase();
    const results = this.languages.filter(language => 
      language.name.toLowerCase().includes(lowercaseQuery) || 
      language.description.toLowerCase().includes(lowercaseQuery)
    );
    
    return this.mockRequest(results);
  }
}

// Create a singleton instance
export const mockApiService = new MockApiService(); 