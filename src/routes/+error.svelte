<script>
    import { page } from '$app/stores';
</script>

<main class="container mx-auto px-4 py-16 text-center">
    <h1 class="text-4xl font-bold mb-4">
        {$page.status}: {$page.error?.message || 'Error'}
    </h1>
    
    <p class="text-gray-600 mb-8">
        {#if $page.status === 404}
            The page you're looking for doesn't exist.
        {:else}
            Something went wrong. Please try again later.
        {/if}
    </p>
    
    <a 
        href="/" 
        class="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
    >
        Return Home
    </a>
</main> 