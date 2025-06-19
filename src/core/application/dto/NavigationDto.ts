// src/core/application/dto/NavigationDto.ts
export interface NavigationDto {
    currentPath: NavigationPathDto;
    availableActions: NavigationActionDto[];
    breadcrumb: BreadcrumbItemDto[];
}

export interface NavigationPathDto {
    levels: LevelDto[];
    position: PositionDto;
}

export interface LevelDto {
    id: string;
    name: string;
    level: number;
    techObjects: string[];
}

export interface PositionDto {
    levelId: string;
    techObjectId?: string;
    versionId?: string;
}

export interface NavigationActionDto {
    type: 'abstract_up' | 'abstract_down' | 'navigate_horizontal';
    targetLevel?: number;
    targetObjects?: string[];
    relationship: 'FOR' | 'BY';
    operation: 'OR' | 'AND';
}

export interface BreadcrumbItemDto {
    id: string;
    name: string;
    level: number;
    type: 'level' | 'tech_object' | 'version';
}