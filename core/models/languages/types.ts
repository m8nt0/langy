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
            features: string[];
        };
        compilation: 'Compiled' | 'Interpreted' | 'JIT';
        memoryManagement: 'Manual' | 'Garbage Collection' | 'Reference Counting';
        concurrencyModel: string[];
        syntaxStyle: {
            verbosity: 'Verbose' | 'Concise' | 'Moderate';
            whitespace: boolean;
            features: string[];
        };
    };
    // Practical Aspects
    influencedBy: string[];
    industryUsage: string[];
    ecosystem: {
        packageManager: string;
        buildTools: string[];
        communitySize: string;
        packageCount: number;
        popularity: number;
    };
    // Practical Aspects
    performance: {
        executionSpeed: string;
        memoryUsage: string;
        startupTime: string;
        compileTime: string;
    };
    learning: {
        difficulty: 'Beginner-Friendly' | 'Intermediate' | 'Advanced';
        readability: string;
        resourceAvailability: string;
    };
    platforms: string[];
    category: string;
    
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
    paradigm: string[];
    typing: string[];
    compilation: string[];
    memory: string[];
    concurrency: string[];
    syntax: string[];
    category: string[];
    industryUsage: string[];
    platforms: string[];
    executionSpeed: string[];
    memoryUsage: string[];
    communitySize: string[];
    origin: string[];
    introductionDate: string[];
    // Practical Aspects
    useCase: string[];
    difficulty: string[];
    ecosystem: string[];
    // Special Filters
    popularity: string[];
    historical: string[];
}


