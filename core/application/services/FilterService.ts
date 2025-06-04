// Handles filtering logic

import { TechObject } from '../../domain/entities/TechObject';
import { FilterCriteria } from '../../domain/value-objects';
import { TechObjectRepository, CachePort, SearchPort } from '../ports';
import { 
  FilterGroup as IFilterGroup,
  FilterCondition as IFilterCondition,
  FilterOperator as IFilterOperator,
  FilterCombinator as IFilterCombinator
} from '../../shared/types/FilterTypes';
import { ValidationUtils } from '../../shared/utils/ValidationUtils';
import { ValidationError } from '../../shared/errors/ValidationError';

// Local type definitions
export interface FilterResult<T> {
  items: T[];
  total: number;
  appliedFilters: IFilterGroup[];
}

export interface FilterSuggestion {
  type: 'REFINEMENT' | 'RELATED';
  field?: string;
  values?: any[];
  filters?: Array<{ name: string; description: string }>;
  description: string;
}

interface SearchResult {
  name: string;
  description: string;
  [key: string]: any;
}

export class FilterService {
  constructor(
    private readonly repository: TechObjectRepository,
    private readonly cache: CachePort,
    private readonly search: SearchPort
  ) {}

  async applyFilter(
    filter: FilterCriteria,
    objects?: TechObject[]
  ): Promise<FilterResult<TechObject>> {
    this.validateFilter(filter);

    const cacheKey = `filter:${this.createFilterKey(filter)}`;
    const cached = await this.cache.get<FilterResult<TechObject>>(cacheKey);
    if (cached) return cached;

    const filteredObjects = objects 
      ? this.filterInMemory(objects, filter)
      : await this.filterFromRepository(filter);

    const result = {
      items: filteredObjects,
      total: filteredObjects.length,
      appliedFilters: filter.getGroups(),
      metadata: {
        executionTime: 0,
        timestamp: new Date()
      }
    };

    await this.cache.set(cacheKey, result, { ttl: 300000 }); // 5 minutes
    return result;
  }

  private validateFilter(filter: FilterCriteria): void {
    ValidationUtils.validateRequired(filter, 'filter');
    ValidationUtils.validateArray(filter.getGroups(), 'groups', {
      minLength: 1,
      validator: (group) => this.validateFilterGroup(group)
    });
  }

  private validateFilterGroup(group: IFilterGroup): boolean {
    try {
      ValidationUtils.validateArray(group.conditions, 'conditions', {
        minLength: 1
      });
      ValidationUtils.validateRequired(group.combinator, 'combinator');
      
      group.conditions.forEach(condition => {
        ValidationUtils.validateString(condition.field, 'field', { minLength: 1 });
        ValidationUtils.validateRequired(condition.operator, 'operator');
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async combineFilters(
    filters: FilterCriteria[],
    combinator: IFilterCombinator = IFilterCombinator.AND
  ): Promise<FilterCriteria> {
    const combinedGroups = filters.reduce((acc, filter) => {
      return [...acc, ...filter.getGroups()];
    }, [] as IFilterGroup[]);

    return new FilterCriteria(
      combinedGroups,
      {
        name: 'Combined Filter',
        description: `Combined ${filters.length} filters with ${combinator}`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );
  }

  private async filterFromRepository(filter: FilterCriteria): Promise<TechObject[]> {
    return this.repository.findByFilter(filter);
  }

  private filterInMemory(objects: TechObject[], filter: FilterCriteria): TechObject[] {
    return objects.filter(object => this.matchesFilter(object, filter));
  }

  private matchesFilter(object: TechObject, filter: FilterCriteria): boolean {
    return filter.getGroups().every(group => {
      const results = group.conditions.map(condition => {
        const value = this.getObjectValue(object, condition.field);
        return this.evaluateCondition(value, condition);
      });

      return group.combinator === IFilterCombinator.AND
        ? results.every(r => r)
        : results.some(r => r);
    });
  }

  private getObjectValue(object: TechObject, field: string): any {
    switch (field) {
      case 'id':
        return object.getId();
      case 'name':
        return object.getName();
      case 'type':
        return object.getType();
      case 'description':
        return object.getDescription();
      default:
        return undefined;
    }
  }

  private evaluateCondition(value: any, condition: IFilterCondition): boolean {
    switch (condition.operator) {
      case IFilterOperator.EQUALS:
        return value === condition.value;
      case IFilterOperator.NOT_EQUALS:
        return value !== condition.value;
      case IFilterOperator.CONTAINS:
        return typeof value === 'string' && 
          value.toLowerCase().includes(condition.value.toLowerCase());
      case IFilterOperator.IN:
        return Array.isArray(condition.value) && 
          condition.value.includes(value);
      case IFilterOperator.EXISTS:
        return value !== undefined && value !== null;
      default:
        return false;
    }
  }

  private async generateFilterSuggestions(
    filter: FilterCriteria,
    objects: TechObject[]
  ): Promise<FilterSuggestion[]> {
    const suggestions: FilterSuggestion[] = [];

    // Suggest refinements based on common patterns
    const commonTypes = this.findCommonValues(objects, o => o.getType());
    if (commonTypes.length > 0) {
      suggestions.push({
        type: 'REFINEMENT',
        field: 'type',
        values: commonTypes,
        description: 'Refine by common types'
      });
    }

    // Suggest related filters based on search patterns
    const searchResults = await this.search.similar<SearchResult>(filter.getMetadata().name || '', {
      fields: ['name', 'description'],
      size: 5
    });

    if (Array.isArray(searchResults)) {
    suggestions.push({
      type: 'RELATED',
      filters: searchResults.map(result => ({
        name: result.name,
        description: result.description
      })),
      description: 'Similar filters you might be interested in'
    });
    }

    return suggestions;
  }

  private findCommonValues<T>(
    objects: TechObject[],
    getter: (obj: TechObject) => T
  ): T[] {
    const counts = new Map<T, number>();
    
    objects.forEach(obj => {
      const value = getter(obj);
      counts.set(value, (counts.get(value) || 0) + 1);
    });

    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([value]) => value);
  }

  private buildFilterMetadata(
    filter: FilterCriteria,
    objects: TechObject[]
  ): FilterResult<TechObject>['metadata'] {
    return {
      executionTime: 0,
      timestamp: new Date()
    };
  }

  private createFilterKey(filter: FilterCriteria): string {
    return `${filter.getMetadata().name}:${filter.getGroups().length}`;
  }
}

export interface FilterResult<T> {
  items: T[];
  total: number;
  appliedFilters: IFilterGroup[];
  metadata: FilterMetadata;
}

export interface FilterMetadata {
  executionTime: number;
  timestamp: Date;
}

export interface FilterSuggestion {
  type: 'REFINEMENT' | 'RELATED';
  field?: string;
  values?: any[];
  filters?: Array<{ name: string; description: string }>;
  description: string;
}

export enum FilterOperator {
  EQUALS = 'EQUALS',
  NOT_EQUALS = 'NOT_EQUALS',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
  EXISTS = 'EXISTS'
}

export enum FilterCombinator {
  AND = 'AND',
  OR = 'OR'
}

export interface FilterGroup {
  conditions: FilterCondition[];
  combinator: FilterCombinator;
}

export interface FilterCondition {
  field: string;
  operator: FilterOperator;
  value: any;
} 