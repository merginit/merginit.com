<script lang="ts">
	import Container from './Container.svelte';
	import { cn } from '$lib/utils';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';

	export let href: string | undefined = undefined;
	export let title: string = 'Card Title';
	export let desc: string = 'Card description.';
	let className: any = 'p-6';
	export { className as class };

	let cardRef: HTMLElement | undefined;
	let isMouseOver = false;

	function handleMouseMove(event: MouseEvent) {
		if (!cardRef || !isMouseOver) return;
		const rect = cardRef.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = (y - centerY) / centerY * -7;
		const rotateY = (x - centerX) / centerX * 7;

		gsap.to(cardRef, {
			duration: 0.4,
			rotationX: rotateX,
			rotationY: rotateY,
			scale: 0.97,
			ease: 'power2.out'
		});
	}

	function handleMouseEnter() {
		isMouseOver = true;
		if (cardRef) {
			gsap.to(cardRef, {
				duration: 0.2,
				ease: 'power2.out'
			});
		}
	}

	function handleMouseLeave() {
		isMouseOver = false;
		if (!cardRef) return;
		gsap.to(cardRef, {
			duration: 0.6,
			rotationX: 0,
			rotationY: 0,
			scale: 1,
			ease: 'elastic.out(1, 0.4)'
		});
	}

	onMount(() => {
		if (cardRef) {
			gsap.set(cardRef, { rotationX: 0, rotationY: 0, scale: 1 });
		}
	});
</script>

{#if href}
	<a 
		bind:this={cardRef} 
		{href} 
		class="block hover:no-underline perspective"
		on:mousemove={handleMouseMove}
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
	>
		<Container>
			<div class="p-3 w-full flex justify-center items-center">
				<div class={cn('text-left', className)} style="transform-style: preserve-3d;">
					<h3 class="text-lg font-bold mb-1 text-white">
						{title}
					</h3>
					<p class="text-gray-300">{desc}</p>
				</div>
			</div>
		</Container>
	</a>
{:else}
	<div 
		bind:this={cardRef} 
		class="block perspective"
		on:mousemove={handleMouseMove}
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
	>
		<Container>
			<div class="p-3 w-full flex justify-center items-center">
				<div class={cn('text-left', className)} style="transform-style: preserve-3d;">
					<h3 class="text-lg font-bold mb-1 text-white">
						{title}
					</h3>
					<p class="text-gray-300">{desc}</p>
				</div>
			</div>
		</Container>
	</div>
{/if}

<style>
	.perspective {
		perspective: 800px;
	}
</style>
