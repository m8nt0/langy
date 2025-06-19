// src/core/application/use-cases/navigation/AbstractDownUseCase.ts

import { NavigationService } from '../../../domain/services/NavigationService';
import { NavigationDto } from '../../dto/NavigationDto';

export class AbstractDownUseCase {
    constructor(private navigationService: NavigationService) {}
  
    async execute(request: AbstractDownRequest): Promise<NavigationDto> {
      const result = await this.navigationService.abstractDown(
        request.currentObjectIds,
        request.targetLevel
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
            techObjectId: result.currentTechObject?.id
          }
        },
        availableActions: result.availableActions,
        breadcrumb: result.breadcrumb
      };
    }
  }
  
  export interface AbstractDownRequest {
    currentObjectIds: string[];
    targetLevel: number;
  }