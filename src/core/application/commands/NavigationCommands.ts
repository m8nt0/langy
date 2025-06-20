import {
    ExperienceRelationType,
    ParadigmRelationType,
    StructureRelationType,
    SystemRelationType,
    TemporalRelationType,
    UseCaseRelationType,
  } from '../../domain/value-objects/relationships';
  
  // A single filter criterion based on one of the six viewers
  export type AbstractionFilter =
    | { viewer: 'experience'; type: ExperienceRelationType }
    | { viewer: 'paradigm'; type: ParadigmRelationType }
    | { viewer: 'structure'; type: StructureRelationType }
    | { viewer: 'system'; type: SystemRelationType }
    | { viewer: 'temporal'; type: TemporalRelationType }
    | { viewer: 'useCase'; type: UseCaseRelationType };
  
  export interface AbstractUpCommand {
    currentTechObjectId: string;
    // An array of filters to apply
    filters: AbstractionFilter[];
    // The logic to combine the filters
    combinationLogic: 'AND' | 'OR';
  }
  
  export interface AbstractDownCommand {
    currentTechObjectId: string;
    targetTechObjectId: string;
  }
  
  export interface NavigateHorizontalCommand {
    currentTechObjectId: string;
    targetVersion: string;
  }