import type { Language } from '../types';

export const c: Language = {
    id: 'c',
    name: 'C',
    description: 'A statically typed, compiled language designed for simplicity and efficiency',
    yearCreated: 1972,
    core: {
        paradigm: ['Imperative', 'Structured', 'Procedural'],
        typing: {
            system: 'Static',
            strength: 'Strong',
            features: ['Weak Type Safety', 'Manual Memory Management']
        },
        compilation: 'Compiled',
        memoryManagement: 'Manual',
        concurrencyModel: ['Threads', 'Processes'],
        syntaxStyle: {
            verbosity: 'Moderate',
            whitespace: false,
            features: ['Pointers', 'Preprocessor Directives']
        }
    },
    influencedBy: ['B', 'ALGOL 68', 'Assembly'],
    industryUsage: ['Systems Programming', 'Embedded Systems', 'Operating Systems'],
    ecosystem: {
        packageManager: 'None',
        buildTools: ['Make', 'CMake', 'Autotools'],
        communitySize: 'Large',
        packageCount: 0,
        popularity: 95
    },
    performance: {
        executionSpeed: 'High',
        memoryUsage: 'Low',
        startupTime: 'Fast',
        compileTime: 'Fast'
    },
    learning: {
        difficulty: 'Intermediate',
        readability: 'Medium',
        resourceAvailability: 'Abundant'
    },
    platforms: ['All'],
    category: 'General Purpose',
    icon: '/icons/c.svg',
    practical: {
        useCases: ['Systems Programming', 'Embedded Systems', 'Operating Systems'],
        difficulty: 'Intermediate',
        ecosystem: {
            status: 'Rich',
            packageManager: 'None',
            buildTools: ['Make', 'CMake', 'Autotools']
        }
    },
    special: {
        popularity: 'High Industry Demand',
        historical: 'Legacy Language'
    }
};