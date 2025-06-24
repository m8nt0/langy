<script lang="ts">
    import type { TechObjectDto } from "../../../../../core/application/dto";
    import { useCardBehavior } from "../../../../common/components/behaviors";

    export let techObject: TechObjectDto;

    // The behavior hook provides the derived props and the onClick handler
    const card = useCardBehavior(techObject);
</script>

<div class="card" on:click={card.onClick}>
    <h3>{card.title}</h3>
    <p>{card.description}</p>
    {#if card.tags && card.tags.length > 0}
        <div class="tags">
            {#each card.tags as tag}
                <span class="tag">{tag}</span>
            {/each}
        </div>
    {/if}
</div>

<style>
    .card {
        border: 1px solid #333;
        padding: 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: box-shadow 0.2s;
    }
    .card:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .tags {
        margin-top: 0.5rem;
    }
    .tag {
        background-color: #eee;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
    }
</style>
