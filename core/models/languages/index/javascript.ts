import type { Language } from '../types';

export const javascript: Language = {
    id: 'javascript',
    name: 'JavaScript',
    description: 'A dynamic programming language for web and server-side development',
    yearCreated: 1995,
    core: {
        paradigm: ['Object-Oriented', 'Functional', 'Event-Driven'],
        typing: {
            system: 'Dynamic',
            strength: 'Weak',
            features: ['Coercion', 'Prototypes']
        },
        compilation: 'JIT',
        memoryManagement: 'Garbage Collection',
        concurrencyModel: ['Event Loop', 'Async/Await', 'Promises'],
        syntaxStyle: {
            verbosity: 'Moderate',
            whitespace: false,
            features: ['Closures', 'Arrow Functions']
        }
    },
    influencedBy: ['Java', 'Scheme', 'Self'],
    industryUsage: ['Web', 'Mobile', 'Server', 'Desktop'],
    ecosystem: {
        packageManager: 'npm',
        buildTools: ['webpack', 'vite', 'babel'],
        communitySize: 'Large',
        packageCount: 2000000,
        popularity: 100
    },
    performance: {
        executionSpeed: 'Medium',
        memoryUsage: 'Medium',
        startupTime: 'Fast',
        compileTime: 'Fast'
    },
    learning: {
        difficulty: 'Beginner-Friendly',
        readability: 'Medium',
        resourceAvailability: 'Abundant'
    },
    platforms: ['Web', 'Server', 'Desktop', 'Mobile'],
    category: 'General Purpose',
    icon: '/icons/javascript.svg',
    practical: {
        useCases: ['Web Development', 'Server-Side Development', 'Mobile Development'],
        difficulty: 'Beginner-Friendly',
        ecosystem: {
            status: 'Rich',
            packageManager: 'npm',
            buildTools: ['webpack', 'vite', 'babel']
        }
    },
    special: {
        popularity: 'High Industry Demand',
        historical: 'Legacy Language'
    }
};