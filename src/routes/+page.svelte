<script lang="ts">
	import FancyText from '$lib/components/FancyText.svelte';
	import OverlayMenu from '$lib/components/OverlayMenu.svelte';
	import NumberTicker from '$lib/components/NumberTicker.svelte';
	import BorderBeam from '$lib/components/BorderBeam.svelte';
	import type { ProjectItem } from '$lib/types';
	import { browser } from '$app/environment';

	let isFirefox = false;

	$: if (browser) {
		isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
	}

	const projects: ProjectItem[] = [
		{
			projectType: 'SaaS Website',
			category: 'OCR Solution',
			productName: 'OCRMD',
			date: '2025',
			datetime: '2025-01-01',
			mainTech: 'React',
			description:
				'OCRMD.com transforms scanned images and PDFs into editable Markdown. Features include AI-enhanced text recognition with formatting, math equations, tables, and image detection at 90-99% accuracy. Secure cloud storage and full-text search capabilities make your documents accessible anywhere.',
			iconSrc: 'https://ocrmd.com/favicon.png',
			url: 'https://ocrmd.com'
		},
		{
			projectType: 'Open Source Website & AI',
			category: 'Configuration Platform',
			productName: 'NeptunAI',
			date: '2024-2025',
			datetime: '2024-01-01',
			mainTech: 'Nuxt',
			description:
				'NeptunAI is a comprehensive configuration platform combining a CLI tool, WebUI, and AI trained on CICD and web development technologies to streamline your configuration workflow.',
			iconSrc: 'https://neptunai.tech/favicon.png',
			url: 'https://neptunai.tech'
		},
		{
			projectType: 'Website',
			category: 'Indie-Pop Band',
			productName: 'Täglich frisches Obst',
			date: '2023',
			datetime: '2023-01-01',
			mainTech: 'SvelteKit',
			description:
				'Founded in 2022, this Linz-based indie-pop band blends funk, rock, and jazz elements into their unique sound. The five-piece band has released multiple singles and built a dedicated following through their distinctive style and energetic live performances.',
			iconSrc: 'https://taeglichfrischesobst.com/assets/images/fruit.png',
			url: 'https://taeglichfrischesobst.com'
		}
	];
</script>

<svelte:head>
	<title>MerginIT e.U. - Professional Software Development & SaaS Solutions</title>
	<meta 
		name="description" 
		content="MerginIT e.U. delivers cutting-edge software solutions including OCRMD for document processing, NeptunAI configuration platform, and custom web development services. 3 successful projects and growing."
	/>
	<meta property="og:title" content="MerginIT e.U. - Professional Software Development & SaaS Solutions" />
	<meta property="og:description" content="MerginIT e.U. delivers cutting-edge software solutions including OCRMD for document processing, NeptunAI configuration platform, and custom web development services. 3 successful projects and growing." />
	<meta property="og:url" content="https://merginit.com" />
	<meta name="twitter:title" content="MerginIT e.U. - Professional Software Development & SaaS Solutions" />
	<meta name="twitter:description" content="MerginIT e.U. delivers cutting-edge software solutions including OCRMD for document processing, NeptunAI configuration platform, and custom web development services. 3 successful projects and growing." />
</svelte:head>

<OverlayMenu />

<div
	class="min-h-screen bg-brand-dark flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36"
>
	<section class="w-full md:ml-auto md:w-auto pt-16 mb-8 md:mb-0">
		<h1
			class="text-center md:text-left text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-9xl font-bold tracking-tighter"
		>
			{#if isFirefox}
				<span class="text-accent">MerginIT</span>
			{:else}
				<FancyText>MerginIT</FancyText>
			{/if}
			e.U.
		</h1>
	</section>
	<section class="flex flex-col items-center md:flex-row md:items-baseline gap-1 md:gap-3">
		<div
			class="whitespace-pre-wrap text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-medium tracking-tighter text-white"
		>
			<NumberTicker value={3} initial={0} duration={1500} />
		</div>
		<h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-center text-white mt-2 md:mt-4">
			Websites Built
		</h2>
	</section>
	<section
		class="bg-brand-dark flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 py-20"
	>
		<h2
			class="text-4xl sm:text-5xl md:text-6xl font-bold text-[#ffaa40] mb-12 sm:mb-16 text-center tracking-tight"
		>
			Our Projects
		</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
			{#each projects as project, i}
				<article
					class="group relative flex h-full flex-col items-start justify-between rounded-3xl p-6 sm:p-7 border border-gray-700/70 bg-blue-950/10 backdrop-blur-md shadow-md hover:shadow-brand/20 transition-all duration-300 ease-in-out hover:border-brand/70 transform hover:-translate-y-1"
				>
					<BorderBeam
						size={180}
						duration={10}
						delay={i * 0.2}
						anchor={[10, 45, 80][i % 3]}
						class="absolute top-0 left-0 w-full h-full z-0 opacity-30 group-hover:opacity-60 transition-opacity"
					/>

					<a
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						class="absolute inset-0 z-20"
						aria-label={'View ' + project.projectType}
					></a>

					<div class="relative z-10 flex w-full items-center justify-between gap-x-4 text-xs">
						<time datetime={project.datetime} class="text-gray-400">{project.date}</time>
						<span
							class="cursor-default relative z-30 rounded-full bg-gray-800/80 px-3 py-1.5 font-medium text-white border border-gray-400/60 shadow-sm"
						>
							{project.mainTech}
						</span>
					</div>

					<div class="relative z-10 mt-4 flex-grow">
						<h3
							class="text-xl font-semibold leading-7 text-gray-100 group-hover:text-white transition-colors"
						>
							{project.productName}
						</h3>
						<p
							class="mt-3 text-sm leading-relaxed text-gray-300 group-hover:text-gray-200 transition-colors line-clamp-6"
						>
							{project.description}
						</p>
					</div>

					<div
						class="relative z-10 mt-6 flex items-center gap-x-4 w-full pt-4 border-t border-gray-700/50"
					>
						<img
							src={project.iconSrc}
							alt={`${project.projectType} favicon`}
							class="h-10 w-10 rounded-full bg-gray-700 p-1 object-contain border border-gray-600 shadow"
						/>
						<div class="text-sm leading-5">
							<p class="font-semibold text-gray-200 group-hover:text-white transition-colors">
								{project.category}
							</p>
							<p class="text-gray-400 group-hover:text-gray-300 transition-colors text-xs">
								{project.projectType}
							</p>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</section>
</div>
