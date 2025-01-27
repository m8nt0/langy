export interface FilterExplanation {
    description: string;
    details: Record<string, string>;
    categories?: {
        [key: string]: {
            title: string;
            description: string;
            details: Record<string, string>;
        };
    };
}


export const explanations: Record<string, FilterExplanation> = {
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
