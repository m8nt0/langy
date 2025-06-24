<script lang="ts">
    import TopBar from "./TopBar.svelte";
    import LevelLayout from "./LevelLayout.svelte";
</script>

<div class="main-layout">
    <header class="top-bar-container">
        <TopBar />
    </header>
    <main class="main-area">
        <LevelLayout />
    </main>
</div>

<style>
    .main-layout {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .top-bar-container {
        flex-shrink: 0;
        border-bottom: 1px solid #333;
    }
    .main-area {
        flex-grow: 1;
        overflow: hidden;
    }
</style>
