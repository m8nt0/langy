import type { PlatformAdapter } from '../adapters/platform/platform.interface';
import type { Router, RouterOptions, Route } from '../adapters/router/router.interface';
import { createVanillaRouter } from '../adapters/router/implementations/vanilla-router';
import { createLanguageService } from './services/language-service';
import type { Store } from '../state/store';
import type { AppState } from '../state/store';
import { VanillaStore } from '../state/implementations/vanilla-store';
import { filterLanguages, sortLanguages } from './utils/language-filters';

export interface AppOptions {
  platformAdapter: PlatformAdapter;
  routerOptions: RouterOptions;
}

export class App {
  private platformAdapter: PlatformAdapter;
  private router: Router;
  private store: Store<AppState>;
  private languageService: ReturnType<typeof createLanguageService>;
  
  constructor(options: AppOptions) {
    this.platformAdapter = options.platformAdapter;
    this.router = createVanillaRouter(options.routerOptions);
    this.store = new VanillaStore();
    this.languageService = createLanguageService(this.platformAdapter);
    
    this.initialize();
  }
  
  private async initialize(): Promise<void> {
    // Initialize router
    this.router.init();
    
    // Subscribe to route changes
    this.router.subscribe(this.handleRouteChange.bind(this));
    
    // Load initial data
    await this.loadLanguages();
  }
  
  private async loadLanguages(): Promise<void> {
    const languages = await this.languageService.getAllLanguages();
    this.store.setState({ languages });
  }
  
  private handleRouteChange(route: Route): void {
    const { name, params } = route;
    
    switch (name) {
      case 'home':
        // No specific action needed for home
        break;
      case 'language':
        if (params?.id) {
          this.loadLanguageDetails(params.id);
        }
        break;
      case 'compare':
        // No specific action needed for compare page
        break;
    }
  }
  
  private async loadLanguageDetails(id: string): Promise<void> {
    const language = await this.languageService.getLanguageById(id);
    if (language) {
      this.store.setState({ selectedLanguage: language });
    }
  }
  
  // Public API
  public getStore(): Store<AppState> {
    return this.store;
  }
  
  public getRouter(): Router {
    return this.router;
  }
  
  public getPlatform(): PlatformAdapter {
    return this.platformAdapter;
  }
  
  public getFilteredAndSortedLanguages(): AppState['languages'] {
    const state = this.store.getState();
    const filtered = filterLanguages(state.languages, state.filters);
    return sortLanguages(filtered, state.filters.sortBy);
  }
}

// Factory function to create an app instance
export function createApp(options: AppOptions): App {
  return new App(options);
} 