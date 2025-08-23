<script lang="ts">
	import { cn } from '$lib/utils';

	export let src: string;
	export let alt: string = '';
	export let width: string = '100%';
	export let height: string = 'auto';
	let _class: string = '';
	export { _class as class };
	export let captionClass: string = '';
	export let href: string | undefined = undefined;
</script>

<figure class={cn('image-container', _class)} style="width: {width}; height: {height};">
	{#if href}
		<a href={href} target="_blank" rel="noopener noreferrer" class="block w-full h-full">
			<img {src} {alt} class="image" loading="lazy" />
		</a>
	{:else}
		<img {src} {alt} class="image" loading="lazy" />
	{/if}
	{#if alt}
		<figcaption class={cn('caption', captionClass)}>
			{alt}
		</figcaption>
	{/if}
</figure>

<style lang="postcss">
	.image-container {
		position: relative;
		overflow: hidden;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid #000000;
		border-radius: 0.5rem;
		transition: border-color 0.2s ease-in-out;
	}

	.image-container:hover {
		border-color: var(--color-brand, #f5d700);
	}

	.image {
		width: 100%;
		height: auto;
		object-fit: cover;
		display: block;
	}

	.caption {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.7);
		color: white;
		padding: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25;
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
	}

	.image-container:hover .caption {
		opacity: 1;
	}

	/* Ensure accessibility */
	@media (prefers-reduced-motion: reduce) {
		.caption {
			transition: none;
		}
	}

	/* Better mobile experience */
	@media (max-width: 768px) {
		.caption {
			opacity: 1;
			position: static;
			background: var(--brand-color, #3b82f6);
		}

		.image-container:hover .caption {
			opacity: 1;
		}
	}
</style>
