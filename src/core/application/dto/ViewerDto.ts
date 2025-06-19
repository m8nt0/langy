// src/core/application/dto/ViewerDto.ts
import { FilterDto } from "./FilterDto";

export interface ViewerDto {
    id: string;
    name: string;
    type: ViewerType;
    data: any[];
    filters: FilterDto[];
    configuration: ViewerConfigDto;
}

export type ViewerType = 'timeline' | 'abstraction' | 'paradigm' | 'system' | 'usecase' | 'experience';

export interface ViewerConfigDto {
    showFilters: boolean;
    sortBy: string;
    groupBy?: string;
    visualization: 'grid' | 'list' | 'graph' | 'timeline';
}