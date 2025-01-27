<script lang="ts">
    import { slide } from 'svelte/transition';
    
    export let selectedCategory: string | null = null;
    export let selectedSubCategory: string | null = null;

    type ExplanationDetails = {
        title: string;
        description: string;
        details: Record<string, string>;
    };

    type CategoryExplanation = {
        description: string;
        [key: string]: string | ExplanationDetails;
    };

    const explanations: Record<string, CategoryExplanation> = {
        'Core Characteristics': {
            description: 'Fundamental aspects that define how a programming language works and how code is written in it.',
            paradigms: {
                title: 'Programming Paradigms',
                description: 'The fundamental style of programming that shapes how we write and organize code.',
                details: {
                    'Object-Oriented': 'Organizes code into objects that contain data and code. Examples: Java, C++',
                    'Functional': 'Treats computation as mathematical functions. Examples: Haskell, Elm',
                    'Imperative': 'Uses statements that change program state. Examples: C, Pascal',
                    'Concurrent': 'Handles multiple tasks simultaneously. Examples: Erlang, Go',
                    'Procedural': 'Based on procedure calls. Examples: C, FORTRAN',
                    'Structured': 'Uses block structures and control flow. Examples: Pascal, Ada'
                }
            },
            typing: {
                title: 'Type System',
                description: 'How the language handles data types and type checking.',
                details: {
                    'Static': 'Types are checked at compile time. Catches errors early but requires explicit type declarations.',
                    'Dynamic': 'Types are checked at runtime. More flexible but can hide type-related bugs.',
                    'Strong': 'Strict type rules with rare implicit conversions. Safer but more verbose.',
                    'Weak': 'Flexible type rules with common implicit conversions. More convenient but error-prone.'
                }
            },
            compilation: {
                title: 'Code Execution',
                description: 'How the code is transformed and executed by the computer.',
                details: {
                    'Compiled': 'Code is translated directly to machine code. Fast execution but platform-specific.',
                    'Interpreted': 'Code is executed line by line. More portable but slower execution.',
                    'JIT': 'Just-In-Time compilation combines both approaches for balanced performance.'
                }
            },
            memoryManagement: {
                title: 'Memory Management',
                description: 'How the language handles allocation and deallocation of memory.',
                details: {
                    'Manual': 'Programmer controls memory explicitly. Efficient but error-prone.',
                    'Garbage Collection': 'Automatic memory management. Safer but can impact performance.',
                    'Reference Counting': 'Tracks object references. Predictable but can leak memory.'
                }
            }
        },
        'Performance': {
            description: 'Metrics related to program execution and resource usage.',
            executionSpeed: {
                title: 'Execution Speed',
                description: 'How quickly the program runs at runtime.',
                details: {
                    'High': 'Near machine code performance. Suitable for system programming.',
                    'Medium': 'Good for most applications. Balanced performance.',
                    'Low': 'Prioritizes other factors over speed. May have overhead.'
                }
            },
            memoryUsage: {
                title: 'Memory Usage',
                description: 'How efficiently the language uses system memory.',
                details: {
                    'High': 'Significant memory overhead. May require more resources.',
                    'Medium': 'Balanced memory usage. Suitable for most applications.',
                    'Low': 'Minimal memory footprint. Good for constrained environments.'
                }
            }
        },
        'Ecosystem': {
            description: 'The development environment and community around the language.',
            communitySize: {
                title: 'Community Size',
                description: 'The scale and activity of the language community.',
                details: {
                    'Large': 'Active community with abundant resources and support.',
                    'Medium': 'Growing community with good resource availability.',
                    'Small': 'Niche community with specialized focus.'
                }
            },
            tooling: {
                title: 'Development Tools',
                description: 'Available tools and development environment support.',
                details: {
                    'Extensive': 'Rich ecosystem of tools, frameworks, and IDEs.',
                    'Adequate': 'Basic tools and growing ecosystem.',
                    'Limited': 'Minimal tooling and development support.'
                }
            }
        }
        // ... continue with other categories
    };

    $: currentExplanation = selectedCategory && selectedSubCategory ? 
        explanations[selectedCategory]?.[selectedSubCategory] as ExplanationDetails | undefined :
        selectedCategory ? 
            explanations[selectedCategory]?.description :
            null;
</script>

{#if currentExplanation}
    <div class="explanation-bar" transition:slide={{ duration: 200 }}>
        <div class="explanation-content">
            {#if typeof currentExplanation === 'string'}
                <p class="main-description">{currentExplanation}</p>
            {:else}
                <h3>{currentExplanation.title}</h3>
                <p>{currentExplanation.description}</p>
                {#if currentExplanation.details}
                    <div class="details-grid">
                        {#each Object.entries(currentExplanation.details) as [key, detail]}
                            <div class="detail-item">
                                <span class="detail-key">{key}</span>
                                <span class="detail-value">{detail}</span>
                            </div>
                        {/each}
                    </div>
                {/if}
            {/if}
        </div>
    </div>
{/if}

<style>
    .explanation-bar {
        background: var(--background-primary);
        border: 1px solid var(--border-color);
        width: 100%;
    }

    .explanation-content {
        padding: 24px;
    }

    .main-description {
        font-size: 0.95rem;
        color: var(--text-primary);
    }

    h3 {
        font-size: 1.1rem;
        font-weight: normal;
        margin: 0 0 12px 0;
    }

    p {
        font-size: 0.95rem;
        color: var(--text-primary);
        margin: 0 0 24px 0;
        line-height: 1.5;
    }

    .details-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 16px;
    }

    .detail-item {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 16px;
        background: var(--background-primary);
        border: 1px solid var(--border-color);
    }

    .detail-key {
        font-weight: 500;
        font-size: 0.95rem;
    }

    .detail-value {
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.4;
    }
</style> 