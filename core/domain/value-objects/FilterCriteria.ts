import { VerticalLevel } from '../../../VerticalLevel';
import { HorizontalLevel } from './HorizontalLevel';
import { ViewerType } from '../../../ViewerData';

/**
 * Represents filter criteria for tech objects
 */

// Filters determine which objects are shown in the current viewer, based on their data.

// allow users to apply filters globally or restrict them to the context of a specific viewer (e.g., only show objects with a certain timeline in the Temporal Viewer).

export enum FilterOperator {
    EQUALS = 'EQUALS',
    NOT_EQUALS = 'NOT_EQUALS',
    CONTAINS = 'CONTAINS',
    NOT_CONTAINS = 'NOT_CONTAINS',
    GREATER_THAN = 'GREATER_THAN',
    LESS_THAN = 'LESS_THAN',
    IN = 'IN',
    NOT_IN = 'NOT_IN',
    BETWEEN = 'BETWEEN',
    EXISTS = 'EXISTS',
    NOT_EXISTS = 'NOT_EXISTS'
}

export enum FilterCombinator {
    AND = 'AND',
    OR = 'OR'
}

export interface FilterCondition {
    // field might refer to level?
    field: string;
    operator: FilterOperator;
    value: any;
    caseSensitive?: boolean;
}

export interface FilterGroup {
    conditions: FilterCondition[];
    combinator: FilterCombinator;
    groups?: FilterGroup[];
}

/**
 * Immutable value object representing filter criteria
 */
export class FilterCriteria {
    constructor(
        private readonly groups: FilterGroup[],
        private readonly context: FilterContext = {}
    ) {
        Object.freeze(this);
    }

    getGroups(): FilterGroup[] {
        return [...this.groups];
    }

    getContext(): FilterContext {
        return { ...this.context };
    }

    withGroups(groups: FilterGroup[]): FilterCriteria {
        return new FilterCriteria(groups, this.context);
    }

    withContext(context: Partial<FilterContext>): FilterCriteria {
        return new FilterCriteria(
            this.groups,
            { ...this.context, ...context }
        );
    }

    // Factory methods for common filters
    static createVerticalLevelFilter(level: VerticalLevel): FilterCriteria {
        return new FilterCriteria(
            [{
                conditions: [{
                    field: 'verticalLevel',
                    operator: FilterOperator.EQUALS,
                    value: level
                }],
                combinator: FilterCombinator.AND
            }],
            {
                name: `Vertical Level ${level}`,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        );
    }

    static createHorizontalLevelFilter(level: VerticalLevel): FilterCriteria {
        return new FilterCriteria(
            [{
                conditions: [{
                    field: 'horizontalLevel',
                    operator: FilterOperator.EQUALS,
                    value: level
                }],
                combinator: FilterCombinator.AND
            }],
            {
                name: `Horizontal Level ${level}`,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        );
    }

    // static createTypeFilter(type: TechObjectType): FilterCriteria {
    //     return new FilterCriteria(
    //         [{
    //             conditions: [{
    //                 field: 'type',
    //                 operator: FilterOperator.EQUALS,
    //                 value: type
    //             }],
    //             combinator: FilterCombinator.AND
    //         }],
    //         {
    //             name: `Type ${type}`,
    //             createdAt: new Date(),
    //             updatedAt: new Date()
    //         }
    //     );
    // }

    static createViewerFilter(viewerType: ViewerType): FilterCriteria {
        return new FilterCriteria(
            [{
                conditions: [{
                    field: 'viewerCompatibility',
                    operator: FilterOperator.CONTAINS,
                    value: viewerType
                }],
                combinator: FilterCombinator.AND
            }],
            {
                name: `Viewer ${viewerType}`,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        );
    }

    static createSearchFilter(query: string): FilterCriteria {
        return new FilterCriteria(
            [{
                conditions: [{
                    field: 'searchableText',
                    operator: FilterOperator.CONTAINS,
                    value: query,
                    caseSensitive: false
                }],
                combinator: FilterCombinator.OR
            }],
            {
                name: `Search: ${query}`,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        );
    }

    // Combine multiple filters
    static combine(
        filters: FilterCriteria[],
        combinator: FilterCombinator = FilterCombinator.AND
    ): FilterCriteria {
        const groups = filters.flatMap(f => f.getGroups());
        return new FilterCriteria(
            groups,
            {
                name: 'Combined Filter',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        );
    }

    // Validation
    isValid(): boolean {
        return !!(
            this.groups &&
            this.groups.length > 0 &&
            this.validateGroups(this.groups)
        );
    }

    private validateGroups(groups: FilterGroup[]): boolean {
        return groups.every(group =>
            group.conditions &&
            group.conditions.length > 0 &&
            group.conditions.every(this.validateCondition)
        );
    }

    private validateCondition(condition: FilterCondition): boolean {
        return !!(
            condition.field &&
            condition.operator &&
            (condition.value !== undefined ||
                condition.operator === FilterOperator.EXISTS ||
                condition.operator === FilterOperator.NOT_EXISTS)
        );
    }
}

// Additional types
export interface FilterContext {
    appliedViewers?: ViewerType[];
    selectedVerticalLevels?: VerticalLevel[];
    selectedHorizontalLevels?: HorizontalLevel[];
    // selectedTypes?: TechObjectType[];
    timeRange?: { start: Date; end: Date };
    [key: string]: any;
} 