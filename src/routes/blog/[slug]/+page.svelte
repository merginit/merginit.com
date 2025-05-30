<script lang="ts">
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
		matchingFile: string;
	}

	let { data }: { data: PageData } = $props();

	let contentComponent = $state<any>(null);
	let isLoading = $state(true);
	let importError = $state<string | null>(null);

	$effect(() => {
		if (data.matchingFile) {
			isLoading = true;
			importError = null;
			import(/* @vite-ignore */ `/src/lib/blog/posts/${data.matchingFile}`)
				.then((module) => {
					contentComponent = module.default;
					isLoading = false;
				})
				.catch((err) => {
					console.error('Error importing blog post component:', err);
					importError = `Failed to load blog content: ${err.message}`;
					isLoading = false;
				});
		} else {
			contentComponent = null;
			isLoading = false;
			importError = 'Blog post file not specified.';
		}
	});

</script>

<svelte:head>
	{#if data?.meta?.title}
		<title>{data.meta.title} | merginIT Blog</title> <meta property="og:type" content="article" />
		<meta property="og:title" content={data.meta.title} />
		{#if data.meta.description}
			<meta name="description" content={data.meta.description} />
			<meta property="og:description" content={data.meta.description} />
		{/if}
	{/if}
</svelte:head>

{#if data?.meta}
	<article class="prose prose-invert lg:prose-xl max-w-none">
		{#if isLoading}
			<p>Loading content...</p>
		{:else if importError}
			<p class="text-red-500">{importError}</p>
		{:else if contentComponent}
			{@render contentComponent()}
		{:else}
			<p>No content to display.</p>
		{/if}
	</article>
{:else}
	<p class="text-red-300">Blog post metadata is not available. Cannot render page.</p>
{/if}
