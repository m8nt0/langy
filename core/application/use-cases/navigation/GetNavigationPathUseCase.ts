// src/core/application/use-cases/navigation/GetNavigationPathUseCase.ts
export class GetNavigationPathUseCase {
    constructor(private navigationService: NavigationService) {}
  
    async execute(currentPosition: PositionDto): Promise<NavigationDto> {
      const result = await this.navigationService.getCurrentPath(currentPosition);
  
      return {
        currentPath: {
          levels: result.levels.map(l => ({
            id: l.id,
            name: l.name,
            level: l.level,
            techObjects: l.techObjectIds
          })),
          position: currentPosition
        },
        availableActions: result.availableActions,
        breadcrumb: result.breadcrumb
      };
    }
  }