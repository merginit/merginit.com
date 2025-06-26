<script lang="ts">
	import { onMount } from 'svelte';
	import type { Component } from "svelte";
	import BlogLoader from '$lib/components/BlogLoader.svelte';

	interface MetaData {
		title: string;
		date: string;
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
	let loading = $state(true);

	onMount(() => {
		loading = false;
	});
</script>

<svelte:head>
	{#if data?.meta?.title}
		<title>{data.meta.title} | MerginIT Blog</title> <meta property="og:type" content="article" />
		<meta property="og:title" content={data.meta.title} />
		{#if data.meta.description}
			<meta name="description" content={data.meta.description} />
			<meta property="og:description" content={data.meta.description} />
		{/if}
	{/if}
</svelte:head>

{#if loading}
	<BlogLoader size="md" text="Loading blog post..." />
{:else if data?.meta && data.component}
	<article class="prose prose-invert lg:prose-xl max-w-none">
		<data.component />
	</article>
{:else if data?.meta && !data.component}
	<p class="text-red-500">Blog post content could not be loaded.</p>
{:else}
	<p class="text-red-300">Blog post metadata is not available. Cannot render page.</p>
{/if}
