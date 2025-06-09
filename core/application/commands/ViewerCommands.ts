// src/core/application/commands/ViewerCommands.ts
export interface CreateViewerCommand {
    name: string;
    type: ViewerType;
    techObjectIds: string[];
    configuration: ViewerConfigDto;
}

export interface UpdateViewerCommand {
    viewerId: string;
    configuration: Partial<ViewerConfigDto>;
}

export interface ApplyViewerFiltersCommand {
    viewerId: string;
    filters: FilterDto[];
}