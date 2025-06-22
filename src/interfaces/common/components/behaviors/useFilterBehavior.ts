import { filterStore } from '../state/stores'; // TODO: implement filter store
import { filterActions } from '../state/actions'; // TODO: implement filter actions
import { TechObjectFilter } from '../../../../core/domain/value-objects';

/**
 * Encapsulates the logic and state connection for the filter panel.
 * @returns The current filter state and a callback to update it.
 */
export function useFilterBehavior() {
    // In a real implementation, this would use a state management library 
    // to subscribe to the store and get the current value.
    const currentFilter = filterStore.getCurrentFilter();

    const setFilter = (newFilter: TechObjectFilter) => {
        // Dispatches an action to update the global filter state.
        filterActions.setFilter(newFilter);
    };

    return {
        currentFilter,
        onFilterChange: setFilter,
    }
}