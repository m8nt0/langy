export interface TechObjectCreatedEvent {
    type: 'TECH_OBJECT_CREATED';
    payload: {
        id: string;
        name: string;
        level: number;
        timestamp: Date;
        metadata: Record<string, any>;
    };
}

export interface TechObjectUpdatedEvent {
    type: 'TECH_OBJECT_UPDATED';
    payload: {
        id: string;
        changes: Record<string, any>;
        previousValues: Record<string, any>;
        timestamp: Date;
    };
}

export interface TechObjectDeletedEvent {
    type: 'TECH_OBJECT_DELETED';
    payload: {
        id: string;
        name: string;
        timestamp: Date;
    };
}

export interface TechObjectVersionAddedEvent {
    type: 'TECH_OBJECT_VERSION_ADDED';
    payload: {
        objectId: string;
        version: {
            major: number;
            minor: number;
            patch: number;
            releaseDate: Date;
            features: string[];
        };
        timestamp: Date;
    };
}

export interface TechObjectRelationshipCreatedEvent {
    type: 'TECH_OBJECT_RELATIONSHIP_CREATED';
    payload: {
        sourceId: string;
        targetId: string;
        relationshipType: string;
        metadata: Record<string, any>;
        timestamp: Date;
    };
}

export interface TechObjectRelationshipDeletedEvent {
    type: 'TECH_OBJECT_RELATIONSHIP_DELETED';
    payload: {
        sourceId: string;
        targetId: string;
        relationshipType: string;
        timestamp: Date;
    };
}

export type TechObjectEvent =
    | TechObjectCreatedEvent
    | TechObjectUpdatedEvent
    | TechObjectDeletedEvent
    | TechObjectVersionAddedEvent
    | TechObjectRelationshipCreatedEvent
    | TechObjectRelationshipDeletedEvent;
