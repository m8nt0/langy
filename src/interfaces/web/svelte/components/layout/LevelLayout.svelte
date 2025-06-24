<script lang="ts">
    import ViewerLayout from "./ViewerLayout.svelte";
</script>

<div class="level-layout">
    <aside class="left-sidebar"></aside>
    <section class="right-content-area">
        <ViewerLayout />
    </section>
</div>

<style>
    .level-layout {
        display: grid;
        grid-template-columns: 200px 1fr; /* Example size for sidebar */
        height: 100%;
    }
    .left-sidebar {
        border-right: 1px solid #333;
        padding: 1rem;
    }
    .right-content-area {
        overflow: auto;
    }
</style>
