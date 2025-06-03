export enum TechObjectType {
  LANGUAGE = 'LANGUAGE',
  LIBRARY = 'LIBRARY',
  FRAMEWORK = 'FRAMEWORK',
  APPLICATION = 'APPLICATION',
  TOOL = 'TOOL',
  PLATFORM = 'PLATFORM'
}

export const OBJECT_TYPE_NAMES = {
  [TechObjectType.LANGUAGE]: 'Programming Language',
  [TechObjectType.LIBRARY]: 'Library',
  [TechObjectType.FRAMEWORK]: 'Framework',
  [TechObjectType.APPLICATION]: 'Application',
  [TechObjectType.TOOL]: 'Development Tool',
  [TechObjectType.PLATFORM]: 'Platform'
} as const;

export const OBJECT_TYPE_DESCRIPTIONS = {
  [TechObjectType.LANGUAGE]: 'Core programming language with its features and paradigms',
  [TechObjectType.LIBRARY]: 'Reusable collection of code and functionality',
  [TechObjectType.FRAMEWORK]: 'Structured platform for building applications',
  [TechObjectType.APPLICATION]: 'Complete software application or system',
  [TechObjectType.TOOL]: 'Development, testing, or deployment tool',
  [TechObjectType.PLATFORM]: 'Comprehensive development or runtime platform'
} as const;

export const OBJECT_TYPE_CATEGORIES = {
  RUNTIME: [TechObjectType.LANGUAGE, TechObjectType.PLATFORM],
  DEVELOPMENT: [TechObjectType.LIBRARY, TechObjectType.FRAMEWORK, TechObjectType.TOOL],
  DEPLOYMENT: [TechObjectType.APPLICATION, TechObjectType.PLATFORM]
} as const;

export const OBJECT_TYPE_RELATIONSHIPS = {
  [TechObjectType.LANGUAGE]: {
    canUse: [TechObjectType.LIBRARY],
    canExtend: [TechObjectType.LANGUAGE],
    canImplement: [TechObjectType.FRAMEWORK]
  },
  [TechObjectType.LIBRARY]: {
    canUse: [TechObjectType.LIBRARY],
    canExtend: [TechObjectType.FRAMEWORK],
    canImplement: [TechObjectType.APPLICATION]
  },
  [TechObjectType.FRAMEWORK]: {
    canUse: [TechObjectType.LIBRARY, TechObjectType.FRAMEWORK],
    canExtend: [TechObjectType.FRAMEWORK],
    canImplement: [TechObjectType.APPLICATION]
  },
  [TechObjectType.APPLICATION]: {
    canUse: [TechObjectType.LIBRARY, TechObjectType.FRAMEWORK, TechObjectType.PLATFORM],
    canExtend: [TechObjectType.APPLICATION],
    canImplement: []
  },
  [TechObjectType.TOOL]: {
    canUse: [TechObjectType.LIBRARY, TechObjectType.FRAMEWORK],
    canExtend: [TechObjectType.TOOL],
    canImplement: []
  },
  [TechObjectType.PLATFORM]: {
    canUse: [TechObjectType.LIBRARY, TechObjectType.FRAMEWORK],
    canExtend: [TechObjectType.PLATFORM],
    canImplement: [TechObjectType.APPLICATION]
  }
} as const; 