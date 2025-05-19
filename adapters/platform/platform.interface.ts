// Platform interface for abstracting browser/platform-specific APIs
export interface PlatformAdapter {
  // Storage operations
  storage: {
    get<T>(key: string): T | null;
    set<T>(key: string, value: T): void;
    remove(key: string): void;
    clear(): void;
  };
  
  // Network operations
  network: {
    fetch<T>(url: string, options?: RequestInit): Promise<T>;
  };
  
  // Environment information
  environment: {
    isDarkMode(): boolean;
    isMobile(): boolean;
    getLanguage(): string;
  };
  
  // Event handling
  events: {
    addEventListener(target: EventTarget, type: string, listener: EventListenerOrEventListenerObject): void;
    removeEventListener(target: EventTarget, type: string, listener: EventListenerOrEventListenerObject): void;
  };
} 