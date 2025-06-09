// src/core/application/use-cases/navigation/NavigateHorizontalUseCase.ts
import { NavigationService } from "../../../domain/services";
import { NavigationDto } from "../../dto/NavigationDto";
// import { AbstractionLevel } from "../../../domain/value-objects";

export class NavigateHorizontalUseCase {
    constructor(private navigationService: NavigationService) {}
  
    async execute(request: NavigateHorizontalRequest): Promise<NavigationDto> {
      const result = await this.navigationService.navigateToVersion(
        request.level,
        request.techObjectId,
        request.targetVersion
      );
  
      return {
        currentPath: {
          levels: result.levels.map(l => ({
            id: l.id,
            name: l.name,
            level: l.level,
            techObjects: l.techObjectIds
          })),
          position: {
            levelId: result.currentLevel.id,
            techObjectId: result.currentTechObject?.id,
            versionId: result.currentVersion?.id
          }
        },
        availableActions: result.availableActions,
        breadcrumb: result.breadcrumb
      };
    }
  }
  
  export interface NavigateHorizontalRequest {
    // level: AbstractionLevel;
    techObjectId: string;
    targetVersion: { major: number; minor: number; patch?: number };
  }
  