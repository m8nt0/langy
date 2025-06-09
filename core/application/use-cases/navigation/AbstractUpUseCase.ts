// src/core/application/use-cases/navigation/AbstractUpUseCase.ts
import { NavigationService } from '../../../domain/services/NavigationService';
import { ITechObjectRepository } from '../../../domain/repositories';

export class AbstractUpUseCase {
  constructor(
    private navigationService: NavigationService,
    private techObjectRepo: ITechObjectRepository
  ) {}

  async execute(request: AbstractUpRequest): Promise<NavigationDto> {
    const { currentObjectIds, targetLevel, relationships, operation } = request;
    
    const result = await this.navigationService.abstractUp(
      currentObjectIds,
      targetLevel,
      relationships,
      operation
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

export interface AbstractUpRequest {
  currentObjectIds: string[];
  targetLevel: number;
  relationships: Array<{ objectId: string; type: 'FOR' | 'BY' }>;
  operation: 'OR' | 'AND';
}
