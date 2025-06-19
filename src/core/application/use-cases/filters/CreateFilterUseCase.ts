// src/core/application/use-cases/filters/CreateFilterUseCase.ts

import { FilterService } from '../../../domain/services/FilterService';
import { FilterCriteriaDto, FilterDto, FilterType } from '../../dto';

export class CreateFilterUseCase {
    constructor(private filterService: FilterService) { }

    async execute(request: CreateFilterRequest): Promise<FilterDto> {
        const filter = await this.filterService.createFilter(
            request.name,
            request.type,
            request.criteria
        );

        return {
            id: filter.id,
            name: filter.name,
            type: filter.type,
            criteria: filter.criteria,
            active: true
        };
    }
}

export interface CreateFilterRequest {
    name: string;
    type: FilterType;
    criteria: FilterCriteriaDto;
}
