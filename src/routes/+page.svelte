<script lang="ts">
	import FancyText from '$lib/components/FancyText.svelte';
	import OverlayMenu from '$lib/components/OverlayMenu.svelte';
	import NumberTicker from '$lib/components/NumberTicker.svelte';
	import BorderBeam from '$lib/components/BorderBeam.svelte';
	import VideoPreview from '$lib/components/VideoPreview.svelte';
	import Icon from '@iconify/svelte';
	import type { ProjectItem } from '$lib/types';
	import { browser } from '$app/environment';

	let isFirefox = $state(false);
	let currentFaviconElement = $state<HTMLElement | null>(null);
	let currentWebsiteUrl = $state<string | null>(null);
	let currentVideoUrl = $state<string | undefined>(undefined);
	let hoverTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
	let videoPreviewRef: any = $state();
	let showVideo = $state(false);
	let hoveredCardIndex = $state<number | null>(null);
	let playButtonOutIndex = $state<number | null>(null);
	let outAnimationTimeout: ReturnType<typeof setTimeout> | null = null;

	$effect(() => {
		if (browser) {
			isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
		}
	});

	$effect(() => {
		return () => {
			if (hoverTimeout) {
				clearTimeout(hoverTimeout);
			}
			if (outAnimationTimeout) {
				clearTimeout(outAnimationTimeout);
			}
			if (browser && document.body.classList.contains('video-preview-open')) {
				document.body.classList.remove('video-preview-open');
			}
		};
	});

	function handleCardMouseEnter(index: number) {
		if (outAnimationTimeout) {
			clearTimeout(outAnimationTimeout);
			outAnimationTimeout = null;
		}

		// If we're moving from one card to another, trigger out animation for the previous card
		if (hoveredCardIndex !== null && hoveredCardIndex !== index) {
			const previousIndex = hoveredCardIndex;

			// Start out animation immediately
			playButtonOutIndex = previousIndex;
			hoveredCardIndex = null;

			// Set new hovered card after a tiny delay to allow out animation to start
			setTimeout(() => {
				hoveredCardIndex = index;
				// Clear out animation for the new card if it was previously animating out
				if (playButtonOutIndex === index) {
					playButtonOutIndex = null;
				}
			}, 10);

			// Remove the out animation class after animation completes
			setTimeout(() => {
				if (playButtonOutIndex === previousIndex) {
					playButtonOutIndex = null;
				}
			}, 150);
		} else {
			// Set the new hovered card immediately if no transition
			hoveredCardIndex = index;
			// Clear out animation for the new card if it was previously animating out
			if (playButtonOutIndex === index) {
				playButtonOutIndex = null;
			}
		}
	}

	function handleCardMouseLeave() {
		if (hoveredCardIndex !== null) {
			const currentIndex = hoveredCardIndex;
			hoveredCardIndex = null;

			// Start out animation
			playButtonOutIndex = currentIndex;

			// Remove the out animation class after animation completes
			outAnimationTimeout = setTimeout(() => {
				if (playButtonOutIndex === currentIndex) {
					playButtonOutIndex = null;
				}
			}, 150);
		}
	}

	function handlePlayButtonClick(event: MouseEvent, faviconImg: HTMLElement) {
		event.preventDefault();
		event.stopPropagation();

		if (!showVideo) {
			currentFaviconElement = faviconImg;
			// Get the project data to extract the website URL
			const cardIndex = parseInt(faviconImg.id.split('-')[1]);
			const project = projects[cardIndex];
			currentWebsiteUrl = project?.url || null;
			currentVideoUrl = project?.videoUrl;

			showVideo = true;
			hoveredCardIndex = null; // Hide play button
			// Add body class to prevent scrolling
			if (browser) {
				document.body.classList.add('video-preview-open');
			}
		}
	}

	function handleVideoClose() {
		// Remove body class to restore scrolling
		if (browser) {
			document.body.classList.remove('video-preview-open');
		}
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
		}

		// Call the hide method on the component first (this triggers the out animation)
		if (videoPreviewRef) {
			videoPreviewRef.hide();
		} else {
			showVideo = false;
			currentFaviconElement = null;
		}
	}

	function handleAnimationComplete() {
		// Called from the VideoPreview component after the out animation completes
		showVideo = false;
		currentFaviconElement = null;
		currentWebsiteUrl = null;
		currentVideoUrl = undefined;
	}

	const projects: ProjectItem[] = [
		{
			projectType: 'SaaS Website',
			category: 'OCR Solution',
			productName: 'OCRMD',
			date: 'launched April 2025',
			datetime: '2025-04-22',
			mainTech: 'React',
			description:
				'OCRMD.com transforms scanned images and PDFs into editable Markdown. Features include AI-enhanced text recognition with formatting, math equations, tables, and image detection at high accuracy. Secure cloud storage and full-text search capabilities make your documents accessible anywhere.',
			iconSrc: '/ocrmd-icon.webp',
			url: 'https://ocrmd.com',
			videoUrl:
				'https://player.vimeo.com/video/1102620409?badge=0&autopause=0&player_id=0&app_id=58479'
		},
		{
			projectType: 'Desktop App',
			category: 'Offline OCR',
			productName: 'PixToText',
			date: 'launched November 2025',
			datetime: '2025-11-28',
			mainTech: 'Tauri & SolidJS',
			description:
				'Turn screenshots into editable text in seconds. PixToText provides free offline OCR using Tesseract, PaddleOCR, and native system engines, plus document conversion and translation. Fully local and private.',
			iconSrc: '/pix-to-text.webp',
			url: 'https://jonasfroeller.itch.io/pixtotext'
		},
		{
			projectType: 'Chrome Browser Extension',
			category: 'Productivity Tool',
			productName: 'Element Snap',
			date: 'launched September 2025',
			datetime: '2025-09-02',
			mainTech: 'Vanilla JS & Chrome API',
			description:
				'The lightweight, reliable way to capture pixel-perfect screenshots of any visible HTML element. Features include pixel-perfect capture, live padding controls, rounded corners, and full element stitching. Built with zero libraries for maximum speed and privacy.',
			iconSrc: '/element-snap.webp',
			url: 'https://chromewebstore.google.com/detail/element-snap/nldbbahmckpcjcbikdaopeaiidhdomkf'
		},
		{
			projectType: 'Chrome Browser Extension',
			category: 'Element Inspector',
			productName: 'Contexxt',
			date: 'launched February 2026',
			datetime: '2026-02-06',
			mainTech: 'WXT & TS',
			description:
				'Powerful, overlay-based tool to inspect images, videos, and element styles directly on the page. Get instant access to source URLs, dimensions, file sizes, and computed CSS without digging through DevTools.',
			iconSrc: '/contexxt.webp',
			url: 'https://github.com/merginit/contexxt.extension'
		},
		{
			projectType: 'Chrome Browser Extension',
			category: 'Privacy Tool',
			productName: 'NoJack Zone',
			date: 'launched February 2026',
			datetime: '2026-02-09',
			mainTech: 'Plasmo & TSX React',
			description:
				"Prevents websites from hijacking your browser's keyboard shortcuts. NoJack Zone ensures your standard browser shortcuts always work, keeping you in control of your browsing workflow.",
			iconSrc: '/no-jack-zone.webp',
			url: 'https://github.com/merginit/no-jack-zone.extension'
		},
		/* {
			projectType: 'SaaS Website',
			category: 'Productivity Tool',
			productName: 'Markdown Blog',
			date: 'launched February 2026',
			datetime: '2026-02-01',
			mainTech: 'React',
			description:
				'Markdown Blog is a Markdown blog-post generator with focus on accuracy and SEO.',
			iconSrc: '/markdownblog.ico',
			url: 'https://markdownblog.dev'
		}, */
		/* {
			projectType: 'Desktop App',
			category: 'Branding',
			productName: 'Brand Peel',
			date: 'launched February 2026',
			datetime: '2026-02-01',
			mainTech: 'Neutralinojs & Vue',
			description:
				'Brand Peel is a brand kit generator that helps you create stunning logos and complete design systems. Skip the expensive designer and build a professional brand identity in minutes, not months.',
			iconSrc: '/unpeeled.png',
			url: 'https://brandpeel.merginit.com'
		}, */
		/* {
			projectType: 'Desktop App',
			category: 'Image Processing',
			productName: 'Foddo',
			date: 'launched March 2026',
			datetime: '2026-03-01',
			mainTech: 'Photino & Blazor',
			description:
				'High-performance batch image processing tool. Change file formats, resize, rotate, crop, do color adjustments, apply filters, and much more. Also supports image compression and watermartking both visible and invisible.',
			iconSrc: '/foddo.ico',
			url: 'https://foddo.merginit.com'
		},
		{
			projectType: 'Desktop App',
			category: 'Productivity Tool',
			productName: 'Dupe Zappa',
			date: 'launched May 2026',
			datetime: '2026-05-01',
			mainTech: 'Wails & React',
			description:
				'Deduplicate your files with ease to save space and time.',
			iconSrc: '/dupezappa.png',
			url: 'https://dupezappa.merginit.com'
		},
		{
			projectType: 'Desktop App',
			category: 'Screen Recorder',
			productName: 'AUFZEICHNA',
			date: 'will launch 2026',
			datetime: '2026-01-01',
			mainTech: 'Tauri & Svelte',
			description:
				'AUFZEICHNA is a cross-platform screen recorder with cinematic auto-zoom, smooth cursors, and motion blur. It includes the AUFMOTZA editor to tune recordings with one-click zooms and motion blur effects.',
			iconSrc: 'https://aufzeichna.merginit.com/favicon.png',
			url: 'https://aufzeichna.merginit.com'
		},
		{
			projectType: 'SaaS Website',
			category: 'Product Directory',
			productName: '42 Websites',
			date: 'will launch 2026',
			datetime: '2026-01-01',
			mainTech: 'Next.js',
			description:
				'A product directory with a focus on SEO and Changelog capabilities.',
			iconSrc: '/42websites.png',
			url: 'https://42websites.com'
		},
		{
			projectType: 'Mobile App',
			category: 'Social Media',
			productName: 'NASDA',
			date: 'will launch 2026',
			datetime: '2026-01-01',
			mainTech: 'React Native',
			description:
				'Nua a Schweindal drinkt alla.',
			iconSrc: '/nasdaapp.png',
			url: 'https://nasdaapp.com'
		}, */
		/* {
			projectType: 'Open Source Website & AI',
			category: 'Configuration Platform',
			productName: 'NeptunAI',
			date: '2024-2025',
			datetime: '2024-01-01',
			mainTech: 'Nuxt',
			description:
				'NeptunAI is a comprehensive configuration platform combining a CLI tool, WebUI, and AI trained on CICD and web development technologies to streamline your configuration workflow.',
			iconSrc: '/neptunai-icon.webp',
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
		} */
	];
