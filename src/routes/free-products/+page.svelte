<script lang="ts">
	import type { Product } from '$lib/types';
	import Icon from '@iconify/svelte';
	import BorderBeam from '$lib/components/BorderBeam.svelte';

	const products: Product[] = [
		{
			name: 'Page To Markdown Extension',
			url: 'https://github.com/jonasfroeller/page-to-markdown-extension',
			description: 'Convert web pages to Markdown format',
			icon: 'mdi:language-markdown'
		},
		{
			name: 'Youtube Subscriptions Exporter',
			url: 'https://github.com/jonasfroeller/youtube-subscriptions-exporter-extension',
			description: 'Export YouTube subscriptions easily',
			icon: 'mdi:youtube'
		}
	];
</script>

<svelte:head>
	<title>Free Products - MerginIT e.U.</title>
	<meta
		name="description"
		content="Discover our collection of free tools and browser extensions including Page To Markdown Extension and YouTube Subscriptions Exporter."
	/>
	<meta property="og:title" content="Free Products - MerginIT e.U." />
	<meta
		property="og:description"
		content="Discover our collection of free tools and browser extensions including Page To Markdown Extension and YouTube Subscriptions Exporter."
	/>
	<meta property="og:url" content="https://merginit.com/free-products" />
	<meta name="twitter:title" content="Free Products - MerginIT e.U." />
	<meta
		name="twitter:description"
		content="Discover our collection of free tools and browser extensions including Page To Markdown Extension and YouTube Subscriptions Exporter."
	/>
</svelte:head>

<div class="min-h-screen bg-brand-dark px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 py-20">
	<div class="max-w-7xl mx-auto">
		<div class="mb-4 text-center">
			<h1 class="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold text-[#ffaa40] tracking-tight">
				Free Products
			</h1>
			<p class="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
				A collection of useful tools and browser extensions I made available for free
			</p>
		</div>

		<div class="flex justify-center mb-16">
			<a
				href="/"
				class="bg-brand/20 border border-brand/50 hover:bg-brand/30 transition-colors duration-300 ease-in-out rounded-full px-4 py-2 mt-4"
			>
				Home
			</a>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
			{#each products as product, i}
				<article
					class="group relative flex h-full flex-col items-start justify-between rounded-3xl p-6 sm:p-8 border border-gray-700/70 bg-blue-950/10 backdrop-blur-md shadow-md hover:shadow-brand/20 transition-all duration-300 ease-in-out hover:border-brand/70 transform hover:-translate-y-1"
				>
					<BorderBeam
						size={180}
						duration={12}
						delay={i * 0.3}
						anchor={i % 2 === 0 ? 10 : 80}
						class="absolute top-0 left-0 w-full h-full z-0 opacity-30 group-hover:opacity-60 transition-opacity"
					/>

					<a
						href={product.url}
						target="_blank"
						rel="noopener noreferrer"
						class="absolute inset-0 z-20"
						aria-label={`View ${product.name}`}
					></a>

					<div class="relative z-10 flex w-full items-center justify-center mb-6">
						<div
							class="flex justify-center items-center w-16 h-16 flex-shrink-0 text-brand bg-brand/10 rounded-full border border-brand/30 group-hover:bg-brand/20 group-hover:border-brand/50 transition-all duration-300"
						>
							<Icon icon={product.icon} width="32" height="32" />
						</div>
					</div>

					<div
						class="relative z-10 text-center flex-grow flex flex-col justify-center items-center w-full"
					>
						<h3
							class="text-xl sm:text-2xl font-semibold leading-7 text-gray-100 group-hover:text-white transition-colors mb-4"
						>
							{product.name}
						</h3>
						<p
							class="text-sm sm:text-base leading-relaxed text-gray-300 group-hover:text-gray-200 transition-colors"
						>
							{product.description}
						</p>
					</div>

					<div class="relative z-10 mt-6 w-full pt-4 border-t border-gray-700/50 text-center">
						<span
							class="text-xs text-gray-400 group-hover:text-gray-300 transition-colors flex items-center justify-center gap-2"
						>
							<Icon icon="mdi:github" width="20" height="20" /> Click to view on GitHub
						</span>
					</div>
				</article>
			{/each}
		</div>
	</div>
</div>
