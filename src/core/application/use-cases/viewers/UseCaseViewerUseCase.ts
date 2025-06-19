// src/core/application/use-cases/viewers/UseCaseViewerUseCase.ts
export class UseCaseViewerUseCase {
    constructor(private viewerService: ViewerService) { }

    async execute(techObjectIds: string[], filters: FilterDto[] = []): Promise<ViewerDto> {
        const useCaseData = await this.viewerService.generateUseCaseView(techObjectIds);

        return {
            id: 'usecase-' + Date.now(),
            name: 'Use Case Viewer',
            type: 'usecase',
            data: useCaseData,
            filters,
            configuration: {
                showFilters: true,
                sortBy: 'popularity',
                groupBy: 'category',
                visualization: 'grid'
            }
        };
    }
}