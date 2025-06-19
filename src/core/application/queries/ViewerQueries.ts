export interface GetViewerDataQuery {
    type: ViewerType;
    techObjectIds: string[];
    filters?: FilterDto[];
}

export interface GetAvailableViewersQuery {
    context: 'level' | 'tech_object' | 'version';
}

export interface GetViewerFiltersQuery {
    viewerType: ViewerType;
    techObjectIds: string[];
}