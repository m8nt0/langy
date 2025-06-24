import { writable, derived, get } from 'svelte/store';
import {
    techObjectStore as commonTechObjectStore,
    filterStore as commonFilterStore,
    navigationStore as commonNavigationStore,
    uiStore as commonUiStore
} from '../../../common/components/state/stores';
import {
    selectVisibleTechObjects,
    selectActiveViewerData
} from '../../../common/components/state/selectors';
import { FilterService } from '../../../../core/domain/services';

/**
 * This file creates Svelte-compatible stores that are synchronized
 * with the platform-agnostic stores from our `common` layer.
 * This is the perfect bridge between the two layers.
 */

// --- SVELTE STORES ---
export const techObjectStore = writable(commonTechObjectStore.getState());
export const filterStore = writable(commonFilterStore.getState());
export const navigationStore = writable(commonNavigationStore.getState());
export const uiStore = writable(commonUiStore.getState());

// --- SYNC SUBSCRIPTIONS ---
commonTechObjectStore.subscribe(() => techObjectStore.set(commonTechObjectStore.getState()));
commonFilterStore.subscribe(() => filterStore.set(commonFilterStore.getState()));
commonNavigationStore.subscribe(() => navigationStore.set(commonNavigationStore.getState()));
commonUiStore.subscribe(() => uiStore.set(commonUiStore.getState()));

// --- SVELTE DERIVED STORES (SELECTORS) ---
export const visibleTechObjects = derived(
    [techObjectStore, filterStore],
    ([$techObjects, $filter]) => {
        // This re-implements the selector logic using Svelte's `derived`.
        // We can't directly use the `createSelector` function here, but the logic is the same.
        const allObjects = $techObjects.currentLevelIds.map(id => $techObjects.techObjects[id]).filter(Boolean);
        const filterService = new FilterService(); // Assume service is globally available or injected
        return filterService.applyFilter(allObjects, $filter.activeFilter);
    }
);

export const activeViewerData = derived(
    [visibleTechObjects, uiStore],
    ([$visibleObjects, $ui]) => {
        if ($ui.activeViewer === 'default' || !$visibleObjects) return null;
        return $visibleObjects.map(obj => obj.viewersData[$ui.activeViewer]);
    }
);