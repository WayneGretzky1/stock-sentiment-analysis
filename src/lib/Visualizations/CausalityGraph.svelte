<script lang="ts">
  import { onMount } from 'svelte';
  import { scaleSequential } from 'd3-scale';
  import { interpolatePurples } from 'd3-scale-chromatic';

  let isLoading = true;
  let activeTab: 'sentimentToStock' | 'stockToSentiment' = 'sentimentToStock';
  let tooltipData: { x: number; y: number; value: number; stock: string; lag: number } | null = null;

  type HeatmapDataPoint = {
    stock: string;
    lag: number;
    value: number | null;
  };

  const sampleSentimentToStock: HeatmapDataPoint[] = [
    { stock: 'NIO', lag: 1, value: 3.11 }, { stock: 'NIO', lag: 2, value: 2.42 },
    { stock: 'NIO', lag: 3, value: 3.01 }, { stock: 'NIO', lag: 4, value: 3.22 },
    { stock: 'NIO', lag: 5, value: 2.97 }, { stock: 'TSLA', lag: 1, value: 2.87 },
    { stock: 'TSLA', lag: 2, value: 2.23 }, { stock: 'TSLA', lag: 3, value: 2.10 },
    { stock: 'TSLA', lag: 4, value: 2.34 }, { stock: 'TSLA', lag: 5, value: 1.96 },
    { stock: 'AMZN', lag: 1, value: 1.55 }, { stock: 'AMZN', lag: 2, value: 2.45 },
    { stock: 'AMZN', lag: 3, value: 2.34 }, { stock: 'AMZN', lag: 4, value: 2.22 },
    { stock: 'AMZN', lag: 5, value: 1.80 }, { stock: 'MSFT', lag: 1, value: 1.43 },
    { stock: 'MSFT', lag: 2, value: 0 }, { stock: 'MSFT', lag: 3, value: 0 },
    { stock: 'MSFT', lag: 4, value: 0 }, { stock: 'MSFT', lag: 5, value: 0 },
    { stock: 'GOOG', lag: 1, value: 0 }, { stock: 'GOOG', lag: 2, value: 2.43 },
    { stock: 'GOOG', lag: 3, value: 2.23 }, { stock: 'GOOG', lag: 4, value: 1.85 },
    { stock: 'GOOG', lag: 5, value: 1.62 }, { stock: 'PG', lag: 1, value: 0 },
    { stock: 'PG', lag: 2, value: 1.38 }, { stock: 'PG', lag: 3, value: 0 },
    { stock: 'PG', lag: 4, value: 0 }, { stock: 'PG', lag: 5, value: 0 }
  ];

  const sampleStockToSentiment: HeatmapDataPoint[] = [
    { stock: 'TSLA', lag: 1, value: 3.32 }, { stock: 'TSLA', lag: 2, value: 3.19 },
    { stock: 'TSLA', lag: 3, value: 2.57 }, { stock: 'TSLA', lag: 4, value: 2.52 },
    { stock: 'TSLA', lag: 5, value: 2.22 }, { stock: 'NIO', lag: 1, value: 0 },
    { stock: 'NIO', lag: 2, value: 0 }, { stock: 'NIO', lag: 3, value: 0 },
    { stock: 'NIO', lag: 4, value: 0 }, { stock: 'NIO', lag: 5, value: 0 },
    { stock: 'AMZN', lag: 1, value: 0 }, { stock: 'AMZN', lag: 2, value: 0 },
    { stock: 'AMZN', lag: 3, value: 0 }, { stock: 'AMZN', lag: 4, value: 0 },
    { stock: 'AMZN', lag: 5, value: 0 }, { stock: 'MSFT', lag: 1, value: 0 },
    { stock: 'MSFT', lag: 2, value: 0 }, { stock: 'MSFT', lag: 3, value: 0 },
    { stock: 'MSFT', lag: 4, value: 0 }, { stock: 'MSFT', lag: 5, value: 0 },
    { stock: 'GOOG', lag: 1, value: 0 }, { stock: 'GOOG', lag: 2, value: 0 },
    { stock: 'GOOG', lag: 3, value: 0 }, { stock: 'GOOG', lag: 4, value: 0 },
    { stock: 'GOOG', lag: 5, value: 0 }, { stock: 'PG', lag: 1, value: 0 },
    { stock: 'PG', lag: 2, value: 0 }, { stock: 'PG', lag: 3, value: 0 },
    { stock: 'PG', lag: 4, value: 0 }, { stock: 'PG', lag: 5, value: 0 }
  ];

  function fillMissingCells(data: HeatmapDataPoint[]): HeatmapDataPoint[] {
    const allStocks = [...new Set(data.map(d => d.stock))];
    const allLags = [...new Set(data.map(d => d.lag))];
    const fullData: HeatmapDataPoint[] = [];

    for (const stock of allStocks) {
      for (const lag of allLags) {
        const existing = data.find(d => d.stock === stock && d.lag === lag);
        if (existing) {
          fullData.push(existing);
        } else {
          fullData.push({ stock, lag, value: null });
        }
      }
    }

    return fullData;
  }

  
  let currentData: HeatmapDataPoint[] = [];

  const colorScale = scaleSequential(interpolatePurples).domain([0, 3.4]);

  $: currentData = activeTab === 'sentimentToStock' ? sampleSentimentToStock : sampleStockToSentiment;
  $: stocks = [...new Set(currentData.map(d => d.stock))];
  $: lags = [...new Set(currentData.map(d => d.lag))];

  onMount(() => {
    isLoading = false;
  });
