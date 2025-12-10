<script lang="ts">
	import BorderBeam from '$lib/components/BorderBeam.svelte';
	import { platformIcons } from '$lib/data/free-products';
	import type { FreeProduct } from '$lib/types';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	export let data: { product: FreeProduct };

	const product = data.product;
	let downloads = product.downloads;
	const isPrimaryGithub = Boolean(product.githubUrl && product.url === product.githubUrl);

	const typeLabels: Record<FreeProduct['type'], string> = {
		website: 'Website & tool',
		desktop: 'Desktop app',
		extension: 'Browser extension',
		npm: 'NPM package'
	};

	const typeIcons: Record<FreeProduct['type'], string> = {
		website: 'mdi:web',
		desktop: 'mdi:laptop',
		extension: 'mdi:puzzle-outline',
		npm: 'simple-icons:npm'
	};

	const formatDownloads = (downloads?: number) =>
		typeof downloads === 'number'
			? new Intl.NumberFormat('en-US', {
					notation: 'compact',
					maximumFractionDigits: 1
				}).format(downloads)
			: null;

	const primaryLabel = (currentProduct: FreeProduct) => {
		if (currentProduct.type === 'npm') return 'View package';
		if (currentProduct.type === 'desktop') return 'Open download page';
		if (currentProduct.type === 'extension') {
			return currentProduct.url.includes('chromewebstore') ? 'Install' : 'Open';
		}
		return 'Open tool';
	};

	const primaryIcon = (currentProduct: FreeProduct) => {
		if (currentProduct.type === 'npm') return 'simple-icons:npm';
		if (currentProduct.type === 'extension' && currentProduct.url.includes('chromewebstore')) {
			return 'devicon-plain:chrome';
		}
		return 'mdi:open-in-new';
	};

	onMount(() => {
		if (!product.npmPackage) return;

		fetch(`/api/npm-stats?package=${product.npmPackage}`)
			.then(async (response) => {
				if (!response.ok) return;
				const data = await response.json();
				if (typeof data.downloads === 'number') {
					downloads = data.downloads;
				}
			})
			.catch((error) =>
				console.error(`Failed to refresh npm stats for ${product.npmPackage}`, error)
			);
	});
</script>

