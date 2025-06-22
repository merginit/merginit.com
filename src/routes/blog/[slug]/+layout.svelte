<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import BorderBeam from '$lib/components/BorderBeam.svelte';
	import mermaid from 'mermaid';
	import '../../../code.css';

	const { children } = $props();
	let mounted = $state(false);

	let title = $state('');
	let date = $state('');
	let author = $state('');
	let description = $state('');
	let readingTime = $state('');
	let tags = $state<string[]>([]);
	let categories = $state<string[]>([]);

	$effect(() => {
		if (page.data?.meta) {
			title = page.data.meta.title;
			date = page.data.meta.date;
			author = page.data.meta.author;
			description = page.data.meta.description;
			readingTime = page.data.meta.readingTime;
			tags = page.data.meta.tags;
			categories = page.data.meta.categories;
		}
	});

	onMount(() => {
		mounted = true;

		const codeBlocks = document.querySelectorAll<HTMLPreElement>(
			'pre.language-mermaid, pre > code.language-mermaid'
		);
		codeBlocks.forEach((node) => {
			const pre = node.tagName === 'CODE' ? node.parentElement : node;
			if (pre && !pre.classList.contains('mermaid')) {
				pre.classList.add('mermaid');
				pre.textContent = (node as HTMLElement).textContent ?? '';
			}
		});

		mermaid.initialize({ startOnLoad: false, theme: 'dark' });
		mermaid.run();
	});
</script>

<svelte:head>
	{#if title}
		<title>{title} | MerginIT Blog</title>
		<meta name="description" content={description || `${title} - MerginIT Blog Post`} />
	{/if}
</svelte:head>

<div class="min-h-screen bg-brand-dark">
	<div class="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
		<!-- Link back to blog -->
		{#if page.route.id !== '/blog'}
			<div class="mb-8">
				<a href="/blog" class="text-gray-400 hover:text-brand transition-colors duration-200">
					&larr; Back to Blog
				</a>
			</div>
		{/if}

		<!-- Blog Header -->
		{#if mounted && page.route.id !== '/blog'}
			<header
				class="relative mb-12 rounded-3xl p-8 border border-gray-700/70 bg-blue-950/10 backdrop-blur-md"
				transition:fade
			>
				<BorderBeam
					size={180}
					duration={10}
					anchor={45}
					class="absolute top-0 left-0 w-full h-full z-0 opacity-30 group-hover:opacity-60 transition-opacity"
				/>

				<div class="relative z-10">
					<!-- Post Metadata -->
					<div class="flex flex-wrap items-center text-sm text-gray-400 mb-4 justify-between gap-4">
						<div class="flex flex-wrap gap-5">
							<time datetime={new Date(date).toISOString()}>
								{new Date(date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</time>
							{#if author}
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
									{author}
								</span>
							{/if}
							{#if readingTime}
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
										><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg
									>
									{readingTime} read
								</span>
							{/if}
						</div>

						{#if tags && tags.length > 0}
							<div>
								<div class="flex flex-wrap gap-2">
									{#each tags as tag}
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
						{title}
					</h2>
					<p class="text-gray-300 mb-4 line-clamp-3">
						{description}
					</p>

					<!-- Categories & Tags -->
					{#if (categories && categories.length > 0) || (tags && tags.length > 0)}
						<div class="mt-6 space-y-4">
							{#if categories && categories.length > 0}
								<div>
									<h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
										Categories
									</h4>
									<div class="flex flex-wrap gap-2">
										{#each categories as category}
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
			</header>
		{/if}

		<!-- Blog Content -->
		<article class="prose prose-invert prose-lg max-w-none">
			{@render children()}
		</article>
	</div>
</div>
