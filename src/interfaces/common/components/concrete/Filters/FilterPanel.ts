import { BaseFilter, BaseFilterProps } from '../../base';
import { useFilterBehavior } from '../../behaviors';
import { FilterCriterion, TechObjectFilter } from '../../../../../core/domain/value-objects';
import { FilterBuilder } from './FilterBuilder';

/**
 * Represents the main filter panel UI. It displays the current active filters,
 * allows users to remove them, and uses the FilterBuilder to add new ones.
 */
export class FilterPanel extends BaseFilter {
    private filterBuilder: FilterBuilder;

    constructor() {
        // Connects to the application's state via the behavior hook.
        const behavior = useFilterBehavior();
        super(behavior);

        this.filterBuilder = new FilterBuilder({
            onAddCriterion: this.addCriterion.bind(this)
        });
    }

    private addCriterion(newCriterion: FilterCriterion): void {
        // Creates a new TechObjectFilter by adding the new criterion.
        const currentCriteria = this.props.currentFilter.criteria;
        const newFilter = new TechObjectFilter([...currentCriteria, newCriterion]);

        // Calls the onFilterChange callback from the behavior to update the global state.
        this.props.onFilterChange(newFilter);
    }

    // The render method would be implemented by the specific UI framework
    // to display the list of active filters and the FilterBuilder component.
    render(): any {}
}