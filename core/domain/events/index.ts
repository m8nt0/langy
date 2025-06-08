export type {
    TechObjectEvent,
    TechObjectCreatedEvent,
    TechObjectUpdatedEvent,
    TechObjectDeletedEvent,
    TechObjectVersionAddedEvent,
    TechObjectRelationshipCreatedEvent,
    TechObjectRelationshipDeletedEvent
} from './TechObjectEvents';

export type {
    NavigationEvent,
    NavigationLevelChangedEvent,
    NavigationHorizontalMoveEvent,
    NavigationAbstractionEvent,
    NavigationFilterAppliedEvent,
    NavigationViewerChangedEvent,
    NavigationBreadcrumbEvent
} from './NavigationEvents';

import type { TechObjectEvent } from './TechObjectEvents';
import type { NavigationEvent } from './NavigationEvents';

export type DomainEvent = TechObjectEvent | NavigationEvent;

// Event handler type
export type EventHandler<T extends DomainEvent = DomainEvent> = (event: T) => void | Promise<void>;

// Event bus interface
export interface IEventBus {
    publish<T extends DomainEvent>(event: T): Promise<void>;
    subscribe<T extends DomainEvent>(eventType: T['type'], handler: EventHandler<T>): void;
    unsubscribe<T extends DomainEvent>(eventType: T['type'], handler: EventHandler<T>): void;
}