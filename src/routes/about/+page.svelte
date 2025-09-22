<script lang="ts">
	import Icon from '@iconify/svelte';
	import BorderBeam from '$lib/components/BorderBeam.svelte';
	import CallToAction from '$lib/components/CallToAction.svelte';
</script>

<svelte:head>
	<title>About - MerginIT e.U.</title>
	<meta
		name="description"
		content="Learn about MerginIT e.U. and founder Jonas Fröller. We specialize in professional software development, SaaS solutions, and innovative web technologies."
	/>
	<meta property="og:title" content="About - MerginIT e.U." />
	<meta
		property="og:description"
		content="Learn about MerginIT e.U. and founder Jonas Fröller. We specialize in professional software development, SaaS solutions, and innovative web technologies."
	/>
</svelte:head>

<div class="min-h-screen bg-brand-dark px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 pt-32 pb-16">
	<div class="max-w-5xl mx-auto">
		<!-- Header Section -->
		<div class="text-center mb-16">
			<h1
				class="text-4xl sm:text-5xl md:text-6xl font-bold text-[#ffaa40] mb-6 tracking-tight"
			>
				About MerginIT
			</h1>
			<p class="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
				We merge features into reality, one iteration at a time. Specialized in building innovative
				software solutions that drive business growth.
			</p>
		</div>

		<!-- Mission & Vision Cards -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
			<!-- Mission Card -->
			<article
				class="group relative rounded-3xl p-8 border border-gray-700/70 bg-blue-950/10 backdrop-blur-md shadow-md hover:shadow-brand/20 transition-all duration-300 ease-in-out hover:border-brand/70"
			>
				<BorderBeam
					size={180}
					duration={12}
					delay={0}
					anchor={20}
					class="absolute top-0 left-0 w-full h-full z-0 opacity-30 group-hover:opacity-60 transition-opacity"
				/>

				<div class="relative z-10">
					<div class="flex items-center gap-4 mb-6">
						<div
							class="w-12 h-12 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center"
						>
							<Icon icon="lucide:target" class="w-6 h-6 text-brand" />
						</div>
						<h2 class="text-2xl font-semibold text-white">Our Mission</h2>
					</div>
					<p class="text-gray-300 leading-relaxed">
						Making things, that feel good. Making things, that help you.
					</p>
				</div>
			</article>

			<!-- Vision Card -->
			<article
				class="group relative rounded-3xl p-8 border border-gray-700/70 bg-blue-950/10 backdrop-blur-md shadow-md hover:shadow-brand/20 transition-all duration-300 ease-in-out hover:border-brand/70"
			>
				<BorderBeam
					size={180}
					duration={10}
					delay={0.3}
					anchor={80}
					class="absolute top-0 left-0 w-full h-full z-0 opacity-30 group-hover:opacity-60 transition-opacity"
				/>

				<div class="relative z-10">
					<div class="flex items-center gap-4 mb-6">
						<div
							class="w-12 h-12 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center"
						>
							<Icon icon="lucide:eye" class="w-6 h-6 text-brand" />
						</div>
						<h2 class="text-2xl font-semibold text-white">Our Vision</h2>
					</div>
					<p class="text-gray-300 leading-relaxed">
						Software with purpose. Software that makes a difference.
					</p>
				</div>
			</article>
		</div>

		<!-- Founder Section -->
		<div class="w-full mb-12">
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
						<h2 class="text-3xl font-bold text-white mb-4">Meet the Founder</h2>
						<div class="flex flex-col lg:flex-row items-center gap-8">
							<div class="flex-1">
								<h3 class="text-2xl font-semibold text-brand mb-4">Jonas Fröller</h3>
								<p class="text-gray-300 leading-relaxed mb-6">
									Software developer and entrepreneur with a passion for creating innovative
									solutions.<br />Based in Leonding, Austria, Jonas founded MerginIT e.U.<br />with the
									vision of helping businesses leverage technology to achieve their
									goals.
								</p>
								<div class="flex gap-4 justify-center">
									<a
										href="https://jonasfroeller.is-a.dev"
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-center gap-2 text-gray-300 hover:text-brand transition-colors duration-300"
									>
										<Icon icon="lucide:user" class="w-5 h-5" />
										Personal Website
									</a>
									<a
										href="https://www.linkedin.com/in/jonasfroeller"
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-center gap-2 text-gray-300 hover:text-brand transition-colors duration-300"
									>
										<Icon icon="mdi:linkedin" class="w-5 h-5" />
										LinkedIn
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</article>
		</div>

		<!-- What We Do Section -->
		<div class="w-full mb-12">
			<article
				class="group relative rounded-3xl p-8 border border-gray-700/70 bg-blue-950/10 backdrop-blur-md shadow-md hover:shadow-brand/20 transition-all duration-300 ease-in-out hover:border-brand/70"
			>
				<BorderBeam
					size={180}
					duration={14}
					delay={0.9}
					anchor={30}
					class="absolute top-0 left-0 w-full h-full z-0 opacity-30 group-hover:opacity-60 transition-opacity"
				/>

				<div class="relative z-10">
					<div class="text-center mb-8">
						<h2 class="text-3xl font-bold text-white mb-6">What We Do</h2>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
						<!-- Company Websites -->
						<div class="text-center">
							<div
								class="w-16 h-16 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center mx-auto mb-4"
							>
								<Icon icon="lucide:globe" class="w-8 h-8 text-brand" />
							</div>
							<h3 class="text-xl font-semibold text-white mb-3">Company Websites</h3>
							<p class="text-gray-300 leading-relaxed">
								Creating professional landing pages, blogs, and websites for companies that look
								great and convert visitors into customers.
							</p>
						</div>

						<!-- SaaS Solutions -->
						<div class="text-center">
							<div
								class="w-16 h-16 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center mx-auto mb-4"
							>
								<Icon icon="lucide:cloud" class="w-8 h-8 text-brand" />
							</div>
							<h3 class="text-xl font-semibold text-white mb-3">SaaS Solutions</h3>
							<p class="text-gray-300 leading-relaxed">
								Building scalable Software-as-a-Service platforms like OCRMD and NeptunAI that
								solve real problems with clean, intuitive interfaces.
							</p>
						</div>

						<!-- Mobile & Desktop Apps -->
						<div class="text-center">
							<div
								class="w-16 h-16 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center mx-auto mb-4"
							>
								<Icon icon="lucide:smartphone" class="w-8 h-8 text-brand" />
							</div>
							<h3 class="text-xl font-semibold text-white mb-3">Mobile & Desktop Apps</h3>
							<p class="text-gray-300 leading-relaxed">
								Developing native and cross-platform applications for mobile and desktop that
								provide seamless user experiences across all devices.
							</p>
						</div>
					</div>
				</div>
			</article>
		</div>

		<!-- Our Projects -->
		<div class="w-full mb-12">
			<article
				class="group relative rounded-3xl p-8 border border-gray-700/70 bg-blue-950/10 backdrop-blur-md shadow-md hover:shadow-brand/20 transition-all duration-300 ease-in-out hover:border-brand/70"
			>
				<BorderBeam
					size={220}
					duration={18}
					delay={1.2}
					anchor={70}
					class="absolute top-0 left-0 w-full h-full z-0 opacity-30 group-hover:opacity-60 transition-opacity"
				/>

				<div class="relative z-10">
					<div class="text-center mb-8">
						<h2 class="text-3xl font-bold text-white mb-4">Projects</h2>
						<p class="text-gray-300 text-lg leading-relaxed">
							Showcasing innovation across different industries and technologies.
						</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
						<!-- OCRMD -->
						<div class="text-center p-6 rounded-2xl border border-gray-700/50 bg-gray-900/30">
							<img
								src="https://ocrmd.com/favicon.png"
								alt="OCRMD"
								class="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-700 p-2"
							/>
							<h3 class="text-lg font-semibold text-white mb-2">OCRMD</h3>
							<p class="text-gray-400 text-sm leading-relaxed">
								AI-powered OCR solution transforming scanned documents into editable Markdown with
								90-99% accuracy.
							</p>
							<a
								href="https://ocrmd.com"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1 text-brand hover:text-white transition-colors duration-300 text-sm mt-3"
							>
								Visit Site
								<Icon icon="lucide:external-link" class="w-3 h-3" />
							</a>
						</div>

						<!-- NeptunAI -->
						<div class="text-center p-6 rounded-2xl border border-gray-700/50 bg-gray-900/30">
							<img
								src="https://neptunai.tech/favicon.png"
								alt="NeptunAI"
								class="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-700 p-2"
							/>
							<h3 class="text-lg font-semibold text-white mb-2">NeptunAI</h3>
							<p class="text-gray-400 text-sm leading-relaxed">
								Comprehensive configuration platform with CLI, WebUI, and AI trained on CI/CD and
								web development.
							</p>
							<a
								href="https://neptunai.tech"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1 text-brand hover:text-white transition-colors duration-300 text-sm mt-3"
							>
								Visit Site
								<Icon icon="lucide:external-link" class="w-3 h-3" />
							</a>
						</div>

						<!-- Täglich frisches Obst -->
						<div class="text-center p-6 rounded-2xl border border-gray-700/50 bg-gray-900/30">
							<img
								src="https://taeglichfrischesobst.com/assets/images/fruit.png"
								alt="Täglich frisches Obst"
								class="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-700 p-2"
							/>
							<h3 class="text-lg font-semibold text-white mb-2">Täglich frisches Obst</h3>
							<p class="text-gray-400 text-sm leading-relaxed">
								Modern website for Linz-based indie-pop band showcasing their unique musical
								style and live performances.
							</p>
							<a
								href="https://taeglichfrischesobst.com"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1 text-brand hover:text-white transition-colors duration-300 text-sm mt-3"
							>
								Visit Site
								<Icon icon="lucide:external-link" class="w-3 h-3" />
							</a>
						</div>
					</div>
				</div>
			</article>
		</div>

		<!-- Call to Action -->
		<div class="text-center mt-16">
			<h2 class="text-2xl font-semibold text-white mb-4">Ready to Work Together?</h2>
			<p class="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
				Let's discuss how we can help bring your software vision to life.
			</p>
			<CallToAction href="/contact" text="Get in Touch" class="inline-block" />
		</div>
	</div>
</div>
