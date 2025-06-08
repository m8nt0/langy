// ================================
// Filter.ts (value-objects)
// ================================

export enum FilterOperator {
    EQUALS = 'equals',
    CONTAINS = 'contains',
    STARTS_WITH = 'starts_with',
    ENDS_WITH = 'ends_with',
    GREATER_THAN = 'greater_than',
    LESS_THAN = 'less_than',
    GREATER_EQUAL = 'greater_equal',
    LESS_EQUAL = 'less_equal',
    IN = 'in',
    NOT_IN = 'not_in'
  }
  
  export enum FilterLogic {
    AND = 'and',
    OR = 'or'
  }
  
  export interface FilterCriteria {
    field: string;
    operator: FilterOperator;
    value: any;
    negated?: boolean;
  }
  
  export interface FilterConfig {
    id: string;
    criteria: FilterCriteria[];
    logic: FilterLogic;
    active: boolean;
    name?: string;
    description?: string;
  }
  
  export class Filter {
    public readonly id: string;
    public readonly criteria: FilterCriteria[];
    public readonly logic: FilterLogic;
    public readonly active: boolean;
    public readonly name?: string;
    public readonly description?: string;
  
    constructor(config: FilterConfig) {
      this.id = config.id;
      this.criteria = config.criteria;
      this.logic = config.logic;
      this.active = config.active;
      this.name = config.name;
      this.description = config.description;
  
      this.validate();
    }
  
    private validate(): void {
      if (!this.id) throw new Error('Filter ID is required');
      if (!this.criteria || this.criteria.length === 0) {
        throw new Error('Filter must have at least one criterion');
      }
    }
  }