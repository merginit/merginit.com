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
	let updateDate = $state('');
	let author = $state('');
	let description = $state('');
	let readingTime = $state('');
	let tags = $state<string[]>([]);
	let categories = $state<string[]>([]);

	$effect(() => {
		if (page.data?.meta) {
			title = page.data.meta.title;
			date = page.data.meta.date;
			updateDate = page.data.meta.updateDate;
			author = page.data.meta.author;
			description = page.data.meta.description;
			readingTime = page.data.meta.readingTime;
			tags = page.data.meta.tags;
			categories = page.data.meta.categories;
		}
	});

	function addCopyButtonToCodeBlock(pre: HTMLPreElement) {
		if (pre.querySelector('.code-copy-btn') || pre.classList.contains('mermaid')) return;

		const button = document.createElement('button');
		button.className = 'code-copy-btn';
		button.type = 'button';

		const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
		const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;

		button.innerHTML = copyIcon;

		button.addEventListener('click', async () => {
			const code = pre.querySelector('code');
			if (!code) return;

			try {
				await navigator.clipboard.writeText(code.textContent || '');

				button.innerHTML = checkIcon;
				button.classList.add('copied');

				setTimeout(() => {
					button.innerHTML = copyIcon;
					button.classList.remove('copied');
				}, 2000);
			} catch (err) {
				console.error('Failed to copy code:', err);
			}
		});

		pre.appendChild(button);
	}

	function setupCodeBlocks() {
		// Setup Mermaid
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

		// setup copy buttons
		const allCodeBlocks = document.querySelectorAll<HTMLPreElement>('pre[class*="language-"]');
		allCodeBlocks.forEach(addCopyButtonToCodeBlock);
	}

	let observer: MutationObserver | null = null;

	onMount(() => {
		mounted = true;

		// ensure content is rendered
		setTimeout(setupCodeBlocks, 1000);

		// watch for dynamically added code blocks
		observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node.nodeType === Node.ELEMENT_NODE) {
						const element = node as Element;

						// check if the added node is a code block
						if (element.tagName === 'PRE' && element.className.includes('language-')) {
							setTimeout(() => addCopyButtonToCodeBlock(element as HTMLPreElement), 50);
						}

						// check for code blocks within the added node
						const codeBlocks = element.querySelectorAll<HTMLPreElement>('pre[class*="language-"]');
						codeBlocks.forEach((pre) => setTimeout(() => addCopyButtonToCodeBlock(pre), 50));
					}
				});
			});
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});

		return () => {
			observer?.disconnect();
		};
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
							{#if updateDate}
								<time datetime={new Date(updateDate).toISOString()}>
									Updated {new Date(updateDate).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</time>
							{:else}
								<time datetime={new Date(date).toISOString()}>
									{new Date(date).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</time>
							{/if}
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
