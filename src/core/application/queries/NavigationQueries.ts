// src/core/application/queries/NavigationQueries.ts
export interface GetCurrentNavigationQuery {
    position: PositionDto;
}

export interface GetAvailableActionsQuery {
    currentPosition: PositionDto;
}

export interface GetBreadcrumbQuery {
    currentPosition: PositionDto;
}

export interface GetLevelContentsQuery {
    levelId: string;
    filters?: FilterDto[];
}