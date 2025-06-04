// Search for objects

import { TechObject } from '../../domain/entities/TechObject';
import { AbstractionLevel } from '../../shared/constants/AbstractionLevels';
import { SearchService } from '../services';

export class SearchObjectsUseCase {
  constructor(
    private readonly searchService: SearchService
  ) {}

  async execute(query: SearchQuery): Promise<SearchObjectsResult> {
    // Perform search
    const searchResult = await this.searchService.searchObjects(query);

    return {
      items: searchResult.items,
      facets: searchResult.facets,
      suggestions: searchResult.suggestions,
      metadata: this.buildMetadata(searchResult)
    };
  }

  async searchByLevel(
    level: AbstractionLevel,
    query: SearchQuery
  ): Promise<SearchObjectsResult> {
    return this.searchService.searchByLevel(level, query);
  }

  async findSimilar(objectId: string): Promise<SearchObjectsResult> {
    return this.searchService.searchSimilar(objectId);
  }

  private buildMetadata(result: SearchResult): SearchMetadata {
    return {
      totalResults: result.total,
      page: result.page,
      pageSize: result.pageSize,
      searchedAt: new Date()
    };
  }
}

export interface SearchObjectsResult {
  items: Array<{
    object: TechObject;
    score: number;
    highlights: Record<string, string[]>;
  }>;
  facets: SearchFacets;
  suggestions: SearchSuggestion[];
  metadata: SearchMetadata;
}

export interface SearchQuery {
  text?: string;
  type?: string;
  level?: AbstractionLevel;
  tags?: string[];
  filters?: Record<string, any>;
  sort?: Array<{ field: string; order: 'asc' | 'desc' }>;
  page?: number;
  pageSize?: number;
}

export interface SearchFacets {
  [key: string]: Array<{
    value: string;
    count: number;
    selected: boolean;
  }>;
}

export interface SearchSuggestion {
  type: 'TERM' | 'FILTER';
  terms?: string[];
  field?: string;
  values?: Array<{
    value: string;
    count: number;
  }>;
  description: string;
}

export interface SearchMetadata {
  totalResults: number;
  page: number;
  pageSize: number;
  searchedAt: Date;
}

interface SearchResult {
  total: number;
  page: number;
  pageSize: number;
  items: Array<{
    object: TechObject;
    score: number;
    highlights: Record<string, string[]>;
  }>;
  facets: SearchFacets;
  suggestions: SearchSuggestion[];
} 