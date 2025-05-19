import { writable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import type { Router, Route, RouterOptions } from '../router.interface';
import { createVanillaRouter } from './vanilla-router';

export function createSvelteRouter(options: RouterOptions): {
  router: Router;
  route: Readable<Route>;
  navigate: (routeOrPath: Route | string) => void;
} {
  // Create the vanilla router
  const router = createVanillaRouter(options);
  
  // Create a Svelte store for the current route
  const routeStore = writable<Route>(router.getCurrentRoute());
  
  // Subscribe to changes in the vanilla router
  router.subscribe((route) => {
    routeStore.set(route);
  });
  
  // Initialize the router
  router.init();
  
  // Create a navigate function
  const navigate = (routeOrPath: Route | string) => {
    router.navigate(routeOrPath);
  };
  
  return {
    router,
    route: { subscribe: routeStore.subscribe },
    navigate
  };
} 