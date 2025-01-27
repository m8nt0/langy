<script lang="ts">
    import { slide, fade } from 'svelte/transition';
    import type { Language } from '$lib/stores/language-section/languages/types';
  
    import { createCategories } from '$lib/stores/language-section/languages/categories';
    
    export let language: Language;
    let selectedCategory: string | null = null;
    let selectedSubCategory: string | null = null;
    let showFullContent = false;

    $: categories = createCategories(language);
    $: content = selectedCategory ? categories[selectedCategory].content : null;

    // Core -> Paradigm, Typing, etc.
    const subCategories: Record<string, string[]> = {
        'Core Characteristics': ['Paradigm', 'Typing', 'Compilation', 'Memory'],
        'Performance': ['Speed', 'Memory', 'Startup', 'Compile Time'],
        'Ecosystem': ['Package Manager', 'Build Tools', 'Community'],
        'Use Cases': ['Category', 'Platforms', 'Industry'],
        'Learning': ['Difficulty', 'Readability', 'Resources']
    };

    function selectCategory(id: string) {
        if (selectedCategory === id) {
            // If clicking the same category, close it
            selectedCategory = null;
            selectedSubCategory = null;
        } else {
            // Open new category and its first subcategory
            selectedCategory = id;
            selectedSubCategory = subCategories[id]?.[0] || null;
        }
    }

    function selectSubCategory(subCat: string) {
        selectedSubCategory = subCat;
    }

    function toggleContent() {
        showFullContent = !showFullContent;
    }
</script>

<div class="card-1">
    <div class="header">
        <div class="name-block">{language.name}</div>
    </div>

    <div class="content">
        <div class="categories-content">
            {#if selectedCategory && categories[selectedCategory]}
                <h2 class="selected-category-title">{categories[selectedCategory].title}</h2>
                <div class="selected-category-content" class:expanded={showFullContent}>
                    {#if content}
                        <p class="content-description">
                            {content.description}
                        </p>
                        <div class="details-grid">
                            {#each content.details as detail}
                                <div class="detail-item">
                                    <span class="detail-key">{detail.key}</span>
                                    <span class="detail-value">{detail.value}</span>
                                </div>
                            {/each}
                        </div>
                        {#if content.extended}
                            <button 
                                class="read-more-btn"
                                on:click={toggleContent}
                            >
                                {showFullContent ? '▲ Show Less' : '▼ Read More'}
                            </button>
                        {/if}
                    {/if}
                </div>
            {:else}
                <p class="select-prompt">Select a category to view details</p>
            {/if}
        </div>

        <div class="categories-navigator">
            <div class="navigation-path">
                {#each Object.entries(categories) as [id, category]}
                    <div class="nav-group">
                        <button 
                            class="category-button"
                            class:active={selectedCategory === id}
                            on:click={() => selectCategory(id)}
                        >
                            <div class="category-name">{category.title}</div>
                            <div class="arrow-container">
                                <img 
                                    src="/icons/open.svg" 
                                    alt="arrow" 
                                    class="arrow"
                                    class:rotated={selectedCategory === id}
                                />
                            </div>
                        </button>
                        
                        {#if selectedCategory === id}
                            <div class="sub-categories" transition:slide={{axis: 'x'}}>
                                <div class="sub-categories-scroll">
                                    {#each subCategories[id] || [] as subCat}
                                        <button 
                                            class="sub-category-button"
                                            class:active={selectedSubCategory === subCat}
                                            on:click={() => selectSubCategory(subCat)}
                                        >
                                            {subCat}
                                        </button>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    /* Card Structure */
    .card-1 {
        position: relative;
        width: 100%;
    }

    .content {
        background: var(--background-primary);
        border: 1px solid var(--border-color);
        width: 100%;
    }

    /* Header */
    .name-block {
        display: inline-block;
        padding: 12px 16px;
        margin-bottom: -1px;
        border: 1px solid var(--border-color);
        border-bottom: 1px solid var(--border-color);
        background-color: var(--accent-primary);
        position: relative;
        z-index: 1;
    }

    /* Content Areas */
    .categories-content {
        padding: 24px;
        min-height: 200px;
        border-bottom: 1px solid var(--border-color);
        background: var(--background-primary);
    }

    .categories-navigator {
        padding: 24px;
        overflow: hidden;
        background: var(--background-secondary);
        
    }

    /* Navigation Layout */
    .navigation-path {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        align-items: center;
    }

    .nav-group {
        display: flex;
        align-items: center;
    }

    /* Category Button */
    .category-button {
        display: inline-flex;
        align-items: stretch;
        min-width: 110px;
        background: var(--background-tertiary);
        border: 1px solid var(--border-color);
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: normal;
        flex-shrink: 0;
        padding: 0;
        transition: var(--transition-background);
    }

    .category-button.active {
        background: var(--accent-primary);
    }

    .category-name {
        padding: 12px 16px;
        flex-grow: 1;
        color: var(--text-primary);
    }

    .arrow-container {
        display: flex;
        align-items: center;
        background-color: var(--background-tertiary);
        border-left: 1px solid var(--border-color);
        padding: 0 8px;
    }

    .arrow {
        filter: var(--icon-filter);
        width: 20px;
        height: 20px;
        transition: transform 0.3s ease;
    }

    .arrow.rotated {
        transform: rotate(180deg);
    }

    /* Subcategories */
    .sub-categories {
        position: relative;
        max-width: 300px;
        overflow: hidden;
        margin-left: -1px;
    }

    .sub-categories-scroll {
        display: flex;
        border: 1px solid var(--border-color);
        background: var(--background-tertiary);
        overflow-x: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .sub-categories-scroll::-webkit-scrollbar {
        display: none;
    }

    .sub-category-button {
        background: none;
        border-right: 1px solid var(--border-color);
        padding: 12px 16px;
        white-space: nowrap;
        font-size: 0.9rem;
        cursor: pointer;
        color: var(--text-secondary);
        flex-shrink: 0;
        transition: var(--transition-background), var(--transition-color);
    }

    .sub-category-button:hover {
        color: var(--text-primary);
        background: var(--background-tertiary);
    }

    .sub-category-button.active {
        color: var(--text-primary);
    }

    /* Details Content */
    .selected-category-title {
        font-size: 1rem;
        color: var(--text-primary);
        margin-bottom: 16px;
        text-align: center;
    }

    .details-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-top: 16px;
    }

    .detail-item {
        background: var(--background-secondary);
        border: 1px solid var(--border-color);
        padding: 12px;
    }

    .select-prompt {
        text-align: center;
        color: var(--text-secondary);
        margin-top: 32px;
    }

    .arrow-container img {
        color: var(--icon-color);
    }
</style> 