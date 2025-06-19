// src/core/application/use-cases/viewers/ExperienceViewerUseCase.ts
export class ExperienceViewerUseCase {
    constructor(private viewerService: ViewerService) { }

    async execute(techObjectIds: string[], filters: FilterDto[] = []): Promise<ViewerDto> {
        const experienceData = await this.viewerService.generateExperienceView(techObjectIds);

        return {
            id: 'experience-' + Date.now(),
            name: 'Experience Viewer',
            type: 'experience',
            data: experienceData,
            filters,
            configuration: {
                showFilters: true,
                sortBy: 'difficulty',
                visualization: 'list'
            }
        };
    }
}
