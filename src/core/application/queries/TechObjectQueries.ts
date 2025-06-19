// src/core/application/queries/TechObjectQueries.ts
export interface GetTechObjectQuery {
    id: string;
}

export interface GetTechObjectsByLevelQuery {
    level: number;
    limit?: number;
    offset?: number;
}

export interface SearchTechObjectsQuery {
    searchTerm: string;
    filters?: FilterDto[];
    limit?: number;
    offset?: number;
}

export interface GetTechObjectRelationshipsQuery {
    techObjectId: string;
    relationshipType?: 'depends_on' | 'used_by' | 'extends' | 'implements';
}

export interface GetTechObjectVersionsQuery {
    techObjectId: string;
    includeDeprecated?: boolean;
}