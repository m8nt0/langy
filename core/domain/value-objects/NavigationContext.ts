import { VerticalLevel } from '../../../VerticalLevel';
import { HorizontalLevel } from './HorizontalLevel';


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

  getPath(): NavigationPath[] {
    return [...this.path];
  }

  getCurrentState(): NavigationState { 
    return { ...this.currentState };
  }

  getHistory(): NavigationHistory[] {
    return [...this.history];
  }

  // Navigation state updates
  withState(state: Partial<NavigationState>): NavigationContext {
    const newState = { ...this.currentState, ...state };
    const newHistory = [
      { state: this.currentState},
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
        currentVerticalLevel: VerticalLevel.level('language'),
        currentHorizontalLevel: HorizontalLevel.level('TechObject')
        // currentViewer: VIEWER_TYPES.ABSTRACTION_TREE,
        // filters: [],
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
  currentVerticalLevel: VerticalLevel;
  currentHorizontalLevel: HorizontalLevel;

  // currentViewer: ViewerType;
  // filters: any[];
}

export interface NavigationPath {
  id: string;
  // type: TechObjectType;
  verticalLevel: VerticalLevel;
  horizontalLevel: HorizontalLevel
  name: string;
}

export interface NavigationHistory {
  state: NavigationState;
  metadata?: {
    action?: string;
    source?: string;
    [key: string]: any;
  };
} 