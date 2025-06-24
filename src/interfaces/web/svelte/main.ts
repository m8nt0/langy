import App from './App.svelte';

// This is the entry point for your Svelte application.
const app = new App({
  target: document.getElementById('app'), // Mounts the app in the DOM
});

export default app;