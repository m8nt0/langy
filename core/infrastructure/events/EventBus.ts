// src/core/infrastructure/events/EventBus.ts
import { Event, EventStore } from './EventStore';

type EventHandler = (event: Event) => void | Promise<void>;

export class EventBus {
    private handlers: Map<string, EventHandler[]> = new Map();

    subscribe(eventType: string, handler: EventHandler): void {
        if (!this.handlers.has(eventType)) {
            this.handlers.set(eventType, []);
        }
        this.handlers.get(eventType)!.push(handler);
    }

    unsubscribe(eventType: string, handler: EventHandler): void {
        const handlers = this.handlers.get(eventType);
        if (handlers) {
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1)
            }
        }
    }

    async publish(eventType: string, data: any, source = 'unknown'): Promise<void> {
        const event: Event = {
            id: `${Date.now()}_${Math.random()}`,
            type: eventType, 
            data,
            timestamp: Date.now(),
            source
        };

        // store event
        await EventStore.store(event);

        // Notify all handlers
        const handlers = this.handlers.get(eventType);
        if (handlers) {
            for (const handler of handlers) {
                try {
                    await handler(event)
                } catch (err) {
                    console.error(`Error handling event: ${eventType}`, err);
                }
            }
        }
    }
}