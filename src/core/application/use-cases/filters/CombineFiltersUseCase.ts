// src/core/application/use-cases/filters/CombineFiltersUseCase.ts

export class CombineFiltersUseCase {
    constructor(private filterService: FilterService) { }

    async execute(request: CombinedFilterDto): Promise<FilterDto> {
        const combinedFilter = await this.filterService.combineFilters(
            request.filters,
            request.operation
        );

        return {
            id: combinedFilter.id,
            name: combinedFilter.name,
            type: 'combined' as FilterType,
            criteria: combinedFilter.criteria,
            active: true
        };
    }
}