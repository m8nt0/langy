// src/core/domain/services/AbstractionService.ts
import { TechObject } from '../entities/TechObject';
import { Abstraction, AbstractionRule } from '../entities/Abstraction';
import { TechObjectId } from '../value-objects/TechObjectId';
import { ITechObjectRepository } from '../repositories/ITechObjectRepository';
import { IRelationshipRepository } from '../../../../.k/IRelationshipRepository';

export class AbstractionService {
  constructor(
    private techObjectRepository: ITechObjectRepository,
    private relationshipRepository: IRelationshipRepository
  ) {}

  async createAbstraction(rule: AbstractionRule, sourceIds: TechObjectId[]): Promise<Abstraction> {
    const resultIds = await this.performAbstraction(rule, sourceIds);
    return new Abstraction(sourceIds, rule, resultIds);
  }

  // controller of which up or down to use
  async performAbstraction(rule: AbstractionRule, sourceIds: TechObjectId[]): Promise<TechObjectId[]> {

    // to find the 
    const sourceObjects = await this.techObjectRepository.findByIds(sourceIds);
    
    if (rule.direction === 'UP') {
      return this.abstractUp(sourceObjects, rule);
    } else {
      return this.abstractDown(sourceObjects, rule);
    }
  }

  private async abstractUp(sourceObjects: TechObject[], rule: AbstractionRule): Promise<TechObjectId[]> {
    const resultIds: TechObjectId[] = [];
    
    for (const sourceObject of sourceObjects) {
      const relationships = await this.relationshipRepository.findBySourceId(sourceObject.id);
      
      const targetObjects = relationships
        .filter(rel => {
          if (rule.relationType === 'FOR') {
            return ['USES', 'DEPENDS_ON'].includes(rel.type);
          } else {
            return ['ABSTRACTS_TO', 'EXTENDS'].includes(rel.type);
          }
        })
        .map(rel => rel.targetId);
      
      if (rule.combinationLogic === 'OR') {
        resultIds.push(...targetObjects);
      } else {
        // AND logic - find intersection
        if (resultIds.length === 0) {
          resultIds.push(...targetObjects);
        } else {
          const intersection = resultIds.filter(id => 
            targetObjects.some(targetId => targetId.equals(id))
          );
          resultIds.length = 0;
          resultIds.push(...intersection);
        }
      }
    }
    
    return [...new Set(resultIds.map(id => id.getValue()))].map(TechObjectId.create);
  }

  private async abstractDown(sourceObjects: TechObject[], rule: AbstractionRule): Promise<TechObjectId[]> {
    const resultIds: TechObjectId[] = [];
    
    for (const sourceObject of sourceObjects) {
      const relationships = await this.relationshipRepository.findByTargetId(sourceObject.id);
      
      const sourceObjectsFromRel = relationships
        .filter(rel => {
          if (rule.relationType === 'FOR') {
            return ['USES', 'DEPENDS_ON'].includes(rel.type);
          } else {
            return ['ABSTRACTS_FROM', 'IMPLEMENTS'].includes(rel.type);
          }
        })
        .map(rel => rel.sourceId);
      
      resultIds.push(...sourceObjectsFromRel);
    }
    
    return [...new Set(resultIds.map(id => id.getValue()))].map(TechObjectId.create);
  }

}