import type { Store, AppState } from '../store';
import { initialState } from '../store';

export class VanillaStore implements Store<AppState> {
  private state: AppState = { ...initialState };
  private listeners: ((state: AppState) => void)[] = [];

  getState(): AppState {
    return { ...this.state };
  }

  setState(partialState: Partial<AppState>): void {
    this.state = {
      ...this.state,
      ...partialState
    };
    
    // If we're updating nested objects like filters
    if (partialState.filters) {
      this.state.filters = {
        ...this.state.filters,
        ...partialState.filters
      };
    }
    
    this.notifyListeners();
  }

  subscribe(listener: (state: AppState) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    const state = this.getState();
    this.listeners.forEach(listener => listener(state));
  }
}

// Create a singleton instance
export const vanillaStore = new VanillaStore();
