<script lang="ts">
	import { setLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>Paraglide i18n Demo - MerginIT e.U.</title>
	<meta 
		name="description" 
		content="Interactive demonstration of internationalization (i18n) using Paraglide. Switch between languages and see the translation system in action."
	/>
	<meta property="og:title" content="Paraglide i18n Demo - MerginIT e.U." />
	<meta property="og:description" content="Interactive demonstration of internationalization (i18n) using Paraglide. Switch between languages and see the translation system in action." />
</svelte:head>

<div class="min-h-screen bg-brand-dark py-16 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36">
	<div class="max-w-4xl mx-auto">
		<div class="text-center mb-8">
			<h1 class="text-4xl font-bold text-white mb-6 tracking-tight">
				Internationalization Demo
			</h1>
			<p class="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
				This demo showcases multi-language support using Paraglide
			</p>
		</div>

		<div class="flex justify-center mb-16">
			<a 
				href="/demo" 
				class="text-gray-400 hover:text-gray-200 transition-colors duration-300 flex items-center gap-2"
			>
				← Back to Demos
			</a>
		</div>

		<div class="bg-blue-950/10 backdrop-blur-md border border-gray-700/70 rounded-3xl p-8 text-center">
			<h2 class="text-2xl font-semibold text-white mb-6">
				{m.hello_world({ name: 'SvelteKit User' })}
			</h2>
			
			<div class="flex justify-center gap-4 mb-8">
				<button 
					onclick={() => setLocale('en')}
					class="bg-[#ffaa40] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#ff9520] transition-colors duration-300"
				>
					English
				</button>
				<button 
					onclick={() => setLocale('de')}
					class="bg-[#ffaa40] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#ff9520] transition-colors duration-300"
				>
					Deutsch
				</button>
			</div>
			
			<div class="bg-gray-800/50 border border-gray-600/50 rounded-xl p-6">
				<p class="text-gray-300 mb-4">
					If you use VSCode, install the 
					<a
						href="https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension"
						target="_blank"
						class="text-[#ffaa40] hover:text-[#ff9520] underline"
					>
						Sherlock i18n extension
					</a> 
					for a better i18n experience.
				</p>
			</div>
		</div>
	</div>
</div>
