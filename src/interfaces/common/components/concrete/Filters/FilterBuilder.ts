import { TechObjectFilter, FilterCriterion } from '../../../../../core/domain/value-objects';

/**
 * Props for a component that allows users to construct a single filter criterion.
 */
export interface FilterBuilderProps {
    // A callback to add a newly constructed criterion to the main filter panel.
    onAddCriterion: (criterion: FilterCriterion) => void;
}

/**
 * Represents a UI component that provides a step-by-step interface
 * for creating a single, valid FilterCriterion. For example, it might have: 
 * 1. A dropdown to select the `field` ('name', 'level', 'experience', etc.).
 * 2. A second dropdown for the `operator` that updates based on the chosen field.
 * 3. An input for the `value` that also changes based on the field and operator.
 */
export class FilterBuilder {
    constructor(protected props: FilterBuilderProps) {}

    // In a real UI, this would manage the internal state of the criterion being built 
    // and call props.onAddCriterion with the result.

    render(): any {}
}