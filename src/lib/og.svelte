<script lang="ts">
	export let title: string = 'MerginIT e.U.';
	export let subtitle: string = 'Professional Software Development & SaaS Solutions';
	export let image: string | undefined = undefined;
	export let preview: string | undefined = undefined;
</script>

<div
	style="
		height: 630px;
		width: 1200px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: column;
		background-color: #f0f0f0;
		font-family: 'Noto Sans', sans-serif;
		padding-top: 40px;
	"
>
	<div
		style="
			display: flex;
			justify-content: center;
			width: 100%;
			font-size: 56px;
			color: black;
			margin-top: 10px;
			line-height: 1.2;
			font-weight: 900;
		"
	>
		{title || 'MerginIT e.U.'}
	</div>
	<div
		style="
			display: flex;
			justify-content: center;
			width: 100%;
			font-size: 24px;
			color: #666;
			margin-top: 8px;
			line-height: 1.4;
			padding-left: 40px;
			padding-right: 40px;
		"
	>
		{subtitle || 'Professional Software Development & SaaS Solutions'}
	</div>
	{#if preview}
		<div style="position: relative; width: 1000px; height: 420px; margin-top: auto; display: flex;">
			<img
				src={preview}
				alt="Page preview"
				style="width: 1000px; height: 420px; object-fit: cover; border-top-left-radius: 16px; border-top-right-radius: 16px;"
			/>
			<img
				src={image ?? 'https://merginit.com/favicon.png'}
				alt="Logo"
				style="position: absolute; right: 16px; bottom: 16px; width: 72px; height: 72px; border-radius: 9999px; background-color: white; border: 2px solid white;"
			/>
		</div>
	{/if}
</div>
