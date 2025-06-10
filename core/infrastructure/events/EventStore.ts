export interface Event {
    id: string;
    type: string;
    data: any;
    timestamp: number;
    source: string;
}

export class EventStore {
    private static eventStore: Event[] = []

    // Store event persistently (in-memory in this case)
    static async store(event: Event): Promise<void> {
        //TODO: need to persist this to a DB or a file, maybe GraphQL
        this.eventStore.push(event);
        console.log('Event stored: ', event);
    }

    // Retrieve all stored events
    static async getAllEvents(): Promise<Event[]> {
        return this.eventStore;
    }

    // Clear all events (used for testing or cleanup purposes)
    static async clear(): Promise<void> {
        this.eventStore = [];
    }
}