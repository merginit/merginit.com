<script lang="ts">
	import { onMount, untrack } from 'svelte';
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

	const numTween = new Tween<number>(untrack(() => initial), {
		duration: untrack(() => duration),
		easing: cubicOut
	});

	let currentTweenValue = $state<number>(untrack(() => initial));

	$effect(() => {
		currentTweenValue = numTween.current;
	});

	onMount(() => {
		numTween.set(value);
	});

	const displayValue = $derived(currentTweenValue.toFixed(0));
</script>

<div class={cn('inline-block tracking-normal', className)} {...restProps}>
	{displayValue}
</div>
