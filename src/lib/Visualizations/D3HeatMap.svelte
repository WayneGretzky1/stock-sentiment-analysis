<script lang="ts">
  import { scaleSequential } from 'd3-scale';
  import { interpolateReds } from 'd3-scale-chromatic';

  let activeTab: 'sentimentToStock' | 'stockToSentiment' = 'sentimentToStock';

  const sampleSentimentToStock = [
    { stock: 'NIO', lag: 1, value: 3.11 }, { stock: 'NIO', lag: 2, value: 2.42 },
    { stock: 'NIO', lag: 3, value: 3.01 }, { stock: 'NIO', lag: 4, value: 3.22 },
    { stock: 'NIO', lag: 5, value: 2.97 }, { stock: 'TSLA', lag: 1, value: 2.87 },
    { stock: 'TSLA', lag: 2, value: 2.23 }, { stock: 'TSLA', lag: 3, value: 2.10 },
    { stock: 'TSLA', lag: 4, value: 2.34 }, { stock: 'TSLA', lag: 5, value: 1.96 },
    { stock: 'AMZN', lag: 1, value: 1.55 }, { stock: 'AMZN', lag: 2, value: 2.45 },
    { stock: 'AMZN', lag: 3, value: 2.34 }, { stock: 'AMZN', lag: 4, value: 2.22 },
    { stock: 'AMZN', lag: 5, value: 1.80 }, { stock: 'MSFT', lag: 1, value: 1.43 },
    { stock: 'GOOG', lag: 2, value: 2.43 }, { stock: 'GOOG', lag: 3, value: 2.23 },
    { stock: 'GOOG', lag: 4, value: 1.85 }, { stock: 'GOOG', lag: 5, value: 1.62 },
    { stock: 'PG', lag: 2, value: 1.38 }
  ];

  const sampleStockToSentiment = [
    { stock: 'TSLA', lag: 1, value: 3.32 }, { stock: 'TSLA', lag: 2, value: 3.19 },
    { stock: 'TSLA', lag: 3, value: 2.57 }, { stock: 'TSLA', lag: 4, value: 2.52 },
    { stock: 'TSLA', lag: 5, value: 2.22 }, { stock: 'NIO', lag: 1, value: 0.5 },
    { stock: 'NIO', lag: 2, value: 0.5 }, { stock: 'NIO', lag: 3, value: 0.5 },
    { stock: 'NIO', lag: 4, value: 0.5 }, { stock: 'NIO', lag: 5, value: 0.5 },
    { stock: 'AMZN', lag: 1, value: 0.5 }, { stock: 'AMZN', lag: 2, value: 0.5 },
    { stock: 'AMZN', lag: 3, value: 0.5 }, { stock: 'AMZN', lag: 4, value: 0.5 },
    { stock: 'AMZN', lag: 5, value: 0.5 }, { stock: 'MSFT', lag: 1, value: 0.5 },
    { stock: 'MSFT', lag: 2, value: 0.5 }, { stock: 'MSFT', lag: 3, value: 0.5 },
    { stock: 'MSFT', lag: 4, value: 0.5 }, { stock: 'MSFT', lag: 5, value: 0.5 },
    { stock: 'GOOG', lag: 1, value: 0.5 }, { stock: 'GOOG', lag: 2, value: 0.5 },
    { stock: 'GOOG', lag: 3, value: 0.5 }, { stock: 'GOOG', lag: 4, value: 0.5 },
    { stock: 'GOOG', lag: 5, value: 0.5 }, { stock: 'PG', lag: 1, value: 0.5 },
    { stock: 'PG', lag: 2, value: 0.5 }, { stock: 'PG', lag: 3, value: 0.5 },
    { stock: 'PG', lag: 4, value: 0.5 }, { stock: 'PG', lag: 5, value: 0.5 }
  ];

  // Reactive: update data based on active tab
  $: data = activeTab === 'sentimentToStock' ? sampleSentimentToStock : sampleStockToSentiment;

  const stocks = [...new Set(data.map(d => d.stock))];
  const lags = [...new Set(data.map(d => d.lag))];

  const cellSize = 80;
  const padding = 60;
  const width = (lags.length + 1) * cellSize;
  const height = (stocks.length + 1) * cellSize;

  const colorScale = scaleSequential(interpolateReds).domain([0, 3.5]);
</script>

<div class="tabs">
  <button on:click={() => activeTab = 'sentimentToStock'} class:active={activeTab === 'sentimentToStock'}>
    Sentiment → Stock
  </button>
  <button on:click={() => activeTab = 'stockToSentiment'} class:active={activeTab === 'stockToSentiment'}>
    Stock → Sentiment
  </button>
</div>

<svg {width} {height}>
  <!-- Y axis -->
  {#each stocks as stock, row}
    <text x="50" y={(row + 1.5) * cellSize} font-size="12" text-anchor="end">{stock}</text>
  {/each}

  <!-- X axis -->
  {#each lags as lag, col}
    <text x={(col + 1.5) * cellSize} y="45" font-size="12" text-anchor="middle">{lag}</text>
  {/each}

  <!-- Heatmap cells and values -->
  {#each data as d}
  <g>
    <rect
      x={(lags.indexOf(d.lag) + 1) * cellSize}
      y={(stocks.indexOf(d.stock) + 1) * cellSize}
      width={cellSize}
      height={cellSize}
      fill={colorScale(d.value)}
      stroke="white"
    />
    <text
      x={(lags.indexOf(d.lag) + 1) * cellSize + cellSize / 2}
      y={(stocks.indexOf(d.stock) + 1) * cellSize + cellSize / 2}
      text-anchor="middle"
      alignment-baseline="central"
      fill="white"
      font-size="14"
      font-weight="bold"
      style="text-shadow: 0 0 4px black;"
    >
      {d.value.toFixed(2)}
    </text>
  </g>
{/each}

</svg>

<style>
  .tabs {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
    gap: 1rem;
  }

  .tabs button {
    padding: 0.5rem 1.5rem;
    font-size: 0.9rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #f0f0f0;
  }

  .tabs button.active {
    background-color: #0062ff;
    color: white;
  }

  svg {
    font-family: sans-serif;
    display: block;
    margin: 0 auto;
  }
</style>
