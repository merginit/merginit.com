<script lang="ts">
	import Icon from '@iconify/svelte';

	interface RegexEntry {
		title: string;
		description: string;
		pattern: string;
		replace?: string;
	}

	const regexes: RegexEntry[] = [
		{
			title: 'BibTeX Source Fixer',
			description: 'Fixes BibTeX source entries by removing surrounding braces and trailing comma.',
			pattern: '\\{([a-zA-Z0-9])\\},',
			replace: '$1'
		},
		{
			title: 'Email Address',
			description: 'Matches most common email address formats.',
			pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"
		},
		{
			title: 'URL',
			description: 'Matches standard URLs (HTTP/HTTPS).',
			pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)"
		},
		{
			title: 'IPv4 Address',
			description: 'Matches valid IPv4 addresses.',
			pattern: "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b"
		},
		{
			title: 'Date (ISO 8601)',
			description: 'Matches dates in YYYY-MM-DD format.',
			pattern: "^\\d{4}-\\d{2}-\\d{2}$"
		},
		{
			title: 'Slugify',
			description: 'Replaces non-alphanumeric characters with hyphens (useful for URLs).',
			pattern: "[^a-z0-9]+",
			replace: "-"
		},
		{
			title: 'Remove HTML Tags',
			description: 'Matches HTML tags (useful for stripping HTML).',
			pattern: "<[^>]*>",
			replace: ""
		},
		{
			title: 'Markdown Heading',
			description: 'Matches markdown heading lines (levels 1-6).',
			pattern: '^#{1,6}\\s+.*$'
		}
	];

	let search = '';
	let copiedKey: string | null = null;

	$: filtered = search.trim()
		? regexes.filter((r) =>
				[r.title, r.description, r.pattern, r.replace]
					.filter(Boolean)
					.some((field) => field!.toLowerCase().includes(search.toLowerCase()))
			)
		: regexes;

	const copy = async (text: string, key: string) => {
		try {
			await navigator.clipboard.writeText(text);
			copiedKey = key;
			setTimeout(() => {
				if (copiedKey === key) copiedKey = null;
			}, 2000);
		} catch (e) {}
	};
</script>

<svelte:head>
	<title>Regex Library - MerginIT e.U.</title>
	<meta
		name="description"
		content="Filterable regex library for MerginIT e.U. including common regex patterns and VS Code replacements."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-12 min-h-screen">
	<h1 class="text-4xl lg:text-5xl font-bold text-center mb-10">Regex Library</h1>

	<div class="relative max-w-md mx-auto mb-12">
		<Icon
			icon="mdi:magnify"
			class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
		/>
		<input
			type="text"
			placeholder="Filter regexes…"
			bind:value={search}
			class="w-full pl-10 pr-4 py-2 rounded bg-neutral-800 focus:outline-none focus:ring-2 focus:border-pink-800 focus:ring-pink-800 placeholder:text-gray-500"
		/>
	</div>

	{#if filtered.length === 0}
		<p class="text-center text-gray-500">No matches.</p>
	{:else}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each filtered as entry}
				<div class="bg-neutral-900/70 p-6 rounded-lg shadow group">
					<h2 class="text-xl font-semibold mb-2">{entry.title}</h2>
					<p class="text-gray-400 text-sm mb-4">{entry.description}</p>

					<div class="space-y-4">
						<div>
							<p class="text-xs uppercase tracking-wide mb-1 text-gray-500">Find</p>
							<div class="relative group">
								<pre
									class="bg-neutral-800 text-pink-400 p-3 pr-10 rounded break-all whitespace-pre-wrap">{entry.pattern}</pre>
								<button
									aria-label="Copy regex"
									on:click={() => copy(entry.pattern, `${entry.title}-find`)}
									class={`absolute top-1.5 right-1.5 p-1 rounded transition-opacity duration-200 backdrop-blur-sm
                    ${copiedKey === `${entry.title}-find` ? 'opacity-100 text-lime-400 bg-lime-400/10' : 'opacity-0 group-hover:opacity-100 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10'}`}
								>
									<Icon
										icon={copiedKey === `${entry.title}-find` ? 'mdi:check' : 'mdi:content-copy'}
										class="w-4 h-4"
									/>
								</button>
							</div>
						</div>

						{#if entry.replace}
							<div>
								<p class="text-xs uppercase tracking-wide mb-1 text-gray-500">Replace</p>
								<div class="relative group">
									<pre
										class="bg-neutral-800 text-green-400 p-3 pr-10 rounded break-all whitespace-pre-wrap">{entry.replace}</pre>
									<button
										aria-label="Copy replacement"
										on:click={() => copy(entry.replace!, `${entry.title}-replace`)}
										class={`absolute top-1.5 right-1.5 p-1 rounded transition-opacity duration-200 backdrop-blur-sm
                      ${copiedKey === `${entry.title}-replace` ? 'opacity-100 text-lime-400 bg-lime-400/10' : 'opacity-0 group-hover:opacity-100 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10'}`}
									>
										<Icon
											icon={copiedKey === `${entry.title}-replace`
												? 'mdi:check'
												: 'mdi:content-copy'}
											class="w-4 h-4"
										/>
									</button>
								</div>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
