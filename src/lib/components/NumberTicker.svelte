<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cn } from '$lib/utils';
	import { cubicOut } from 'svelte/easing';

	const {
		value = 100,
		initial = 0,
		duration = 6000,
		class: className = '',
		...restProps
	} = $props<{
		value?: number;
		initial?: number;
		duration?: number;
		class?: string;
		[key: string]: any;
	}>();

	const numTween = new Tween<number>(initial, {
		duration: duration,
		easing: cubicOut
	});

	let currentTweenValue = $state<number>(initial);

	$effect(() => {
		currentTweenValue = numTween.current;
	});

	onMount(() => {
		numTween.set(value);
	});

	const displayValue = $derived(currentTweenValue.toFixed(0));
</script>

<div class={cn('inline-block text-black dark:text-white tracking-normal', className)} {...restProps}>
	{displayValue}
</div>
