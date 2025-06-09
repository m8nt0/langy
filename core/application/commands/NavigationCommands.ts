// src/core/application/commands/NavigationCommands.ts
export interface NavigateToLevelCommand {
    levelId: string;
    techObjectId?: string;
}

export interface AbstractUpCommand {
    currentObjectIds: string[];
    targetLevel: number;
    relationships: Array<{ objectId: string; type: 'FOR' | 'BY' }>;
    operation: 'OR' | 'AND';
}

export interface AbstractDownCommand {
    currentObjectIds: string[];
    targetLevel: number;
}

export interface NavigateHorizontalCommand {
    techObjectId: string;
    targetVersion: { major: number; minor: number; patch?: number };
}