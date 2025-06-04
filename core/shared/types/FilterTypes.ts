// Filter-specific types and interfaces

import { FilterCombinator, FilterOperator } from '../../domain/value-objects/FilterCriteria';
import { Description } from './Common';

// Re-export from domain to ensure consistency
export { FilterOperator, FilterCombinator } from '../../domain/value-objects/FilterCriteria';

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
  metadata: Description & {
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
  type: 'VALUE' | 'FIELD' | 'OPERATOR' | 'REFINEMENT' | 'RELATED';
  value?: string;
  confidence?: number;
  metadata?: {
    frequency?: number;
    lastUsed?: Date;
    category?: string;
  };
  field?: string;
  values?: any[];
  filters?: Array<{ name: string; description: string }>;
  description: string;
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