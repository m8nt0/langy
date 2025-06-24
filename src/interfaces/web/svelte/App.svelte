<script lang="ts">
    import { onMount } from "svelte";
    import { RouteHandler } from "../../common/components/routing";
    import { useWebAdapters } from "../common/hooks/useWebAdapters";
    import MainLayout from "./components/layout/MainLayout.svelte";

    // This is the root component of the entire Svelte application.
    // Its primary job is to initialize the routing system.

    onMount(() => {
        const mountPoint = document.getElementById("app-mount-point");
        if (mountPoint) {
            const { navigationAdapter, uiAdapter } = useWebAdapters();

            // The RouteHandler from our common interface layer is initialized here.
            // It will use the Web adapters to interact with the browser and will
            // render the correct Svelte Page components inside the mountPoint.
            // Since our platform-agnostic classes render the layouts, we can just let
            // the RouteHandler do its work. A simpler approach for Svelte is shown
            // in the pages/components themselves.
            // new RouteHandler(navigationAdapter, uiAdapter, mountPoint);
        }
    });
</script>

<MainLayout />


<div id="app-mount-point"></div>

