<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';

	let {
		selectedTags = $bindable([]),
		placeholder = 'Add tags...'
	}: {
		selectedTags: string[];
		placeholder?: string;
	} = $props();

	const dispatch = createEventDispatcher();
	
	let availableTags: string[] = $state([]);
	let inputValue = $state('');
	let showSuggestions = $state(false);
	let filteredSuggestions = $derived(
		availableTags.filter(tag => 
			tag.toLowerCase().includes(inputValue.toLowerCase()) &&
			!selectedTags.includes(tag)
		).slice(0, 10)
	);
	let highlightedIndex = $state(-1);
	let inputElement: HTMLInputElement;
	let suggestionContainer = $state<HTMLElement>();

	// Scroll highlighted item into view
	$effect(() => {
		if (highlightedIndex >= 0 && suggestionContainer) {
			const highlightedElement = suggestionContainer.children[highlightedIndex] as HTMLElement;
			if (highlightedElement) {
				highlightedElement.scrollIntoView({
					block: 'nearest',
					behavior: 'smooth'
				});
			}
		}
	});

	onMount(async () => {
		try {
			const response = await fetch('/api/tags');
			availableTags = await response.json();
		} catch (error) {
			console.error('Failed to load tags:', error);
		}
	});

	function addTag(tag: string) {
		if (tag && !selectedTags.includes(tag) && availableTags.includes(tag)) {
			selectedTags = [...selectedTags, tag];
			inputValue = '';
			showSuggestions = false;
			highlightedIndex = -1;
			dispatch('change');
		}
	}

	function removeTag(tag: string) {
		selectedTags = selectedTags.filter(t => t !== tag);
		dispatch('change');
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (highlightedIndex >= 0 && filteredSuggestions[highlightedIndex]) {
				addTag(filteredSuggestions[highlightedIndex]);
			} else if (inputValue && filteredSuggestions.length > 0) {
				addTag(filteredSuggestions[0]);
			}
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			highlightedIndex = Math.min(highlightedIndex + 1, filteredSuggestions.length - 1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			highlightedIndex = Math.max(highlightedIndex - 1, -1);
		} else if (event.key === 'Escape') {
			showSuggestions = false;
			highlightedIndex = -1;
		} else if (event.key === 'Backspace' && inputValue === '' && selectedTags.length > 0) {
			removeTag(selectedTags[selectedTags.length - 1]);
		}
	}

	function handleInput() {
		showSuggestions = inputValue.length > 0;
		highlightedIndex = -1;
	}

	function handleFocus() {
		if (inputValue.length > 0) {
			showSuggestions = true;
		}
	}

	function handleBlur() {
		// Delay hiding suggestions to allow clicking on them
		setTimeout(() => {
			showSuggestions = false;
			highlightedIndex = -1;
		}, 150);
	}
</script>

<div class="relative">
	<!-- Tag input container -->
	<div class="min-h-[2.75rem] w-full px-3 py-2 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white transition-colors">
		<div class="flex flex-wrap gap-2 items-center">
			<!-- Selected tags -->
			{#each selectedTags as tag}
				<span class="inline-flex items-center gap-1 px-2 py-1 text-sm bg-accent/20 text-accent border border-accent/30 rounded-md">
					{tag}
					<button
						onclick={() => removeTag(tag)}
						class="hover:text-accent/80 transition-colors"
						aria-label={`Remove ${tag} tag`}
					>
						<Icon icon="tabler:x" class="w-3 h-3" />
					</button>
				</span>
			{/each}

			<!-- Input field -->
			<input
				bind:this={inputElement}
				bind:value={inputValue}
				oninput={handleInput}
				onfocus={handleFocus}
				onblur={handleBlur}
				onkeydown={handleKeydown}
				{placeholder}
				class="flex-1 min-w-[120px] bg-transparent border-none outline-none text-white placeholder-gray-400 focus:outline-none focus:ring-0"
				autocomplete="off"
			/>
		</div>
	</div>

	<!-- Suggestions dropdown -->
	{#if showSuggestions && filteredSuggestions.length > 0}
		<div 
			bind:this={suggestionContainer}
			class="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto"
		>
			{#each filteredSuggestions as suggestion, index}
				<button
					onclick={() => addTag(suggestion)}
					class="w-full px-3 py-2 text-left text-white hover:bg-gray-700 transition-colors {
						index === highlightedIndex ? 'bg-gray-700' : ''
					}"
				>
					<span class="font-medium">{suggestion}</span>
				</button>
			{/each}
		</div>
	{/if}

	{#if showSuggestions && inputValue && filteredSuggestions.length === 0}
		<div class="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg">
			<div class="px-3 py-2 text-gray-400 text-sm">
				No matching tags found
			</div>
		</div>
	{/if}
</div>
