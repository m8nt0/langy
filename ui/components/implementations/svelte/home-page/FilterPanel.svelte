<script lang="ts">
  import { appStore } from '../main';
  import type { FilterState } from '../../../../../state/store';
  
  // Filter categories
  const filterCategories = [
    {
      title: 'Core Characteristics',
      filters: [
        { key: 'paradigmType', label: 'Paradigm', options: ['Object-Oriented', 'Functional', 'Procedural', 'Event-Driven', 'Concurrent'] },
        { key: 'typingStyle', label: 'Typing System', options: ['Static', 'Dynamic'] },
        { key: 'typingStrength', label: 'Typing Strength', options: ['Strong', 'Weak'] },
        { key: 'compilationType', label: 'Compilation', options: ['Compiled', 'Interpreted', 'JIT'] },
        { key: 'memoryType', label: 'Memory Management', options: ['Manual', 'Garbage Collection', 'Reference Counting'] }
      ]
    },
    {
      title: 'Practical Aspects',
      filters: [
        { key: 'useCaseType', label: 'Use Cases', options: ['Web Development', 'Data Science', 'Systems Programming', 'Mobile Apps', 'Desktop Apps', 'Server-side', 'Machine Learning', 'WebAssembly', 'Network Services', 'Embedded Systems', 'Automation'] },
        { key: 'difficultyLevel', label: 'Difficulty', options: ['Beginner-Friendly', 'Intermediate', 'Advanced'] },
        { key: 'ecosystemCommunity', label: 'Ecosystem', options: ['Rich', 'Growing', 'Limited'] }
      ]
    },
    {
      title: 'Special Filters',
      filters: [
        { key: 'popularityType', label: 'Popularity', options: ['High Industry Demand', 'Growing Demand', 'Niche'] },
        { key: 'historicalType', label: 'Historical', options: ['Legacy Language', 'Emerging Language'] }
      ]
    }
  ];
  
  // Type for filter keys
  type FilterKey = keyof FilterState;
  
  // Function to safely get filter array
  function getFilterArray(key: string): string[] {
    const filterKey = key as FilterKey;
    return ($appStore.filters[filterKey] as string[]) || [];
  }
  
  // Check if option is selected
  function isOptionSelected(key: string, option: string): boolean {
    return getFilterArray(key).includes(option);
  }
  
  // Handle filter change
  function handleFilterChange(key: string, value: string, isChecked: boolean): void {
    const filterKey = key as FilterKey;
    const currentFilters = getFilterArray(key);
    
    let updatedFilters: string[];
    if (isChecked) {
      updatedFilters = [...currentFilters, value];
    } else {
      updatedFilters = currentFilters.filter(item => item !== value);
    }
    
    $appStore = {
      ...$appStore,
      filters: {
        ...$appStore.filters,
        [filterKey]: updatedFilters
      }
    };
  }
  
  // Handle search input
  function handleSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    $appStore = {
      ...$appStore,
      filters: {
        ...$appStore.filters,
        searchQuery: input.value
      }
    };
  }
  
  // Handle sort change
  function handleSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    
    $appStore = {
      ...$appStore,
      filters: {
        ...$appStore.filters,
        sortBy: select.value
      }
    };
  }
</script>

<div class="filter-panel bg-white dark:bg-gray-800 rounded-lg shadow p-4">
  <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Filters</h2>
  
  <!-- Search input -->
  <div class="mb-4">
    <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
    <input 
      type="text" 
      id="search" 
      placeholder="Search languages..." 
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      value={$appStore.filters.searchQuery}
      on:input={handleSearchInput}
    />
  </div>
  
  <!-- Sort options -->
  <div class="mb-6">
    <label for="sort" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
    <select 
      id="sort" 
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      value={$appStore.filters.sortBy}
      on:change={handleSortChange}
    >
      <option value="name">Name (A-Z)</option>
      <option value="year">Year (Oldest first)</option>
    </select>
  </div>
  
  <!-- Filter categories -->
  {#each filterCategories as category}
    <div class="mb-6">
      <h3 class="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">{category.title}</h3>
      
      {#each category.filters as filter}
        <div class="mb-3">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{filter.label}</h4>
          
          <div class="space-y-1">
            {#each filter.options as option}
              <label class="flex items-center">
                <input 
                  type="checkbox" 
                  class="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={isOptionSelected(filter.key, option)}
                  on:change={(e) => handleFilterChange(filter.key, option, e.currentTarget.checked)}
                />
                <span class="text-sm text-gray-600 dark:text-gray-400">{option}</span>
              </label>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/each}
  
  <!-- Clear filters button -->
  <button 
    class="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded"
    on:click={() => {
      $appStore.filters = {
        ...$appStore.filters,
        searchQuery: '',
        paradigm: [],
        typing: [],
        compilation: [],
        memory: [],
        concurrency: [],
        syntax: [],
        useCase: [],
        difficulty: [],
        ecosystem: [],
        popularity: [],
        historical: []
      };
    }}
  >
    Clear All Filters
  </button>
</div> 