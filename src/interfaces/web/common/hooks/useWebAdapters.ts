import { WebNavigationAdapter, WebStorageAdapter, DOMUIAdapter } from '../adapters';

/**
 * A factory function to instantiate all the web-specific adapters.
 */
export function useWebAdapters() {
  return {
    navigationAdapter: new WebNavigationAdapter(),
    storageAdapter: new WebStorageAdapter(),
    uiAdapter: new DOMUIAdapter(),
  };
}