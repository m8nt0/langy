export interface TechObjectDto {
    id: string;
    name: string;
    type: string;
    level: number;
    versions: VersionDto[];
    metadata: TechObjectMetadataDto;
    relationships: RelationshipDto[];
    content: ContentSectionsDto;
}

export interface VersionDto {
    major: number;
    minor: number;
    patch: number;
    releaseDate: string;
    status: 'active' | 'deprecated' | 'beta';
}

export interface TechObjectMetadataDto {
    creator: string;
    website: string;
    repository: string;
    license: string;
    tags: string[];
    description: string;
}

export interface RelationshipDto {
    targetId: string;
    type: 'depends_on' | 'used_by' | 'extends' | 'implements';
    strength: number;
}

export interface ContentSectionsDto {
    narrative: NarrativeDto;
    viewerData: ViewerDataDto;
    codeExamples: CodeExampleDto[];
}

export interface NarrativeDto {
    history: string;
    purpose: string;
    designPhilosophy: string;
    currentStatus: string;
    community: string;
}

export interface ViewerDataDto {
    timeline: any[];
    abstraction: any[];
    paradigm: any[];
    system: any[];
    useCase: any[];
    experience: any[];
}

export interface CodeExampleDto {
    id: string;
    title: string;
    code: string;
    language: string;
    description: string;
}