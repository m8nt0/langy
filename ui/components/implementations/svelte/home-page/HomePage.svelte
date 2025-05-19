<script lang="ts">
  import { onMount } from 'svelte';
  import { appStore, navigate } from '../main';
  import { derived } from 'svelte/store';
  import LanguageCard from './LanguageCard.svelte';
  import FilterPanel from './FilterPanel.svelte';
  import type { Language } from '../../../../../core/models/languages/types';
  import { filterLanguages, sortLanguages } from '../../../../../core/utils/language-filters';
  
  // Derive filtered and sorted languages from the app store
  const filteredLanguages = derived(appStore, $appStore => {
    const filtered = filterLanguages($appStore.languages, $appStore.filters);
    return sortLanguages(filtered, $appStore.filters.sortBy);
  });
  
  // Handle language card clicks
  function handleLanguageClick(language: Language) {
    navigate({ path: `/language/${language.id}`, name: 'language', params: { id: language.id } });
  }
  
  // Handle adding language to compare
  function handleAddToCompare(language: Language) {
    $appStore = {
      ...$appStore,
      comparedLanguages: [
        ...$appStore.comparedLanguages.filter(l => l.id !== language.id),
        language
      ]
    };
  }
  
  // Handle removing language from compare
  function handleRemoveFromCompare(language: Language) {
    $appStore = {
      ...$appStore,
      comparedLanguages: $appStore.comparedLanguages.filter(l => l.id !== language.id)
    };
  }
  
  // Check if a language is in the comparison list
  function isCompared(language: Language): boolean {
    return $appStore.comparedLanguages.some(l => l.id === language.id);
  }
</script>

<div class="home-page container mx-auto px-4 py-8">
  <header class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Langy: Programming Language Explorer</h1>
    <p class="text-gray-600 dark:text-gray-300">Explore and compare programming languages from around the world.</p>
  </header>
  
  <div class="flex flex-col md:flex-row gap-6">
    <!-- Filter sidebar -->
    <aside class="w-full md:w-1/4">
      <FilterPanel />
    </aside>
    
    <!-- Main content -->
    <main class="w-full md:w-3/4">
      {#if $filteredLanguages.length === 0}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <p class="text-gray-600 dark:text-gray-300">No languages match your current filters.</p>
          <button 
            class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            on:click={() => {
              $appStore.filters = {
                ...$appStore.filters,
                searchQuery: '',
                paradigmType: [],
                typingStyle: [],
                typingStrength: [],
                compilationType: [],
                memoryType: [],
                syntaxType: [],
                useCaseType: [],
                difficultyLevel: [],
                ecosystemPackages: [],
                ecosystemCommunity: [],
                popularityType: [],
                historicalType: []
              };
            }}
          >
            Clear All Filters
          </button>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each $filteredLanguages as language (language.id)}
            <LanguageCard 
              {language} 
              onClick={handleLanguageClick}
              onCompare={isCompared(language) ? handleRemoveFromCompare : handleAddToCompare}
              isCompared={isCompared(language)}
            />
          {/each}
        </div>
      {/if}
      
      {#if $appStore.comparedLanguages.length > 0}
        <div class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg p-4 border-t border-gray-200 dark:border-gray-700">
          <div class="container mx-auto flex justify-between items-center">
            <div class="flex items-center">
              <span class="mr-2 text-gray-700 dark:text-gray-300">Compare:</span>
              <div class="flex gap-2">
                {#each $appStore.comparedLanguages as language (language.id)}
                  <div class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded flex items-center">
                    <span>{language.name}</span>
                    <button 
                      class="ml-2 text-blue-800 dark:text-blue-100 hover:text-red-500 dark:hover:text-red-300"
                      on:click={() => handleRemoveFromCompare(language)}
                    >
                      ×
                    </button>
                  </div>
                {/each}
              </div>
            </div>
            
            <button 
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              on:click={() => navigate({ path: '/compare', name: 'compare' })}
            >
              Compare Languages
            </button>
          </div>
        </div>
      {/if}
    </main>
  </div>
</div> 