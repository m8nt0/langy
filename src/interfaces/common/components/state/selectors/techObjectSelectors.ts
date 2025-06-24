import { techObjectStore, filterStore, uiStore, ViewerMode } from '../stores';
import { FilterService } from '../../../../../core/domain/services/FilterService';
import { TechObjectDto } from '../../../../../core/application/dto';
import { createSelector } from '../../utils/createSelector'; // A simple memoization utility

const filterService = new FilterService();

/**
 * A selector that retrieves the list of TechObjects for the current level.
 */
const selectCurrentLevelObjects = createSelector(
  [techObjectStore], // Input stores
  (state) => {
    // Maps the list of current level IDs to the full objects in the main store
    return state.currentLevelIds.map(id => state.techObjects[id]).filter(Boolean);
  }
);

/**
 * A selector that retrieves the active filter from the filter store.
 */
const selectActiveFilter = createSelector(
  [filterStore],
  (state) => state.activeFilter
);

/**
 * This is a key selector for your application.
 * It takes the objects for the current level and the active filter,
 * and returns only the objects that match the filter.
 * Components will subscribe to this to get the visible list of cards.
 */
export const selectVisibleTechObjects = createSelector(
  [selectCurrentLevelObjects, selectActiveFilter], // Composes other selectors
  (currentLevelObjects, activeFilter) => {
    // The core filtering logic is delegated to the perfected FilterService.
    return filterService.applyFilter(currentLevelObjects, activeFilter);
  }
);

/**
 * Selects the data for the currently active viewer.
 */
export const selectActiveViewerData = createSelector(
    [selectVisibleTechObjects, uiStore],
    (visibleObjects, uiState) => {
        if (uiState.activeViewer === 'default') {
            return null; // In default mode, we don't need special viewer data
        }
        // Extracts the specific viewer data (e.g., temporal, paradigm) from each visible object
        return visibleObjects.map(obj => obj.viewersData[uiState.activeViewer]);
    }
);

export const techObjectSelectors = {
  selectVisibleTechObjects,
  selectActiveViewerData,
};