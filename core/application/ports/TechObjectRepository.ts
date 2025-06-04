import { TechObject, AbstractionLevel, TechObjectType } from '../../domain/entities/TechObject';
import { FilterCriteria } from '../../domain/value-objects';

export interface TechObjectRepository {
  findById(id: string): Promise<TechObject | null>;
  findByIds(ids: string[]): Promise<TechObject[]>;
  findByLevel(level: AbstractionLevel): Promise<TechObject[]>;
  findByType(type: TechObjectType): Promise<TechObject[]>;
  findByFilter(filter: FilterCriteria): Promise<TechObject[]>;
  
  save(object: TechObject): Promise<void>;
  saveAll(objects: TechObject[]): Promise<void>;
  delete(id: string): Promise<void>;
  
  findRelated(id: string, relationshipType?: string): Promise<TechObject[]>;
  findDependencies(id: string): Promise<TechObject[]>;
  findDependents(id: string): Promise<TechObject[]>;
  
  searchByText(query: string): Promise<TechObject[]>;
  searchByMetadata(metadata: Record<string, any>): Promise<TechObject[]>;
  
  exists(id: string): Promise<boolean>;
  count(filter?: FilterCriteria): Promise<number>;
} 