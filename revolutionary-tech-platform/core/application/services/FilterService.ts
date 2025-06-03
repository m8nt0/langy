import { TechObject } from '../../domain/entities/TechObject';
import { FilterCriteria } from '../../domain/value-objects';
import { TechObjectRepository, CachePort, SearchPort } from '../ports';

export class FilterService {
  constructor(
    private readonly repository: TechObjectRepository,
    private readonly cache: CachePort,
    private readonly search: SearchPort
  ) {}

  async applyFilter(
    filter: FilterCriteria,
    objects?: TechObject[]
  ): Promise<FilterResult> {
    const cacheKey = `filter:${this.createFilterKey(filter)}`;
    const cached = await this.cache.get<FilterResult>(cacheKey);
    if (cached) return cached;

    const filteredObjects = objects 
      ? this.filterInMemory(objects, filter)
      : await this.filterFromRepository(filter);

    const result = {
      objects: filteredObjects,
      metadata: this.buildFilterMetadata(filter, filteredObjects),
      suggestions: await this.generateFilterSuggestions(filter, filteredObjects)
    };

    await this.cache.set(cacheKey, result, { ttl: 300000 }); // 5 minutes
    return result;
  }

  async combineFilters(
    filters: FilterCriteria[],
    combinator: FilterCombinator = FilterCombinator.AND
  ): Promise<FilterCriteria> {
    const combinedGroups = filters.reduce((acc, filter) => {
      return [...acc, ...filter.getGroups()];
    }, [] as FilterGroup[]);

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

      return group.combinator === FilterCombinator.AND
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
      case 'metadata':
        return object.getMetadata();
      default:
        return undefined;
    }
  }

  private evaluateCondition(value: any, condition: FilterCondition): boolean {
    switch (condition.operator) {
      case FilterOperator.EQUALS:
        return value === condition.value;
      case FilterOperator.NOT_EQUALS:
        return value !== condition.value;
      case FilterOperator.CONTAINS:
        return typeof value === 'string' && 
          value.toLowerCase().includes(condition.value.toLowerCase());
      case FilterOperator.IN:
        return Array.isArray(condition.value) && 
          condition.value.includes(value);
      case FilterOperator.EXISTS:
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
    const searchResults = await this.search.similar(filter.getMetadata().name || '', {
      fields: ['name', 'description'],
      size: 5
    });

    suggestions.push({
      type: 'RELATED',
      filters: searchResults.map(result => ({
        name: result.name,
        description: result.description
      })),
      description: 'Similar filters you might be interested in'
    });

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
  ): FilterMetadata {
    return {
      matchCount: objects.length,
      appliedAt: new Date(),
      filter: filter.getMetadata()
    };
  }

  private createFilterKey(filter: FilterCriteria): string {
    return `${filter.getMetadata().name}:${filter.getGroups().length}`;
  }
}

export interface FilterResult {
  objects: TechObject[];
  metadata: FilterMetadata;
  suggestions: FilterSuggestion[];
}

export interface FilterMetadata {
  matchCount: number;
  appliedAt: Date;
  filter: Record<string, any>;
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