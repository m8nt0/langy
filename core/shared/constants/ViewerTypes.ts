// Viewer type constants and configurations

import { ViewerType } from '../types/ViewerTypes';

export const VIEWER_TYPES: Record<ViewerType, ViewerType> = {
  TIMELINE: 'TIMELINE',
  ABSTRACTION_TREE: 'ABSTRACTION_TREE',
  PARADIGM: 'PARADIGM',
  SYSTEM: 'SYSTEM',
  USE_CASES: 'USE_CASES',
  EXPERIENCE: 'EXPERIENCE'
} as const;

export const VIEWER_NAMES: Record<ViewerType, string> = {
  TIMELINE: 'Timeline View',
  ABSTRACTION_TREE: 'Abstraction Tree',
  PARADIGM: 'Paradigm View',
  SYSTEM: 'System View',
  USE_CASES: 'Use Cases View',
  EXPERIENCE: 'Experience View'
} as const;

export const VIEWER_DESCRIPTIONS: Record<ViewerType, string> = {
  TIMELINE: 'Temporal view of technology evolution',
  ABSTRACTION_TREE: 'Hierarchical view of abstraction levels',
  PARADIGM: 'Programming paradigm relationships',
  SYSTEM: 'System architecture and dependencies',
  USE_CASES: 'Business use cases and applications',
  EXPERIENCE: 'User experience and interaction patterns'
} as const;

export const DEFAULT_VIEWER_CONFIG = {
  showMetadata: true,
  showRelationships: true,
  showVersions: true,
  showStatistics: false,
  highlightPatterns: true,
  autoLayout: true
} as const;

// Not sure if this is needed since there will be a toggle of each for user to change to
export const VIEWER_TRANSITIONS = {
  TIMELINE: ['ABSTRACTION_TREE', 'SYSTEM'],
  ABSTRACTION_TREE: ['TIMELINE', 'PARADIGM', 'SYSTEM'],
  PARADIGM: ['ABSTRACTION_TREE', 'SYSTEM'],
  SYSTEM: ['ABSTRACTION_TREE', 'USE_CASES'],
  USE_CASES: ['SYSTEM', 'EXPERIENCE'],
  EXPERIENCE: ['USE_CASES', 'SYSTEM']
} as const; 