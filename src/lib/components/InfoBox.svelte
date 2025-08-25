<script lang="ts">
	import { cn } from '$lib/utils';
	import Icon from '@iconify/svelte';

	export let title: string = 'Info';
	export let className: string = '';
</script>

<div
	class={cn(
		'relative flex items-start gap-4 rounded-xl border border-blue-400/40 bg-blue-50/80 dark:bg-blue-950/40 p-5 shadow-lg overflow-hidden',
		className
	)}
>
	<span class="shrink-0 mt-1 text-blue-500 dark:text-blue-300">
		<Icon icon="mdi:information-variant-circle" width="32" height="32" />
	</span>
	<div class="flex-1">
		<div class="font-semibold text-blue-900 dark:text-blue-100 text-lg mb-1">{title}</div>
		<div class="text-blue-800 dark:text-blue-200 text-base">
			<slot />
		</div>
	</div>
</div>