<div class="min-h-screen bg-brand-dark px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 py-16">
	<div class="max-w-6xl mx-auto">
		<div class="mb-6 flex items-center justify-between gap-3 flex-wrap">
			<a
				href="/free-products"
				class="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
				aria-label="Back to free products"
			>
				<Icon icon="mdi:arrow-left" width="18" height="18" /> Back to Free Products
			</a>
		</div>

		<section
			class="relative overflow-hidden rounded-3xl border border-gray-700/70 bg-blue-950/10 p-8 sm:p-10 shadow-xl"
		>
			<BorderBeam
				size={260}
				duration={14}
				delay={0.2}
				anchor={35}
				class="absolute top-0 left-0 w-full h-full z-0 opacity-30"
			/>

			<div class="relative z-10 grid md:grid-cols-2 gap-10 items-start">
				<div class="space-y-6">
					<div class="flex items-center gap-3 flex-wrap">
						<span
							class="inline-flex items-center gap-2 rounded-full bg-brand/15 text-brand border border-brand/40 px-4 py-2 text-sm font-semibold"
						>
							<Icon icon={typeIcons[product.type]} width="18" height="18" />
							{typeLabels[product.type]}
						</span>
						{#if product.npmPackage}
							<span
								class="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-4 py-2 text-xs font-semibold"
							>
								<Icon icon="simple-icons:npm" width="16" height="16" />
								{formatDownloads(downloads) ?? 'Loading...'} downloads
							</span>
						{/if}
					</div>

					<div class="space-y-3">
						<h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
							{product.name}
						</h1>
						<p class="text-base sm:text-lg text-gray-200 leading-relaxed">
							{product.longDescription || product.description}
						</p>
					</div>

					<div class="flex flex-wrap gap-3">
						{#if !isPrimaryGithub}
							<a
								href={product.url}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-2 rounded-full border border-brand/60 bg-brand/15 hover:bg-brand/25 text-brand px-4 py-2 text-sm transition-colors"
								aria-label={`${primaryLabel(product)} ${product.name}`}
							>
								<Icon icon={primaryIcon(product)} width="20" height="20" />
								{primaryLabel(product)}
							</a>
						{/if}
						{#if product.githubUrl}
							<a
								href={product.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-2 rounded-full border border-gray-600/60 hover:border-gray-400/60 bg-transparent text-gray-200 hover:text-white px-4 py-2 text-sm transition-colors"
								aria-label={`View ${product.name} on GitHub`}
							>
								<Icon icon="mdi:github" width="20" height="20" /> GitHub
							</a>
						{/if}
						{#if product.npmPackage}
							<a
								href={`https://www.npmjs.com/package/${product.npmPackage}`}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-2 rounded-full border border-gray-600/60 hover:border-gray-400/60 bg-transparent text-gray-200 hover:text-white px-4 py-2 text-sm transition-colors"
								aria-label={`View ${product.name} on NPM`}
							>
								<Icon icon="simple-icons:npm" width="18" height="18" /> NPM
							</a>
						{/if}
					</div>

					{#if product.keywords?.length}
						<div class="flex flex-wrap gap-2">
							{#each product.keywords as keyword}
								<span
									class="rounded-full bg-gray-800/70 border border-gray-700/80 text-gray-300 text-xs px-3 py-1"
								>
									{keyword}
								</span>
							{/each}
						</div>
					{/if}
				</div>

				<div class="relative">
					<div
						class="aspect-video overflow-hidden rounded-2xl border border-gray-700/70 bg-blue-950/20 shadow-lg"
					>
						<img
							src={product.image}
							alt={product.imageAlt}
							class="h-full w-full object-cover object-top"
							loading="lazy"
						/>
					</div>
				</div>
			</div>
		</section>

		{#if product.features?.length}
			<section class="mt-10">
				<h2 class="text-2xl font-semibold text-gray-100 mb-4">Key features</h2>
				<div class="grid sm:grid-cols-2 gap-4">
					{#each product.features as feature}
						<div
							class="rounded-2xl border border-gray-700/70 bg-blue-950/10 p-4 flex items-start gap-3"
						>
							<div class="mt-1 text-brand">
								<Icon icon="mdi:check-circle" width="20" height="20" />
							</div>
							<p class="text-gray-200 leading-relaxed">{feature}</p>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<section class="mt-10 grid lg:grid-cols-2 gap-6">
			<div class="rounded-2xl border border-gray-700/70 bg-blue-950/10 p-6">
				<h3 class="text-xl font-semibold text-gray-100 mb-4">Get the product</h3>

				{#if product.type === 'desktop' && product.downloadLinks?.length}
					<div class="flex flex-wrap gap-3">
						{#each product.downloadLinks as download}
							<a
								href={download.url}
								download
								class="inline-flex items-center gap-2 rounded-full border border-brand/50 bg-brand/10 hover:bg-brand/20 text-brand px-4 py-2 text-sm transition-colors"
								aria-label={`Download ${product.name} for ${download.label}`}
							>
								<Icon icon={platformIcons[download.platform]} width="20" height="20" />
								{download.label}
							</a>
						{/each}
					</div>
				{:else if product.type === 'npm' && product.npmPackage}
					<div class="space-y-3">
						<p class="text-sm text-gray-300">Install via npm:</p>
						<div
							class="font-mono text-sm bg-brand/10 border border-brand/30 text-brand px-3 py-2 rounded-lg"
						>
							npm install {product.npmPackage}
						</div>
						{#if typeof downloads === 'number'}
							<p class="text-sm text-gray-400">
								Downloads (all time): {formatDownloads(downloads)}
							</p>
						{:else}
							<p class="text-sm text-gray-400">Fetching downloads...</p>
						{/if}
					</div>
				{:else}
					<div class="space-y-3">
						<p class="text-sm text-gray-300">Primary links</p>
						<div class="flex flex-wrap gap-3">
							{#if !isPrimaryGithub}
								<a
									href={product.url}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-full border border-brand/50 bg-brand/10 hover:bg-brand/20 text-brand px-4 py-2 text-sm transition-colors"
									aria-label={`${primaryLabel(product)} ${product.name}`}
								>
									<Icon icon={primaryIcon(product)} width="20" height="20" />
									{primaryLabel(product)}
								</a>
							{/if}
							{#if product.githubUrl}
								<a
									href={product.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-full border border-gray-600/60 hover:border-gray-400/60 bg-transparent text-gray-200 hover:text-white px-4 py-2 text-sm transition-colors"
									aria-label={`View ${product.name} on GitHub`}
								>
									<Icon icon="mdi:github" width="20" height="20" /> GitHub
								</a>
							{/if}
						</div>
					</div>
				{/if}
			</div>

			<div class="rounded-2xl border border-gray-700/70 bg-blue-950/10 p-6">
				<h3 class="text-xl font-semibold text-gray-100 mb-4">Product details</h3>
				<ul class="space-y-3 text-sm text-gray-300">
					<li class="flex items-start justify-between gap-4">
						<span class="text-gray-400">Type</span>
						<span class="text-gray-100 font-semibold">{typeLabels[product.type]}</span>
					</li>
					{#if !isPrimaryGithub}
						<li class="flex items-start justify-between gap-4">
							<span class="text-gray-400">Primary link</span>
							<a
								href={product.url}
								target="_blank"
								rel="noopener noreferrer"
								class="text-brand hover:text-[#ffbb66] transition-colors break-words text-right"
							>
								{product.url}
							</a>
						</li>
					{/if}
					{#if product.githubUrl}
						<li class="flex items-start justify-between gap-4">
							<span class="text-gray-400">GitHub</span>
							<a
								href={product.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="text-brand hover:text-[#ffbb66] transition-colors break-words text-right"
							>
								{product.githubUrl}
							</a>
						</li>
					{/if}
					{#if product.npmPackage}
						<li class="flex items-start justify-between gap-4">
							<span class="text-gray-400">Package name</span>
							<a
								href={`https://www.npmjs.com/package/${product.npmPackage}`}
								target="_blank"
								rel="noopener noreferrer"
								class="text-brand hover:text-[#ffbb66] transition-colors break-words text-right"
							>
								{product.npmPackage}
							</a>
						</li>
					{/if}
					<li class="flex items-start justify-between gap-4">
						<span class="text-gray-400">Slug</span>
						<span class="text-gray-200">{product.slug}</span>
					</li>
					{#if product.keywords?.length}
						<li class="flex items-start justify-between gap-4">
							<span class="text-gray-400">Keywords</span>
							<div class="flex flex-wrap gap-2 justify-end">
								{#each product.keywords as keyword}
									<span
										class="rounded-full bg-gray-800/70 border border-gray-700/80 text-gray-300 text-xs px-3 py-1"
									>
										{keyword}
									</span>
								{/each}
							</div>
						</li>
					{/if}
				</ul>
			</div>
		</section>
	</div>
</div>
