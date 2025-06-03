import { TechObject, TechObjectType, TechObjectMetadata, AbstractionLevel } from './TechObject';
import { Version } from './Version';
import { Relationship } from './Relationship';

export interface FrameworkMetadata extends TechObjectMetadata {
  type: FrameworkType;
  architecture: ArchitecturePattern[];
  libraries: string[];
  tooling: ToolingSupport;
  learningCurve: LearningCurve;
  communityMetrics: CommunityMetrics;
  bestPractices: string[];
  scalability: ScalabilityMetrics;
  setupCommands: string[];
}

export enum FrameworkType {
  WEB_FRONTEND = 'WEB_FRONTEND',
  WEB_BACKEND = 'WEB_BACKEND',
  MOBILE = 'MOBILE',
  DESKTOP = 'DESKTOP',
  FULLSTACK = 'FULLSTACK',
  GAME = 'GAME',
  DATA_SCIENCE = 'DATA_SCIENCE',
  EMBEDDED = 'EMBEDDED'
}

export enum ArchitecturePattern {
  MVC = 'MVC',
  MVVM = 'MVVM',
  MVP = 'MVP',
  FLUX = 'FLUX',
  REDUX = 'REDUX',
  CLEAN = 'CLEAN',
  HEXAGONAL = 'HEXAGONAL',
  EVENT_DRIVEN = 'EVENT_DRIVEN',
  MICROSERVICES = 'MICROSERVICES',
  SERVERLESS = 'SERVERLESS'
}

export interface ToolingSupport {
  cli: boolean;
  ide: string[];
  debugging: string[];
  testing: string[];
  deployment: string[];
  containerization: string[];
  cicd: string[];
}

export enum LearningCurve {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT'
}

export interface CommunityMetrics {
  githubStars: number;
  weeklyDownloads: number;
  contributors: number;
  openIssues: number;
  stackOverflowTags: number;
  lastRelease: Date;
}

export interface ScalabilityMetrics {
  verticalScaling: boolean;
  horizontalScaling: boolean;
  microservicesSupport: boolean;
  cloudNative: boolean;
  maxConcurrentUsers?: number;
  maxRequestsPerSecond?: number;
}

export class Framework extends TechObject {
  private frameworkMetadata: FrameworkMetadata;

  constructor(
    id: string,
    name: string,
    description: string,
    version: Version,
    metadata: FrameworkMetadata,
    relationships: Relationship[]
  ) {
    super(
      id,
      name,
      description,
      TechObjectType.FRAMEWORK,
      version,
      metadata,
      relationships,
      AbstractionLevel.LEVEL_3
    );
    this.frameworkMetadata = metadata;
  }

  // Framework-specific getters
  getFrameworkType(): FrameworkType {
    return this.frameworkMetadata.type;
  }

  getArchitecturePatterns(): ArchitecturePattern[] {
    return [...this.frameworkMetadata.architecture];
  }

  getLibraries(): string[] {
    return [...this.frameworkMetadata.libraries];
  }

  getToolingSupport(): ToolingSupport {
    return { ...this.frameworkMetadata.tooling };
  }

  getLearningCurve(): LearningCurve {
    return this.frameworkMetadata.learningCurve;
  }

  getCommunityMetrics(): CommunityMetrics {
    return { ...this.frameworkMetadata.communityMetrics };
  }

  getBestPractices(): string[] {
    return [...this.frameworkMetadata.bestPractices];
  }

  getScalabilityMetrics(): ScalabilityMetrics {
    return { ...this.frameworkMetadata.scalability };
  }

  getSetupCommands(): string[] {
    return [...this.frameworkMetadata.setupCommands];
  }

  // Framework-specific setters
  setFrameworkType(type: FrameworkType): void {
    this.frameworkMetadata.type = type;
  }

  addArchitecturePattern(pattern: ArchitecturePattern): void {
    if (!this.frameworkMetadata.architecture.includes(pattern)) {
      this.frameworkMetadata.architecture.push(pattern);
    }
  }

  addLibrary(library: string): void {
    if (!this.frameworkMetadata.libraries.includes(library)) {
      this.frameworkMetadata.libraries.push(library);
    }
  }

  updateToolingSupport(tooling: Partial<ToolingSupport>): void {
    this.frameworkMetadata.tooling = {
      ...this.frameworkMetadata.tooling,
      ...tooling
    };
  }

  setLearningCurve(curve: LearningCurve): void {
    this.frameworkMetadata.learningCurve = curve;
  }

  updateCommunityMetrics(metrics: Partial<CommunityMetrics>): void {
    this.frameworkMetadata.communityMetrics = {
      ...this.frameworkMetadata.communityMetrics,
      ...metrics
    };
  }

  addBestPractice(practice: string): void {
    if (!this.frameworkMetadata.bestPractices.includes(practice)) {
      this.frameworkMetadata.bestPractices.push(practice);
    }
  }

  updateScalabilityMetrics(metrics: Partial<ScalabilityMetrics>): void {
    this.frameworkMetadata.scalability = {
      ...this.frameworkMetadata.scalability,
      ...metrics
    };
  }

  addSetupCommand(command: string): void {
    if (!this.frameworkMetadata.setupCommands.includes(command)) {
      this.frameworkMetadata.setupCommands.push(command);
    }
  }

  // Override toJSON to include framework-specific metadata
  toJSON(): object {
    return {
      ...super.toJSON(),
      frameworkMetadata: {
        type: this.frameworkMetadata.type,
        architecture: this.frameworkMetadata.architecture,
        libraries: this.frameworkMetadata.libraries,
        tooling: this.frameworkMetadata.tooling,
        learningCurve: this.frameworkMetadata.learningCurve,
        communityMetrics: this.frameworkMetadata.communityMetrics,
        bestPractices: this.frameworkMetadata.bestPractices,
        scalability: this.frameworkMetadata.scalability,
        setupCommands: this.frameworkMetadata.setupCommands
      }
    };
  }
} 