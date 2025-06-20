import { TechObject } from '../entities/TechObject';
import { 
  ExperienceRelationType, 
  ParadigmRelationType, 
  StructureRelationType, 
  SystemRelationType, 
  TemporalRelationType, 
  UseCaseRelationType 
} from './relationships';
import { TechObjectId } from './TechObjectId';

// Define specific criterion shapes for each type of filterable data

// For top-level, simple properties
type NameCriterion = { field: 'name'; operator: 'equals' | 'contains' | 'startsWith'; value: string };
type LevelCriterion = { field: 'level'; operator: 'equals' | 'greaterThan' | 'lessThan'; value: number };

// For the rich, nested relationship data within viewersData. This is the key enhancement.
type RelationshipCriterion<T> = {
  type: T;
  objectId: TechObjectId;
};

type ExperienceCriterion = { 
  field: 'experience'; 
  operator: 'has_relationship'; 
  value: RelationshipCriterion<ExperienceRelationType> 
};
type ParadigmCriterion = { 
  field: 'paradigm'; 
  operator: 'has_relationship'; 
  value: RelationshipCriterion<ParadigmRelationType> 
};
type StructureCriterion = { 
  field: 'structure'; 
  operator: 'has_relationship'; 
  value: RelationshipCriterion<StructureRelationType> 
};
type SystemCriterion = { 
  field: 'system'; 
  operator: 'has_relationship'; 
  value: RelationshipCriterion<SystemRelationType> 
};
type TemporalCriterion = { 
  field: 'temporal'; 
  operator: 'has_relationship'; 
  value: RelationshipCriterion<TemporalRelationType> 
};
type UseCaseCriterion = { 
  field: 'useCase'; 
  operator: 'has_relationship'; 
  value: RelationshipCriterion<UseCaseRelationType> 
};


// The final FilterCriterion is a union of all possible valid shapes.
export type FilterCriterion =
  | NameCriterion
  | LevelCriterion
  | ExperienceCriterion
  | ParadigmCriterion
  | StructureCriterion
  | SystemCriterion
  | TemporalCriterion
  | UseCaseCriterion;

/**
 * An immutable, type-safe filter for TechObjects.
 */
export class TechObjectFilter {
  constructor(
    public readonly criteria: FilterCriterion[],
    public readonly logic: 'AND' | 'OR' = 'AND',
  ) {}

  // --- Combination Methods ---
  public and(other: TechObjectFilter): TechObjectFilter {
    return new TechObjectFilter([...this.criteria, ...other.criteria], 'AND');
  }

  public or(other: TechObjectFilter): TechObjectFilter {
    return new TechObjectFilter([...this.criteria, ...other.criteria], 'OR');
  }

  // --- Matching Logic ---
  public matches(techObject: TechObject): boolean {
    const check = (criterion: FilterCriterion) => this.matchesCriterion(techObject, criterion);

    if (this.logic === 'AND') {
      return this.criteria.every(check);
    } else {
      return this.criteria.some(check);
    }
  }

  private matchesCriterion(techObject: TechObject, criterion: FilterCriterion): boolean {
    switch (criterion.field) {
      case 'name':
        const name = techObject.name.toLowerCase();
        const value = criterion.value.toLowerCase();
        if (criterion.operator === 'equals') return name === value;
        if (criterion.operator === 'contains') return name.includes(value);
        if (criterion.operator === 'startsWith') return name.startsWith(value);
        return false;

      case 'level':
        const level = techObject.level.toNumber();
        if (criterion.operator === 'equals') return level === criterion.value;
        if (criterion.operator === 'greaterThan') return level > criterion.value;
        if (criterion.operator === 'lessThan') return level < criterion.value;
        return false;
      
      // Handle all 6 relationship viewer types
      case 'experience':
      case 'paradigm':
      case 'structure':
      case 'system':
      case 'temporal':
      case 'useCase':
        const viewerData = techObject.viewersData[criterion.field];
        if (!viewerData || !viewerData.relationships) return false;
        
        return viewerData.relationships.some(rel => 
            rel.type === criterion.value.type && 
            rel.objectId.equals(criterion.value.objectId)
        );

      default:
        return false;
    }
  }
}