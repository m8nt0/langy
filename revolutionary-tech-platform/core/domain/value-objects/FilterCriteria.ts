import { AbstractionLevel, TechObjectType } from '../entities/TechObject';
import { ViewerType } from './ViewerData';

/**
 * Represents filter criteria for tech objects
 */

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

export interface FilterMetadata {
    name?: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    creator?: string;
    isDefault?: boolean;
    isFavorite?: boolean;
    tags?: string[];
}

/**
 * Immutable value object representing filter criteria
 */
export class FilterCriteria {
    constructor(
        private readonly groups: FilterGroup[],
        private readonly metadata: FilterMetadata,
        private readonly context: FilterContext = {}
    ) {
        Object.freeze(this);
    }

    getGroups(): FilterGroup[] {
        return [...this.groups];
    }

    getMetadata(): FilterMetadata {
        return { ...this.metadata };
    }

    getContext(): FilterContext {
        return { ...this.context };
    }

    withGroups(groups: FilterGroup[]): FilterCriteria {
        return new FilterCriteria(groups, this.metadata, this.context);
    }

    withMetadata(metadata: Partial<FilterMetadata>): FilterCriteria {
        return new FilterCriteria(
            this.groups,
            { ...this.metadata, ...metadata, updatedAt: new Date() },
            this.context
        );
    }

    withContext(context: Partial<FilterContext>): FilterCriteria {
        return new FilterCriteria(
            this.groups,
            this.metadata,
            { ...this.context, ...context }
        );
    }

    // Factory methods for common filters
    static createAbstractionLevelFilter(level: AbstractionLevel): FilterCriteria {
        return new FilterCriteria(
            [{
                conditions: [{
                    field: 'abstractionLevel',
                    operator: FilterOperator.EQUALS,
                    value: level
                }],
                combinator: FilterCombinator.AND
            }],
            {
                name: `Abstraction Level ${level}`,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        );
    }

    static createTypeFilter(type: TechObjectType): FilterCriteria {
        return new FilterCriteria(
            [{
                conditions: [{
                    field: 'type',
                    operator: FilterOperator.EQUALS,
                    value: type
                }],
                combinator: FilterCombinator.AND
            }],
            {
                name: `Type ${type}`,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        );
    }

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
    selectedAbstractionLevels?: AbstractionLevel[];
    selectedTypes?: TechObjectType[];
    timeRange?: { start: Date; end: Date };
    [key: string]: any;
} 