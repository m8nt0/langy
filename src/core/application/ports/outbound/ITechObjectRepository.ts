import { TechObject } from '../../../domain/entities';
import { TechObjectId } from '../../../domain/value-objects';

export interface ITechObjectRepository {
  /**
   * Finds a single TechObject by its unique ID.
   */
  findById(id: TechObjectId): Promise<TechObject | null>;

  /**
   * Finds multiple TechObjects by their unique IDs.
   */
  findByIds(ids: TechObjectId[]): Promise<TechObject[]>;

  /**
   * Finds all TechObjects. Use with caution in a large system.
   */
  findAll(): Promise<TechObject[]>;

  /**
   * Saves a TechObject (either creating or updating it).
   */
  save(techObject: TechObject): Promise<TechObject>;

  /**
   * Deletes a TechObject by its ID.
   */
  delete(id: TechObjectId): Promise<void>;
}