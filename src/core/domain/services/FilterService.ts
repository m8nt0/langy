import { TechObject } from '../entities/TechObject';
import { TechObjectFilter } from '../value-objects';

export class FilterService {
  /**
   * Applies a TechObjectFilter to an array of TechObject instances.
   * @param objects The array of TechObjects to filter.
   * @param filter The filter to apply.
   * @returns A new array containing only the objects that match the filter.
   */
  public applyFilter(objects: TechObject[], filter: TechObjectFilter): TechObject[] {
    if (!filter || filter.criteria.length === 0) {
      return objects;
    }
    return objects.filter(obj => filter.matches(obj));
  }
}