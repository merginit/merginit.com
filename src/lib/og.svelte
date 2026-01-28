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
		padding: 32px 48px 0 48px;
		overflow: hidden;
	"
>
	<div
		style="
			display: flex;
			justify-content: center;
			text-align: center;
			width: 100%;
			font-size: {preview ? '42px' : '56px'};
			color: black;
			line-height: 1.1;
			font-weight: 900;
		"
	>
		{title || 'MerginIT e.U.'}
	</div>
	<div
		style="
			display: flex;
			justify-content: center;
			text-align: center;
			width: 100%;
			font-size: {preview ? '18px' : '24px'};
			color: #666;
			margin-top: 8px;
			line-height: 1.3;
		"
	>
		{subtitle || 'Professional Software Development & SaaS Solutions'}
	</div>
	{#if preview}
		<div
			style="position: relative; width: 1120px; height: 440px; margin-top: auto; display: flex; overflow: hidden; border-top-left-radius: 16px; border-top-right-radius: 16px;"
		>
			<img
				src={preview}
				alt="Page preview"
				style="width: 1120px; min-height: 440px; position: absolute; top: 0; left: 0;"
			/>
			<img
				src={image ?? 'https://merginit.com/icon-small.webp'}
				alt="Logo"
				style="position: absolute; right: 20px; bottom: 20px; width: 64px; height: 64px; border-radius: 9999px; background-color: white; border: 3px solid white;"
			/>
		</div>
	{/if}
</div>
