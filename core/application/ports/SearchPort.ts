// Search engine interface

export interface SearchQuery {
  text?: string;
  filters?: Record<string, any>;
  facets?: string[];
  sort?: Array<{ field: string; order: 'asc' | 'desc' }>;
  page?: number;
  pageSize?: number;
  highlight?: {
    fields: string[];
    preTag?: string;
    postTag?: string;
  };
}

export interface SearchResult<T> {
  hits: Array<{
    item: T;
    score: number;
    highlights?: Record<string, string[]>;
  }>;
  total: number;
  facets?: Record<string, Array<{ value: string; count: number }>>;
  page: number;
  pageSize: number;
  took: number;
}

export interface IndexConfig {
  name: string;
  fields: Array<{
    name: string;
    type: 'text' | 'keyword' | 'number' | 'date' | 'boolean' | 'geo';
    searchable?: boolean;
    filterable?: boolean;
    sortable?: boolean;
    facetable?: boolean;
    weight?: number;
  }>;
  settings?: {
    language?: string;
    synonyms?: Record<string, string[]>;
    stopwords?: string[];
  };
}

export interface SearchPort {
  // Search operations
  search<T>(query: SearchQuery): Promise<SearchResult<T>>;
  suggest(text: string, field: string): Promise<string[]>;
  similar<T>(id: string, options?: { fields?: string[]; size?: number }): Promise<T[]>;

  // Index management
  createIndex(config: IndexConfig): Promise<void>;
  deleteIndex(name: string): Promise<void>;
  indexExists(name: string): Promise<boolean>;
  updateIndexConfig(name: string, config: Partial<IndexConfig>): Promise<void>;

  // Document operations
  index<T>(document: T, id?: string): Promise<void>;
  indexBatch<T>(documents: T[]): Promise<void>;
  update<T>(id: string, document: Partial<T>): Promise<void>;
  updateBatch<T>(updates: Array<{ id: string; document: Partial<T> }>): Promise<void>;
  delete(id: string): Promise<void>;
  deleteBatch(ids: string[]): Promise<void>;

  // Analysis
  analyze(text: string, analyzer: string): Promise<string[]>;
  getFieldTerms(field: string): Promise<Array<{ term: string; count: number }>>;
  validateQuery(query: string): Promise<{ valid: boolean; error?: string }>;

  // Maintenance
  refresh(): Promise<void>;
  optimize(): Promise<void>;
  // getStats(): Promise<{
  //   documents: number;
  //   size: number;
  //   lastUpdated: Date;
  // }>;
} 