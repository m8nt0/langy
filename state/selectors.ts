import type { AppState } from './store';
import type { Language } from '../core/models/languages/types';

// Basic selectors
export const getLanguages = (state: AppState): Language[] => state.languages;
export const getFilters = (state: AppState): AppState['filters'] => state.filters;
export const getSelectedLanguage = (state: AppState): Language | null => state.selectedLanguage;
export const getComparedLanguages = (state: AppState): Language[] => state.comparedLanguages;

// Derived selectors
export const getFilteredLanguages = (state: AppState): Language[] => {
  const { languages, filters } = state;
  
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
};

// Sort languages based on the current sort criteria
export const getSortedLanguages = (state: AppState): Language[] => {
  const filteredLanguages = getFilteredLanguages(state);
  const { sortBy } = state.filters;
  
  return [...filteredLanguages].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'year':
        return a.yearCreated - b.yearCreated;
      default:
        return 0;
    }
  });
};
