import { AbstractionLevel as Level } from '../entities/TechObject';

/**
 * Represents an abstraction level and its properties in the system
 */
export class AbstractionLevelData {
  constructor(
    private readonly level: Level,
    private readonly properties: AbstractionLevelProperties,
    private readonly transitions: AbstractionTransition[]
  ) {
    Object.freeze(this);
  }

  getLevel(): Level {
    return this.level;
  }

  getProperties(): AbstractionLevelProperties {
    return { ...this.properties };
  }

  getTransitions(): AbstractionTransition[] {
    return [...this.transitions];
  }

  // Factory methods for each level
  static createProgrammingLanguageLevel(): AbstractionLevelData {
    return new AbstractionLevelData(
      Level.LEVEL_1,
      {
        name: 'Programming Languages',
        description: 'Fundamental building blocks of software',
        capabilities: [
          'Core syntax and semantics',
          'Standard libraries',
          'Runtime environments'
        ],
        constraints: [
          'Must be Turing complete',
          'Must have clear specification'
        ],
        abstractionMechanisms: [
          'Data abstraction',
          'Control flow abstraction',
          'Type abstraction'
        ]
      },
      [
        {
          targetLevel: Level.LEVEL_2,
          abstractionType: 'BUILDS_ON',
          requirements: ['Must extend language capabilities'],
          validationRules: ['Must preserve language semantics']
        }
      ]
    );
  }

  static createLibraryLevel(): AbstractionLevelData {
    return new AbstractionLevelData(
      Level.LEVEL_2,
      {
        name: 'Libraries',
        description: 'Reusable components and utilities',
        capabilities: [
          'Specific functionality',
          'API interfaces',
          'Documentation'
        ],
        constraints: [
          'Must be modular',
          'Must have clear dependencies'
        ],
        abstractionMechanisms: [
          'Component abstraction',
          'Interface abstraction',
          'Implementation hiding'
        ]
      },
      [
        {
          targetLevel: Level.LEVEL_3,
          abstractionType: 'BUILDS_ON',
          requirements: ['Must provide architectural patterns'],
          validationRules: ['Must maintain library compatibility']
        }
      ]
    );
  }

  static createFrameworkLevel(): AbstractionLevelData {
    return new AbstractionLevelData(
      Level.LEVEL_3,
      {
        name: 'Frameworks',
        description: 'Architectural and structural patterns',
        capabilities: [
          'Application structure',
          'Design patterns',
          'Development workflow'
        ],
        constraints: [
          'Must provide clear architecture',
          'Must handle common concerns'
        ],
        abstractionMechanisms: [
          'Architectural abstraction',
          'Pattern abstraction',
          'Workflow abstraction'
        ]
      },
      [
        {
          targetLevel: Level.LEVEL_4,
          abstractionType: 'BUILDS_ON',
          requirements: ['Must solve specific business needs'],
          validationRules: ['Must follow framework conventions']
        }
      ]
    );
  }

  static createApplicationLevel(): AbstractionLevelData {
    return new AbstractionLevelData(
      Level.LEVEL_4,
      {
        name: 'Applications',
        description: 'End-user solutions and products',
        capabilities: [
          'Business logic',
          'User interface',
          'Data management'
        ],
        constraints: [
          'Must solve user needs',
          'Must be maintainable'
        ],
        abstractionMechanisms: [
          'Domain abstraction',
          'UI abstraction',
          'Data abstraction'
        ]
      },
      []  // Highest level, no further abstractions
    );
  }
}

export interface AbstractionLevelProperties {
  name: string;
  description: string;
  capabilities: string[];
  constraints: string[];
  abstractionMechanisms: string[];
}

export interface AbstractionTransition {
  targetLevel: Level;
  abstractionType: string;
  requirements: string[];
  validationRules: string[];
} 