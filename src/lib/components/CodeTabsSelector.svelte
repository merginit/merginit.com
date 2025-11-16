<script lang="ts">
	import { cn } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import { onMount, tick } from 'svelte';

	type PrismStatic = typeof import('prismjs');

	interface CodeTab {
		id: string;
		label: string;
		icon?: string;
		language: string;
		code: string;
	}

	interface Props {
		tabs: CodeTab[];
		className?: string;
		defaultTab?: string;
	}

	let { tabs, className = '', defaultTab }: Props = $props();

	let activeTab = $state(defaultTab || tabs[0]?.id || '');
	let copyStates = $state<Record<string, boolean>>({});

	const activeTabData = $derived(tabs.find((tab) => tab.id === activeTab) || tabs[0]);

	let Prism: PrismStatic | null = null;
	let codeRef = $state<HTMLElement | null>(null);

	async function ensurePrism() {
		if (Prism) return;
		const mod = await import('prismjs');
		Prism = (mod as unknown as { default: PrismStatic }).default ?? (mod as unknown as PrismStatic);
		await Promise.all([
			import('prismjs/components/prism-bash'),
			import('prismjs/components/prism-batch'),
			import('prismjs/components/prism-powershell'),
			import('prismjs/components/prism-json'),
			import('prismjs/components/prism-yaml')
		]);
	}

	async function highlight() {
		try {
			await ensurePrism();
			await tick();
			if (Prism && codeRef) {
				Prism.highlightElement(codeRef as HTMLElement);
			}
		} catch (e) {
			console.error(e);
		}
	}

	onMount(() => {
		highlight();
	});

	async function copyToClipboard(code: string, tabId: string) {
		try {
			await navigator.clipboard.writeText(code);
			copyStates[tabId] = true;
			setTimeout(() => {
				copyStates[tabId] = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	async function setActiveTab(tabId: string) {
		activeTab = tabId;
		if (typeof window !== 'undefined') {
			window.dispatchEvent(new CustomEvent('code-tabs-updated'));
		}
		await highlight();
	}
</script>

<div class={cn('relative rounded-2xl overflow-hidden border border-neutral-500/30 bg-[var(--color-brand-dark)]', className)}>
	<!-- Tab Headers -->
	<div class="flex rounded-t-2xl bg-[var(--color-brand-dark)]/80 border-b border-neutral-500/30 backdrop-blur-md">
		{#each tabs as tab}
			<button
				onclick={() => setActiveTab(tab.id)}
				class={cn(
					'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 first:rounded-tl-2xl',
					'focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-inset',
					activeTab === tab.id
						? 'bg-white/5 text-white border-b-2 border-accent'
						: 'text-[var(--color-text-muted)] border-b-2 border-transparent hover:text-[var(--color-text-primary)] hover:bg-white/5'
				)}
				type="button"
				aria-pressed={activeTab === tab.id}
			>
				{#if tab.icon}
					<Icon icon={tab.icon} width="16" height="16" />
				{/if}
				{tab.label}
			</button>
		{/each}
	</div>

	<!-- Code Content -->
	<div class="relative bg-[#282a36] rounded-b-2xl overflow-hidden">
		{#if activeTabData}
			<!-- Copy Button -->
			<button
				onclick={() => copyToClipboard(activeTabData.code, activeTabData.id)}
				class={cn('code-copy-btn', copyStates[activeTabData.id] ? 'copied' : '')}
				type="button"
				title={copyStates[activeTabData.id] ? 'Copied!' : 'Copy to clipboard'}
			>
				{#if copyStates[activeTabData.id]}
					<Icon icon="mdi:check" />
				{:else}
					<Icon icon="mdi:content-copy" />
				{/if}
			</button>

			<!-- Code Block -->
			{#key activeTab}
				<pre class="language-{activeTabData.language} m-0 rounded-b-2xl overflow-x-auto"><code bind:this={codeRef} class="language-{activeTabData.language}">{activeTabData.code}</code></pre>
			{/key}
		{/if}
	</div>
</div>
