// src/core/domain/entities/Abstraction.ts
import { TechObjectId } from '../value-objects/TechObjectId';
import { AbstractionLevel } from '../value-objects/AbstractionLevel';
import { CompleteViewerData } from '../value-objects/Viewer';

export type AbstractionDirection = 'UP' | 'DOWN';
export type AbstractionRelationType = CompleteViewerData;
export type CombinationLogic = 'AND' | 'OR';

export interface AbstractionRule {
  sourceLevel: AbstractionLevel;
  targetLevel: AbstractionLevel;
  direction: AbstractionDirection;
  relationType: AbstractionRelationType;
  combinationLogic: CombinationLogic;
}

export class Abstraction {
  constructor(
    public readonly sourceObjects: TechObjectId[],
    public readonly rule: AbstractionRule,
    public readonly resultObjects: TechObjectId[] = [],
    public readonly createdAt: Date = new Date()
  ) {}

  addSourceObject(techObjectId: TechObjectId): Abstraction {
    return new Abstraction(
      [...this.sourceObjects, techObjectId],
      this.rule,
      this.resultObjects,
      this.createdAt
    );
  }

  setResultObjects(resultObjects: TechObjectId[]): Abstraction {
    return new Abstraction(
      this.sourceObjects,
      this.rule,
      resultObjects,
      this.createdAt
    );
  }

  isValidAbstraction(): boolean {
    return this.sourceObjects.length > 0 && this.resultObjects.length > 0;
  }

  getDirection(): AbstractionDirection {
    return this.rule.direction;
  }

  appliesCombinationLogic(logic: CombinationLogic): boolean {
    return this.rule.combinationLogic === logic;
  }
}