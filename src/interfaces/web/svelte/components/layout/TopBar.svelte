<script lang="ts">
    import BreadCrumb from "../pure/BreadCrumb.svelte";
</script>

<div class="top-bar">
    <div class="app-title">Langy</div>
    <BreadCrumb />
</div>

<style>
    .top-bar {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        gap: 1rem;
    }
    .app-title {
        font-weight: bold;
        font-size: 1.2rem;
    }
</style>
