// ================================
// FilterService.ts
// ================================

import { TechObject } from '../entities/TechObject';
import { Filter, FilterCriteria, FilterOperator, FilterLogic } from '../value-objects/Filter';

export interface IFilterService {
  createFilter(criteria: FilterCriteria[]): Filter;
  applyFilter(objects: TechObject[], filter: Filter): TechObject[];
  combineFilters(filters: Filter[], logic: FilterLogic): Filter;
  validateFilter(filter: Filter): boolean;
}

export class FilterService implements IFilterService {
  createFilter(criteria: FilterCriteria[]): Filter {
    return new Filter({
      id: this.generateFilterId(),
      criteria,
      logic: FilterLogic.AND,
      active: true
    });
  }

  applyFilter(objects: TechObject[], filter: Filter): TechObject[] {
    if (!filter.active || filter.criteria.length === 0) {
      return objects;
    }

    return objects.filter(obj => this.matchesFilter(obj, filter));
  }

  combineFilters(filters: Filter[], logic: FilterLogic): Filter {
    const allCriteria = filters.flatMap(f => f.criteria);
    
    return new Filter({
      id: this.generateFilterId(),
      criteria: allCriteria,
      logic,
      active: true
    });
  }

  validateFilter(filter: Filter): boolean {
    return filter.criteria.every(criterion => 
      criterion.field && criterion.operator && criterion.value !== undefined
    );
  }

  private matchesFilter(object: TechObject, filter: Filter): boolean {
    const results = filter.criteria.map(criterion => 
      this.matchesCriterion(object, criterion)
    );

    return filter.logic === FilterLogic.AND 
      ? results.every(r => r)
      : results.some(r => r);
  }

  private matchesCriterion(object: TechObject, criterion: FilterCriteria): boolean {
    const fieldValue = this.getFieldValue(object, criterion.field);
    
    switch (criterion.operator) {
      case FilterOperator.EQUALS:
        return fieldValue === criterion.value;
      case FilterOperator.CONTAINS:
        return String(fieldValue).toLowerCase().includes(String(criterion.value).toLowerCase());
      case FilterOperator.STARTS_WITH:
        return String(fieldValue).toLowerCase().startsWith(String(criterion.value).toLowerCase());
      case FilterOperator.GREATER_THAN:
        return Number(fieldValue) > Number(criterion.value);
      case FilterOperator.LESS_THAN:
        return Number(fieldValue) < Number(criterion.value);
      case FilterOperator.IN:
        return Array.isArray(criterion.value) && criterion.value.includes(fieldValue);
      default:
        return false;
    }
  }

  private getFieldValue(object: TechObject, field: string): any {
    const fields = field.split('.');
    let value: any = object;
    
    for (const f of fields) {
      value = value?.[f];
    }
    
    return value;
  }

  private generateFilterId(): string {
    return `filter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