</script>

<svelte:head>
	<title>MerginIT e.U. - Professional Software Development & SaaS Solutions</title>
	<meta
		name="description"
		content="MerginIT e.U. delivers cutting-edge software solutions including OCRMD for document processing, NeptunAI configuration platform, and custom web development services. 3 successful projects and growing."
	/>
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
			<NumberTicker value={1 + 3 + 18 + 2 + 3} initial={0} duration={1500} />+
		</div>
		<h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-center text-white mt-2 md:mt-4">
			Websites Built
		</h2>
	</section>
	<section class="bg-brand-dark flex flex-col justify-center items-center py-20">
		<h2
			class="text-4xl sm:text-5xl md:text-6xl font-bold text-[#ffaa40] mb-12 sm:mb-16 text-center tracking-tight"
		>
			Our Main Projects
		</h2>
		<div class="projects-grid gap-8 w-full max-w-7xl min-[1800px]:max-w-none min-[1800px]:px-12">
			{#each projects as project, i}
				{@const faviconId = `favicon-${i}`}
				<div
					class="group relative w-full"
					onmouseenter={() => handleCardMouseEnter(i)}
					onmouseleave={handleCardMouseLeave}
					role="group"
					aria-label={project.productName}
				>
					<article
						class="flex flex-col items-start justify-between rounded-3xl p-6 sm:p-7 border border-gray-700/70 bg-blue-950/10 backdrop-blur-md shadow-md group-hover:shadow-brand/20 transition-all duration-300 ease-in-out group-hover:border-brand/70 transform group-hover:-translate-y-1 w-full h-full relative"
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
						class="absolute inset-0 z-10"
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

					<div class="relative z-10 mt-4">
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

					<div class="relative z-10 mt-auto mb-1 w-full flex justify-end">
						<a
							href={project.url}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-brand transition-colors relative z-40 group-link min-h-[40px] px-2"
							onclick={(e) => e.stopPropagation()}
						>
							<span class="whitespace-nowrap"
								>{new URL(project.url).hostname.replace('www.', '')}</span
							>
							<Icon icon="lucide:external-link" class="w-4 h-4 shrink-0" />
						</a>
					</div>

					<div
						class="relative z-10 mt-2 flex items-center gap-x-4 w-full pt-4 border-t border-gray-700/50"
					>
						<div class="relative favicon-container">
							<img
								id={faviconId}
								src={project.iconSrc}
								alt={`${project.projectType} favicon`}
								width="40"
								height="40"
								class="h-10 w-10 rounded-full bg-gray-700 {project.productName === 'Element Snap'
									? 'p-0.5'
									: 'p-[1.3px]'} object-contain border border-gray-600 shadow favicon-trigger"
							/>

							{#if hoveredCardIndex === i || playButtonOutIndex === i}
								<button
									class="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full backdrop-blur-sm transition-all duration-300 ease-out play-button z-50 {playButtonOutIndex ===
									i
										? 'out'
										: ''}"
									onclick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										const faviconImg = document.getElementById(faviconId);
										if (faviconImg) handlePlayButtonClick(e, faviconImg);
									}}
									aria-label="Play project demo video"
								>
									<Icon icon="lucide:play" class="w-4 h-4 text-white ml-0.5" />
								</button>
							{/if}
						</div>
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
				</div>
			{/each}
		</div>
	</section>
