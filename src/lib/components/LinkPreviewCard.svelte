<script lang="ts">
	import type { LinkPreview } from '$lib/types';
	import { decodeHtmlEntities } from '$lib/utils';

	export let preview: LinkPreview;

	let dominantColor = '#f5f5f5';
	let imageElement: HTMLImageElement;

	function extractDominantColor(img: HTMLImageElement): string {
		try {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (!ctx) return '#f5f5f5';

			// Use original size to avoid interpolation
			canvas.width = img.naturalWidth;
			canvas.height = img.naturalHeight;

			// Disable image smoothing to get exact pixel values
			ctx.imageSmoothingEnabled = false;

			ctx.drawImage(img, 0, 0);

			// Sample from a small area in the top-left corner (original size)
			const sampleSize = Math.min(20, canvas.width, canvas.height);
			const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
			const data = imageData.data;

			const colorCount: { [key: string]: { count: number; r: number; g: number; b: number } } = {};

			for (let i = 0; i < data.length; i += 4) {
				const r = data[i];
				const g = data[i + 1];
				const b = data[i + 2];
				const alpha = data[i + 3];

				// Skip transparent pixels
				if (alpha < 125) continue;

				// Skip white pixels (potential text)
				if (r > 240 && g > 240 && b > 240) continue;

				const colorKey = `${r},${g},${b}`;
				if (!colorCount[colorKey]) {
					colorCount[colorKey] = { count: 0, r, g, b };
				}
				colorCount[colorKey].count++;
			}

			// Find the most frequent color
			let maxCount = 0;
			let dominantColor = { r: 71, g: 85, b: 105 };

			for (const [colorKey, colorData] of Object.entries(colorCount)) {
				if (colorData.count > maxCount) {
					maxCount = colorData.count;
					dominantColor = { r: colorData.r, g: colorData.g, b: colorData.b };
				}
			}

			return `rgb(${dominantColor.r},${dominantColor.g},${dominantColor.b})`;
		} catch (error) {
			console.warn('Could not extract dominant color:', error);
			return 'rgb(71, 85, 105)';
		}
	}

	function handleImageLoad() {
		if (imageElement && imageElement.complete) {
			dominantColor = extractDominantColor(imageElement);
		}
	}
</script>

<div
	class="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-xl overflow-hidden flex flex-col md:flex-row group transition-all duration-300 hover:shadow-2xl hover:border-accent/60 relative hover:scale-[1.0025]"
>
	{#if preview.image}
		<div
			class="md:w-[60%] w-full flex-shrink-0 flex items-center justify-center relative transition-colors duration-500 overflow-hidden"
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
				class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
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
			/>
		{/if}
		<a
			href={preview.url}
			target="_blank"
			rel="noopener noreferrer"
			class="block font-extrabold text-xl md:text-2xl text-accent no-underline group-hover:underline break-words leading-tight mt-2"
			style="word-break: break-word; padding:0;"
		>
			{decodeHtmlEntities(preview.title)}
		</a>
		<div
			class="text-base text-neutral-700 dark:text-neutral-200 break-words whitespace-pre-line font-medium opacity-90 mt-2"
			style="padding:0;"
		>
			{decodeHtmlEntities(preview.description)}
		</div>
	</div>
</div>
