<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import BorderBeam from '$lib/components/BorderBeam.svelte';
	import BlogLoader from '$lib/components/BlogLoader.svelte';
	import BlogFilters from '$lib/components/BlogFilters.svelte';
	import type { Post } from '$lib/types';

	let { data } = $props();
	let mounted = $state(false);
	let posts = $state<Post[]>(data.posts);
	let loading = $state(false);
	let filters = $state({
		search: '',
		searchScope: 'all' as const,
		categories: [],
		categoryOperator: 'AND' as const,
		tags: [],
		tagOperator: 'OR' as const,
		dateFrom: '',
		dateTo: '',
		minReadTime: 0,
		maxReadTime: 60
	});

	let debounceTimer: ReturnType<typeof setTimeout>;

	async function fetchFilteredPosts() {
		loading = true;
		try {
			const searchParams = new URLSearchParams();

			if (filters.search) searchParams.set('search', filters.search);
			if (filters.searchScope !== 'all') searchParams.set('scope', filters.searchScope);
			if (filters.categories.length > 0) {
				searchParams.set('categories', filters.categories.join(','));
				searchParams.set('categoryOperator', filters.categoryOperator);
			}
			if (filters.tags.length > 0) {
				searchParams.set('tags', filters.tags.join(','));
				searchParams.set('tagOperator', filters.tagOperator);
			}
			if (filters.dateFrom) searchParams.set('dateFrom', filters.dateFrom);
			if (filters.dateTo) searchParams.set('dateTo', filters.dateTo);
			if (filters.minReadTime > 0) searchParams.set('minReadTime', filters.minReadTime.toString());
			if (filters.maxReadTime < 60) searchParams.set('maxReadTime', filters.maxReadTime.toString());

			const response = await fetch(`/api/posts?${searchParams.toString()}`);
			const filteredPosts: Post[] = await response.json();
			posts = filteredPosts;
		} catch (error) {
			console.error('Error fetching filtered posts:', error);
		} finally {
			loading = false;
		}
	}

	function handleFilter() {
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(fetchFilteredPosts, 300);
	}

	onMount(() => {
		mounted = true;
		if ('startViewTransition' in document) {
			document.documentElement.classList.add('view-transitions-enabled');
		}
	});
</script>

<svelte:head>
	<title>Blog | MerginIT</title>
	<meta
		name="description"
		content="Read our latest blog posts about web development, SaaS, and technology."
	/>
</svelte:head>

