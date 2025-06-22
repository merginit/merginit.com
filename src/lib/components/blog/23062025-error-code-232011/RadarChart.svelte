<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let id = 'radarCanvas';

	const data = {
		labels: [
			'Browser Cache',
			'Browser Extensions',
			'Network Stability',
			'Hardware Acceleration',
			'Corrupted Files'
		],
		datasets: [
			{
				label: 'Frequency of Cause (1-5)',
				data: [5, 4, 3, 2, 1],
				backgroundColor: 'rgba(204, 153, 0, 0.4)',
				borderColor: '#cc9900',
				pointBackgroundColor: '#cc9900',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: '#cc9900',
				tension: 0.2
			},
			{
				label: 'Ease of Fix (1-5)',
				data: [5, 4, 3, 4, 1],
				backgroundColor: 'rgba(56, 130, 120, 0.4)',
				borderColor: '#388278',
				pointBackgroundColor: '#388278',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: '#388278',
				tension: 0.2
			}
		]
	};

	onMount(() => {
		const ctx = document.getElementById(id) as HTMLCanvasElement | null;
		if (!ctx) return;

		new Chart(ctx, {
			type: 'radar',
			data,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					r: {
						beginAtZero: true,
						min: 0,
						max: 5,
						ticks: {
							stepSize: 1,
							backdropColor: 'rgba(0, 0, 0, 0)',
							color: '#888888'
						},
						pointLabels: {
							color: '#888888'
						},
						grid: {
							color: '#888888'
						},
						angleLines: {
							color: '#888888'
						}
					}
				},
				plugins: {
					legend: {
						labels: {
							color: '#888888'
						}
					}
				}
			}
		});
	});
</script>

<div style="height:500px">
	<canvas {id}></canvas>
</div>
