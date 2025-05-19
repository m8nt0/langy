import type { Language, FilterState } from '../models/languages/types';

export function filterLanguages(languages: Language[], filters: FilterState): Language[] {
  return languages.filter(language => {
    // Search query filter
    if (filters.searchQuery && !language.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }
    
    // Paradigm filter
    if (filters.paradigm.length > 0 && 
        !filters.paradigm.some(p => language.core.paradigm.includes(p))) {
      return false;
    }
    
    // Typing style filter
    if (filters.typing.length > 0 && 
        !filters.typing.includes(language.core.typing.system)) {
      return false;
    }
    
    // Typing strength filter
    if (filters.typing.length > 0 && 
        !filters.typing.includes(language.core.typing.strength)) {
      return false;
    }
    
    // Compilation type filter
    if (filters.compilation.length > 0 && 
        !filters.compilation.includes(language.core.compilation)) {
      return false;
    }
    
    // Memory management filter
    if (filters.memory.length > 0 && 
        !filters.memory.includes(language.core.memoryManagement)) {
      return false;
    }
    
    // Use case filter
    if (filters.useCase.length > 0 && 
        !filters.useCase.some(uc => language.practical.useCases.includes(uc))) {
      return false;
    }
    
    // Difficulty level filter
    if (filters.difficulty.length > 0 && 
        !filters.difficulty.includes(language.practical.difficulty)) {
      return false;
    }
    
    // Ecosystem status filter
    if (filters.ecosystem.length > 0 && 
        !filters.ecosystem.includes(language.practical.ecosystem.status)) {
      return false;
    }
    
    // Popularity filter
    if (filters.popularity.length > 0 && 
        !filters.popularity.includes(language.special.popularity)) {
      return false;
    }
    
    // Historical type filter
    if (filters.historical.length > 0 && 
        !filters.historical.includes(language.special.historical)) {
      return false;
    }
    
    return true;
  });
}

export function sortLanguages(languages: Language[], sortBy: string): Language[] {
  return [...languages].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'year':
        return a.yearCreated - b.yearCreated;
      default:
        return 0;
    }
  });
}

export function getFilterOptions(languages: Language[]): Record<string, string[]> {
  const options: Record<string, Set<string>> = {
    paradigmType: new Set<string>(),
    typingStyle: new Set<string>(),
    typingStrength: new Set<string>(),
    compilationType: new Set<string>(),
    memoryType: new Set<string>(),
    useCaseType: new Set<string>(),
    difficultyLevel: new Set<string>(),
    ecosystemStatus: new Set<string>(),
    popularityType: new Set<string>(),
    historicalType: new Set<string>(),
  };
  
  languages.forEach(language => {
    // Add all paradigms
    language.core.paradigm.forEach(p => options.paradigmType.add(p));
    
    // Add typing system
    options.typingStyle.add(language.core.typing.system);
    
    // Add typing strength
    options.typingStrength.add(language.core.typing.strength);
    
    // Add compilation type
    options.compilationType.add(language.core.compilation);
    
    // Add memory management
    options.memoryType.add(language.core.memoryManagement);
    
    // Add use cases
    language.practical.useCases.forEach(uc => options.useCaseType.add(uc));
    
    // Add difficulty level
    options.difficultyLevel.add(language.practical.difficulty);
    
    // Add ecosystem status
    options.ecosystemStatus.add(language.practical.ecosystem.status);
    
    // Add popularity
    options.popularityType.add(language.special.popularity);
    
    // Add historical type
    options.historicalType.add(language.special.historical);
  });
  
  // Convert Sets to arrays
  return Object.fromEntries(
    Object.entries(options).map(([key, set]) => [key, [...set]])
  );
} 