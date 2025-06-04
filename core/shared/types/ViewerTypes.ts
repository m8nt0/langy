// Viewer-specific types and configurations
import { UUID } from './Common';

export type ViewerType = 
  | 'TIMELINE'
  | 'ABSTRACTION_TREE'
  | 'PARADIGM'
  | 'SYSTEM'
  | 'USE_CASES'
  | 'EXPERIENCE';

export type TimelineScale = 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS';

export interface ViewerConfiguration {
  showMetadata: boolean;
  showRelationships: boolean;
  showVersions: boolean;
  showStatistics: boolean;
  highlightPatterns: boolean;
  autoLayout: boolean;
  scale?: TimelineScale;
}

export interface ParadigmViewerConfig extends ViewerConfiguration {
  paradigms: string[];
  showInheritance?: boolean;
  showComposition?: boolean;
}

export interface SystemViewerConfig extends ViewerConfiguration {
  showDataFlow: boolean;
  showControlFlow: boolean;
  showDependencies: boolean;
  clusterByModule: boolean;
}

export interface UseCaseViewerConfig extends ViewerConfiguration {
  domains: string[];
  industries: string[];
  showValueChains: boolean;
  valueMetrics: string[];
}

export interface ExperienceViewerConfig extends ViewerConfiguration {
  userTypes: string[];
  showInteractions: boolean;
  showUsagePatterns: boolean;
  experienceMetrics: string[];
}

export interface ViewerState {
  currentType: ViewerType;
  config: ViewerConfiguration;
  selectedObjects: UUID[];
  highlightedObjects: UUID[];
  expandedNodes: UUID[];
  zoomLevel: number;
  position: { x: number; y: number };
}

export interface ViewerTransition {
  from: ViewerType;
  to: ViewerType;
  preserveState: boolean;
  animationDuration?: number;
} 