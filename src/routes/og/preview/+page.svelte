<script lang="ts">
	import OgCard from '$lib/og.svelte';
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';

	let title = $state('MerginIT e.U.');
	let subtitle = $state('Professional Software Development & SaaS Solutions');
	let imageUrl = $state('');
	let previewUrl = $state('');
	let mockPreviewImage = $state('');

	let wrapperWidth = $state(0);
	const scale = $derived(wrapperWidth / 1200);

	const ogEndpointUrl = $derived.by(() => {
		const params = new URLSearchParams();
		params.set('title', title);
		params.set('subtitle', subtitle);
		if (imageUrl) params.set('image', imageUrl);
		if (previewUrl) params.set('url', previewUrl);
		params.set('no_cache', '1');
		return `${page.url.origin}/og?${params.toString()}`;
	});
</script>

<svelte:head>
	<title>OG Preview (Dev Only)</title>
</svelte:head>

<div class="min-h-screen bg-brand-dark px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 py-12">
	<div class="max-w-7xl mx-auto">
		<header class="mb-10">
			<h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-white">
				OG Image <span class="text-brand">Preview</span>
			</h1>
			<p class="text-text-muted mt-2">Dev-only page to preview and tweak the OG card component</p>
		</header>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- Controls -->
			<div class="space-y-6">
				<div
					class="rounded-3xl p-6 border border-gray-700/70 bg-blue-950/10 backdrop-blur-md shadow-md"
				>
					<h2 class="text-xl font-semibold text-white mb-6">Settings</h2>

					<div class="space-y-5">
						<div>
							<label for="title" class="block text-sm font-medium text-text-muted mb-1.5"
								>Title</label
							>
							<input
								id="title"
								type="text"
								bind:value={title}
								class="w-full px-4 py-2.5 bg-brand-dark border border-gray-700 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent text-white placeholder-gray-500 transition-all"
							/>
						</div>

						<div>
							<label for="subtitle" class="block text-sm font-medium text-text-muted mb-1.5"
								>Subtitle</label
							>
							<textarea
								id="subtitle"
								bind:value={subtitle}
								rows="3"
								class="w-full px-4 py-2.5 bg-brand-dark border border-gray-700 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent text-white placeholder-gray-500 resize-none transition-all"
							></textarea>
						</div>

						<div>
							<label for="image" class="block text-sm font-medium text-text-muted mb-1.5"
								>Image URL (logo/icon)</label
							>
							<input
								id="image"
								type="text"
								bind:value={imageUrl}
								placeholder="https://merginit.com/favicon.png"
								class="w-full px-4 py-2.5 bg-brand-dark border border-gray-700 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent text-white placeholder-gray-500 transition-all"
							/>
						</div>

						<div>
							<label for="preview" class="block text-sm font-medium text-text-muted mb-1.5"
								>Page URL (for screenshot preview)</label
							>
							<input
								id="preview"
								type="text"
								bind:value={previewUrl}
								placeholder="https://merginit.com/about"
								class="w-full px-4 py-2.5 bg-brand-dark border border-gray-700 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent text-white placeholder-gray-500 transition-all"
							/>
						</div>

						<div>
							<label for="mockPreview" class="block text-sm font-medium text-text-muted mb-1.5"
								>Mock Preview Image (for local testing)</label
							>
							<input
								id="mockPreview"
								type="text"
								bind:value={mockPreviewImage}
								placeholder="https://merginit.com/ocrmd.com.png"
								class="w-full px-4 py-2.5 bg-brand-dark border border-gray-700 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent text-white placeholder-gray-500 transition-all"
							/>
							<p class="text-xs text-text-muted mt-1.5">
								Paste an image URL to test how the preview layout looks
							</p>
						</div>
					</div>
				</div>

				<!-- Endpoint URL -->
				<div
					class="rounded-3xl p-6 border border-gray-700/70 bg-blue-950/10 backdrop-blur-md shadow-md"
				>
					<h2 class="text-xl font-semibold text-white mb-4">Endpoint URL</h2>
					<div
						class="bg-brand-dark border border-gray-700 p-4 rounded-xl text-sm font-mono break-all text-text-muted"
					>
						{ogEndpointUrl}
					</div>
					<button
						onclick={() => navigator.clipboard.writeText(ogEndpointUrl)}
						class="mt-4 px-5 py-2.5 bg-brand hover:bg-brand/90 text-brand-dark font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand/20"
					>
						Copy URL
					</button>
				</div>
			</div>

			<!-- Preview -->
			<div class="space-y-6">
				<!-- Component Preview -->
				<div>
					<h2 class="text-xl font-semibold text-white mb-4">Component Preview (1200x630)</h2>
					<div
						class="og-preview-wrapper border-2 border-gray-700/70 rounded-3xl overflow-hidden"
						bind:clientWidth={wrapperWidth}
					>
						<div class="og-preview-scaler" style="transform: scale({scale});">
							<OgCard
								{title}
								{subtitle}
								image={imageUrl || undefined}
								preview={mockPreviewImage || undefined}
							/>
						</div>
					</div>
				</div>

				<!-- Production Endpoint -->
				<div>
					<div class="flex items-center justify-between mb-4">
						<h2 class="text-xl font-semibold text-white">Production OG Image</h2>
						<a
							href="https://merginit.com/og?title={encodeURIComponent(
								title
							)}&subtitle={encodeURIComponent(subtitle)}&no_cache=1"
							target="_blank"
							rel="noopener noreferrer"
							class="px-4 py-2 border border-gray-700 hover:border-brand/70 text-text-muted hover:text-brand rounded-xl text-sm font-medium transition-all inline-flex items-center gap-1.5"
						>
							Open in new tab
							<Icon icon="lucide:external-link" class="w-4 h-4" />
						</a>
					</div>
					<div class="rounded-3xl p-6 border border-gray-700/70 bg-blue-950/10 backdrop-blur-md">
						<p class="text-text-muted mb-4">
							The OG endpoint uses <code class="text-brand">workers-og</code> which only runs in Cloudflare
							Workers (production).
						</p>
						<a
							href="https://merginit.com/og?title={encodeURIComponent(
								title
							)}&subtitle={encodeURIComponent(subtitle)}&no_cache=1"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-block px-5 py-2.5 bg-brand hover:bg-brand/90 text-brand-dark font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand/20"
						>
							View on Production
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.og-preview-wrapper {
		aspect-ratio: 1200 / 630;
		position: relative;
		overflow: hidden;
	}

	.og-preview-scaler {
		position: absolute;
		top: 0;
		left: 0;
		width: 1200px;
		height: 630px;
		transform-origin: top left;
	}
</style>
