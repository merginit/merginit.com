<script lang="ts">
	import { cn } from '$lib/utils';
	import Icon from '@iconify/svelte';

	type Variant = 'info' | 'warning' | 'error';

	export let title: string = 'Info';
	export let className: string = '';
	export let variant: Variant = 'info';
	export let imageSrc: string | undefined;
	export let imageAlt: string = '';

	const containerByVariant: Record<Variant, string> = {
		info: 'border-sky-400/40 bg-sky-400/10',
		warning: 'border-amber-400/40 bg-amber-400/10',
		error: 'border-rose-500/40 bg-rose-500/10'
	};

	const iconColorByVariant: Record<Variant, string> = {
		info: 'text-sky-400',
		warning: 'text-amber-400',
		error: 'text-rose-500'
	};

	const textTitleByVariant: Record<Variant, string> = {
		info: 'text-sky-100',
		warning: 'text-amber-100',
		error: 'text-rose-100'
	};

	const textBodyByVariant: Record<Variant, string> = {
		info: 'text-sky-200',
		warning: 'text-amber-200',
		error: 'text-rose-200'
	};

	const iconByVariant: Record<Variant, string> = {
		info: 'mdi:information-variant-circle',
		warning: 'mdi:alert-circle',
		error: 'mdi:alert-octagon'
	};
</script>

<div
	class={cn(
		'relative flex items-start gap-4 rounded-xl border p-5 shadow-lg overflow-hidden backdrop-blur-sm',
		containerByVariant[variant],
		className
	)}
>
	{#if imageSrc}
		<img src={imageSrc} alt={imageAlt} class="w-12 h-12 rounded-lg object-cover shrink-0" />
	{:else}
		<span class={cn('shrink-0 mt-1', iconColorByVariant[variant])}>
			<Icon icon={iconByVariant[variant]} width="32" height="32" />
		</span>
	{/if}
	<div class="flex-1">
		<div class={cn('font-semibold text-lg mb-1', textTitleByVariant[variant])}>{title}</div>
		<div class={cn('text-base', textBodyByVariant[variant])}>
			<slot />
		</div>
	</div>
</div>
