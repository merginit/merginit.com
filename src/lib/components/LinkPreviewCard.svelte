<script lang="ts">
	import type { LinkPreview } from '$lib/types';
	import { decodeHtmlEntities } from '$lib/utils';
	import { onMount } from 'svelte';

	export let preview: LinkPreview | undefined;
	export let url: string | undefined;

	let loading = false;
	let error: string | null = null;
	let lastLoadedUrl: string | undefined;

	let dominantColor = '#f5f5f5';
	let imageElement: HTMLImageElement;
	let isFaviconLoaded = false;

	async function load() {
		if (!url) return;
		loading = true;
		error = null;
		try {
			const res = await fetch(`/api/preview?url=${encodeURIComponent(url)}`);
			if (!res.ok) throw new Error(`Failed to load preview (${res.status})`);
			const data = await res.json();
			preview = data;
			lastLoadedUrl = url;
		} catch (e: any) {
			error = e.message ?? 'Unknown error';
			if (!/Abort/.test(error ?? '')) console.warn('LinkPreviewCard load error:', e);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		if (!preview && url) load();
	});

	$: if (typeof window !== 'undefined' && url && url !== lastLoadedUrl && !loading && !preview) {
		load();
	}

	function extractDominantColor(img: HTMLImageElement): string {
		try {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (!ctx) return '#f5f5f5';
			canvas.width = img.naturalWidth;
			canvas.height = img.naturalHeight;
			ctx.imageSmoothingEnabled = false;
			ctx.drawImage(img, 0, 0);
			const sampleSize = Math.min(20, canvas.width, canvas.height);
			const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
			const data = imageData.data;
			const colorCount: { [key: string]: { count: number; r: number; g: number; b: number } } = {};
			for (let i = 0; i < data.length; i += 4) {
				const r = data[i];
				const g = data[i + 1];
				const b = data[i + 2];
				const alpha = data[i + 3];
				if (alpha < 125) continue; // transparent
				if (r > 240 && g > 240 && b > 240) continue; // skip white
				const colorKey = `${r},${g},${b}`;
				if (!colorCount[colorKey]) colorCount[colorKey] = { count: 0, r, g, b };
				colorCount[colorKey].count++;
			}
			let maxCount = 0;
			let picked = { r: 71, g: 85, b: 105 };
			for (const [, c] of Object.entries(colorCount)) {
				if (c.count > maxCount) {
					maxCount = c.count;
					picked = { r: c.r, g: c.g, b: c.b };
				}
			}
			return `rgb(${picked.r},${picked.g},${picked.b})`;
		} catch (err: any) {
			if (err.name !== 'SecurityError') {
				console.warn('Could not extract dominant color:', err);
			}
			return 'rgb(71, 85, 105)';
		}
	}

	function handleImageLoad() {
		if (imageElement && imageElement.complete) {
			dominantColor = extractDominantColor(imageElement);
		}
	}

	$: if (preview?.favicon) {
		isFaviconLoaded = false;
	}
</script>

{#if preview}
	<div
		class="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-xl overflow-hidden flex flex-col md:flex-row group transition-all duration-300 hover:shadow-2xl hover:border-accent/60 relative hover:scale-[1.0025]"
	>
		{#if preview.image}
			<div
				class="md:w-[60%] w-full shrink-0 flex items-center justify-center relative transition-colors duration-500 overflow-hidden"
				style="background-color: {dominantColor}"
			>
				<img
					bind:this={imageElement}
					src={preview.image}
					alt={decodeHtmlEntities(preview.title)}
					class="object-contain w-full h-full group-hover:scale-[101%] transition-transform duration-500"
					loading="lazy"
					on:load={handleImageLoad}
					on:error={() => console.warn('Image failed to load')}
				/>
				<div
					class="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none"
				></div>
			</div>
		{/if}
		<div class="flex-1 md:w-[40%] p-4">
			{#if preview.favicon}
				<img
					src={preview.favicon}
					alt="favicon"
					class="w-7 h-7 rounded border border-neutral-200 dark:border-neutral-700 shadow-sm bg-white/80 block"
					loading="lazy"
					style="margin:0; padding:0;"
					style:display={isFaviconLoaded ? 'block' : 'none'}
					on:load={() => {
						isFaviconLoaded = true;
					}}
					on:error={() => {
						isFaviconLoaded = false;
					}}
				/>
			{/if}
			<a
				href={preview.url}
				target="_blank"
				rel="noopener"
				class="block font-extrabold text-xl md:text-2xl text-accent no-underline group-hover:underline wrap-break-word leading-tight mt-2"
				style="word-break: break-word; padding:0;"
			>
				{decodeHtmlEntities(preview.title)}
			</a>
			<div
				class="text-base text-neutral-700 dark:text-neutral-200 wrap-break-word whitespace-pre-line font-medium opacity-90 mt-2"
				style="padding:0;"
			>
				{decodeHtmlEntities(preview.description)}
			</div>
		</div>
	</div>
{:else if loading}
	<div
		class="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md animate-pulse p-6 flex flex-col gap-4"
	>
		<div class="h-6 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
		<div class="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded"></div>
		<div class="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
	</div>
{:else if error}
	<div
		class="w-full rounded-xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/30 p-4 text-sm text-red-700 dark:text-red-300"
	>
		Failed to load preview{#if url}: {url}{/if}. {error}
	</div>
{/if}
