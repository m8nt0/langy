// src/core/application/commands/TechObjectCommands.ts
// Actions to create, update, delete tech objects. 

export interface CreateTechObjectCommand {
    name: string;
    type: string;
    level: number;
    metadata: TechObjectMetadataDto; 
}

export interface UpdateTechObjectCommand {
    id: string;
    updates: Partial<TechObjectDto>;
}

export interface DeleteTechObjectCommand {
    id: string;
}

export interface AddVersionCommand {
    techObjectId: string;
    version: VersionDto;
}

export interface AddRelationshipCommand {
    sourceId: string;
    targetId: string;
    type: 'depends_on' | 'used_by' | 'extends' | 'implements';
    strength: number;
}