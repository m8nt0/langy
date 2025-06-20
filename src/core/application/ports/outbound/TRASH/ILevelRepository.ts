// src/core/domain/repositories/ILevelRepository.ts
import { Level } from '../../../../domain/entities/Level';
import { AbstractionLevel } from '../../../../domain/value-objects/AbstractionLevel';
import { TechObjectId } from '../../../../domain/value-objects/TechObjectId';

export interface ILevelRepository {
  findByLevel(level: AbstractionLevel): Promise<Level | null>;
  findAll(): Promise<Level[]>;
  
  save(level: Level): Promise<void>;
  addTechObjectToLevel(level: AbstractionLevel, techObjectId: TechObjectId): Promise<void>;
  removeTechObjectFromLevel(level: AbstractionLevel, techObjectId: TechObjectId): Promise<void>;
  getTechObjectsByLevel(level: AbstractionLevel): Promise<TechObjectId[]>;
}