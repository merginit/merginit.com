<script>
	import { onMount } from 'svelte';
	let showWidget = true;

	onMount(() => {
		const timer = setTimeout(() => {
			const widget = document.getElementById('elevenlabs-audionative-widget');
			if (widget && !widget.querySelector('iframe')) {
				console.log('AudioNative failed to load, hiding widget');
				showWidget = false;
			}
		}, 5000);

		return () => clearTimeout(timer);
	});
</script>

<svelte:head>
	<script
		defer
		src="https://elevenlabs.io/player/audioNativeHelper.js"
		type="text/javascript"
	></script>
</svelte:head>

{#if showWidget}
	<div
		id="elevenlabs-audionative-widget"
		data-height="90"
		data-width="100%"
		data-frameborder="no"
		data-scrolling="no"
		data-publicuserid="3c95cf0b4272cb31afe8e85770c22e161590034b459af13904a3605915510b5b"
		data-playerurl="https://elevenlabs.io/player/index.html"
	>
		Loading the <a href="https://elevenlabs.io/text-to-speech" target="_blank" rel="noopener"
			>Elevenlabs Text to Speech</a
		> AudioNative Player...
	</div>
{/if}
