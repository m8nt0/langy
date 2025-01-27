import type { Language } from '$lib/stores/language-section/languages/types';

export const python: Language = {
    id: 'python',
    name: 'Python',
    description: 'A high-level, interpreted programming language emphasizing readability',
    yearCreated: 1991,
    core: {
        paradigms: ['Object-Oriented', 'Imperative',    'Functional'],
        typingSystem: {
            style: 'Dynamic',
            strength: 'Strong',
            features: ['Duck Typing', 'Type Hints']
        },
        compilation: 'Interpreted',
        memoryManagement: 'Garbage Collection',
        concurrencyModel: ['GIL', 'Async/Await', 'Multiprocessing'],
        syntaxStyle: {
            verbosity: 'Concise',
            whitespace: true,
            features: ['Indentation-based', 'List Comprehensions']
        }
    },
    influencedBy: ['ABC', 'C', 'Haskell'],
    industryUsage: ['Web', 'Data Science', 'AI/ML', 'Scripting'],
    ecosystem: {
        packageManager: 'pip',
        buildTools: ['setuptools', 'poetry', 'pip'],
        communitySize: 'Large',
        packageCount: 400000,
        popularity: 95
    },
    performance: {
        executionSpeed: 'Medium',
        memoryUsage: 'Medium',
        startupTime: 'Fast',
        compileTime: 'Fast'
    },
    learning: {
        difficulty: 'Beginner',
        readability: 'High',
        resourceAvailability: 'Abundant'
    },
    platforms: ['Desktop', 'Web', 'Mobile', 'IoT'],
    category: 'General Purpose',
    icon: '/icons/python.svg'
};
