// ObjectTypes.ts: Tech object type constants and relationships

export enum TechObjectType {
  LANGUAGE = 'LANGUAGE',
  LIBRARY = 'LIBRARY',
  FRAMEWORK = 'FRAMEWORK',
  APPLICATION = 'APPLICATION' : {
    TOOL = 'TOOL',
    PLATFORM = 'PLATFORM'
  },
  // TOOL = 'TOOL',
  // PLATFORM = 'PLATFORM'
}

export const OBJECT_TYPE_NAMES = {
  [TechObjectType.LANGUAGE]: 'Programming Language',
  [TechObjectType.LIBRARY]: 'Library',
  [TechObjectType.FRAMEWORK]: 'Framework',
  [TechObjectType.APPLICATION]: 'Application',
  // [TechObjectType.TOOL]: 'Development Tool',
  // [TechObjectType.PLATFORM]: 'Platform'
} as const;

export const OBJECT_TYPE_DESCRIPTIONS = {
  [TechObjectType.LANGUAGE]: 'Core programming language with its features and paradigms',
  [TechObjectType.LIBRARY]: 'Reusable collection of code and functionality',
  [TechObjectType.FRAMEWORK]: 'Structured platform for building applications',
  [TechObjectType.APPLICATION]: 'Complete software application or system',
  // [TechObjectType.TOOL]: 'Development, testing, or deployment tool',
  // [TechObjectType.PLATFORM]: 'Comprehensive development or runtime platform'
} as const;

export const OBJECT_TYPE_CATEGORIES = {
  RUNTIME: [TechObjectType.LANGUAGE],
  DEVELOPMENT: [TechObjectType.LIBRARY, TechObjectType.FRAMEWORK],
  DEPLOYMENT: [TechObjectType.APPLICATION]
} as const;

// Not sure if this is needed, seems unnessary
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
    canUse: [TechObjectType.LIBRARY, TechObjectType.FRAMEWORK],
    canExtend: [TechObjectType.APPLICATION],
    canImplement: []
  },
  // [TechObjectType.TOOL]: {
  //   canUse: [TechObjectType.LIBRARY, TechObjectType.FRAMEWORK],
  //   canExtend: [TechObjectType.TOOL],
  //   canImplement: []
  // },
  // [TechObjectType.PLATFORM]: {
  //   canUse: [TechObjectType.LIBRARY, TechObjectType.FRAMEWORK],
  //   canExtend: [TechObjectType.PLATFORM],
  //   canImplement: [TechObjectType.APPLICATION]
  // }
} as const; 