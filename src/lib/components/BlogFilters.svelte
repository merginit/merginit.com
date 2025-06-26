<script lang="ts">
	import type { Categories } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import TagInput from './TagInput.svelte';

	interface FilterState {
		search: string;
		searchScope: 'all' | 'title' | 'description' | 'content';
		categories: Categories[];
		tags: string[];
		tagOperator: 'OR' | 'AND';
		dateFrom: string;
		dateTo: string;
		minReadTime: number;
		maxReadTime: number;
	}

	let {
		filters = $bindable({
			search: '',
			searchScope: 'all' as const,
			categories: [],
			tags: [],
			tagOperator: 'OR' as const,
			dateFrom: '',
			dateTo: '',
			minReadTime: 0,
			maxReadTime: 60
		})
	}: {
		filters: FilterState;
	} = $props();

	const dispatch = createEventDispatcher();
	let isExpanded = $state(false);
	let hasActiveFilters = $derived(
		filters.search ||
		filters.categories.length > 0 ||
		filters.tags.length > 0 ||
		filters.dateFrom ||
		filters.dateTo ||
		filters.minReadTime > 0 ||
		filters.maxReadTime < 60
	);

	const availableCategories: Categories[] = ['coding', 'software', 'critique', 'ai', 'info', 'partner', 'other'];
	const searchScopes = [
		{ value: 'all', label: 'All Content' },
		{ value: 'title', label: 'Title Only' },
		{ value: 'description', label: 'Description Only' },
		{ value: 'content', label: 'Content Only' }
	];

	function toggleCategory(category: Categories) {
		if (filters.categories.includes(category)) {
			filters.categories = filters.categories.filter(c => c !== category);
		} else {
			filters.categories = [...filters.categories, category];
		}
		dispatch('filter');
	}

	function clearAllFilters() {
		filters.search = '';
		filters.searchScope = 'all';
		filters.categories = [];
		filters.tags = [];
		filters.tagOperator = 'OR';
		filters.dateFrom = '';
		filters.dateTo = '';
		filters.minReadTime = 0;
		filters.maxReadTime = 60;
		dispatch('filter');
	}

	function handleSearchInput() {
		dispatch('filter');
	}

	function handleFilterChange() {
		dispatch('filter');
	}

	function handleMinReadTimeChange() {
		if (filters.minReadTime > filters.maxReadTime) {
			filters.maxReadTime = filters.minReadTime;
		}
		handleFilterChange();
	}

	function handleMaxReadTimeChange() {
		if (filters.maxReadTime < filters.minReadTime) {
			filters.minReadTime = filters.maxReadTime;
		}
		handleFilterChange();
	}

	function handleFromDateChange() {
		if (filters.dateFrom && filters.dateTo && filters.dateFrom > filters.dateTo) {
			filters.dateTo = filters.dateFrom;
		}
		handleFilterChange();
	}

	function handleToDateChange() {
		if (filters.dateFrom && filters.dateTo && filters.dateTo < filters.dateFrom) {
			filters.dateFrom = filters.dateTo;
		}
		handleFilterChange();
	}
</script>

