export interface Route {
  path: string;
  name: string;
  params?: Record<string, string>;
}

export interface RouterOptions {
  routes: Route[];
  defaultRoute: Route;
}

export interface Router {
  // Navigate to a specific route
  navigate(route: Route | string): void;
  
  // Get the current route
  getCurrentRoute(): Route;
  
  // Subscribe to route changes
  subscribe(listener: (route: Route) => void): () => void;
  
  // Initialize the router
  init(): void;
}

// Define standard routes for the application
export const appRoutes: Route[] = [
  { path: '/', name: 'home' },
  { path: '/language/:id', name: 'language' },
  { path: '/compare', name: 'compare' }
];

export const defaultRoute: Route = appRoutes[0];
