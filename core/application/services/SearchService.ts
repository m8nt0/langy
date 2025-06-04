import { TechObject, AbstractionLevel } from '../../domain/entities/TechObject';
import { SearchPort, CachePort } from '../ports';

export class SearchService {
  constructor(
    private readonly search: SearchPort,
    private readonly cache: CachePort
  ) {}

  async searchObjects(query: SearchQuery): Promise<SearchResult> {
    const cacheKey = `search:${this.createSearchKey(query)}`;
    const cached = await this.cache.get<SearchResult>(cacheKey);
    if (cached) return cached;

    const searchResult = await this.search.search<TechObject>({
      text: query.text,
      filters: this.buildSearchFilters(query),
      facets: ['type', 'level', 'tags'],
      sort: query.sort,
      page: query.page,
      pageSize: query.pageSize,
      highlight: {
        fields: ['name', 'description', 'metadata.keywords'],
        preTag: '<mark>',
        postTag: '</mark>'
      }
    });

    const result = {
      items: searchResult.hits.map(hit => ({
        object: hit.item,
        score: hit.score,
        highlights: hit.highlights || {}
      })),
      facets: this.processFacets(searchResult.facets),
      total: searchResult.total,
      page: searchResult.page,
      pageSize: searchResult.pageSize,
      suggestions: await this.generateSearchSuggestions(query)
    };

    await this.cache.set(cacheKey, result, { ttl: 300000 }); // 5 minutes
    return result;
  }

  async searchByLevel(
    level: AbstractionLevel,
    query: SearchQuery
  ): Promise<SearchResult> {
    return this.searchObjects({
      ...query,
      filters: {
        ...query.filters,
        level
      }
    });
  }

  async searchSimilar(objectId: string): Promise<SearchResult> {
    const similar = await this.search.similar<TechObject>(objectId, {
      fields: ['description', 'metadata.keywords', 'metadata.concepts'],
      size: 10
    });

    return {
      items: similar.map(obj => ({
        object: obj,
        score: 1,
        highlights: {}
      })),
      total: similar.length,
      page: 1,
      pageSize: similar.length,
      facets: {},
      suggestions: []
    };
  }

  private buildSearchFilters(query: SearchQuery): Record<string, any> {
    const filters: Record<string, any> = { ...query.filters };

    if (query.type) {
      filters.type = query.type;
    }

    if (query.level) {
      filters.level = query.level;
    }

    if (query.tags && query.tags.length > 0) {
      filters.tags = { $in: query.tags };
    }

    return filters;
  }

  private processFacets(
    facets: Record<string, Array<{ value: string; count: number }>> | undefined
  ): SearchFacets {
    if (!facets) return {};

    return Object.entries(facets).reduce((acc, [key, values]) => {
      acc[key] = values.map(v => ({
        value: v.value,
        count: v.count,
        selected: false
      }));
      return acc;
    }, {} as SearchFacets);
  }

  private async generateSearchSuggestions(
    query: SearchQuery
  ): Promise<SearchSuggestion[]> {
    const suggestions: SearchSuggestion[] = [];

    // Get term suggestions
    if (query.text) {
      const terms = await this.search.suggest(query.text, 'name');
      if (terms.length > 0) {
        suggestions.push({
          type: 'TERM',
          terms,
          description: 'Similar search terms'
        });
      }
    }

    // Get filter suggestions
    const fieldTerms = await this.search.getFieldTerms('type');
    if (fieldTerms.length > 0) {
      suggestions.push({
        type: 'FILTER',
        field: 'type',
        values: fieldTerms.map(t => ({
          value: t.term,
          count: t.count
        })),
        description: 'Popular types'
      });
    }

    return suggestions;
  }

  private createSearchKey(query: SearchQuery): string {
    return `${query.text || ''}:${query.page || 1}:${JSON.stringify(query.filters)}`;
  }
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

export interface SearchResult {
  items: Array<{
    object: TechObject;
    score: number;
    highlights: Record<string, string[]>;
  }>;
  facets: SearchFacets;
  total: number;
  page: number;
  pageSize: number;
  suggestions: SearchSuggestion[];
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