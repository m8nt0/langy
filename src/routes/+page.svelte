<script lang="ts">
    import LanguageCard from '$lib/components/home-page/mini-card/card.svelte';
    import FilterPanel from '$lib/components/home-page/FilterPanel.svelte';
    import type { FilterState, Language } from '$lib/stores/language-section/languages/types';
    import ExplanationBar from '$lib/components/home-page/ExplanationBar.svelte';
    import { languages } from '$lib/stores/language-section/languages/core';
    
    let filters: FilterState = {
        searchQuery: '',
        sortBy: 'name',
        // Core
        paradigmType: [],
        typingStyle: [],
        typingStrength: [],
        compilationType: [],
        memoryType: [],
        syntaxType: [],
        // Practical Aspects
        useCaseType: [],
        difficultyLevel: [],
        ecosystemPackages: [],
        ecosystemCommunity: [],
        // Special Filters
        popularityType: [],
        historicalType: []
    };

    let selectedCategory: string | null = null;
    let selectedSubCategory: string | null = null;

    function handleSelection(event: CustomEvent) {
        selectedCategory = event.detail.category;
        selectedSubCategory = event.detail.subcategory;
    }

    $: filteredLanguages = languages
        .filter((lang: Language) => {
            const matchesSearch = lang.name.toLowerCase().includes(filters.searchQuery.toLowerCase());
            
            // Core filters
            const matchesParadigm = filters.paradigmType.length === 0 || 
                filters.paradigmType.some(p => lang.core.paradigm.includes(p));
            const matchesTypingStyle = filters.typingStyle.length === 0 || 
                filters.typingStyle.includes(lang.core.typing.system);
            const matchesTypingStrength = filters.typingStrength.length === 0 || 
                filters.typingStrength.includes(lang.core.typing.strength);
            
            // Practical filters
            const matchesUseCases = filters.useCaseType.length === 0 || 
                filters.useCaseType.some(uc => lang.practical.useCases.includes(uc));
            const matchesDifficulty = filters.difficultyLevel.length === 0 || 
                filters.difficultyLevel.includes(lang.practical.difficulty);
            
            // Special filters
            const matchesPopularity = filters.popularityType.length === 0 || 
                filters.popularityType.includes(lang.special.popularity);
            const matchesHistorical = filters.historicalType.length === 0 || 
                filters.historicalType.includes(lang.special.historical);

            return matchesSearch && 
                   matchesParadigm && 
                   matchesTypingStyle && 
                   matchesTypingStrength && 
                   matchesUseCases && 
                   matchesDifficulty && 
                   matchesPopularity && 
                   matchesHistorical;
        })
        .sort((a: Language, b: Language) => a.name.localeCompare(b.name));

    let viewMode: 'grid' | 'timeline' | 'stack' = 'grid';

    function setViewMode(mode: typeof viewMode) {
        viewMode = mode;
    }
</script>

<main class="container">
    <div class="layout">
        <div class="explanation-wrapper">
            <ExplanationBar 
                {selectedCategory}
                {selectedSubCategory}
            />
        </div>
        <div class="main-content">
            <aside class="filters">
                <FilterPanel 
                    bind:filters 
                    on:select={handleSelection}
                />
            </aside>
            
            <div class="content">
                <div class="search-bar">
                    <input
                        type="text"
                        bind:value={filters.searchQuery}
                        placeholder="Search languages..."
                        class="search-input"
                    />
                    <div class="viewer">
                        <button class="viewer-button" class:active={viewMode === 'grid'}>
                            <img src="/icons/grid.svg" alt="Grid View" class="theme-icon"/>
                        </button>
                        <button class="viewer-button" class:active={viewMode === 'timeline'}>
                            <img src="/icons/timeline.svg" alt="Timeline View" class="theme-icon"/>
                        </button>
                        <button class="viewer-button" class:active={viewMode === 'stack'}>
                            <img src="/icons/stack.svg" alt="Stack View" class="theme-icon"/>
                        </button>
                    </div>
                </div>

                <div class="results-count">
                    Showing {filteredLanguages.length} {filteredLanguages.length === 1 ? 'language' : 'languages'}
                </div>
                
                <div class={`language-display ${viewMode}-view`}>
                    {#each filteredLanguages as language}
                        <LanguageCard {language} />
                    {/each}
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 32px 16px;
    }

    .layout {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .explanation-wrapper {
        width: 100%;
    }

    .main-content {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 32px;
    }

    .filters {
        position: sticky;
        top: 80px;
        height: fit-content;
    }

    .search-bar {
        margin-bottom: 16px;
        display: flex;
        width: 100%;
        gap: 16px;
    }

    .search-input {
        width: 100%;
        padding: 8px 12px;
        background: var(--background-primary);
        border: 1px solid var(--border-color);
        font-size: 0.9rem;
    }

    .viewer {
        display: flex;
        border: 1px solid var(--border-color);
    }

    .viewer-button {
        padding: 8px;
        background: var(--background-primary);
        border: none;
        border-right: 1px solid var(--border-color);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .viewer-button:last-child {
        border-right: none;
    }

    .viewer-button:hover {
        background: var(--background-secondary);
    }

    .viewer-button.active {
        background: var(--background-secondary);
    }

    .viewer-button img {
        width: 20px;
        height: 20px;
        color: var(--icon-color);
    }

    .theme-icon {
        filter: var(--icon-filter);
    }

    .timeline-viewer {
        z-index: 1;
    }

    .results-count {
        margin-bottom: 16px;
        font-size: 0.9rem;
        color: #666;
    }

    .language-display {
        width: 100%;
    }

    .grid-view {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 24px;
    }

    .timeline-view {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .stack-view {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    /* Remove border radius */
    .search-input {
        border-radius: 0;
    }

    @media (max-width: 1024px) {
        .main-content {
            grid-template-columns: 1fr;
        }

        .filters {
            position: static;
        }
    }
</style>
