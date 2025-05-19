<script>
  import { onMount } from 'svelte';
  import { browserPlatform } from '../adapters/platform/implementations/browser-adapter';
  import { appRoutes, defaultRoute } from '../adapters/router/router.interface';
  import { createApp } from '../core/app';
  import { mockApiService } from '../core/services/mock-api-service';
  import HomePage from '../ui/components/implementations/svelte/home-page/HomePage.svelte';
  
  // Initialize the app with browser platform
  const appOptions = {
    platformAdapter: browserPlatform,
    routerOptions: {
      routes: appRoutes,
      defaultRoute
    }
  };
  
  // Create the app instance
  const app = createApp(appOptions);
  
  // Use mock API service for development
  onMount(async () => {
    const languages = await mockApiService.getLanguages();
    app.getStore().setState({ languages });
  });
  
  // Get the current route from the router
  const currentRoute = app.getRouter().getCurrentRoute();
</script>

<main>
  <!-- Simple router implementation -->
  {#if currentRoute.name === 'home'}
    <HomePage />
  {:else if currentRoute.name === 'language' && currentRoute.params?.id}
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold">Language Details: {currentRoute.params.id}</h1>
      <!-- Language details page would go here -->
    </div>
  {:else if currentRoute.name === 'compare'}
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold">Compare Languages</h1>
      <!-- Compare page would go here -->
    </div>
  {:else}
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold">Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  {/if}
</main> 