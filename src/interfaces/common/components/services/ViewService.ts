import { techObjectStore, uiStore } from '../state/stores';

/**
 * A service that provides helper functions related to the current view state.
 */
export const viewService = {
  isAnythingLoading(): boolean {
    return techObjectStore.getState().isLoading;
  },
  
  getActiveViewerMode() {
    return uiStore.getState().activeViewer;
  }
};