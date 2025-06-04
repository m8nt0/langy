import { TechObject } from '../../domain/entities/TechObject';
import { FilterCriteria } from '../../domain/value-objects';
import { FilterService } from '../services';

export class ApplyFilterUseCase {
  constructor(
    private readonly filterService: FilterService
  ) {}

  async execute(
    filter: FilterCriteria,
    objects?: TechObject[]
  ): Promise<ApplyFilterResult> {
    // Apply the filter
    const filterResult = await this.filterService.applyFilter(filter, objects);

    return {
      objects: filterResult.objects,
      metadata: this.buildMetadata(filterResult),
      suggestions: filterResult.suggestions
    };
  }

  async combineFilters(
    filters: FilterCriteria[],
    combinator: FilterCombinator = FilterCombinator.AND
  ): Promise<FilterCriteria> {
    return this.filterService.combineFilters(filters, combinator);
  }

  private buildMetadata(result: FilterResult): ApplyFilterMetadata {
    return {
      matchCount: result.metadata.matchCount,
      appliedAt: result.metadata.appliedAt,
      filterInfo: result.metadata.filter
    };
  }
}

export interface ApplyFilterResult {
  objects: TechObject[];
  metadata: ApplyFilterMetadata;
  suggestions: FilterSuggestion[];
}

export interface ApplyFilterMetadata {
  matchCount: number;
  appliedAt: Date;
  filterInfo: Record<string, any>;
}

export interface FilterSuggestion {
  type: 'REFINEMENT' | 'RELATED';
  field?: string;
  values?: any[];
  filters?: Array<{ name: string; description: string }>;
  description: string;
}

export enum FilterCombinator {
  AND = 'AND',
  OR = 'OR'
}

interface FilterResult {
  objects: TechObject[];
  metadata: {
    matchCount: number;
    appliedAt: Date;
    filter: Record<string, any>;
  };
  suggestions: FilterSuggestion[];
} 