<script lang="ts">
	import Icon from '@iconify/svelte';
	import BorderBeam from '$lib/components/BorderBeam.svelte';
	import CallToAction from '$lib/components/CallToAction.svelte';
</script>

<svelte:head>
	<title>Contact - MerginIT e.U.</title>
	<meta
		name="description"
		content="Get in touch with MerginIT e.U. for professional software development and SaaS solutions. Contact Jonas Fröller for your next project."
	/>
</svelte:head>

<div class="min-h-screen bg-brand-dark px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 pt-32 pb-16">
	<div class="max-w-4xl mx-auto">
		<!-- Header Section -->
		<div class="text-center mb-16">
			<h1
				class="text-4xl sm:text-5xl md:text-6xl font-bold text-[#ffaa40] mb-6 tracking-tight"
			>
				Get in Touch
			</h1>
			<p class="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
				Ready to start your next project?<br>
                Let's discuss how we can help you build innovative software solutions.
			</p>
		</div>

		<!-- Contact Cards Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
			<!-- Email Card -->
			<article
				class="group relative flex h-full flex-col items-start justify-between rounded-3xl p-8 border border-gray-700/70 bg-blue-950/10 backdrop-blur-md shadow-md hover:shadow-brand/20 transition-all duration-300 ease-in-out hover:border-brand/70"
			>
				<BorderBeam
					size={180}
					duration={12}
					delay={0}
					anchor={20}
					class="absolute top-0 left-0 w-full h-full z-0 opacity-30 group-hover:opacity-60 transition-opacity"
				/>

				<div class="relative z-10 w-full">
					<div class="flex items-center gap-4 mb-6">
						<div
							class="w-12 h-12 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center"
						>
							<Icon icon="lucide:mail" class="w-6 h-6 text-brand" />
						</div>
						<h2 class="text-2xl font-semibold text-white">Email</h2>
					</div>
					<p class="text-gray-300 mb-6 leading-relaxed">
						Drop us a line for project inquiries, consultations, or any questions about our
						services.
					</p>
					<a
						href="mailto:jonas@merginit.com"
						class="inline-flex items-center gap-2 text-brand hover:text-white transition-colors duration-300 text-lg font-medium group-link"
					>
						jonas@merginit.com
						<Icon icon="lucide:external-link" class="w-4 h-4" />
					</a>
				</div>
			</article>

			<!-- Phone Card -->
			<article
				class="group relative flex h-full flex-col items-start justify-between rounded-3xl p-8 border border-gray-700/70 bg-blue-950/10 backdrop-blur-md shadow-md hover:shadow-brand/20 transition-all duration-300 ease-in-out hover:border-brand/70"
			>
				<BorderBeam
					size={180}
					duration={10}
					delay={0.3}
					anchor={80}
					class="absolute top-0 left-0 w-full h-full z-0 opacity-30 group-hover:opacity-60 transition-opacity"
				/>

				<div class="relative z-10 w-full">
					<div class="flex items-center gap-4 mb-6">
						<div
							class="w-12 h-12 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center"
						>
							<Icon icon="lucide:phone" class="w-6 h-6 text-brand" />
						</div>
						<h2 class="text-2xl font-semibold text-white">Phone</h2>
					</div>
					<p class="text-gray-300 mb-6 leading-relaxed">
						Prefer to talk directly? Give us a call to discuss your project requirements.
					</p>
					<a
						href="tel:+436643279885"
						class="inline-flex items-center gap-2 text-brand hover:text-white transition-colors duration-300 text-lg font-medium group-link"
					>
						+43 664 327 9885
						<Icon icon="lucide:external-link" class="w-4 h-4" />
					</a>
				</div>
			</article>
		</div>

		<!-- Company Information -->
		<div class="w-full">
			<article
				class="group relative rounded-3xl p-8 border border-gray-700/70 bg-blue-950/10 backdrop-blur-md shadow-md hover:shadow-brand/20 transition-all duration-300 ease-in-out hover:border-brand/70"
			>
				<BorderBeam
					size={200}
					duration={15}
					delay={0.6}
					anchor={50}
					class="absolute top-0 left-0 w-full h-full z-0 opacity-30 group-hover:opacity-60 transition-opacity"
				/>

				<div class="relative z-10">
					<div class="text-center mb-8">
						<h2 class="text-3xl font-bold text-white mb-4">MerginIT e.U.</h2>
						<p class="text-gray-300 text-lg leading-relaxed">
							Your partner for innovative IT solutions.<br>
                            We specialize in web-based software development and SaaS platforms.
						</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
						<!-- Company Details -->
						<div>
							<h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
								<Icon icon="lucide:building" class="w-5 h-5 text-brand" />
								Company Details
							</h3>
							<div class="space-y-2 text-gray-300">
								<p><strong class="text-white">Founder:</strong> Jonas Fröller</p>
								<p><strong class="text-white">Location:</strong> Leonding, Austria</p>
								<p><strong class="text-white">Business Type:</strong> Software Development & IT Services</p>
							</div>
						</div>

						<!-- Connect With Us -->
						<div>
							<h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
								<Icon icon="lucide:globe" class="w-5 h-5 text-brand" />
								Connect With Us
							</h3>
							<div class="space-y-3">
								<a
									href="https://www.linkedin.com/company/merginit"
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-3 text-gray-300 hover:text-brand transition-colors duration-300"
								>
									<Icon icon="mdi:linkedin" class="w-5 h-5" />
									LinkedIn
								</a>
								<a
									href="https://github.com/merginit"
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-3 text-gray-300 hover:text-brand transition-colors duration-300"
								>
									<Icon icon="mdi:github" class="w-5 h-5" />
									GitHub
								</a>
							</div>
						</div>
					</div>
				</div>
			</article>
		</div>

		<!-- Call to Action -->
		<div class="text-center mt-16">
			<h2 class="text-2xl font-semibold text-white mb-4">Ready to Start Your Project?</h2>
			<p class="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
				We're here to help bring your vision to life.
			</p>
			<CallToAction
				href="mailto:jonas@merginit.com"
				text="Contact Us"
				class="inline-block"
			/>
		</div>
	</div>
</div>

<style>
	.group-link {
		text-decoration: none;
	}

	.group-link:hover {
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 2px;
	}
</style>
