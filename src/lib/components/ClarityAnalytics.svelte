<script lang="ts">
	import Clarity from '@microsoft/clarity';
	import { cookiePreferences } from 'cookiiies';
	import { onMount } from 'svelte';
	import { BROWSER } from 'esm-env';

	const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID;
	let clarityInitialized = false;

	function callWhenClarityReady(callback: () => void) {
		if (BROWSER && window.clarity) {
			callback();
		} else if (BROWSER) {
			setTimeout(() => callWhenClarityReady(callback), 100);
		}
	}

	onMount(() => {
		if (!BROWSER) {
			return;
		}

		cookiePreferences.loadPreferences();

		const unsubscribe = cookiePreferences.subscribe(({ categories }) => {
			const analyticsCategory = categories.find((c) => c.id === 'analytics');
			const analyticsEnabled = analyticsCategory?.checked === true;

			if (analyticsEnabled) {
				if (!clarityInitialized) {
					Clarity.init(clarityProjectId);
					clarityInitialized = true;
					console.log('Microsoft Clarity init called.');
				}
				callWhenClarityReady(() => {
					Clarity.consent(true);
					console.log('Microsoft Clarity consent given.');
				});
			} else {
				if (clarityInitialized) {
					callWhenClarityReady(() => {
						Clarity.consent(false);
						console.log('Microsoft Clarity consent withdrawn.');
					});
				} else {
					console.log('Microsoft Clarity consent not given (Clarity not initialized).');
				}
			}
		});

		return () => {
			unsubscribe();
		};
	});
</script>
