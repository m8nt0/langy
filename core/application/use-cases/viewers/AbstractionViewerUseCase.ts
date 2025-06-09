// src/core/application/use-cases/viewers/AbstractionViewerUseCase.ts
export class AbstractionViewerUseCase {
    constructor(private viewerService: ViewerService) { }

    async execute(techObjectIds: string[], filters: FilterDto[] = []): Promise<ViewerDto> {
        const abstractionData = await this.viewerService.generateAbstractionView(techObjectIds);
        const filteredData = this.applyFilters(abstractionData, filters);

        return {
            id: 'abstraction-' + Date.now(),
            name: 'Abstraction Viewer',
            type: 'abstraction',
            data: filteredData,
            filters,
            configuration: {
                showFilters: true,
                sortBy: 'level',
                visualization: 'graph'
            }
        };
    }

    private applyFilters(data: any[], filters: FilterDto[]): any[] {
        return data.filter(item =>
            filters.every(filter => this.matchesFilter(item, filter))
        );
    }

    private matchesFilter(item: any, filter: FilterDto): boolean {
        if (!filter.active) return true;
        const value = item[filter.criteria.field];
        switch (filter.criteria.operator) {
            case 'equals': return value === filter.criteria.value;
            case 'contains': return value?.toString().includes(filter.criteria.value);
            default: return true;
        }
    }
}
