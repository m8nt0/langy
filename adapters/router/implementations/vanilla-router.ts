import type { Router, Route, RouterOptions } from '../router.interface';

export class VanillaRouter implements Router {
  private routes: Route[];
  private defaultRoute: Route;
  private currentRoute: Route;
  private listeners: ((route: Route) => void)[] = [];

  constructor(options: RouterOptions) {
    this.routes = options.routes;
    this.defaultRoute = options.defaultRoute;
    this.currentRoute = this.defaultRoute;
  }

  init(): void {
    // Handle initial route
    this.handleLocationChange();

    // Listen for popstate events (browser back/forward)
    window.addEventListener('popstate', () => {
      this.handleLocationChange();
    });
  }

  navigate(routeOrPath: Route | string): void {
    let route: Route;
    
    if (typeof routeOrPath === 'string') {
      // Find route by path
      const foundRoute = this.routes.find(r => r.path === routeOrPath);
      if (!foundRoute) {
        route = this.defaultRoute;
      } else {
        route = foundRoute;
      }
    } else {
      route = routeOrPath;
    }

    // Update browser history
    const url = this.buildUrlFromRoute(route);
    window.history.pushState({}, '', url);
    
    // Update current route
    this.currentRoute = route;
    
    // Notify listeners
    this.notifyListeners();
  }

  getCurrentRoute(): Route {
    return { ...this.currentRoute };
  }

  subscribe(listener: (route: Route) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private handleLocationChange(): void {
    const path = window.location.pathname;
    
    // Find matching route
    let matchedRoute: Route | undefined;
    let params: Record<string, string> = {};
    
    for (const route of this.routes) {
      const match = this.matchRoute(route.path, path);
      if (match) {
        matchedRoute = { ...route };
        params = match;
        break;
      }
    }
    
    if (!matchedRoute) {
      this.currentRoute = this.defaultRoute;
    } else {
      this.currentRoute = {
        ...matchedRoute,
        params
      };
    }
    
    this.notifyListeners();
  }

  private matchRoute(routePath: string, currentPath: string): Record<string, string> | null {
    // Convert route path to regex
    const paramNames: string[] = [];
    const regexPath = routePath.replace(/:[^\/]+/g, (match) => {
      const paramName = match.substring(1);
      paramNames.push(paramName);
      return '([^/]+)';
    });
    
    const regex = new RegExp(`^${regexPath}$`);
    const match = currentPath.match(regex);
    
    if (!match) {
      return null;
    }
    
    // Extract params
    const params: Record<string, string> = {};
    for (let i = 0; i < paramNames.length; i++) {
      params[paramNames[i]] = match[i + 1];
    }
    
    return params;
  }

  private buildUrlFromRoute(route: Route): string {
    let url = route.path;
    
    // Replace params in URL
    if (route.params) {
      Object.entries(route.params).forEach(([key, value]) => {
        url = url.replace(`:${key}`, value);
      });
    }
    
    return url;
  }

  private notifyListeners(): void {
    const route = this.getCurrentRoute();
    this.listeners.forEach(listener => listener(route));
  }
}

// Create a singleton instance with default options
export const createVanillaRouter = (options: RouterOptions): Router => {
  return new VanillaRouter(options);
}; 