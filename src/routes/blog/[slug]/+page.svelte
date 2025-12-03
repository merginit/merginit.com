<script lang="ts">
	import type { Component } from 'svelte';
	import { page } from '$app/state';

	interface MetaData {
		title: string;
		date: string;
		updateDate?: string;
		author?: string;
		description?: string;
		readingTime?: string;
		tags?: string[];
		categories?: string[];
	}

	interface PageData {
		meta: MetaData;
		component: Component;
	}

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	{#if data?.meta?.title}
		<title>{data.meta.title} | MerginIT Blog</title>
		<meta
			name="description"
			content={data.meta.description ?? `${data.meta.title} - MerginIT Blog Post`}
		/>
		<meta property="og:type" content="article" />
		<meta property="og:title" content={data.meta.title} />
		<meta
			property="og:description"
			content={data.meta.description ?? `${data.meta.title} - MerginIT Blog Post`}
		/>
		<meta name="twitter:title" content={data.meta.title} />
		<meta
			name="twitter:description"
			content={data.meta.description ?? `${data.meta.title} - MerginIT Blog Post`}
		/>
		<meta
			property="og:image"
			content={`/og?title=${encodeURIComponent(data.meta.title)}&subtitle=${encodeURIComponent(data.meta.description ?? '')}&url=${encodeURIComponent(page.url.href)}`}
		/>
		<meta
			name="twitter:image"
			content={`/og?title=${encodeURIComponent(data.meta.title)}&subtitle=${encodeURIComponent(data.meta.description ?? '')}&url=${encodeURIComponent(page.url.href)}`}
		/>
	{/if}
</svelte:head>

{#if data?.meta && data.component}
	{#if data.meta.updateDate && data.meta.updateDate !== data.meta.date}
		<div class="mb-6 text-sm text-neutral-400 flex flex-col gap-1">
			<span
				>Originally published on {new Date(data.meta.date).toLocaleDateString(undefined, {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}</span
			>
			<span
				>Last updated on {new Date(data.meta.updateDate).toLocaleDateString(undefined, {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}</span
			>
		</div>
	{/if}
	<article class="prose prose-invert lg:prose-xl max-w-none">
		<data.component />
	</article>
{:else if data?.meta && !data.component}
	<p class="text-red-500">Blog post content could not be loaded.</p>
{:else}
	<p class="text-red-300">Blog post metadata is not available. Cannot render page.</p>
{/if}
