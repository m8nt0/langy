import type { PlatformAdapter } from '../platform.interface';

export class BrowserPlatformAdapter implements PlatformAdapter {
  storage = {
    get<T>(key: string): T | null {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error('Error getting item from localStorage:', error);
        return null;
      }
    },
    
    set<T>(key: string, value: T): void {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error setting item in localStorage:', error);
      }
    },
    
    remove(key: string): void {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing item from localStorage:', error);
      }
    },
    
    clear(): void {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    }
  };
  
  network = {
    async fetch<T>(url: string, options?: RequestInit): Promise<T> {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`Network request failed with status: ${response.status}`);
      }
      
      return response.json();
    }
  };
  
  environment = {
    isDarkMode(): boolean {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    },
    
    isMobile(): boolean {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    getLanguage(): string {
      return navigator.language || 'en-US';
    }
  };
  
  events = {
    addEventListener(target: EventTarget, type: string, listener: EventListenerOrEventListenerObject): void {
      target.addEventListener(type, listener);
    },
    
    removeEventListener(target: EventTarget, type: string, listener: EventListenerOrEventListenerObject): void {
      target.removeEventListener(type, listener);
    }
  };
}

// Create a singleton instance
export const browserPlatform = new BrowserPlatformAdapter(); 