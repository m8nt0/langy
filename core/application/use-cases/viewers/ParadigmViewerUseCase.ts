// src/core/application/use-cases/viewers/ParadigmViewerUseCase.ts
export class ParadigmViewerUseCase {
    constructor(private viewerService: ViewerService) { }

    async execute(techObjectIds: string[], filters: FilterDto[] = []): Promise<ViewerDto> {
        const paradigmData = await this.viewerService.generateParadigmView(techObjectIds);

        return {
            id: 'paradigm-' + Date.now(),
            name: 'Paradigm Viewer',
            type: 'paradigm',
            data: paradigmData,
            filters,
            configuration: {
                showFilters: true,
                sortBy: 'paradigm',
                groupBy: 'category',
                visualization: 'grid'
            }
        };
    }
}
