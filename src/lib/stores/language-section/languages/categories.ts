import type { Language } from './types';

export function createCategories(language: Language) {
    return {
        'Core Characteristics': {
            title: 'Core',
            description: 'Fundamental aspects of the language',
            content: {
                description: 'How the language is designed and works',
                details: [
                    { key: 'Paradigms', value: language.core.paradigms.join(', ') },
                    { key: 'Type System', value: `${language.core.typingSystem.style} & ${language.core.typingSystem.strength}` },
                    { key: 'Compilation', value: language.core.compilation },
                    { key: 'Memory Management', value: language.core.memoryManagement },
                    { key: 'Concurrency', value: language.core.concurrencyModel.join(', ') }
                ]
            }
        },
        'Performance': {
            title: 'Performance',
            description: 'Runtime characteristics and efficiency',
            content: {
                description: 'How the language performs in different aspects',
                details: [
                    { key: 'Execution Speed', value: language.performance.executionSpeed },
                    { key: 'Memory Usage', value: language.performance.memoryUsage },
                    { key: 'Startup Time', value: language.performance.startupTime },
                    { key: 'Compile Time', value: language.performance.compileTime || 'N/A' }
                ]
            }
        },
        'Ecosystem': {
            title: 'Ecosystem',
            description: 'Development environment and community',
            content: {
                description: 'Tools and community resources',
                details: [
                    { key: 'Package Manager', value: language.ecosystem.packageManager },
                    { key: 'Build Tools', value: language.ecosystem.buildTools.join(', ') },
                    { key: 'Community Size', value: language.ecosystem.communitySize },
                    { key: 'Package Count', value: language.ecosystem.packageCount.toLocaleString() }
                ]
            }
        },
        'Use Cases': {
            title: 'Use Cases',
            description: 'Where and how the language is used',
            content: {
                description: 'Industry applications and platforms',
                details: [
                    { key: 'Category', value: language.category || 'N/A' },
                    { key: 'Platforms', value: language.platforms?.join(', ') || 'N/A' },
                    { key: 'Industry Usage', value: language.industryUsage.join(', ') }
                ]
            }
        },
        'Learning': {
            title: 'Learning',
            description: 'Learning curve and resources',
            content: {
                description: 'What to expect when learning',
                details: [
                    { key: 'Difficulty', value: language.learning.difficulty },
                    { key: 'Readability', value: language.learning.readability },
                    { key: 'Resources', value: language.learning.resourceAvailability }
                ]
            }
        }
    };
}