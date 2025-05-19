import { createApp, type AppOptions } from '../../../../core/app';
import { browserPlatform } from '../../../../adapters/platform/implementations/browser-adapter';
import { appRoutes, defaultRoute } from '../../../../adapters/router/router.interface';
import { createSvelteRouter } from '../../../../adapters/router/implementations/svelte-router';
import { writable } from 'svelte/store';
import type { AppState } from '../../../../state/store';

// Initialize the app with browser platform
const appOptions: AppOptions = {
  platformAdapter: browserPlatform,
  routerOptions: {
    routes: appRoutes,
    defaultRoute
  }
};

// Create the core app
const app = createApp(appOptions);

// Create Svelte router
const { route, navigate } = createSvelteRouter(appOptions.routerOptions);

// Create a Svelte store that wraps the app state
const appStore = writable<AppState>(app.getStore().getState());

// Subscribe to state changes
app.getStore().subscribe((state) => {
  appStore.set(state);
});

// Export for use in Svelte components
export {
  app,
  appStore,
  route,
  navigate
};

// Helper functions for components
export function updateFilters(filters: Partial<AppState['filters']>): void {
  const currentState = app.getStore().getState();
  app.getStore().setState({
    filters: {
      ...currentState.filters,
      ...filters
    }
  });
}

export function selectLanguage(languageId: string): void {
  const currentState = app.getStore().getState();
  const language = currentState.languages.find(l => l.id === languageId);
  
  if (language) {
    app.getStore().setState({ selectedLanguage: language });
  }
}

export function addToCompare(languageId: string): void {
  const currentState = app.getStore().getState();
  const language = currentState.languages.find(l => l.id === languageId);
  
  if (language && !currentState.comparedLanguages.some(l => l.id === languageId)) {
    app.getStore().setState({
      comparedLanguages: [...currentState.comparedLanguages, language]
    });
  }
}

export function removeFromCompare(languageId: string): void {
  const currentState = app.getStore().getState();
  
  app.getStore().setState({
    comparedLanguages: currentState.comparedLanguages.filter(l => l.id !== languageId)
  });
} 