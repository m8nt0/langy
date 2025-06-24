<script lang="ts">
    import { useCardBehavior } from "../../../../common/components/behaviors";
    import type { TechObjectDto } from "../../../../../core/application/dto";
    import TechObjectCard from "../pure/TechObjectCard.svelte";

    export let techObject: TechObjectDto;

    // The adapter runs the behavior hook to get the props and event handlers.
    const cardProps = useCardBehavior(techObject);
</script>

<TechObjectCard {...cardProps} on:click={cardProps.onClick} />
