<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		id: string;
		theme?: 'light' | 'dark';
	}

	let { id, theme = 'dark' }: Props = $props();
	let container: HTMLElement;

	onMount(() => {
		// @ts-ignore
		if (window.twttr) {
			// @ts-ignore
			window.twttr.widgets.createTweet(id, container, {
				theme
			});
			return;
		}

		const script = document.createElement('script');
		script.src = 'https://platform.twitter.com/widgets.js';
		script.charset = 'utf-8';
		script.async = true;

		script.onload = () => {
			// @ts-ignore
			window.twttr.widgets.createTweet(id, container, {
				theme
			});
		};

		document.head.appendChild(script);
	});
</script>

<div bind:this={container} class="flex min-h-[300px]"></div>
