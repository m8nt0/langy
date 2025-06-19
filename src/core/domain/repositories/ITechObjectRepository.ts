// src/core/domain/repositories/ITechObjectRepository.ts
import { TechObject } from '../entities/TechObject';
import { TechObjectId } from '../value-objects/TechObjectId';
import { AbstractionLevel } from '../value-objects/AbstractionLevel';

export interface TechObjectFilter {
  level?: AbstractionLevel;
  type?: string;
  tags?: string[];
  isActive?: boolean;
  createdAfter?: Date;
  createdBefore?: Date;
}

export interface ITechObjectRepository {
  // When we want to find particular
  findById(id: TechObjectId): Promise<TechObject | null>;
  // Multiple of them
  findByIds(ids: TechObjectId[]): Promise<TechObject[]>;
  // We need this becuase by deafult the techobjects are going to be filtered by levels
  findByLevel(level: AbstractionLevel): Promise<TechObject[]>;
  // When the user applies filter at each level
  findByFilter(filter: TechObjectFilter): Promise<TechObject[]>;
  // I'm not sure when we need it but yeah
  findAll(): Promise<TechObject[]>;
  
  save(techObject: TechObject): Promise<void>;
  delete(id: TechObjectId): Promise<void>;
  exists(id: TechObjectId): Promise<boolean>;
  count(filter?: TechObjectFilter): Promise<number>;
}