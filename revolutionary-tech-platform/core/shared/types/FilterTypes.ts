import { Metadata } from './Common';

export type FilterOperator =
  | 'EQUALS'
  | 'NOT_EQUALS'
  | 'CONTAINS'
  | 'NOT_CONTAINS'
  | 'IN'
  | 'NOT_IN'
  | 'GREATER_THAN'
  | 'LESS_THAN'
  | 'BETWEEN'
  | 'EXISTS'
  | 'NOT_EXISTS';

export type FilterCombinator = 'AND' | 'OR';

export interface FilterCondition {
  field: string;
  operator: FilterOperator;
  value: any;
  metadata?: Record<string, any>;
}

export interface FilterGroup {
  conditions: FilterCondition[];
  combinator: FilterCombinator;
  metadata?: Record<string, any>;
}

export interface FilterDefinition {
  groups: FilterGroup[];
  metadata: Metadata & {
    name: string;
    description?: string;
    isTemplate?: boolean;
    isFavorite?: boolean;
    tags?: string[];
  };
}

export interface FilterResult<T> {
  items: T[];
  total: number;
  appliedFilters: FilterGroup[];
  metadata: {
    executionTime: number;
    timestamp: Date;
    cacheHit?: boolean;
  };
}

export interface FilterSuggestion {
  type: 'VALUE' | 'FIELD' | 'OPERATOR';
  value: string;
  confidence: number;
  metadata?: {
    frequency?: number;
    lastUsed?: Date;
    category?: string;
  };
}

export interface FilterValidation {
  isValid: boolean;
  errors: Array<{
    path: string;
    message: string;
    code: string;
  }>;
  warnings: Array<{
    path: string;
    message: string;
    code: string;
  }>;
} 