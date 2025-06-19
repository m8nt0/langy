// src/core/application/dto/FilterDto.ts
export interface FilterDto {
    id: string;
    name: string;
    type: FilterType;
    criteria: FilterCriteriaDto;
    active: boolean;
}

export type FilterType = 'text' | 'date' | 'category' | 'range' | 'boolean';

export interface FilterCriteriaDto {
    field: string;
    operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'in' | 'not_in';
    value: any;
}

export interface CombinedFilterDto {
    filters: FilterDto[];
    operation: 'AND' | 'OR';
}