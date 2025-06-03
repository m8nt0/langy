import { AbstractionLevel, TechObjectType } from '../entities/TechObject';
import { ViewerType } from './ViewerData';

/**
 * Represents the navigation state in the system
 */
export class NavigationContext {
  constructor(
    private readonly path: NavigationPath[],
    private readonly currentState: NavigationState,
    private readonly history: NavigationHistory[] = [],
    private readonly maxHistorySize: number = 50
  ) {
    Object.freeze(this);
  }

  getCurrentState(): NavigationState {
    return { ...this.currentState };
  }

  getPath(): NavigationPath[] {
    return [...this.path];
  }

  getHistory(): NavigationHistory[] {
    return [...this.history];
  }

  // Navigation state updates
  withState(state: Partial<NavigationState>): NavigationContext {
    const newState = { ...this.currentState, ...state };
    const newHistory = [
      { state: this.currentState, timestamp: new Date() },
      ...this.history
    ].slice(0, this.maxHistorySize);

    return new NavigationContext(
      this.path,
      newState,
      newHistory,
      this.maxHistorySize
    );
  }

  withPath(path: NavigationPath[]): NavigationContext {
    return new NavigationContext(
      path,
      this.currentState,
      this.history,
      this.maxHistorySize
    );
  }

  // History management
  goBack(): NavigationContext {
    if (this.history.length === 0) return this;

    const [previousState, ...newHistory] = this.history;
    return new NavigationContext(
      this.path,
      previousState.state,
      newHistory,
      this.maxHistorySize
    );
  }

  clearHistory(): NavigationContext {
    return new NavigationContext(
      this.path,
      this.currentState,
      [],
      this.maxHistorySize
    );
  }

  // Factory methods
  static initial(): NavigationContext {
    return new NavigationContext(
      [],
      {
        selectedIds: [],
        currentLevel: AbstractionLevel.LEVEL_1,
        currentViewer: ViewerType.ABSTRACTION_TREE,
        filters: [],
        zoom: 1,
        position: { x: 0, y: 0 }
      },
      []
    );
  }

  static fromState(state: NavigationState): NavigationContext {
    return new NavigationContext([], state);
  }
}

export interface NavigationState {
  selectedIds: string[];
  currentLevel: AbstractionLevel;
  currentViewer: ViewerType;
  filters: any[];
  zoom: number;
  position: { x: number; y: number };
  focusedId?: string;
  searchQuery?: string;
  highlightedIds?: string[];
  comparisonMode?: boolean;
  bookmarks?: string[];
}

export interface NavigationPath {
  id: string;
  type: TechObjectType;
  level: AbstractionLevel;
  name: string;
  timestamp: Date;
}

export interface NavigationHistory {
  state: NavigationState;
  timestamp: Date;
  metadata?: {
    action?: string;
    source?: string;
    [key: string]: any;
  };
} 