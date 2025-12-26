<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		videos: string[];
		aspectRatio?: '9/16' | '16/9' | '1/1';
		height?: string;
	}

	let { videos, aspectRatio = '9/16', height = '70vh' }: Props = $props();

	let currentIndex = $state(0);
	let isMuted = $state(true);
	let containerRef: HTMLDivElement;
	let videoRefs: HTMLVideoElement[] = [];
	let slideRefs: HTMLDivElement[] = [];
	let loadingStates = $state<boolean[]>(videos.map(() => true));
	let loadedVideos = $state<Set<number>>(new Set());

	// Generate poster URL from video URL (e.g., video.mp4 -> video-thumb.webp)
	function getPosterUrl(videoUrl: string): string {
		return videoUrl.replace(/\.mp4$/, '-thumb.webp');
	}

	onMount(() => {
		// Intersection Observer for lazy loading
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const index = slideRefs.indexOf(entry.target as HTMLDivElement);
					if (index === -1) return;

					if (entry.isIntersecting && !loadedVideos.has(index)) {
						// Start loading this video and adjacent ones
						const indicesToLoad = [index - 1, index, index + 1].filter(
							(i) => i >= 0 && i < videos.length && !loadedVideos.has(i)
						);

						indicesToLoad.forEach((i) => {
							loadedVideos.add(i);
							loadedVideos = new Set(loadedVideos);
							const video = videoRefs[i];
							if (video) {
								video.load();
							}
						});
					}
				});
			},
			{ root: containerRef, threshold: 0.1 }
		);

		slideRefs.forEach((slide) => {
			if (slide) observer.observe(slide);
		});

		// Load first video immediately
		loadedVideos.add(0);
		loadedVideos = new Set(loadedVideos);

		return () => observer.disconnect();
	});

	function handleScroll() {
		if (!containerRef) return;
		const scrollTop = containerRef.scrollTop;
		const itemHeight = containerRef.clientHeight;
		const newIndex = Math.round(scrollTop / itemHeight);
		if (newIndex !== currentIndex) {
			currentIndex = newIndex;
			updateVideoPlayback();
		}
	}

	function updateVideoPlayback() {
		videoRefs.forEach((video, index) => {
			if (!video) return;
			if (index === currentIndex) {
				video.play();
			} else {
				video.pause();
				video.currentTime = 0;
			}
		});
	}

	function scrollToIndex(index: number) {
		if (!containerRef) return;
		const itemHeight = containerRef.clientHeight;
		containerRef.scrollTo({
			top: index * itemHeight,
			behavior: 'smooth'
		});
	}

	function toggleMute() {
		isMuted = !isMuted;
		videoRefs.forEach(video => {
			if (video) video.muted = isMuted;
		});
	}

	function handleVideoLoaded(index: number) {
		loadingStates[index] = false;
	}
</script>

<div class="video-swiper-wrapper" style="--swiper-height: {height};">
	<div
		bind:this={containerRef}
		class="video-swiper-container"
		onscroll={handleScroll}
	>
	{#each videos as videoUrl, index}
			<div bind:this={slideRefs[index]} class="video-slide" style="--aspect-ratio: {aspectRatio};">
				{#if loadingStates[index]}
					<div class="loading-overlay">
						<div class="spinner"></div>
					</div>
				{/if}
				<video
					bind:this={videoRefs[index]}
					src={loadedVideos.has(index) ? videoUrl : undefined}
					poster={getPosterUrl(videoUrl)}
					class="video-element"
					autoplay={index === 0}
					loop
					muted={isMuted}
					playsinline
					preload={loadedVideos.has(index) ? 'auto' : 'none'}
					oncanplaythrough={() => handleVideoLoaded(index)}
				>
					<track kind="captions" />
				</video>
				<div class="video-index">{index + 1}/{videos.length}</div>
			</div>
		{/each}
	</div>

	<!-- Sound toggle -->
	<button class="sound-toggle" onclick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
		{#if isMuted}
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>
		{/if}
	</button>

	<!-- Dot indicators -->
	<div class="swiper-dots">
		{#each videos as _, index}
			<button
				class="swiper-dot"
				class:active={index === currentIndex}
				onclick={() => scrollToIndex(index)}
				aria-label="Go to video {index + 1}"
			></button>
		{/each}
	</div>
</div>

<style>
	.video-swiper-wrapper {
		position: relative;
		height: var(--swiper-height);
		max-width: 400px;
		margin: 2rem 0;
		border-radius: 16px;
		overflow: hidden;
		background: #1a1a1a;
		box-shadow:
			0 4px 24px rgba(0, 0, 0, 0.4),
			0 0 0 1px rgba(255, 255, 255, 0.1);
	}

	.video-swiper-container {
		height: 100%;
		overflow-y: scroll;
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.video-swiper-container::-webkit-scrollbar {
		display: none;
	}

	.video-slide {
		height: 100%;
		scroll-snap-align: start;
		scroll-snap-stop: always;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		background: #0f0f0f;
	}

	.video-element {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.loading-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		z-index: 5;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 3px solid rgba(245, 215, 0, 0.2);
		border-top-color: #f5d700;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
		background: rgba(0, 0, 0, 0.5);
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.video-index {
		position: absolute;
		top: 12px;
		left: 12px;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(8px);
		color: #fff;
		font-size: 0.75rem;
		font-weight: 600;
		padding: 4px 10px;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.15);
		z-index: 10;
	}

	.sound-toggle {
		position: absolute;
		top: 12px;
		right: 12px;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(8px);
		color: #fff;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 50%;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 20;
		transition: background 0.2s ease;
	}

	.sound-toggle:hover {
		background: rgba(0, 0, 0, 0.85);
	}

	/* Dot Navigation */
	.swiper-dots {
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		gap: 8px;
		z-index: 20;
	}

	.swiper-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgba(245, 215, 0, 0.35);
		border: none;
		cursor: pointer;
		transition: all 0.25s ease;
		padding: 0;
	}

	.swiper-dot:hover {
		background: rgba(245, 215, 0, 0.6);
		transform: scale(1.2);
	}

	.swiper-dot.active {
		background: #f5d700;
		transform: scale(1.3);
		box-shadow: 0 0 8px rgba(245, 215, 0, 0.5);
	}

	/* Responsive */
	@media (max-width: 480px) {
		.video-swiper-wrapper {
			max-width: 100%;
			border-radius: 0;
			margin: 1rem 0;
		}
	}
</style>
