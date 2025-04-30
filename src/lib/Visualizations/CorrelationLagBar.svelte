<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  let chart: Chart;
  let chartCanvas: HTMLCanvasElement;
  let selectedData: { label: string; correlation: number; lag: number } | null = null;

  const rawData = [
    { stock: 'TSLA', correlation: 0.444048612, lag: 0 },
    { stock: 'AMD', correlation: 0.247211421, lag: 0 },
    { stock: 'NIO', correlation: 0.227940681, lag: 0 },
    { stock: 'AAPL', correlation: 0.210628798, lag: 0 },
    { stock: 'AMZN', correlation: 0.208114095, lag: 0 },
    { stock: 'META', correlation: 0.20179863, lag: 0 },
    { stock: 'GOOG', correlation: 0.188108608, lag: 2 },
    { stock: 'PG', correlation: 0.151330861, lag: 2 },
    { stock: 'MSFT', correlation: 0.12515082, lag: 1 },
    { stock: 'TSM', correlation: 0.116548077, lag: -2 },
    { stock: 'NFLX', correlation: -0.142830252, lag: -6 }
  ];

  let colors = rawData.map(d => getBarColor(d.correlation, false));

  function getBarColor(correlation: number, isSelected: boolean) {
    if (isSelected) return '#ff832b'; // Highlight color
    if (correlation > 0.4) return '#0043ce'; // Strong correlation
    if (correlation > 0.2) return '#4589ff'; // Moderate correlation
    if (correlation > 0) return '#8ab6ff'; // Low correlation
    if (correlation < 0) return '#ff8389'; // Negative correlation
    return '#dddddd'; // Neutral
  }

  function renderChart() {
    if (chart) chart.destroy();

    chart = new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels: rawData.map(d => d.stock),
        datasets: [
          {
            label: 'Correlation',
            data: rawData.map(d => d.correlation),
            backgroundColor: colors,
            borderRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const value = context.parsed.y;
                const lag = rawData[context.dataIndex].lag;
                return ` Correlation: ${(value * 100).toFixed(1)}% | Lag: ${lag} days`;
              }
            }
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 0.5
          }
        },
        onClick: (e: MouseEvent, elements: any[]) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const data = rawData[index];

            selectedData = {
              label: data.stock,
              correlation: data.correlation,
              lag: data.lag
            };

            // Update colors
            colors = rawData.map((d, i) =>
              i === index ? getBarColor(d.correlation, true) : getBarColor(d.correlation, false)
            );

            chart.data.datasets[0].backgroundColor = colors;
            chart.update();
          }
        }
      }
    });
  }

  onMount(() => {
    renderChart();
  });
</script>

<div class="correlation-chart">
  <h2>Sentiment-Price Correlation Analysis</h2>
  <p class="subtitle">Click on a bar to see details and highlight it</p>

  <canvas bind:this={chartCanvas}></canvas>

  {#if selectedData}
    <div class="selected-data">
      <h3>Selected Stock Details 📊</h3>
      <p><strong>Stock:</strong> {selectedData.label}</p>
      <p><strong>Correlation:</strong> {(selectedData.correlation * 100).toFixed(2)}%</p>
      <p><strong>Lag:</strong> {selectedData.lag} day{selectedData.lag !== 1 ? 's' : ''}</p>
    </div>
  {/if}

  <div class="chart-legend">
    <div class="legend-item">
      <span class="color-swatch strong"></span>
      <span>Moderate Correlation (&gt; 0.4)</span>
    </div>
    <div class="legend-item">
      <span class="color-swatch medium"></span>
      <span>Weak to Moderate Correlation (0.2 - 0.4)</span>
    </div>
    <div class="legend-item">
      <span class="color-swatch low"></span>
      <span>Weak Correlation (&lt; 0.2)</span>
    </div>
    <div class="legend-item">
      <span class="color-swatch negative"></span>
      <span>Negative Correlation</span>
    </div>
    <div class="legend-item">
      <span class="color-swatch selected"></span>
      <span>Selected Bar</span>
    </div>
  </div>
</div>

<style>
  .correlation-chart {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
    max-width: 800px;
    margin: auto;
  }

  h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 1.4rem;
  }

  .subtitle {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  canvas {
    width: 100% !important;
    height: auto !important;
  }

  .selected-data {
    margin-top: 1rem;
    padding: 1rem;
    background: #f4f4f4;
    border-radius: 6px;
    color: #333;
    font-size: 0.95rem;
    border-left: 4px solid #ff832b;
  }

  .selected-data h3 {
    margin-bottom: 0.5rem;
    color: #ff832b;
  }

  .chart-legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    font-size: 0.85rem;
    color: #555;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .color-swatch {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 2px;
  }

  .color-swatch.strong {
    background: #0043ce;
  }

  .color-swatch.medium {
    background: #4589ff;
  }

  .color-swatch.low {
    background: #8ab6ff;
  }

  .color-swatch.negative {
    background: #ff8389;
  }

  .color-swatch.selected {
    background: #ff832b;
  }
</style>
