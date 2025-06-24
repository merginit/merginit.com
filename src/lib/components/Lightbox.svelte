<script lang="ts">
	import Swiper from 'swiper';
	import { Navigation, Zoom } from 'swiper/modules';
	import Icon from '@iconify/svelte';
	import gsap from 'gsap';

	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/zoom';

	let { images = [], onclose }: { images?: string[]; onclose?: (() => void) | undefined } = $props();
	let lightboxOpen = $state(false);
	let swiperInstance = $state<Swiper | null>(null);
	let initialIndex = $state(0);
	let swiperElement = $state<HTMLElement>();

	function open(index: number) {
		initialIndex = index;
		lightboxOpen = true;
		
		// Animate backdrop
		gsap.fromTo(
			'.lightbox-backdrop',
			{ opacity: 0 },
			{ opacity: 1, duration: 0.4, ease: 'power2.out' }
		);
		
		// Animate container with sexy bounce
		gsap.fromTo(
			'.lightbox-container',
			{ scale: 0.3, opacity: 0, rotationX: -15 },
			{ 
				scale: 1, 
				opacity: 1, 
				rotationX: 0,
				duration: 0.8, 
				ease: 'back.out(2.5)',
				delay: 0.1
			}
		);
		
		// Animate images with stagger
		gsap.fromTo(
			'.swiper-slide img',
			{ scale: 0.8, opacity: 0, y: 50 },
			{ 
				scale: 1, 
				opacity: 1, 
				y: 0,
				duration: 0.6, 
				ease: 'power3.out',
				delay: 0.3,
				stagger: 0.1
			}
		);
	}

	function close() {
		// Animate images out first
		gsap.to('.swiper-slide img', {
			scale: 0.8,
			opacity: 0,
			y: -30,
			duration: 0.2,
			ease: 'power2.in'
		});
		
		// Animate container
		gsap.to('.lightbox-container', {
			scale: 0.3,
			opacity: 0,
			rotationX: 15,
			duration: 0.4,
			ease: 'power2.in',
			delay: 0.1
		});
		
		// Animate backdrop
		gsap.to('.lightbox-backdrop', {
			opacity: 0,
			duration: 0.3,
			delay: 0.2,
			onComplete: () => {
				lightboxOpen = false;
				if (swiperInstance) {
					swiperInstance.destroy(true, true);
					swiperInstance = null;
				}
				onclose?.();
			}
		});
	}

	export { open };

	function handleKeydown(event: KeyboardEvent) {
		if (lightboxOpen && event.key === 'Escape') {
			close();
		}
	}

	$effect(() => {
		if (lightboxOpen && swiperElement && !swiperInstance) {
			swiperInstance = new Swiper(swiperElement, {
				modules: [Navigation, Zoom],
				spaceBetween: 10,
				slidesPerView: 1,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				zoom: true,
				initialSlide: initialIndex,
			});
		}
	});
</script>

<svelte:window on:keydown={handleKeydown} />

{#if lightboxOpen}
	<div
		class="lightbox-backdrop fixed inset-0 bg-black/90 z-50 flex items-center justify-center backdrop-blur-sm"
		on:click={close}
		role="dialog"
		aria-modal="true"
	>
		<div
			class="lightbox-container relative w-full h-full max-w-7xl max-h-[90vh] p-4 perspective-1000"
			on:click|stopPropagation
		>
			<button
				on:click={close}
				class="absolute top-4 right-4 z-10 text-white text-4xl hover:text-gray-300 transition-all duration-200 hover:scale-110 hover:rotate-90 bg-black/20 rounded-full p-2 backdrop-blur-sm"
				aria-label="Close lightbox"
			>
				<Icon icon="mdi:close" />
			</button>
			<div bind:this={swiperElement} class="swiper h-full w-full">
				<div class="swiper-wrapper">
					{#each images as image, i}
						<div class="swiper-slide flex items-center justify-center">
							<div class="swiper-zoom-container">
								<img src={image} alt={`Image ${i + 1}`} class="max-h-full max-w-full object-contain" />
							</div>
						</div>
					{/each}
				</div>
				<div class="swiper-button-next"></div>
				<div class="swiper-button-prev"></div>
			</div>
		</div>
	</div>
{/if}

<style>
	.lightbox-container {
		perspective: 1000px;
	}

	:global(.swiper-button-next, .swiper-button-prev) {
		color: white;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 50%;
		width: 50px;
		height: 50px;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}
	
	:global(.swiper-button-next:hover, .swiper-button-prev:hover) {
		color: rgb(209 213 219);
		background: rgba(0, 0, 0, 0.5);
		transform: scale(1.1);
	}
	
	:global(.swiper-button-next:after, .swiper-button-prev:after) {
		font-size: 18px;
		font-weight: bold;
	}
</style>
