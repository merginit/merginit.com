<script lang="ts">
	import { gsap } from 'gsap';
	import { cn } from '$lib/utils';

	type RenderItem = 
		| { type: 'char'; char: string; isSpace: boolean; id: string }
		| { type: 'break'; id: string };

	type GradualTextSpacingProps = {
		words?: string;
		duration?: number;
		delayMultiple?: number;
		initialX?: number;
		initialOpacity?: number;
		class?: string;
		charClass?: string;
	};

	const {
		words = "Gradual Spacing",
		duration = 0.25,
		delayMultiple = 0.04,
		initialX = -20,
		initialOpacity = 0,
		class: wrapperClass = "",
		charClass = ""
	}: GradualTextSpacingProps = $props();

	const renderItems = $derived(() => {
		const items: RenderItem[] = [];
		if (!words) return items;
		let keyCounter = 0;

		words.split(/(<br\s*\/?>)/gi).filter(Boolean).forEach((part: string) => {
			if (part.match(/^<br\s*\/?>$/gi)) {
				items.push({ type: 'break', id: `br-${keyCounter++}` });
			} else {
				for (const char of part) {
					items.push({ type: 'char', char: char, isSpace: char === ' ', id: `char-${keyCounter++}` });
				}
			}
		});
		return items;
	});

	let rootEl = $state<HTMLDivElement | null>(null);

	$effect(() => {
		if (rootEl) {
			const chars = rootEl.querySelectorAll('.gts-char');

			if (chars.length > 0) {
				gsap.set(chars, { opacity: initialOpacity, x: initialX });
				
				gsap.to(chars, {
					opacity: 1,
					x: 0,
					duration: duration,
					stagger: delayMultiple,
					ease: 'power2.out',
					overwrite: 'auto'
				});
			}
			
			return () => {
				if (chars.length > 0) {
					gsap.killTweensOf(chars);
				}
			};
		} else {
			return () => {};
		}
	});

</script>

<div bind:this={rootEl} class={cn("flex flex-wrap justify-start text-left", wrapperClass)}>
	{#each renderItems() as item, i (i)}
		{@const typedItem = item as RenderItem}
		{#if typedItem.type === 'break'}
			<div class="w-full h-0 basis-full"></div>
		{:else if typedItem.type === 'char'}
			<span
				class={cn("drop-shadow-sm gts-char", charClass)}
				style="display: inline-block; opacity: {initialOpacity}; transform: translateX({initialX}px); margin-right: 0.05em;"
			>
				{#if typedItem.isSpace}
					<span>&nbsp;</span>
				{:else}
					{typedItem.char}
				{/if}
			</span>
		{/if}
	{/each}
</div>
