<script>
    import { onMount } from 'svelte';

    onMount(() => {
        const script = document.createElement('script');
        script.src = 'https://elevenlabs.io/player/audioNativeHelper.js';
        script.type = 'text/javascript';
        script.defer = true;
        
        script.onload = () => {
            console.log('AudioNative script loaded successfully');
        };
        
        script.onerror = () => {
            console.error('Failed to load AudioNative script');
        };
        
        document.head.appendChild(script);
    });
</script>

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
