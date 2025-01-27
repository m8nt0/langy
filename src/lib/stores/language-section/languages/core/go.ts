import type { Language } from '$lib/stores/language-section/languages/types';

export const go: Language = {
    id: 'go',
    name: 'Go',
    description: 'A statically typed, compiled language designed for simplicity and efficiency',
    yearCreated: 2009,
    core: {
        paradigms: ['Concurrent', 'Imperative', 'Structured'],
        typingSystem: {
            style: 'Static',
            strength: 'Strong',
            features: ['Interface Composition', 'Type Inference']
        },
        compilation: 'Compiled',
        memoryManagement: 'Garbage Collection',
        concurrencyModel: ['Goroutines', 'Channels', 'CSP'],
        syntaxStyle: {
            verbosity: 'Concise',
            whitespace: false,
            features: ['Implicit Interfaces', 'Multiple Return Values']
        }
    },
    influencedBy: ['C', 'Pascal', 'Oberon'],
    industryUsage: ['Cloud', 'Systems', 'Web Services'],
    ecosystem: {
        packageManager: 'go mod',
        buildTools: ['go build', 'go test'],
        communitySize: 'Large',
        packageCount: 400000,
        popularity: 85
    },
    performance: {
        executionSpeed: 'High',
        memoryUsage: 'Medium',
        startupTime: 'Fast',
        compileTime: 'Fast'
    },
    learning: {
        difficulty: 'Intermediate',
        readability: 'High',
        resourceAvailability: 'Abundant'
    },
    platforms: ['Server', 'Cloud', 'Desktop'],
    category: 'General Purpose',
    icon: '/icons/go.svg'
};