</div>

{#if showVideo}
	<VideoPreview
		bind:this={videoPreviewRef}
		bind:faviconElement={currentFaviconElement}
		websiteUrl={currentWebsiteUrl ?? undefined}
		videoUrl={currentVideoUrl}
		onClose={handleAnimationComplete}
		onCloseRequest={handleVideoClose}
	/>
{/if}

<style>
	:global(.favicon-trigger) {
		transition: transform 0.3s ease;
		will-change: transform;
	}

	:global(.group:hover .favicon-trigger) {
		transform: scale(1.1);
	}

	/* Ensure smooth hover transition for cards */
	:global(.group) {
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease,
			border-color 0.3s ease;
		will-change: transform;
	}

	/* Prevent layout shifts during video animation */
	:global(body.video-preview-open) {
		overflow: hidden;
	}

	/* Improve performance */
	:global(.group:hover) {
		transform: translateY(-4px);
	}

	/* Play button animation */
	.play-button {
		animation: playButtonIn 0.3s ease-out forwards;
		transform-origin: center;
		z-index: 50 !important;
		pointer-events: all;
	}

	/* Play button out animation - faster */
	.play-button.out {
		animation: playButtonOut 0.15s ease-in forwards;
	}

	@keyframes playButtonIn {
		from {
			transform: scale(0);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes playButtonOut {
		from {
			transform: scale(1);
			opacity: 1;
		}
		to {
			transform: scale(0);
			opacity: 0;
		}
	}

	.play-button:hover {
		background-color: rgba(0, 0, 0, 0.85);
		transform: scale(1.1);
	}

	.play-button:active {
		transform: scale(0.95);
	}

	/* Ensure the favicon container allows for proper layering */
	.favicon-container {
		position: relative;
		z-index: 1;
	}

	/* Website link in card styling */
	.group-link {
		text-decoration: none;
	}

	.group-link:hover {
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 2px;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}

	@media (min-width: 900px) {
		.projects-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 1800px) {
		.projects-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
