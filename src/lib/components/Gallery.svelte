<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import Lightbox from './Lightbox.svelte';

	let lightboxRef: any;
	let images: string[] = [];
	let galleryElement: HTMLElement;

	onMount(() => {
		const imgElements = galleryElement.querySelectorAll('img');
		images = Array.from(imgElements).map(img => img.src);
		
		imgElements.forEach((img, index) => {
			img.style.cursor = 'pointer';
			img.style.transition = 'all 0.15s ease';
			img.style.borderRadius = '8px';
			img.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
			
			// Hover animations - subtle and fast
			img.addEventListener('mouseenter', () => {
				gsap.to(img, {
					scale: 1.02,
					boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
					duration: 0.15,
					ease: 'power1.out'
				});
			});
			
			img.addEventListener('mouseleave', () => {
				gsap.to(img, {
					scale: 1,
					boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
					duration: 0.15,
					ease: 'power1.out'
				});
			});
			
			// Click animation - snappy feedback
			img.addEventListener('click', () => {
				gsap.to(img, {
					scale: 0.98,
					duration: 0.08,
					ease: 'power2.out',
					onComplete: () => {
						lightboxRef.open(index);
					}
				});
			});
		});
	});
</script>

<div bind:this={galleryElement}>
	<slot />
</div>

<Lightbox bind:this={lightboxRef} {images} />
