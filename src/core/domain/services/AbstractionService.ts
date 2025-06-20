import { TechObject } from '../entities';
import { AbstractionFilter } from '../../application/commands/NavigationCommands';
import { ITechObjectRepository } from '../../application/ports/outbound';
import { TechObjectId } from '../value-objects';

export class AbstractionService {
  constructor(private readonly techObjectRepository: ITechObjectRepository) {}

  public async abstractUp(
    currentTechObject: TechObject,
    filters: AbstractionFilter[],
    combinationLogic: 'AND' | 'OR',
  ): Promise<TechObject[]> {
    const allTechObjects = await this.techObjectRepository.findAll();
    const potentialNextLevelObjects = allTechObjects.filter(
      (obj) => obj.level.toNumber() === currentTechObject.level.toNumber() + 1,
    );

    return potentialNextLevelObjects.filter((techObject) => {
      const checkFilter = (filter: AbstractionFilter): boolean => {
        const viewerData = techObject.viewersData[filter.viewer];
        if (!viewerData || !viewerData.relationships) {
          return false;
        }
        return viewerData.relationships.some(
          (rel) =>
            rel.type === filter.type &&
            rel.objectId.equals(currentTechObject.id),
        );
      };

      if (combinationLogic === 'AND') {
        return filters.every(checkFilter);
      } else {
        return filters.some(checkFilter);
      }
    });
  }

  public async abstractDown(
    targetTechObjectId: TechObjectId,
  ): Promise<TechObject | null> {
    return this.techObjectRepository.findById(targetTechObjectId);
  }
}