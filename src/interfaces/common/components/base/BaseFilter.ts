import { TechObjectFilter } from '../../../../core/domain/value-objects';

/**
 * Defines the properties for a UI component responsible for building and applying
 */
export interface BaseFilterProps {
    // The current filter state.
    currentFilter: TechObjectFilter;
    // Callback to execute when the filter is changed by the user.
    onFilterChange: (newFilter: TechObjectFilter) => void;
}

export abstract class BaseFilter {
    constructor(protected props: BaseFilterProps) {}

    abstract render(): any;
}