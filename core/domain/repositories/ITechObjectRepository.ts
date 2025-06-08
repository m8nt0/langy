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
  findById(id: TechObjectId): Promise<TechObject | null>;
  findByIds(ids: TechObjectId[]): Promise<TechObject[]>;
  findByLevel(level: AbstractionLevel): Promise<TechObject[]>;
  findByFilter(filter: TechObjectFilter): Promise<TechObject[]>;
  findAll(): Promise<TechObject[]>;
  save(techObject: TechObject): Promise<void>;
  delete(id: TechObjectId): Promise<void>;
  exists(id: TechObjectId): Promise<boolean>;
  count(filter?: TechObjectFilter): Promise<number>;
}