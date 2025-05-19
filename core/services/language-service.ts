import type { Language } from '../models/languages/types';
import type { PlatformAdapter } from '../../adapters/platform/platform.interface';

export class LanguageService {
  private platformAdapter: PlatformAdapter;
  private baseUrl = '/api/languages';
  private cachedLanguages: Language[] | null = null;
  
  constructor(platformAdapter: PlatformAdapter) {
    this.platformAdapter = platformAdapter;
  }
  
  async getAllLanguages(): Promise<Language[]> {
    // Check cache first
    if (this.cachedLanguages) {
      return this.cachedLanguages;
    }
    
    try {
      const languages = await this.platformAdapter.network.fetch<Language[]>(this.baseUrl);
      this.cachedLanguages = languages;
      return languages;
    } catch (error) {
      console.error('Error fetching languages:', error);
      return [];
    }
  }
  
  async getLanguageById(id: string): Promise<Language | null> {
    try {
      // Try to find in cache first
      if (this.cachedLanguages) {
        const cached = this.cachedLanguages.find(lang => lang.id === id);
        if (cached) {
          return cached;
        }
      }
      
      // Fetch individual language
      return await this.platformAdapter.network.fetch<Language>(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error fetching language with id ${id}:`, error);
      return null;
    }
  }
  
  async searchLanguages(query: string): Promise<Language[]> {
    try {
      const languages = await this.getAllLanguages();
      
      if (!query) {
        return languages;
      }
      
      const lowercaseQuery = query.toLowerCase();
      
      return languages.filter(language => 
        language.name.toLowerCase().includes(lowercaseQuery) || 
        language.description.toLowerCase().includes(lowercaseQuery)
      );
    } catch (error) {
      console.error('Error searching languages:', error);
      return [];
    }
  }
  
  clearCache(): void {
    this.cachedLanguages = null;
  }
}

// Factory function to create a language service
export function createLanguageService(platformAdapter: PlatformAdapter): LanguageService {
  return new LanguageService(platformAdapter);
} 