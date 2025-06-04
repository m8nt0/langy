// Level constants and transitions

export enum AbstractionLevel {
  LEVEL_1 = 1, // Programming Language
  LEVEL_2 = 2, // Library
  LEVEL_3 = 3, // Framework
  LEVEL_4 = 4  // Application
}

export const LEVEL_NAMES = {
  [AbstractionLevel.LEVEL_1]: 'Programming Language',
  [AbstractionLevel.LEVEL_2]: 'Library',
  [AbstractionLevel.LEVEL_3]: 'Framework',
  [AbstractionLevel.LEVEL_4]: 'Application'
} as const;

export const LEVEL_DESCRIPTIONS = {
  [AbstractionLevel.LEVEL_1]: 'Core programming language features and paradigms',
  [AbstractionLevel.LEVEL_2]: 'Reusable libraries and components',
  [AbstractionLevel.LEVEL_3]: 'Application frameworks and platforms',
  [AbstractionLevel.LEVEL_4]: 'Complete software applications'
} as const;

export const LEVEL_TRANSITIONS = {
  [AbstractionLevel.LEVEL_1]: {
    up: AbstractionLevel.LEVEL_2,
    down: null
  },
  [AbstractionLevel.LEVEL_2]: {
    up: AbstractionLevel.LEVEL_3,
    down: AbstractionLevel.LEVEL_1
  },
  [AbstractionLevel.LEVEL_3]: {
    up: AbstractionLevel.LEVEL_4,
    down: AbstractionLevel.LEVEL_2
  },
  [AbstractionLevel.LEVEL_4]: {
    up: null,
    down: AbstractionLevel.LEVEL_3
  }
} as const; 