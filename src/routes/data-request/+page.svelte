<script lang="ts">
	import Icon from '@iconify/svelte';
	import BorderBeam from '$lib/components/BorderBeam.svelte';
</script>

<svelte:head>
	<title>Data Request - MerginIT e.U.</title>
	<meta
		name="description"
		content="Request your personal data from MerginIT services. Learn where and how to access your data across our platforms."
	/>
</svelte:head>

<div class="min-h-screen bg-brand-dark py-16 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36">
	<div class="max-w-4xl mx-auto">
		<div class="text-center mb-4">
			<h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
				Data Request
			</h1>
			<p class="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
				Access and manage your personal data across MerginIT services. We respect your privacy and
				provide transparent access to your information.
			</p>
		</div>

		<!-- Back to home link -->
		<div class="flex justify-center mb-16">
			<a
				href="/"
				class="text-gray-400 hover:text-gray-200 transition-colors duration-300 flex items-center gap-2"
			>
				<Icon
					icon="mdi:arrow-left"
					class="w-4 h-4"
				/>
				Back to Home
			</a>
		</div>

		<div class="grid gap-8 mb-12">
			<!-- Commercial Services Section -->
			<section
				class="bg-blue-950/10 backdrop-blur-md border border-gray-700/70 rounded-3xl p-8 relative overflow-hidden"
			>
				<BorderBeam
					size={200}
					duration={12}
					delay={0}
					anchor={20}
					class="absolute top-0 left-0 w-full h-full z-0 opacity-40"
				/>

				<div class="relative z-10">
					<div class="flex items-center gap-4 mb-6">
						<div class="bg-green-500/20 p-3 rounded-full border border-green-500/40">
							<Icon icon="mdi:shield-check" class="w-6 h-6 text-green-400" />
						</div>
						<h2 class="text-2xl font-semibold text-white">Commercial Services</h2>
					</div>

					<div class="bg-gray-800/50 border border-gray-600/50 rounded-2xl p-6 mb-6">
						<div class="flex items-start gap-4">
							<img
								src="/ocrmd-icon.webp"
								alt="OCRMD logo"
								width="64"
								height="64"
								class="w-16 h-16 rounded-lg bg-gray-700 p-2 object-contain border border-gray-600"
							/>
							<div class="flex-1">
								<h3 class="text-xl font-semibold text-white mb-2">OCRMD</h3>
								<p class="text-gray-300 mb-4">
									OCR and document processing service with cloud storage and advanced text
									recognition.
								</p>
								<a
									href="https://www.ocrmd.com/settings"
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 bg-[#ffaa40] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#ff9520] transition-colors duration-300"
								>
									<Icon icon="mdi:account-cog" class="w-5 h-5" />
									Access Your Data
									<Icon
										icon="mdi:external-link"
										class="w-4 h-4"
									/>
								</a>
							</div>
						</div>
					</div>

					<div class="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
						<div class="flex items-start gap-3">
							<Icon icon="mdi:information" class="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
							<div class="text-sm text-blue-200">
								<strong>Commercial services</strong> store user data and provide account management features.
								You can request, export, or delete your data through the service settings.
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Open Source & Free Services Section -->
			<section
				class="bg-blue-950/10 backdrop-blur-md border border-gray-700/70 rounded-3xl p-8 relative overflow-hidden"
			>
				<BorderBeam
					size={180}
					duration={15}
					delay={2}
					anchor={70}
					class="absolute top-0 left-0 w-full h-full z-0 opacity-30"
				/>

				<div class="relative z-10">
					<div class="flex items-center gap-4 mb-6">
						<div class="bg-purple-500/20 p-3 rounded-full border border-purple-500/40">
							<Icon icon="mdi:open-source-initiative" class="w-6 h-6 text-purple-400" />
						</div>
						<h2 class="text-2xl font-semibold text-white">Open Source, Contract & Free Services</h2>
					</div>

					<div class="space-y-4 mb-6">
						<div class="bg-gray-800/50 border border-gray-600/50 rounded-xl p-4">
							<div class="flex items-center gap-3 mb-2">
								<img
									src="/neptunai-icon.webp"
									alt="NeptunAI logo"
									width="32"
									height="32"
									class="w-8 h-8 rounded object-contain"
								/>
								<h3 class="text-lg font-medium text-white">NeptunAI</h3>
								<span
									class="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full border border-purple-500/30"
								>
									Open Source
								</span>
							</div>
							<p class="text-gray-400 text-sm mb-3">
								Configuration platform and AI tools for development workflows.
							</p>
							<div class="flex flex-col sm:flex-row gap-2">
								<span
									class="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded border border-green-500/30 flex items-center gap-1"
								>
									<Icon icon="mdi:account-remove" class="w-3 h-3" />
									Full Account Deletion Available
								</span>
								<span
									class="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded border border-yellow-500/30 flex items-center gap-1"
								>
									<Icon icon="mdi:download-outline" class="w-3 h-3" />
									Currently offers limited data export
								</span>
							</div>
						</div>

						<div class="bg-gray-800/50 border border-gray-600/50 rounded-xl p-4">
							<div class="flex items-center gap-3 mb-2">
								<img
									src="/taeglichfrischesobst.com.webp"
									alt="Täglich frisches Obst logo"
									width="32"
									height="32"
									class="w-8 h-8 rounded object-contain"
								/>
								<h3 class="text-lg font-medium text-white">Täglich frisches Obst</h3>
								<span
									class="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full border border-green-500/30"
								>
									Website
								</span>
							</div>
							<p class="text-gray-400 text-sm">
								Band website with no user accounts or personal data collection other than a simple
								contact form.
							</p>
						</div>
					</div>

					<div class="bg-gray-900/60 border border-gray-600/50 rounded-xl p-4">
						<div class="flex items-start gap-3">
							<Icon icon="mdi:shield-outline" class="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
							<div class="text-sm text-gray-300">
								<strong>Open source, contract and free services</strong> have varying data collection
								practices. Some may require accounts for functionality but prioritize user control and
								privacy. Data availability and deletion options are specified for each service above.
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Contact Section -->
			<section
				class="bg-blue-950/10 backdrop-blur-md border border-gray-700/70 rounded-3xl p-8 relative overflow-hidden"
			>
				<BorderBeam
					size={160}
					duration={18}
					delay={4}
					anchor={90}
					class="absolute top-0 left-0 w-full h-full z-0 opacity-25"
				/>

				<div class="relative z-10">
					<div class="flex items-center gap-4 mb-6">
						<div class="bg-orange-500/20 p-3 rounded-full border border-orange-500/40">
							<Icon icon="mdi:email-outline" class="w-6 h-6 text-orange-400" />
						</div>
						<h2 class="text-2xl font-semibold text-white">Need Help?</h2>
					</div>

					<p class="text-gray-300 mb-6 leading-relaxed">
						If you have questions about your data, need assistance with data requests, or want to
						exercise your privacy rights, we're here to help.
					</p>

					<div class="flex flex-col sm:flex-row gap-4">
						<a
							href="mailto:jonas@merginit.com?subject=Data Request"
							class="inline-flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-300"
						>
							<Icon icon="mdi:email" class="w-5 h-5" />
							Contact Support
							<Icon
								icon="mdi:arrow-right"
								class="w-4 h-4"
							/>
						</a>

						<a
							href="/legal/privacy-policy"
							class="inline-flex items-center gap-2 bg-transparent text-gray-300 px-6 py-3 rounded-lg font-medium border border-gray-600 hover:border-gray-500 hover:text-white transition-colors duration-300"
						>
							<Icon icon="mdi:file-document-outline" class="w-5 h-5" />
							Privacy Policy
						</a>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
