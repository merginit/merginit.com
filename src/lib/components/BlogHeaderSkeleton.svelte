<script lang="ts">
	import BorderBeam from './BorderBeam.svelte';
</script>

<div
	class="relative mb-12 rounded-3xl p-8 border border-gray-700/70 bg-blue-950/10 backdrop-blur-md"
>
	<!-- Metadata Row Skeleton -->
	<div class="flex flex-wrap items-center justify-between gap-4 mb-3">
		<div class="flex flex-wrap gap-5">
			<!-- Date -->
			<div class="h-5 w-32 animate-pulse rounded bg-gray-700/50"></div>
			<!-- Author -->
			<div class="flex items-center gap-1.5">
				<div class="h-5 w-5 animate-pulse rounded-full bg-gray-700/50"></div>
				<div class="h-5 w-24 animate-pulse rounded bg-gray-700/50"></div>
			</div>
			<!-- Reading Time -->
			<div class="flex items-center gap-1.5">
				<div class="h-5 w-5 animate-pulse rounded-full bg-gray-700/50"></div>
				<div class="h-5 w-20 animate-pulse rounded bg-gray-700/50"></div>
			</div>
		</div>

		<!-- Tags chips -->
		<div class="flex gap-2">
			<div class="h-6 w-16 animate-pulse rounded-full bg-gray-700/30"></div>
			<div class="h-6 w-20 animate-pulse rounded-full bg-gray-700/30"></div>
			<div class="h-6 w-16 animate-pulse rounded-full bg-gray-700/30"></div>
		</div>
	</div>

	<!-- Title Skeleton -->
	<div class="mb-2 space-y-2">
		<div class="h-8 w-3/4 animate-pulse rounded bg-gray-700/50 sm:h-9"></div>
		<div class="h-8 w-1/2 animate-pulse rounded bg-gray-700/50 sm:h-9"></div>
	</div>

	<!-- Description Skeleton -->
	<div class="mb-3 space-y-2">
		<div class="h-5 w-full animate-pulse rounded bg-gray-700/30"></div>
		<div class="h-5 w-5/6 animate-pulse rounded bg-gray-700/30"></div>
	</div>

	<!-- Categories Skeleton -->
	<div class="mt-4 flex gap-2">
		<div class="h-6 w-20 animate-pulse rounded-full bg-gray-700/30"></div>
		<div class="h-6 w-24 animate-pulse rounded-full bg-gray-700/30"></div>
	</div>

	<BorderBeam
		size={180}
		duration={10}
		anchor={45}
		class="absolute top-0 left-0 w-full h-full z-0 opacity-10 transition-opacity"
	/>
</div>
