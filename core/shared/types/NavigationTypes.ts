// Navigation-specific types and states

import { UUID } from './Common';
import { ViewerType } from './ViewerTypes';

export interface NavigationState {
  currentLevel: number;
  selectedIds: UUID[];
  // viewerType: ViewerType;
  path: NavigationPathEntry[];
  context: Record<string, any>;
}

export interface NavigationPathEntry {
  id: UUID;
  // The level will always be one but lets keep it for now
  level: number;
  // timestamp: Date;
  // metadata?: Record<string, any>;
}

export interface NavigationTransition {
  from: NavigationState;
  to: NavigationState;
  type: 'UP' | 'DOWN' | 'LATERAL';
  // metadata: {
  //   timestamp: Date;
  //   duration?: number;
  //   automatic?: boolean;
  // };
}

export interface NavigationHistory {
  entries: NavigationPathEntry[];
  currentIndex: number;
  // metadata: {
  //   startTime: Date;
  //   lastActive: Date;
  //   totalTransitions: number;
  // };
}

export interface NavigationBreadcrumb {
  path: Array<{
    id: UUID;
    name: string;
    level: number;
  }>;
  current: {
    id: UUID;
    name: string;
    level: number;
  };
}

// export interface NavigationSuggestion {
//   targetId: UUID;
//   targetLevel: number;
//   confidence: number;
//   reason: string;
//   metadata?: {
//     frequency?: number;
//     lastVisited?: Date;
//     popularity?: number;
//   };
// }

export interface NavigationConstraints {
  allowedLevels: number[];
  requiredContext?: Record<string, any>;
  maxDepth?: number;
  // timeConstraints?: {
  //   maxDuration?: number;
  //   maxIdleTime?: number;
  // };
} 