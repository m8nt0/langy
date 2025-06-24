<script lang="ts">
    import {
        uiStore,
        visibleTechObjects,
        activeViewerData,
    } from "../../stores";
    import { navigationActions } from "../../../../common/components/state/actions";
    import type { ViewerMode } from "../../../../common/components/state/stores";

    // Import Pure Components
    import FilterPanel from "../pure/FilterPanel.svelte";
    import TechObjectCard from "../pure/TechObjectCard.svelte";

    // Import Viewer Components
    import TimelineViewer from "../pure/viewers/TemporalViewer.svelte";
    import StructureViewer from "../pure/viewers/StructureViewer.svelte";
    // ... import other viewers

    const viewerModes: ViewerMode[] = [
        "default",
        "temporal",
        "structure",
        "paradigm",
        "system",
        "useCase",
        "experience",
    ];
</script>

<div class="viewer-layout">
    <div class="tools-bar">
        <div class="viewer-selectors">
            {#each viewerModes as mode}
                <button
                    on:click={() => navigationActions.changeViewerMode(mode)}
                    class:active={$uiStore.activeViewer === mode}
                >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
            {/each}
        </div>
        <FilterPanel />
        <div class="abstraction-controls">
            <button on:click={() => navigationActions.abstractUp()}
                >Abstract Up ↑</button
            >
        </div>
    </div>
    <div class="content-pane">
        {#if $uiStore.activeViewer === "default"}
            <div class="card-grid">
                {#each $visibleTechObjects as techObject (techObject.id)}
                    <TechObjectCard {techObject} />
                {/each}
            </div>
        {:else if $uiStore.activeViewer === "temporal"}
            <TimelineViewer data={$activeViewerData} />
        {:else if $uiStore.activeViewer === "structure"}
            <StructureViewer data={$activeViewerData} />
        {/if}
    </div>
</div>

<style>
    .viewer-layout {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .tools-bar {
        padding: 0.5rem;
        border-bottom: 1px solid #333;
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
    }
    .content-pane {
        flex-grow: 1;
        overflow-y: auto;
        padding: 1rem;
    }
    .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
    }
    .viewer-selectors button.active {
        background-color: #007bff;
        color: white;
    }
</style>
