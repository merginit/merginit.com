<script lang="ts">
	import Noise from '$lib/components/Noise.svelte';
	import { page } from '$app/stores';
	import FuzzyText from '$lib/components/FuzzyText.svelte';
	import Icon from '@iconify/svelte';

	$: isBlog = $page.url?.pathname?.startsWith('/blog');
</script>

<div class="flex min-h-screen flex-col items-center justify-center text-white">
	<Noise
		patternSize={250}
		patternScaleX={1}
		patternScaleY={1}
		patternRefreshInterval={2}
		patternAlpha={30}
	/>

	<div class="z-10 flex flex-col items-center text-center">
		<div class="mb-4 text-8xl font-extrabold tracking-tighter text-brand md:text-9xl">
			{#key $page.status}
				<FuzzyText
					text={$page.status.toString()}
					color="#ffaa40"
					fontSize="clamp(6rem, 15vw, 9rem)"
					baseIntensity={0.1}
					hoverIntensity={0.3}
				/>
			{/key}
		</div>
		<p class="mt-6 text-2xl font-semibold text-gray-300 md:text-3xl">
			{$page.error?.message || 'Oops! Page not found.'}
		</p>
		<p class="max-w-md text-gray-400 mt-2">
			It seems like you've stumbled upon a page that doesn't exist.<br />Don't worry, it happens to
			the best of us!
		</p>

		{#if isBlog}
			<a
				href="/blog"
				class="mt-8 inline-flex items-center gap-2 hover:text-text-hover transition-colors duration-200"
				aria-label="Go back to Blog"
			>
				<Icon icon="carbon:blog" class="w-5 h-5" />
				<span>Back to Blog</span>
			</a>
		{:else}
			<a
				href="/"
				class="mt-8 inline-flex items-center gap-2 hover:text-text-hover transition-colors duration-200"
				aria-label="Go back to Homepage"
			>
				<Icon icon="bxs:home" class="w-5 h-5" />
				<span>Back to Home</span>
			</a>
		{/if}
	</div>
</div>
