import type { Language } from '$lib/stores/language-section/languages/types';

export const javascript: Language = {
    id: 'javascript',
    name: 'JavaScript',
    description: 'A dynamic programming language for web and server-side development',
    yearCreated: 1995,
    core: {
        paradigms: ['Object-Oriented', 'Functional', 'Event-Driven'],
        typingSystem: {
            style: 'Dynamic',
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
        difficulty: 'Beginner',
        readability: 'Medium',
        resourceAvailability: 'Abundant'
    },
    platforms: ['Web', 'Server', 'Desktop', 'Mobile'],
    category: 'General Purpose',
    icon: '/icons/javascript.svg'
};
