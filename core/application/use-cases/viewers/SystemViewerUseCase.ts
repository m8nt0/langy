// src/core/application/use-cases/viewers/SystemViewerUseCase.ts
export class SystemViewerUseCase {
    constructor(private viewerService: ViewerService) { }

    async execute(techObjectIds: string[], filters: FilterDto[] = []): Promise<ViewerDto> {
        const systemData = await this.viewerService.generateSystemView(techObjectIds);

        return {
            id: 'system-' + Date.now(),
            name: 'System Viewer',
            type: 'system',
            data: systemData,
            filters,
            configuration: {
                showFilters: true,
                sortBy: 'performance',
                visualization: 'list'
            }
        };
    }
}