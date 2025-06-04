import { TechObject } from './TechObject';
import { TechObjectType } from '../../shared/constants/ObjectTypes';
import { AbstractionLevel } from '../../shared/constants/AbstractionLevels';
import { Version } from './Version';
import { Relationship } from './Relationship';
import { Description } from '../../shared/types/Common';

export interface ProgrammingLanguageMetadata extends Description {
  paradigms: string[];
  typing: TypingSystem[];
  compilation: CompilationType;
  platforms: Platform[];
  standardLibraries: string[];
  packageManagers: string[];
}

export enum TypingSystem {
  STATIC = 'STATIC',
  DYNAMIC = 'DYNAMIC',
  STRONG = 'STRONG',
  WEAK = 'WEAK',
  GRADUAL = 'GRADUAL',
  DUCK = 'DUCK'
}

export enum CompilationType {
  COMPILED = 'COMPILED',
  INTERPRETED = 'INTERPRETED',
  HYBRID = 'HYBRID',
  JIT = 'JIT'
}

export enum Platform {
  WEB = 'WEB',
  DESKTOP = 'DESKTOP',
  MOBILE = 'MOBILE',
  SERVER = 'SERVER',
  EMBEDDED = 'EMBEDDED',
  CROSS_PLATFORM = 'CROSS_PLATFORM'
}

export class ProgrammingLanguage extends TechObject {
  private languageMetadata: ProgrammingLanguageMetadata;

  constructor(
    id: string,
    name: string,
    description: Description,
    version: Version,
    metadata: ProgrammingLanguageMetadata,
    relationships: Relationship[],
  ) {
    super(
      id,
      name,
      description,
      TechObjectType.LANGUAGE,
      AbstractionLevel.LEVEL_1,
      version,
      metadata,
      relationships,
    );
    this.languageMetadata = metadata;
  }

  // Language-specific getters
  getParadigms(): string[] {
    return [...this.languageMetadata.paradigms];
  }

  getTypingSystem(): TypingSystem[] {
    return [...this.languageMetadata.typing];
  }

  getCompilationType(): CompilationType {
    return this.languageMetadata.compilation;
  }

  getPlatforms(): Platform[] {
    return [...this.languageMetadata.platforms];
  }

  getStandardLibraries(): string[] {
    return [...this.languageMetadata.standardLibraries];
  }

  getPackageManagers(): string[] {
    return [...this.languageMetadata.packageManagers];
  }

  // Language-specific setters
  addParadigm(paradigm: string): void {
    if (!this.languageMetadata.paradigms.includes(paradigm)) {
      this.languageMetadata.paradigms.push(paradigm);
    }
  }

  addTypingSystem(typing: TypingSystem): void {
    if (!this.languageMetadata.typing.includes(typing)) {
      this.languageMetadata.typing.push(typing);
    }
  }

  setCompilationType(compilation: CompilationType): void {
    this.languageMetadata.compilation = compilation;
  }

  addPlatform(platform: Platform): void {
    if (!this.languageMetadata.platforms.includes(platform)) {
      this.languageMetadata.platforms.push(platform);
    }
  }

  addStandardLibrary(library: string): void {
    if (!this.languageMetadata.standardLibraries.includes(library)) {
      this.languageMetadata.standardLibraries.push(library);
    }
  }

  addPackageManager(manager: string): void {
    if (!this.languageMetadata.packageManagers.includes(manager)) {
      this.languageMetadata.packageManagers.push(manager);
    }
  }

  // Override toJSON to include language-specific metadata
  toJSON(): object {
    return {
      ...super.toJSON(),
      languageMetadata: {
        paradigms: this.languageMetadata.paradigms,
        typing: this.languageMetadata.typing,
        compilation: this.languageMetadata.compilation,
        platforms: this.languageMetadata.platforms,
        standardLibraries: this.languageMetadata.standardLibraries,
        packageManagers: this.languageMetadata.packageManagers
      }
    };
  }
} 