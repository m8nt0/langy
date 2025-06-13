// core/infrastructure/networking/adapters/WebSocketAdapter.ts

interface WebSocketConfig {
    url: string;
    protocols?: string[];
    reconnectAttempts?: number;
}

export class WebSocketAdapter {
    private config: WebSocketConfig;
    private ws: WebSocket | null = null;
    private listeners: Map<string, Function[]> = new Map();

    constructors(config: WebSocketConfig){
        this.config = config;
        // this.connect();
    }

    async connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.config. url, this.config.protocols);

            this.ws.onopen = () => resolve();
            this.ws.onerror = (error) => reject(error);
            this.ws.onmessage = (event) => this.handleMessage(event);
            this.ws.onclose = () => this.handleClose();
        });
    }

    private handleMessage(event: MessageEvent) {
        try {
            const message = JSON.parse(event.data);
            const listeners = this.listeners.get(message.type) || [];
            listeners.forEach(listener => listener(message.data));
        } catch (error) {
            console.error('WebSocket message parse error:', error);
        }
    }

    private handleClose() {
        // Implement reconnection logic
        if (this.config.reconnectAttempts && this.config.reconnectAttempts > 0) {
            setTimeout(() => this.connect(), 1000);
        }
    }

    send(type: string, data: any): void {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ type, data }));
        }
    }

    on(type: string, listener: Function): void {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
        } 
        this.listeners.get(type)!.push(listener);
    }

    off(type: string, listener: Function): void {
        const listeners = this.listeners.get(type);
        if (listeners) {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    disconnect(): void {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}