// ================================
// Viewer.ts (value-objects)
// ================================

import { VersionNumber } from "./VersionNumber";

export enum ViewerType {
    TIMELINE = 'timeline',
    ABSTRACTION = 'abstraction',
    PARADIGM = 'paradigm',
    SYSTEM = 'system',
    USECASE = 'useCase',
    EXPERIENCE = 'experience'
  }
  
  // Viewer data interfaces
  export interface TimelineData {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    versions: Array<{
      version: VersionNumber;
      createdAt: Date;
      features?: string | never[];
    }>;
    milestones: any[];
  }
  
  export interface AbstractionData {
    id: string;
    name: string;
    level: number;
    type: string;
    dependencies: Array<{ id: string; type: string }>;
    dependents: Array<{ id: string; type: string }>;
    abstractionScore: number;
  }
  
  export interface ParadigmData {
    id: string;
    name: string;
    designPhilosophy: string;
    tags: string[];
    influences: Array<{ id: string; type: string }>;
  }
  
  export interface SystemData {
    id: string;
    name: string;
    creator?: string;
    website?: string;
    repository?: string;
    documentation?: string;
    currentStatus: 'active' | 'deprecated' | 'experimental';
  }
  
  export interface UseCaseData {
    id: string;
    name: string;
    description: string;
    tags: string[];
    codeExamples: Array<{
      title: string;
      code: string;
      description: string;
    }>;
  }
  
  export interface ExperienceData {
    id: string;
    name: string;
    documentation?: string;
    community: string[];
    codeExamples: {
      language: string;
      examples: Array<{
        title: string;
        code: string;
        description: string;
      }>;
    };
  }
  
  export interface ViewerData {
    type: ViewerType;
    data: any[];
  }
  
  export interface ViewerConfig {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    limit?: number;
    groupBy?: string;
  }