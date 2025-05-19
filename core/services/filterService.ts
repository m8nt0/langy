import { writable } from 'svelte/store';
import type { Language, FilterState } from '../models/languages/types';

// export interface FilterState {
//     searchQuery: string;
//     sortBy: 'name';
//     paradigms: string[];
//     typing: string[];
//     compilation: string[];
//     memory: string[];
//     concurrencyModel: string[];
//     syntaxStyle: string[];
//     category: string[];
//     industryUsage: string[];
//     platforms: string[];
//     executionSpeed: string[];
//     memoryUsage: string[];
//     communitySize: string[];
//     origin: string[];
//     introductionDate: string[];
// } 

interface SubCategory {
    title: string;
    options: string[];
}

interface Category {
    title: string;
    subcategories: Record<string, SubCategory>;
}

interface FilterGroup {
    title: string;
    categories: Record<string, Category>;
}

export const filterGroups: FilterGroup[] = [
    {
        title: 'Core',
        categories: {
            paradigm: {
                title: 'Paradigm',
                subcategories: {
                    paradigmType: {
                        title: 'Type',
                        options: [
                            'Procedural',
                            'Object-Oriented',
                            'Functional',
                            'Declarative',
                            'Imperative',
                            'Concurrent'
                        ]
                    }
                }
            },
            typing: {
                title: 'Typing',
                subcategories: {
                    typingStyle: {
                        title: 'Style',
                        options: ['Static', 'Dynamic']
                    },
                    typingStrength: {
                        title: 'Strength',
                        options: ['Strong', 'Weak']
                    }
                }
            },
            compilation: {
                title: 'Compilation',
                subcategories: {
                    compilationType: {
                        title: 'Type',
                        options: ['Compiled', 'Interpreted', 'JIT']
                    }
                }
            },
            memoryManagement: {
                title: 'Memory Management',
                subcategories: {
                    memoryType: {
                        title: 'Type',
                        options: ['Manual', 'Garbage Collection', 'Reference Counting']
                    }
                }
            },
            syntaxStyle: {
                title: 'Syntax',
                subcategories: {
                    syntaxType: {
                        title: 'Style',
                        options: ['Verbose', 'Concise', 'Whitespace-Sensitive']
                    }
                }
            }
        }
    },
    {
        title: 'Practical Aspects',
        categories: {
            useCases: {
                title: 'Use Cases',
                subcategories: {
                    useCaseType: {
                        title: 'Type',
                        options: [
                            'General Purpose',
                            'Web Development',
                            'Mobile Development',
                            'Data Science',
                            'Systems Programming',
                            'Cloud Computing'
                        ]
                    }
                }
            },
            difficulty: {
                title: 'Learning',
                subcategories: {
                    difficultyLevel: {
                        title: 'Level',
                        options: ['Beginner-Friendly', 'Intermediate', 'Advanced']
                    }
                }
            },
            ecosystem: {
                title: 'Ecosystem',
                subcategories: {
                    ecosystemPackages: {
                        title: 'Packages',
                        options: ['Rich', 'Growing', 'Limited']
                    },
                    ecosystemCommunity: {
                        title: 'Community',
                        options: ['Active', 'Growing', 'Limited']
                    }
                }
            }
        }
    },
    {
        title: 'Special Filters',
        categories: {
            popularity: {
                title: 'Popularity',
                subcategories: {
                    popularityType: {
                        title: 'Type',
                        options: ['Industry Demand', 'Academic Use', 'Niche']
                    }
                }
            },
            historical: {
                title: 'Historical',
                subcategories: {
                    historicalType: {
                        title: 'Type',
                        options: ['Legacy Language', 'Emerging Language']
                    }
                }
            }
        }
    }
];

const initialFilters: FilterState = {
    searchQuery: '',
    sortBy: 'name',
    paradigm: [],
    typing: [],
    compilation: [],
    memory: [],
    concurrency: [],
    syntax: [],
    category: [],
    industryUsage: [],
    platforms: [],
    executionSpeed: [],
    memoryUsage: [],
    communitySize: [],
    origin: [],
    introductionDate: [],
    useCase: [],
    difficulty: [],
    ecosystem: [],
    popularity: [],
    historical: []
};

export const createFilterStore = () => {
    const { subscribe, set, update } = writable<FilterState>(initialFilters);

    return {
        subscribe,
        setFilters: (filters: FilterState) => set(filters),
        reset: () => set(initialFilters)
    };
};

export class FilterService {
  // Filter languages based on filter state
  filterLanguages(languages: Language[], filters: FilterState): Language[] {
    if (!languages || languages.length === 0) {
      return [];
    }
    
    // Start with all languages
    let filteredLanguages = [...languages];
    
    // Apply search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredLanguages = filteredLanguages.filter(lang => 
        lang.name.toLowerCase().includes(query) || 
        lang.description.toLowerCase().includes(query)
      );
    }
    
    // Apply paradigm filter
    if (filters.paradigm.length > 0) {
      filteredLanguages = filteredLanguages.filter(lang => 
        filters.paradigm.some(paradigm => 
          lang.core.paradigm.includes(paradigm)
        )
      );
    }
    
    // Apply typing system filter
    if (filters.typing.length > 0) {
      filteredLanguages = filteredLanguages.filter(lang => 
        filters.typing.includes(lang.core.typing.system)
      );
    }
    
    // Apply typing strength filter
    if (filters.typing.length > 0) {
      filteredLanguages = filteredLanguages.filter(lang => 
        filters.typing.includes(lang.core.typing.strength)
      );
    }
    
    // Apply compilation filter
    if (filters.compilation.length > 0) {
      filteredLanguages = filteredLanguages.filter(lang => 
        filters.compilation.includes(lang.core.compilation)
      );
    }
    
    // Apply memory management filter
    if (filters.memory.length > 0) {
      filteredLanguages = filteredLanguages.filter(lang => 
        filters.memory.includes(lang.core.memoryManagement)
      );
    }
    
    // Apply difficulty level filter
    if (filters.difficulty.length > 0) {
      filteredLanguages = filteredLanguages.filter(lang => 
        filters.difficulty.includes(lang.practical.difficulty)
      );
    }
    
    // Apply ecosystem status filter
    if (filters.ecosystem.length > 0) {
      filteredLanguages = filteredLanguages.filter(lang => 
        filters.ecosystem.includes(lang.practical.ecosystem.status)
      );
    }
    
    // Apply popularity filter
    if (filters.popularity.length > 0) {
      filteredLanguages = filteredLanguages.filter(lang => 
        filters.popularity.includes(lang.special.popularity)
      );
    }
    
    // Apply historical filter
    if (filters.historical.length > 0) {
      filteredLanguages = filteredLanguages.filter(lang => 
        filters.historical.includes(lang.special.historical)
      );
    }
    
    return filteredLanguages;
  }
  
  // Sort languages based on sort option
  sortLanguages(languages: Language[], sortBy: string): Language[] {
    if (!languages || languages.length === 0) {
      return [];
    }
    
    const sortedLanguages = [...languages];
    
    switch (sortBy) {
      case 'name':
        return sortedLanguages.sort((a, b) => a.name.localeCompare(b.name));
      case 'year':
        return sortedLanguages.sort((a, b) => a.yearCreated - b.yearCreated);
      case 'year-desc':
        return sortedLanguages.sort((a, b) => b.yearCreated - a.yearCreated);
      default:
        return sortedLanguages;
    }
  }
}