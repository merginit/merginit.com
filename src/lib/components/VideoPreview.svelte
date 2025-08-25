<script lang="ts">
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';

	interface Props {
		faviconElement: HTMLElement | null;
		videoUrl?: string;
		websiteUrl?: string;
		onClose: () => void;
		onCloseRequest?: () => void;
	}

	let {
		faviconElement = $bindable(),
		videoUrl = 'https://player.vimeo.com/video/1102620409?badge=0&autopause=0&player_id=0&app_id=58479',
		websiteUrl,
		onClose,
		onCloseRequest
	}: Props = $props();

	let videoContainer: HTMLDivElement;
	let overlay: HTMLDivElement;
	let timeline: gsap.core.Timeline;
	let isVisible = $state(false);
	let isAnimating = $state(false);
	let isInitialized = $state(false);

	function getDomainFromUrl(url: string): string {
		try {
			const urlObj = new URL(url);
			return urlObj.hostname.replace('www.', '');
		} catch {
			return url;
		}
	}

	onMount(() => {
		if (!browser) return;

		timeline = gsap.timeline({
			paused: true,
			onStart: () => {
				isAnimating = true;
			},
			onComplete: () => {
				isAnimating = false;
			}
		});

		gsap.set(overlay, {
			opacity: 0,
			pointerEvents: 'none',
			zIndex: 9999
		});

		gsap.set(videoContainer, {
			scale: 0,
			opacity: 0,
			transformOrigin: 'center center',
			position: 'fixed'
		});

		setTimeout(() => {
			isInitialized = true;
			if (faviconElement) {
				showVideo();
			}
		}, 50);

		return () => {
			timeline?.kill();
		};
	});

	export function show() {
		if (!isInitialized || !timeline || !faviconElement || isAnimating || isVisible) return;

		isVisible = true;
		requestAnimationFrame(() => {
			showVideo();
		});
	}

	export function hide() {
		if (!isInitialized || !timeline || isAnimating) return;

		hideVideo();
	}

	function showVideo() {
		if (!timeline || !faviconElement) return;

		// Get favicon position and size
		const faviconRect = faviconElement.getBoundingClientRect();
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		// Calculate responsive video size
		const maxWidth = Math.min(windowWidth * 0.85, 800);
		const maxHeight = Math.min(windowHeight * 0.85, 450);
		const aspectRatio = 16 / 9;

		let videoWidth = maxWidth;
		let videoHeight = videoWidth / aspectRatio;

		if (videoHeight > maxHeight) {
			videoHeight = maxHeight;
			videoWidth = videoHeight * aspectRatio;
		}

		// Position video container at favicon location initially
		gsap.set(videoContainer, {
			width: faviconRect.width,
			height: faviconRect.height,
			left: faviconRect.left + faviconRect.width / 2,
			top: faviconRect.top + faviconRect.height / 2,
			x: '-50%',
			y: '-50%',
			scale: 0.1,
			opacity: 0,
			borderRadius: '50%'
		});

		// Enable overlay interactions
		gsap.set(overlay, { pointerEvents: 'all' });

		// Create smooth animation sequence
		timeline
			.clear()
			.to(overlay, {
				opacity: 1,
				duration: 0.4,
				ease: 'power2.out'
			})
			.to(
				videoContainer,
				{
					scale: 1,
					opacity: 1,
					duration: 0.3,
					ease: 'power2.out'
				},
				0.1
			)
			.to(
				videoContainer,
				{
					width: videoWidth,
					height: videoHeight,
					left: '50%',
					top: '50%',
					borderRadius: '12px',
					duration: 0.7,
					ease: 'power3.out'
				},
				0.2
			)
			.play();
	}

	function hideVideo() {
		if (!timeline || !faviconElement) return;

		const faviconRect = faviconElement.getBoundingClientRect();

		timeline
			.clear()
			.to(videoContainer, {
				width: faviconRect.width,
				height: faviconRect.height,
				left: faviconRect.left + faviconRect.width / 2,
				top: faviconRect.top + faviconRect.height / 2,
				borderRadius: '50%',
				duration: 0.4,
				ease: 'power2.inOut'
			})
			.to(
				videoContainer,
				{
					scale: 0.1,
					opacity: 0,
					duration: 0.25,
					ease: 'power2.in'
				},
				0.2
			)
			.to(
				overlay,
				{
					opacity: 0,
					duration: 0.3,
					ease: 'power2.out',
					onComplete: () => {
						gsap.set(overlay, { pointerEvents: 'none' });
						onClose();
					}
				},
				0.1
			)
			.play();
	}

	function handleOverlayClick() {
		if (!isAnimating) {
			if (onCloseRequest) {
				onCloseRequest();
			} else {
				hideVideo();
			}
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && !isAnimating) {
			if (onCloseRequest) {
				onCloseRequest();
			} else {
				hideVideo();
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Video overlay -->
<div
	bind:this={overlay}
	class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center"
	onclick={handleOverlayClick}
	role="button"
	tabindex="0"
>
	<!-- Video container -->
	<div
		bind:this={videoContainer}
		class="absolute bg-black overflow-hidden shadow-2xl"
		onclick={(e) => e.stopPropagation()}
		role="dialog"
		tabindex="-1"
	>
		<!-- Video iframe -->
		<iframe
			src={videoUrl}
			frameborder="0"
			allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			class="w-full h-full"
			title="Project demo video"
		></iframe>
	</div>

	{#if websiteUrl}
		<div class="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
			<a
				href={websiteUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="relative flex items-center gap-2 px-3 py-2 bg-black/70 text-white rounded-lg backdrop-blur-sm text-sm font-medium border-2 border-transparent hover:border-accent transition-all duration-300 ease-out"
				onclick={(e) => e.stopPropagation()}
			>
				<Icon icon="lucide:external-link" class="w-4 h-4 text-gray-300" />
				<span class="text-gray-300">
					{getDomainFromUrl(websiteUrl)}
				</span>
			</a>
		</div>
	{/if}

	<button
		class="absolute top-20 right-20 w-10 h-10 bg-black/70 hover:bg-black/85 text-white rounded-full flex items-center justify-center transition-colors z-20"
		onclick={handleOverlayClick}
		aria-label="Close video"
	>
		<Icon icon="lucide:x" class="w-5 h-5" />
	</button>
</div>

<style>
	/* Ensure video scales properly */
	:global(body.video-preview-open) {
		overflow: hidden;
	}
</style>
