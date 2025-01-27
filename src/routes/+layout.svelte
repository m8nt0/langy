<script lang="ts">
	import "../app.css";
	import { theme } from '$lib/stores/themeStore';
	import { onMount } from 'svelte';

	onMount(() => {
		// Set initial theme
		const savedTheme = localStorage.getItem('theme') || 
			(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		document.documentElement.setAttribute('data-theme', savedTheme);
	});
</script>

<div class="layout">
	<header class="header">
		<div class="header-content">
			<div class="left-section">
				<a href="/" class="logo">
					<img src="/icons/logo.svg" alt="Langy" class="logo-icon" class:theme-icon={true}/>
					<span class="logo-text">Langy</span>
				</a>
			</div>

			<nav class="navigation">
				<a href="/" class="nav-link" class:active={true}>Prog. Languages</a>

			</nav>

			<div class="right-section">
				<button class="theme-toggle" on:click={() => theme.toggle()}>
					{#if $theme === 'dark'}
						<img src="/icons/sun.svg" alt="Switch to light mode" class="theme-icon" />
					{:else}
						<img src="/icons/moon.svg" alt="Switch to dark mode" />
					{/if}
				</button>
			</div>
		</div>
	</header>

	<main>
		<slot />
	</main>
</div>

<style>
	.layout {
			min-height: 100vh;
			display: flex;
			flex-direction: column;
		}

		.header {
			border-bottom: 1px solid var(--border-color);
			background: var(--background-primary);
			position: sticky;
			top: 0;
			z-index: 10;
		}

		.header-content {
			max-width: 1400px;
			margin: 0 auto;
			padding: 0 16px;
			height: 64px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.left-section {
			display: flex;
			align-items: center;
		}

		.logo {
			display: flex;
			align-items: center;
			gap: 8px;
			text-decoration: none;
			color: inherit;
		}

		.logo-icon {
			height: 24px;
			width: auto;
			color: var(--icon-color);
		}

		.logo-text {
			font-size: 1.25rem;
			font-weight: 500;
		}

		.navigation {
			display: flex;
			gap: 32px;
		}

		.nav-link {
			text-decoration: none;
			color: var(--text-secondary);
			padding: 8px 0;
			position: relative;
			transition: var(--transition-color);
		}

		.nav-link:hover {
			color: var(--text-primary);
		}

		.nav-link.active {
			color: var(--text-primary);
		}

		.nav-link.active::after {
			content: '';
			position: absolute;
			bottom: -1px;
			left: 0;
			right: 0;
			height: 1px;
			background: var(--border-color);
		}

		.right-section {
			display: flex;
			align-items: center;
		}

		.theme-toggle {
			background: var(--background-secondary);
			border: 1px solid var(--border-color);
			padding: var(--space-sm);
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: var(--transition-background);
		}

		.theme-toggle:hover {
			background: var(--background-tertiary);
		}

		.theme-toggle img {
			width: 20px;
			height: 20px;
			color: var(--icon-color);
		}

		.theme-icon {
			filter: var(--icon-filter);
		}

		main {
			flex: 1;
		}

		@media (max-width: 640px) {
			.logo-text {
				display: none;
			}

			.navigation {
				gap: 16px;
			}
		}
</style>
