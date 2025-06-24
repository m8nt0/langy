<script lang="ts">
    import { navigationStore } from "../../stores";
    import { navigationActions } from "../../../../common/components/state/actions";
</script>

<nav class="breadcrumb-nav">
    {#each $navigationStore.path as node, i (node.techObjectId)}
        <span class="node" on:click={() => navigationActions.navigateBackTo(i)}>
            {node.techObjectName}
        </span>
        {#if i < $navigationStore.path.length - 1}
            <span class="separator">→</span>
        {/if}
    {/each}
</nav>

<style>
    .node {
        cursor: pointer;
    }
    .node:hover {
        text-decoration: underline;
    }
    .separator {
        margin: 0 0.5em;
    }
</style>
