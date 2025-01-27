export interface Language {
    id: string;
    name: string;
    yearCreated: number;
    description: string;
    // Core Dimensions
    core: {
        paradigm: string[];
        typing: {
            system: 'Static' | 'Dynamic';
            strength: 'Strong' | 'Weak';
        };
        compilation: 'Compiled' | 'Interpreted' | 'JIT';
        memoryManagement: 'Manual' | 'Garbage Collection' | 'Reference Counting';
        syntaxStyle: {
            verbosity: 'Verbose' | 'Concise';
            whitespace: boolean;
        };
    };
    // Practical Aspects
    practical: {
        useCases: string[];
        difficulty: 'Beginner-Friendly' | 'Intermediate' | 'Advanced';
        ecosystem: {
            status: 'Rich' | 'Growing' | 'Limited';
            packageManager: string;
            buildTools: string[];
        };
    };
    // Industry & Community
    special: {
        popularity: 'High Industry Demand' | 'Growing Demand' | 'Niche';
        historical: 'Legacy Language' | 'Emerging Language';
    };
    // Additional Info
    icon?: string;
}

export interface FilterState {
    searchQuery: string;
    sortBy: string;
    // Core
    paradigmType: string[];
    typingStyle: string[];
    typingStrength: string[];
    compilationType: string[];
    memoryType: string[];
    syntaxType: string[];
    // Practical Aspects
    useCaseType: string[];
    difficultyLevel: string[];
    ecosystemPackages: string[];
    ecosystemCommunity: string[];
    // Special Filters
    popularityType: string[];
    historicalType: string[];
}



