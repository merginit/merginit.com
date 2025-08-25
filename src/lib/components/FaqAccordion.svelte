<script lang="ts">
	import Icon from '@iconify/svelte';
	import gsap from 'gsap';
	import { tick } from 'svelte';
	import { slide } from 'svelte/transition';

	interface FaqItem {
		question: string;
		answer: string;
	}

	export let items: FaqItem[] = [];
	export let allowMultiple = false;

	let openIndex: number | null = null;
	let openSet: Set<number> = new Set();

	async function toggle(idx: number, btn: HTMLButtonElement) {
		let previouslyOpen: number | null = null;
		let wasOpen = false;

		if (allowMultiple) {
			wasOpen = openSet.has(idx);
			if (wasOpen) {
				openSet.delete(idx);
			} else {
				openSet.add(idx);
			}
			openSet = new Set(openSet);
		} else {
			previouslyOpen = openIndex;
			wasOpen = openIndex === idx;
			openIndex = wasOpen ? null : idx;
		}

		await tick();

		const currentIcon = btn.querySelector('.faq-icon');
		if (currentIcon) {
			gsap.to(currentIcon, {
				duration: 0.45,
				rotate: wasOpen ? 0 : 180,
				scale: wasOpen ? 1 : 1.25,
				ease: 'back.out(1.7)'
			});
		}

		if (!allowMultiple && previouslyOpen !== null && previouslyOpen !== idx) {
			const prevIcon = document.querySelector(`.faq-icon[data-idx="${String(previouslyOpen)}"]`);
			if (prevIcon) {
				gsap.to(prevIcon, {
					duration: 0.45,
					rotate: 0,
					scale: 1,
					ease: 'back.out(1.7)'
				});
			}
		}
	}
</script>

<div class="space-y-4">
	{#each items as item, i (item.question)}
		<section class="rounded-xl border border-white/10 backdrop-blur-sm">
			<button
				type="button"
				class={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/5 transition-all duration-300 ${
					(allowMultiple ? openSet.has(i) : openIndex === i)
						? 'rounded-t-xl'
						: 'rounded-t-xl rounded-b-xl'
				}`}
				on:click={(e) => toggle(i, e.currentTarget as HTMLButtonElement)}
			>
				<span class="text-base md:text-lg font-medium">{item.question}</span>
				<Icon
					icon="lucide:chevron-down"
					data-idx={String(i)}
					class="faq-icon shrink-0 text-xl md:text-2xl"
				/>
			</button>

			{#if allowMultiple ? openSet.has(i) : openIndex === i}
				<div
					transition:slide|local
					class="px-5 py-5 text-sm md:text-base leading-relaxed text-white/80"
				>
					{@html item.answer}
				</div>
			{/if}
		</section>
	{/each}
</div>