</script>

<!-- <h2 style="text-align: center; font-size: 1.5rem; font-weight: bold; margin: 1rem 0;"> -->
<center> 
  <h2>
    {activeTab === 'sentimentToStock' 
      ? 'Granger Causality: Sentiment → Stock Returns' 
      : 'Granger Causality: Stock Returns → Sentiment'}
  </h2>
</center>

{#if isLoading}
  <div class="loading">Loading causality data...</div>
{:else}
  <div class="tabs">
    <button on:click={() => activeTab = 'sentimentToStock'} class:active={activeTab === 'sentimentToStock'}>Sentiment → Stock</button>
    <button on:click={() => activeTab = 'stockToSentiment'} class:active={activeTab === 'stockToSentiment'}>Stock → Sentiment</button>
  </div>

  <div class="heatmap-wrapper">
    <svg width="100%" height="500">
      <!-- Y-axis: Stock labels -->
      {#each stocks as stock, i}
        <text x="+180" y="{i * 50 + 25}" text-anchor="end" alignment-baseline="central" font-size="12px" fill="black">
          {stock}
        </text>
      {/each}

      <!-- X-axis: Lag labels -->
      {#each lags as lag, j}
        <text x="{j * 100 + 250}" y="{stocks.length * 50 + 20}" text-anchor="middle" font-size="12px" fill="black">
          {lag}
        </text>
      {/each}

      <!-- X-axis title -->
      <text x="{((lags.length * 100) / 2)+200}" y="{stocks.length * 50 + 40}" text-anchor="middle" font-size="12px" fill="black">
        Lag (days)
      </text>

      <!-- Y-axis title -->
      <text x="-60" y="{((stocks.length * 50) / 2)+180}" text-anchor="middle" font-size="12px" fill="black" transform="rotate(-90 -60,{(stocks.length * 50) / 2})">
        Stock
      </text>

      <!-- Heatmap Cells -->
      {#each currentData as d (d.stock + d.lag)}
        <g
          transform={`translate(${(lags.indexOf(d.lag) * 100)+200}, ${stocks.indexOf(d.stock) * 50})`}
          on:mouseenter={() => tooltipData = {
            x: lags.indexOf(d.lag) * 100 + 50,
            y: stocks.indexOf(d.stock) * 50,
            value: d.value,
            stock: d.stock,
            lag: d.lag
          }}
          on:mouseleave={() => tooltipData = null}
        >
          <rect width="100" height="50" fill={d.value == null ? 'url(#diagonal-stripes)' : colorScale(d.value)} stroke="black" stroke-width="0.05" />
          <text x="50" y="25" text-anchor="middle" alignment-baseline="central" fill="white" font-size="14px">
            {d.value.toFixed(2)}
          </text>
        </g>
      {/each}

      <!-- Legend -->
      <defs>
        <linearGradient id="legend-gradient" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color={colorScale(0)} />
          <stop offset="50%" stop-color={colorScale(1.7)} />
          <stop offset="100%" stop-color={colorScale(3.4)} />
        </linearGradient>
        <pattern id="diagonal-stripes" patternUnits="userSpaceOnUse" width="6" height="6">
          <path d="M-1,1 l2,-2
                   M0,6 l6,-6
                   M5,7 l2,-2" 
                stroke="#ccc" stroke-width="1" />
        </pattern>
      </defs>
      <g transform="translate(210, 400)">
        <rect x="0" y="0" width="300" height="10" fill="url(#legend-gradient)" />
        <text x="0" y="25" font-size="12px">0</text>
        <text x="140" y="25" font-size="12px">1.7</text>
        <text x="280" y="25" font-size="12px">3.4</text>
        <text x="0" y="-5" font-size="12px">Predictive Power Score (-log10(p-value))</text>
      </g>
    </svg>

    {#if tooltipData}
      <div class="tooltip" style="top: {tooltipData.y + 60}px; left: {tooltipData.x}px">
        <div><strong>Lag (days):</strong> {tooltipData.lag}</div>
        <div><strong>Stock:</strong> {tooltipData.stock}</div>
        <div><strong>Score:</strong> {tooltipData.value.toFixed(2)}</div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    gap: 1rem;
  }

  .tabs button {
    padding: 0.5rem 1.5rem;
    background: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
  }

  .tabs button.active {
    background: #0062ff;
    color: white;
  }

  .tabs button:hover:not(.active) {
    background: #e0e0e0;
  }

  .heatmap-wrapper {
    position: relative;
    padding-left: 70px;
  }

  .tooltip {
    position: absolute;
    background: white;
    border: 1px solid #cccccc00;
    padding: 0.5rem;
    font-size: 0.9rem;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    pointer-events: none;
    white-space: nowrap;
    z-index: 1000;
  }
</style>
