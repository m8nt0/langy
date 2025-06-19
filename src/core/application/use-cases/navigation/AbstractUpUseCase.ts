// src/core/application/use-cases/navigation/AbstractUpUseCase.ts
import { AbstractionService } from '../../../domain/services/AbstractionService';
// import { NavigationService } from '../../../domain/services/NavigationService';
import { ITechObjectRepository } from '../../../domain/repositories';
import { AbstractUpCommand } from '../../commands/NavigationCommands';
import { NavigationDto } from '../../dto/NavigationDto'

export class AbstractUpUseCase {
  constructor(
    private abstractionService: AbstractionService,
    // private navigationService: NavigationService
    private techObjectRepo: ITechObjectRepository
  ) {}

  async execute(request: AbstractUpCommand): Promise<NavigationDto> {
    const { currentObjectIds, targetLevel, relationships, operation } = request;
    
    const result = await this.abstractionService.abstractUp(
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
          // Id for each of the level
          // TODO: only have one, levelId becuase at each level there could only be on type of techobjects at given level
          levelId: result.currentLevel.id,
          techObjectId: result.currentTechObject?.id
        }
      },
      availableActions: result.availableActions,
      breadcrumb: result.breadcrumb
    };
  }
}

// export interface AbstractUpRequest {
//   currentObjectIds: string[];
//   targetLevel: number;
//   relationships: Array<{ objectId: string; type: 'FOR' | 'BY' }>;
//   operation: 'OR' | 'AND';
// }
