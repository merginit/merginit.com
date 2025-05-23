<script lang="ts">
	import { cn } from '$lib/utils';
	import Icon from '@iconify/svelte';
	let _class: string = '';
	export { _class as class };
	export let text: string = 'Button';
	export let href: string | undefined = undefined;
	export let element: HTMLElement | undefined = undefined;

	const Tag = href ? 'a' : 'button';
</script>

<svelte:element
	this={Tag}
	bind:this={element}
	class={cn(
		'group relative w-auto cursor-pointer overflow-hidden rounded-full border-[#f5007d] border-2 bg-black text-white py-2 pl-4 pr-6 font-semibold',
		_class
	)}
	role={href ? 'button' : undefined}
	type={!href ? 'button' : undefined}
	{href}
	{...$$restProps}
>
	<span
		class="inline-block translate-x-3 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0"
	>
		{text}
	</span>
	<div
		class="absolute left-4 right-6 group-hover:right-2 top-0 bottom-0 translate-x-12 z-10 flex items-center justify-center gap-2 text-[#010810] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
	>
		<span class="leading-[0.95]">{text}</span>
		<Icon icon="si:chevron-right-circle-duotone" class="text-[#991057] translate-x-1" width="100%" height="100%" />
	</div>
	<div
		class="absolute left-[10%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-yellow-400 transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-yellow-400"
	></div>
</svelte:element>
