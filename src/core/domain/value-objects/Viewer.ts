// src/core/domain/value-objects/Viewer.ts
import { TemporalRelationship } from './relationships/TemporalRelationship';
import { StructureRelationship } from './relationships/StructureRelationship';
import { ParadigmRelationship } from './relationships/ParadigmRelationship';
import { SystemRelationship } from './relationships/SystemRelationship';
import { UseCaseRelationship } from './relationships/UseCaseRelationship';
import { ExperienceRelationship } from './relationships/ExperienceRelationship';

export type ViewerType = 
  | 'TEMPORAL' 
  | 'STRUCTURE' 
  | 'PARADIGM' 
  | 'SYSTEM' 
  | 'USECASE' 
  | 'EXPERIENCE';

// Individual viewer data structures
export interface TemporalViewerData {
  type: 'TEMPORAL';
  year_created: number;
  origin_context: string;
  version_timeline: { version: string; date: Date; features: string[] }[];
  decline_cause?: string;
  revival_potential: number; // 0-100 score
  future_roadmap: string[];
  relationships: TemporalRelationship[];
}

export interface StructureViewerData {
  type: 'STRUCTURE';
  influenced_by: string[];
  influences: string[];
  transpiles_to?: string[];
  embedded_in: string[];
  composed_of: string[];
  ecosystem_position: 'core' | 'helper' | 'plugin' | 'module' | 'base';
  relationships: StructureRelationship[];
}

export interface ParadigmViewerData {
  type: 'PARADIGM';
  mental_model: string[];
  paradigms: string[];
  composability: number; // 0-100 score
  purity_model: string;
  paradigm_shift_value: number; // 0-100 score
  abstraction_level: 'low' | 'medium' | 'high' | 'very-high';
  relationships: ParadigmRelationship[];
}

export interface SystemViewerData {
  type: 'SYSTEM';
  execution_model: string;
  runtime_layer: string[];
  compiled_output: string;
  interpreter_language: string;
  memory_model: string;
  hardware_abstraction: 'bare-metal' | 'os-calls' | 'managed-vm' | 'container' | 'cloud';
  relationships: SystemRelationship[];
}

export interface UseCaseViewerData {
  type: 'USECASE';
  primary_domains: string[];
  notable_projects: string[];
  first_killer_app?: string;
  scalability_profile: {
    userConcurrency: number;
    datasetSize: string;
    performanceProfile: string;
  };
  ecosystem_maturity: number; // 0-100 score
  integration_style: 'plug-and-play' | 'modular' | 'opinionated' | 'composable' | 'sandboxed';
  relationships: UseCaseRelationship[];
}

export interface ExperienceViewerData {
  type: 'EXPERIENCE';
  learning_curve: number; // 0-100 score (0 = very easy, 100 = very hard)
  developer_experience: {
    toolingQuality: number;
    errorClarity: number;
    onboardingEase: number;
  };
  documentation_quality: number; // 0-100 score
  community_tone: 'friendly' | 'toxic' | 'supportive' | 'active' | 'inactive';
  feedback_cycle_speed: 'instant' | 'fast' | 'medium' | 'slow' | 'very-slow';
  customization_flex: number; // 0-100 score
  relationships: ExperienceRelationship[];
}

// Union type for all viewer data
export type ViewerData = 
  | TemporalViewerData 
  | StructureViewerData 
  | ParadigmViewerData 
  | SystemViewerData 
  | UseCaseViewerData 
  | ExperienceViewerData;

// Complete viewer data collection for a tech object
export interface CompleteViewerData {
  temporal: TemporalViewerData;
  structure: StructureViewerData;
  paradigm: ParadigmViewerData;
  system: SystemViewerData;
  usecase: UseCaseViewerData;
  experience: ExperienceViewerData;
}