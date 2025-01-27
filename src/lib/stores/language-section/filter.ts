import { writable } from 'svelte/store';

export interface FilterState {
    searchQuery: string;
    sortBy: 'name';
    paradigms: string[];
    typingStyle: string[];
    typingStrength: string[];
    compilation: string[];
    memoryManagement: string[];
    concurrencyModel: string[];
    syntaxStyle: string[];
    category: string[];
    industryUsage: string[];
    platforms: string[];
    executionSpeed: string[];
    memoryUsage: string[];
    communitySize: string[];
    origin: string[];
    introductionDate: string[];
} 

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
    paradigms: [],
    typingStyle: [],
    typingStrength: [],
    compilation: [],
    memoryManagement: [],
    concurrencyModel: [],
    syntaxStyle: [],
    category: [],
    industryUsage: [],
    platforms: [],
    executionSpeed: [],
    memoryUsage: [],
    communitySize: [],
    origin: [],
    introductionDate: []
};

export const createFilterStore = () => {
    const { subscribe, set, update } = writable<FilterState>(initialFilters);

    return {
        subscribe,
        setFilters: (filters: FilterState) => set(filters),
        reset: () => set(initialFilters)
    };
};