<div class="min-h-screen bg-brand-dark">
	<div class="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
		<!-- Blog Header -->
		<header class="text-center">
			<h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
				Blog
			</h1>
			<p class="text-lg text-gray-400">Insights and updates from the MerginIT team</p>
		</header>

		<div class="flex justify-center mb-10">
			<a
				href="/"
				class="bg-accent/20 border border-accent/50 hover:bg-accent/30 transition-colors duration-300 ease-in-out rounded-full px-4 py-2 mt-4"
			>
				Home
			</a>
		</div>

		<!-- Filter Component -->
		<BlogFilters bind:filters on:filter={handleFilter} />

		<!-- Results Summary -->
		{#if mounted}
			<div class="mb-6 text-sm text-gray-400 flex items-center justify-between">
				<span>
					Showing {posts.length} post{posts.length !== 1 ? 's' : ''}
					{#if filters.search || filters.categories.length > 0 || filters.tags.length > 0 || filters.dateFrom || filters.dateTo}
						(filtered)
					{/if}
				</span>
				{#if loading}
					<div class="flex items-center gap-2">
						<div
							class="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"
						></div>
						<span>Filtering...</span>
					</div>
				{/if}
			</div>
		{/if}

		<!-- Blog Posts Grid -->
		<div class="grid gap-8">
			{#if !mounted}
				<BlogLoader size="lg" text="Loading blog posts..." />
			{:else if loading}
				<BlogLoader size="lg" text="Filtering posts..." />
			{:else if posts.length > 0}
				{#each posts as post (post.slug)}
					<article
						class="group relative flex flex-col rounded-3xl p-6 sm:p-8 border border-gray-700/70 bg-blue-950/10 backdrop-blur-md shadow-md hover:shadow-accent/20 transition-all duration-300 ease-in-out hover:border-accent/70 transform hover:-translate-y-1"
						transition:fade={{ duration: 200 }}
					>
						<BorderBeam
							size={180}
							duration={10}
							anchor={45}
							class="absolute top-0 left-0 w-full h-full z-0 opacity-30 group-hover:opacity-60 transition-opacity"
						/>

						<div class="relative z-10">
							<!-- Post Metadata -->
							<div
								class="flex flex-wrap items-center text-sm text-gray-400 mb-4 justify-between gap-4"
							>
								<div class="flex flex-wrap gap-5">
									{#if post.updateDate}
										<time datetime={new Date(post.updateDate).toISOString()}>
											Updated {new Date(post.updateDate).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'long',
												day: 'numeric'
											})}
										</time>
									{:else}
										<time datetime={new Date(post.date).toISOString()}>
											{new Date(post.date).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'long',
												day: 'numeric'
											})}
										</time>
									{/if}
									{#if post.author}
										<span class="flex items-center gap-1.5">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="20"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle
													cx="12"
													cy="12"
													r="10"
												/></svg
											>
											{post.author}
										</span>
									{/if}
									{#if post.readingTime}
										<span class="flex items-center gap-1.5">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="20"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												><circle cx="12" cy="12" r="10" /><polyline
													points="12 6 12 12 16 14"
												/></svg
											>
											{post.readingTime} read
										</span>
									{/if}
								</div>

								{#if post.tags && post.tags.length > 0}
									<div>
										<div class="flex flex-wrap gap-2">
											{#each post.tags as tag}
												<span
													class="px-2.5 py-1 text-xs font-medium text-sky-400 bg-sky-400/10 rounded-full border border-sky-400/30 hover:bg-sky-400/20 transition-colors"
												>
													{tag}
												</span>
											{/each}
										</div>
									</div>
								{/if}
							</div>

							<!-- Post Title & Description -->
							<h2
								class="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-accent transition-colors"
							>
								<a
									data-sveltekit-preload-data="hover"
									href={`/blog/${post.slug}`}
									class="after:absolute after:inset-0"
								>
									{post.title}
								</a>
							</h2>
							<p class="text-gray-300 mb-4 line-clamp-3">
								{post.description}
							</p>

							<!-- Categories & Tags -->
							{#if (post.categories && post.categories.length > 0) || (post.tags && post.tags.length > 0)}
								<div class="mt-6 space-y-4">
									{#if post.categories && post.categories.length > 0}
										<div>
											<h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
												Categories
											</h4>
											<div class="flex flex-wrap gap-2">
												{#each post.categories as category}
													<span
														class="px-2.5 py-1 text-xs font-medium text-accent bg-accent/10 rounded-full border border-accent/30 hover:bg-accent/20 transition-colors"
													>
														{category}
													</span>
												{/each}
											</div>
										</div>
									{/if}
								</div>
							{/if}
						</div>
					</article>
				{/each}
			{:else if mounted && posts.length === 0}
				<div class="text-center py-16">
					<div class="mb-4">
						<svg
							class="w-16 h-16 mx-auto text-gray-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18"
							></path>
						</svg>
					</div>
					<h3 class="text-xl font-semibold text-white mb-2">No posts found</h3>
					<p class="text-gray-400 mb-4">
						{#if filters.search || filters.categories.length > 0 || filters.tags.length > 0 || filters.dateFrom || filters.dateTo}
							Try adjusting your search criteria or clearing some filters.
						{:else}
							No blog posts are currently available.
						{/if}
					</p>
					{#if filters.search || filters.categories.length > 0 || filters.tags.length > 0 || filters.dateFrom || filters.dateTo}
						<button
							onclick={() => {
								filters.search = '';
								filters.categories = [];
								filters.categoryOperator = 'AND';
								filters.tags = [];
								filters.tagOperator = 'OR';
								filters.dateFrom = '';
								filters.dateTo = '';
								filters.minReadTime = 0;
								filters.maxReadTime = 60;
								handleFilter();
							}}
							class="px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent border border-accent/50 rounded-lg transition-colors"
						>
							Clear All Filters
						</button>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>