<div class="bg-blue-950/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8">
	<!-- Header -->
	<div class="flex items-center justify-between mb-4">
		<div class="flex items-center gap-3">
			<div class="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
			<h2 class="text-xl font-semibold text-white">Filter & Search</h2>
			{#if hasActiveFilters}
				<span class="px-2 py-1 text-xs bg-accent/20 text-accent border border-accent/30 rounded-full">
					Active
				</span>
			{/if}
		</div>
		<button
			onclick={() => isExpanded = !isExpanded}
			class="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50"
			aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
		>
			<svg 
				class="w-5 h-5 transition-transform duration-200 {isExpanded ? 'rotate-180' : ''}" 
				fill="none" 
				stroke="currentColor" 
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
			</svg>
		</button>
	</div>

	<!-- Search Bar -->
	<div class="space-y-4">
		<div class="relative">
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
				</svg>
			</div>
			<input
				type="text"
				bind:value={filters.search}
				oninput={handleSearchInput}
				placeholder="Search blog posts..."
				class="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors"
			/>
		</div>

		<!-- Search Scope -->
		<div class="flex flex-wrap gap-2">
			{#each searchScopes as scope}
				<button
					onclick={() => { filters.searchScope = scope.value as any; handleFilterChange(); }}
					class="px-3 py-1.5 text-sm rounded-lg border transition-colors {
						filters.searchScope === scope.value
							? 'bg-accent/20 text-accent border-accent/50'
							: 'bg-gray-800/50 text-gray-300 border-gray-600/50 hover:border-gray-500 hover:text-white'
					}"
				>
					{scope.label}
				</button>
			{/each}
		</div>
	</div>

	{#if isExpanded}
		<div class="mt-6 space-y-6" transition:slide={{ duration: 200 }}>
			<!-- Categories -->
			<div>
				<h3 class="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
					<Icon icon="tabler:category" class="text-accent w-5 h-5" />
					Categories
				</h3>
				<div class="flex flex-wrap gap-2">
					{#each availableCategories as category}
						<button
							onclick={() => toggleCategory(category)}
							class="px-3 py-1.5 text-sm rounded-lg border transition-colors {
								filters.categories.includes(category)
									? 'bg-accent/20 text-accent border-accent/50'
									: 'bg-gray-800/50 text-gray-300 border-gray-600/50 hover:border-gray-500 hover:text-white'
							}"
						>
							{category}
						</button>
					{/each}
				</div>
			</div>

			<!-- Tags -->
			<div>
				<div class="flex items-center justify-between mb-3">
					<h3 class="text-sm font-medium text-gray-300 flex items-center gap-2">
						<Icon icon="tabler:tags" class="text-accent w-5 h-5" />
						Tags
					</h3>
					{#if filters.tags.length > 0}
						<div class="flex items-center gap-2">
							<span class="text-xs text-gray-400">Match:</span>
							<div class="flex bg-gray-800/50 rounded-lg p-1">
								<button
									onclick={() => { filters.tagOperator = 'OR'; handleFilterChange(); }}
									class="px-2 py-1 text-xs rounded transition-colors {
										filters.tagOperator === 'OR'
											? 'bg-brand text-brand-dark font-medium'
											: 'text-gray-400 hover:text-white'
									}"
								>
									ANY
								</button>
								<button
									onclick={() => { filters.tagOperator = 'AND'; handleFilterChange(); }}
									class="px-2 py-1 text-xs rounded transition-colors {
										filters.tagOperator === 'AND'
											? 'bg-brand text-brand-dark font-medium'
											: 'text-gray-400 hover:text-white'
									}"
								>
									ALL
								</button>
							</div>
						</div>
					{/if}
				</div>
				<TagInput 
					bind:selectedTags={filters.tags} 
					placeholder="Type to add tags..."
					on:change={handleFilterChange}
				/>
				
				<!-- Debug info -->
				{#if filters.tags.length > 0}
					<div class="mt-2 text-xs text-gray-500">
						{filters.tags.length} tag{filters.tags.length === 1 ? '' : 's'} selected, operator: {filters.tagOperator}
					</div>
				{/if}
			</div>

			<!-- Date Range -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
						<Icon icon="tabler:calendar" class="text-accent w-5 h-5" />
						From Date
					</label>
					<input
						type="date"
						bind:value={filters.dateFrom}
						max={filters.dateTo || undefined}
						onchange={handleFromDateChange}
						class="w-full px-3 py-2 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors"
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
						<Icon icon="tabler:calendar" class="text-accent w-5 h-5" />
						To Date
					</label>
					<input
						type="date"
						bind:value={filters.dateTo}
						min={filters.dateFrom || undefined}
						onchange={handleToDateChange}
						class="w-full px-3 py-2 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors"
					/>
				</div>
			</div>

			<!-- Reading Time Range -->
			<div>
				<label class="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
					<Icon icon="tabler:clock" class="text-accent w-5 h-5" />
					Reading Time: {filters.minReadTime}min - {filters.maxReadTime === 60 ? '60+' : filters.maxReadTime}min
				</label>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label class="block text-xs text-gray-400 mb-1">Minimum</label>
						<input
							type="range"
							min="0"
							max={filters.maxReadTime}
							step="1"
							bind:value={filters.minReadTime}
							onchange={handleMinReadTimeChange}
							class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent"
						/>
						<div class="text-xs text-gray-400 mt-1">{filters.minReadTime} min</div>
					</div>
					<div>
						<label class="block text-xs text-gray-400 mb-1">Maximum</label>
						<input
							type="range"
							min={Math.max(5, Math.ceil(filters.minReadTime / 5) * 5)}
							max="60"
							step="5"
							bind:value={filters.maxReadTime}
							onchange={handleMaxReadTimeChange}
							class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent"
						/>
						<div class="text-xs text-gray-400 mt-1">{filters.maxReadTime === 60 ? '60+' : filters.maxReadTime} min</div>
					</div>
				</div>
			</div>

			<!-- Clear Filters -->
			{#if hasActiveFilters}
				<div class="pt-4 border-t border-gray-700/50">
					<button
						onclick={clearAllFilters}
						class="w-full px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-600/50 hover:border-gray-500 rounded-lg transition-colors flex items-center justify-center gap-2"
					>
						<Icon icon="tabler:x" class="w-5 h-5" />
						Clear All Filters
					</button>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	input[type="date"]::-webkit-calendar-picker-indicator {
		filter: invert(89%) sepia(58%) saturate(348%) hue-rotate(12deg) brightness(103%) contrast(101%);
		cursor: pointer;
	}

	input[type="date"]::-moz-calendar-picker-indicator {
		filter: invert(89%) sepia(58%) saturate(348%) hue-rotate(12deg) brightness(103%) contrast(101%);
		cursor: pointer;
	}
</style> 
