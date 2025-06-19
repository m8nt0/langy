// src/core/domain/repositories/ILevelRepository.ts
import { Level } from '../entities/Level';
import { AbstractionLevel } from '../value-objects/AbstractionLevel';
import { TechObjectId } from '../value-objects/TechObjectId';

export interface ILevelRepository {
  findByLevel(level: AbstractionLevel): Promise<Level | null>;
  findAll(): Promise<Level[]>;
  
  save(level: Level): Promise<void>;
  addTechObjectToLevel(level: AbstractionLevel, techObjectId: TechObjectId): Promise<void>;
  removeTechObjectFromLevel(level: AbstractionLevel, techObjectId: TechObjectId): Promise<void>;
  getTechObjectsByLevel(level: AbstractionLevel): Promise<TechObjectId[]>;
}