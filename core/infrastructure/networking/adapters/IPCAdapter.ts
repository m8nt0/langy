// core/infrastructure/networking/adapters/IPCAdapter.ts

export class IPCAdapter {
    private channel: string;
    private listeners: Map<string, Function[]> = new Map();

    constructor(channel: string) {
        this.channel = channel;
        this.setupIPC();
    }

    private setupIPC(): void {
        // Setup IPC for electron or similar
        if (typeof window !== 'undefined' && (window as any).electronAPI) {
            (window as any).electornAPI.onIPCMessage(this.handleMessage.bind(this));
        }
    }

    private handleMessage(event: any, message: any): void {
        const listeners = this.listeners.get(message.type) || [];
        listeners.forEach(listener => listener(message.data));
    }

    send(type: string, data: any): void {
        if (typeof window !== 'undefined' && (window as any).electronAPI) {
            (window as any).electronAPI.sendIPC(this.channel, { type, data });
        }
    }

    on(type: string, listener: Function): void {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
        }
        this.listeners.get(type)!.push(listener);
    }
}