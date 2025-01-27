<script lang="ts">
    import { slide } from 'svelte/transition';
    import type { FilterState } from '$lib/stores/language-section/languages/types';
    import { filterGroups } from '$lib/stores/language-section/filter';
    
    export let filters: FilterState;
    
    let openGroups: Record<string, boolean> = {};
    let openCategories: Record<string, boolean> = {};

    function toggleGroup(title: string) {
        openGroups = { ...openGroups, [title]: !openGroups[title] };
    }

    function toggleCategory(key: string) {
        openCategories = { ...openCategories, [key]: !openCategories[key] };
    }

    function toggleFilter(category: keyof FilterState, value: string) {
        const currentFilters = filters[category];
        if (Array.isArray(currentFilters)) {
            const index = currentFilters.indexOf(value);
            if (index === -1) {
                filters[category] = [...currentFilters, value];
            } else {
                filters[category] = currentFilters.filter(v => v !== value);
            }
            filters = { ...filters }; // Trigger reactivity
        }
    }
</script>

<div class="filter-panel">
    <div class="filter-header">
        <div class="filter-header-left">
            <h2>Filters</h2>
        </div>
        <div class="filter-header-right">
            <button>AND</button>
            <button>OR</button>
        </div>
    </div>

    <div class="filter-groups">
        {#each filterGroups as group}
            <div class="filter-group">
                <button
                    class="group-header"
                    on:click={() => toggleGroup(group.title)}
                >
                    <span>{group.title}</span>
                    <span class="arrow">{openGroups[group.title] ? '↓' : '→'}</span>
                </button>

                {#if openGroups[group.title]}
                    <div class="categories" transition:slide|local>
                        {#each Object.entries(group.categories) as [key, category]}
                            <div class="category">
                                <button
                                    class="category-header"
                                    on:click={() => toggleCategory(key)}
                                >
                                    <span>{category.title}</span>
                                    <span class="arrow">{openCategories[key] ? '↓' : '→'}</span>
                                </button>

                                {#if openCategories[key]}
                                    <div class="subcategories" transition:slide|local>
                                        {#each Object.entries(category.subcategories || {}) as [subKey, subCategory]}
                                            <div class="subcategory">
                                                <div class="subcategory-title">{subCategory.title}</div>
                                                <div class="options">
                                                    {#each subCategory.options as option}
                                                        <label class="option">
                                                            <input
                                                                type="checkbox"
                                                                checked={filters[subKey as keyof FilterState]?.includes(option)}
                                                                on:change={() => toggleFilter(subKey as keyof FilterState, option)}
                                                            />
                                                            <span>{option}</span>
                                                        </label>
                                                    {/each}
                                                </div>
                                            </div>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
    .filter-panel {
        background: var(--background-primary);
        border: 1px solid var(--border-color);
        max-height: calc(100vh - 64px);
        overflow-y: auto;
    }

    .filter-header {
        display: flex;
        border-bottom: 1px solid var(--border-color);
    }

    /* .filter-header h2 {
        font-size: 1rem;
        font-weight: normal;
    } */

    .filter-header-left {
        padding: 12px 16px;
        flex: 1;
    }

    .filter-header-right {
        display: flex;
    }

    .filter-header-right button {
        display: flex;
        font-size: 1rem;
        font-weight: normal;
        padding: 0 16px;
        border-left: 1px solid var(--border-color);
        justify-content: center;
        align-items: center;
        background-color: var(--background-secondary);
    }

    .filter-groups {
        padding: 16px;
    }

    .filter-group {
        margin-bottom: 16px;
    }

    .group-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background: var(--background-primary);
        border: 1px solid var(--border-color);
        font-size: 0.9rem;
        cursor: pointer;
    }

    .category {
        margin-top: 8px;
        margin-left: 16px;
    }

    .category-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 12px;
        background: var(--background-primary);
        border: 1px solid var(--border-color);
        font-size: 0.9rem;
        cursor: pointer;
    }

    .options {
        padding: 8px 0 8px 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .option {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        cursor: pointer;
    }

    .arrow {
        font-family: monospace;
    }

    /* Hover states */
    .group-header:hover,
    .category-header:hover {
        background: var(--background-secondary);
    }

    /* Remove border radius */
    .filter-panel,
    .group-header,
    .category-header {
        border-radius: 0;
    }

    /* Add smooth scrolling */
    .filter-panel {
        scrollbar-width: thin;
        scrollbar-color: var(--border-color) var(--background-primary);
    }

    .filter-panel::-webkit-scrollbar {
        width: 6px;
    }

    .filter-panel::-webkit-scrollbar-track {
        background: var(--background-primary);
    }

    .filter-panel::-webkit-scrollbar-thumb {
        background: var(--border-color);
    }

    /* Improve checkbox styling */
    .option input[type="checkbox"] {
        width: 16px;
        height: 16px;
        border: 1px solid;
        background: var(--background-primary);
        cursor: pointer;
        appearance: none;
        position: relative;
    }

    .option input[type="checkbox"]:checked {
        background: var(--border-color);
    }

    .option input[type="checkbox"]:checked::after {
        content: '✓';
        position: absolute;
        color: white;
        font-size: 12px;
        left: 2px;
        top: -1px;
    }

    /* Add transition for smoother interactions */
    .group-header,
    .category-header {
        transition: background-color 0.2s ease;
    }

    /* Add subtle shadow when panel is scrolled */
    .filter-header {
        position: sticky;
        top: 0;
        background: var(--background-primary);
        z-index: 1;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .subcategory {
        margin-left: 16px;
        margin-top: 8px;
        border-left: 1px solid var(--border-color);
    }

    .subcategory-title {
        font-size: 0.85rem;
        color: var(--text-secondary);
        padding: 4px 12px;
        margin-bottom: 4px;
    }

    /* Adjust nested options padding */
    .subcategory .options {
        padding: 4px 0 4px 12px;
    }

    /* Add visual hierarchy */
    .category > .options {
        border-left: 1px solid var(--border-color);
        margin-left: 8px;
    }

    .categories, .subcategories {
        overflow: hidden;
    }

    /* Improve transition performance */
    .group-header, .category-header, .subcategory {
        will-change: transform;
    }

    /* Add smooth transitions */
    .arrow {
        transition: transform 0.2s ease;
    }

    .arrow.rotated {
        transform: rotate(90deg);
    }
</style> 