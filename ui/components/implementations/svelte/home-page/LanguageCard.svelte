<script lang="ts">
  import type { Language } from '../../../../../core/models/languages/types';
  
  export let language: Language;
  export let onClick: (lang: Language) => void = () => {};
  export let onCompare: (lang: Language) => void = () => {};
  export let isCompared = false;
</script>

<div class="language-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
  <div class="flex justify-between items-start">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{language.name}</h3>
    <span class="text-sm text-gray-500 dark:text-gray-400">{language.yearCreated}</span>
  </div>
  
  <div class="mt-2">
    <p class="text-sm text-gray-600 dark:text-gray-300">
      {#if language.description.length > 100}
        {language.description.substring(0, 100)}...
      {:else}
        {language.description}
      {/if}
    </p>
  </div>
  
  <div class="mt-3 flex flex-wrap gap-1">
    {#each language.core.paradigm.slice(0, 3) as paradigm}
      <span class="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded">
        {paradigm}
      </span>
    {/each}
    
    {#if language.core.paradigm.length > 3}
      <span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded">
        +{language.core.paradigm.length - 3}
      </span>
    {/if}
  </div>
  
  <div class="mt-4 flex justify-between">
    <button 
      class="view-btn text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-1 px-3 rounded"
      on:click={() => onClick(language)}
    >
      View Details
    </button>
    
    <button 
      class="compare-btn text-sm {isCompared 
        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' 
        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white'} py-1 px-3 rounded"
      on:click={() => onCompare(language)}
    >
      {isCompared ? 'Added to Compare' : 'Compare'}
    </button>
  </div>
</div> 