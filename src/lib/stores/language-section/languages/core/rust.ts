import type { Language } from '$lib/stores/language-section/languages/types';

export const rust: Language = {
    id: 'rust',
    name: 'Rust',
    description: 'A systems programming language focused on safety and performance',
    yearCreated: 2010,
    core: {
        paradigms: ['Multi-paradigm', 'Concurrent', 'Functional', 'Imperative'],
        typingSystem: {
            style: 'Static',
            strength: 'Strong',
            features: ['Affine Types', 'Ownership System']
        },
        compilation: 'Compiled',
        memoryManagement: 'Manual',
        concurrencyModel: ['Ownership & Borrowing', 'Message Passing'],
        syntaxStyle: {
            verbosity: 'Moderate',
            whitespace: false,
            features: ['Pattern Matching', 'Zero-cost Abstractions']
        }
    },
    influencedBy: ['C++', 'OCaml', 'Erlang'],
    industryUsage: ['Systems', 'WebAssembly', 'Networking'],
    ecosystem: {
        packageManager: 'cargo',
        buildTools: ['cargo', 'rustc'],
        communitySize: 'Large',
        packageCount: 75000,
        popularity: 85
    },
    performance: {
        executionSpeed: 'High',
        memoryUsage: 'Low',
        startupTime: 'Fast',
        compileTime: 'Slow'
    },
    learning: {
        difficulty: 'Advanced',
        readability: 'Medium',
        resourceAvailability: 'Abundant'
    },
    platforms: ['Desktop', 'Web', 'Embedded'],
    category: 'General Purpose',
    icon: '/icons/rust.svg'
};
