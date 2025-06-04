import { TechObject, TechObjectType, TechObjectMetadata, AbstractionLevel } from './TechObject';
import { Version } from './Version';
import { Relationship } from './Relationship';

export interface LibraryMetadata extends TechObjectMetadata {
  category: LibraryCategory;
  dependencies: string[];
  peerDependencies: string[];
  devDependencies: string[];
  installCommand: string;
  importStatement: string;
  features: string[];
  performance: LibraryPerformanceMetrics;
  compatibility: CompatibilityInfo;
}

export enum LibraryCategory {
  UI = 'UI',
  NETWORKING = 'NETWORKING',
  DATABASE = 'DATABASE',
  TESTING = 'TESTING',
  UTILITY = 'UTILITY',
  SECURITY = 'SECURITY',
  GRAPHICS = 'GRAPHICS',
  MACHINE_LEARNING = 'MACHINE_LEARNING',
  DATA_PROCESSING = 'DATA_PROCESSING',
  OTHER = 'OTHER'
}

export interface LibraryPerformanceMetrics {
  bundleSize: number; // in bytes
  loadTime?: number; // in milliseconds
  memoryUsage?: number; // in bytes
  benchmarks?: Record<string, number>;
}

export interface CompatibilityInfo {
  languages: string[];
  frameworks: string[];
  browsers?: string[];
  nodeVersions?: string[];
  platforms: string[];
}

export class Library extends TechObject {
  private libraryMetadata: LibraryMetadata;

  constructor(
    id: string,
    name: string,
    description: string,
    version: Version,
    metadata: LibraryMetadata,
    relationships: Relationship[]
  ) {
    super(
      id,
      name,
      description,
      TechObjectType.LIBRARY,
      version,
      metadata,
      relationships,
      AbstractionLevel.LEVEL_2
    );
    this.libraryMetadata = metadata;
  }

  // Library-specific getters
  getCategory(): LibraryCategory {
    return this.libraryMetadata.category;
  }

  getDependencies(): string[] {
    return [...this.libraryMetadata.dependencies];
  }

  getPeerDependencies(): string[] {
    return [...this.libraryMetadata.peerDependencies];
  }

  getDevDependencies(): string[] {
    return [...this.libraryMetadata.devDependencies];
  }

  getInstallCommand(): string {
    return this.libraryMetadata.installCommand;
  }

  getImportStatement(): string {
    return this.libraryMetadata.importStatement;
  }

  getFeatures(): string[] {
    return [...this.libraryMetadata.features];
  }

  getPerformanceMetrics(): LibraryPerformanceMetrics {
    return { ...this.libraryMetadata.performance };
  }

  getCompatibilityInfo(): CompatibilityInfo {
    return { ...this.libraryMetadata.compatibility };
  }

  // Library-specific setters
  setCategory(category: LibraryCategory): void {
    this.libraryMetadata.category = category;
  }

  addDependency(dependency: string): void {
    if (!this.libraryMetadata.dependencies.includes(dependency)) {
      this.libraryMetadata.dependencies.push(dependency);
    }
  }

  addPeerDependency(dependency: string): void {
    if (!this.libraryMetadata.peerDependencies.includes(dependency)) {
      this.libraryMetadata.peerDependencies.push(dependency);
    }
  }

  addDevDependency(dependency: string): void {
    if (!this.libraryMetadata.devDependencies.includes(dependency)) {
      this.libraryMetadata.devDependencies.push(dependency);
    }
  }

  setInstallCommand(command: string): void {
    this.libraryMetadata.installCommand = command;
  }

  setImportStatement(statement: string): void {
    this.libraryMetadata.importStatement = statement;
  }

  addFeature(feature: string): void {
    if (!this.libraryMetadata.features.includes(feature)) {
      this.libraryMetadata.features.push(feature);
    }
  }

  updatePerformanceMetrics(metrics: Partial<LibraryPerformanceMetrics>): void {
    this.libraryMetadata.performance = {
      ...this.libraryMetadata.performance,
      ...metrics
    };
  }

  updateCompatibilityInfo(info: Partial<CompatibilityInfo>): void {
    this.libraryMetadata.compatibility = {
      ...this.libraryMetadata.compatibility,
      ...info
    };
  }

  // Override toJSON to include library-specific metadata
  toJSON(): object {
    return {
      ...super.toJSON(),
      libraryMetadata: {
        category: this.libraryMetadata.category,
        dependencies: this.libraryMetadata.dependencies,
        peerDependencies: this.libraryMetadata.peerDependencies,
        devDependencies: this.libraryMetadata.devDependencies,
        installCommand: this.libraryMetadata.installCommand,
        importStatement: this.libraryMetadata.importStatement,
        features: this.libraryMetadata.features,
        performance: this.libraryMetadata.performance,
        compatibility: this.libraryMetadata.compatibility
      }
    };
  }
} 