<script lang="ts">
	import { browser } from '$app/environment';

	let loading = $state(true);
	let container: HTMLDivElement | undefined;

	let { children } = $props();

	$effect(() => {
		if (!browser || !container) return;

		const iframe = container.querySelector('iframe');

		if (iframe) {
			const handleLoad = () => {
				loading = false;
			};

			// The 'load' event might have already fired before this listener is attached,
			// which can lead to a race condition. However, without being able to inspect
			// the iframe's content (due to cross-origin restrictions), attaching the
			// event listener is the most reliable approach.
			iframe.addEventListener('load', handleLoad, { once: true });

			// A failsafe: if the iframe appears to be loaded but the event hasn't fired
			// (e.g., due to caching or the race condition), we can remove the loader
			// after a timeout. This is a practical workaround.
			const timeoutId = setTimeout(() => {
				loading = false;
			}, 3000); // 3-second timeout as a fallback

			return () => {
				iframe.removeEventListener('load', handleLoad);
				clearTimeout(timeoutId);
			};
		}
	});
</script>

<div class="async-iframe__wrapper">
	<div class="async-iframe__loader-container" class:async-iframe__hidden={!loading}>
		<div class="async-iframe__loader"></div>
	</div>

	<div bind:this={container} class="async-iframe__container">
		{@render children()}
	</div>
</div>

<style>
	.async-iframe__wrapper {
		position: relative;
		padding-top: 85%;
		height: 0;
		overflow: hidden;
	}

	.async-iframe__loader-container {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		z-index: 5;
		background: rgba(255, 255, 255, 0.9);
	}

	.async-iframe__loader {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		border: 0.125rem solid transparent;
		border-top-color: #3b82f6;
		animation: async-iframe__spin 1s linear infinite;
	}

	@keyframes async-iframe__spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.async-iframe__container {
		position: absolute;
		inset: 0;
	}

	:global(iframe) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	.async-iframe__hidden {
		display: none !important;
	}

	.async-iframe__hidden + .async-iframe__container :global(iframe) {
		opacity: 1;
	}
</style>
