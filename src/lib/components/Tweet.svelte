<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		id: string;
		theme?: 'light' | 'dark';
		minHeight?: string;
	}

	let { id, theme = 'dark', minHeight = '768px' }: Props = $props();
	let container: HTMLElement;
	let loading = $state(true);

	onMount(() => {
		// @ts-ignore
		if (window.twttr) {
			// @ts-ignore
			window.twttr.widgets
				.createTweet(id, container, {
					theme
				})
				.then(() => {
					loading = false;
				});
			return;
		}

		const script = document.createElement('script');
		script.src = 'https://platform.twitter.com/widgets.js';
		script.async = true;

		script.onload = () => {
			// @ts-ignore
			window.twttr.widgets
				.createTweet(id, container, {
					theme
				})
				.then(() => {
					loading = false;
				});
		};

		document.head.appendChild(script);
	});
</script>

<div class="tweet-wrapper" style="--tweet-min-height: {minHeight}">
	{#if loading}
		<div class="tweet-loader-container">
			<div class="relative h-12 w-12">
				<!-- Outer ring -->
				<div class="border-brand absolute inset-0 rounded-full border-4 opacity-20"></div>

				<!-- Spinning ring -->
				<div
					class="border-t-accent absolute inset-0 animate-spin rounded-full border-4 border-transparent"
				></div>

				<!-- Inner dot -->
				<div class="bg-brand absolute inset-1/4 animate-pulse rounded-full"></div>
			</div>
		</div>
	{/if}

	<div bind:this={container} class="tweet-container"></div>
</div>

<style>
	.tweet-wrapper {
		position: relative;
		min-height: var(--tweet-min-height);
	}

	.tweet-container {
		display: flex;
	}

	.tweet-loader-container {
		position: absolute;
		inset: 0;
		width: 100%;
		max-width: 550px;
		display: grid;
		place-items: center;
		z-index: 5;
		background: transparent;
	}
</style>
