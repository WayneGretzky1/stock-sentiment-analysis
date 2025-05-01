<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { base } from '$app/paths';
  import { tick } from 'svelte';
  interface StockData {
  StockName: string;
  Date: Date;
  sent_score: number;
  '1_DAY_RETURN': number;
  '2_DAY_RETURN': number;
  '3_DAY_RETURN': number;
  '7_DAY_RETURN': number;
  Tweet: string | null;  // Change from string to string | null
}

  type IntervalKey = '1_DAY_RETURN' | '2_DAY_RETURN' | '3_DAY_RETURN' | '7_DAY_RETURN';
  
  let normalizedData: StockData[] = [];
  let selectedStock = 'TSLA';
  let selectedInterval: IntervalKey = '1_DAY_RETURN';
  let loading = true;
  let error: string | null = null;
  let stocks: string[] = [];
  let selectedPoint: StockData | null = null;
  let showTweet = false;

  const width = 800;
  const height = 500;
  const margin = { top: 40, right: 150, bottom: 100, left: 60 };

  const intervals: IntervalKey[] = ['1_DAY_RETURN', '2_DAY_RETURN', '3_DAY_RETURN', '7_DAY_RETURN'];

  let activeLines = { return: true, sentiment: true, trend: true };

      onMount(async () => {
  try {
    normalizedData = await d3.csv(`${base}/line_data.csv`, (d) => {
      const date = new Date(d.date);
      if (isNaN(date.getTime())) throw new Error(`Invalid date: ${d.date}`);

      return {
        StockName: d.stock_name,
        Date: date,
        sent_score: +d.sent_score,
        '1_DAY_RETURN': +d.one_day_return,
        '2_DAY_RETURN': +d.two_day_return,
        '3_DAY_RETURN': +d.three_day_return,
        '7_DAY_RETURN': +d.seven_day_return,
        Tweet: d.Tweet.trim() || null  // Add .trim() to remove whitespace
      };

    // Debug: Check first 5 tweets
    console.log("Sample tweets:", normalizedData.slice(0, 5).map(d => d.Tweet));
    });

      stocks = Array.from(new Set(normalizedData.map((d) => d.StockName))).sort();
      selectedStock = stocks.includes('TSLA') ? 'TSLA' : stocks[0];

      loading = false;
      await tick();
      updateChart();

    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load data';
      loading = false;
    }
  });

  $: filteredData = normalizedData
    .filter((d) => d.StockName === selectedStock)
    .sort((a, b) => a.Date.getTime() - b.Date.getTime());

  $: if (filteredData.length > 0) {
    updateChart();
  }

  function movingAverage(data: StockData[], key: IntervalKey, windowSize = 7) {
    return data.map((d, idx, arr) => {
      const start = Math.max(0, idx - Math.floor(windowSize / 2));
      const end = Math.min(arr.length, idx + Math.ceil(windowSize / 2));
      const window = arr.slice(start, end);
      const avg = d3.mean(window, (w) => w[key]) ?? 0;
      return { ...d, avg };
    });
  }

  function updateChart() {
  const svg = d3.select('#chart-svg');
  svg.selectAll('*').remove();

  // Increase left margin to move graph right
  const adjustedMargin = {...margin, left: 80};
  const innerWidth = width - adjustedMargin.left - adjustedMargin.right;
  const innerHeight = height - adjustedMargin.top - adjustedMargin.bottom;

  // Adjust y-scale domain to better show differences
  const yExtent = d3.extent(filteredData, (d) => d[selectedInterval]);
  const padding = (yExtent[1]! - yExtent[0]!) * 0.2; // 20% padding
  const yScale = d3.scaleLinear()
    .domain([yExtent[0]! - padding, yExtent[1]! + padding])
    .range([innerHeight, 0]);
    const xScale = d3.scaleTime()
      .domain(d3.extent(filteredData, (d) => d.Date) as [Date, Date])
      .range([0, innerWidth]);

      const returnLine = d3.line<StockData>()
  .x((d) => xScale(d.Date))
  .y((d) => yScale(d[selectedInterval]))
  .curve(d3.curveMonotoneX); // Changed from curveBasis to make differences more visible

    const sentimentLine = d3.line<StockData>()
      .x((d) => xScale(d.Date))
      .y((d) => yScale(d.sent_score))
      .curve(d3.curveBasis);

    const trendLine = d3.line<{ Date: Date; avg: number }>()
      .x((d) => xScale(d.Date))
      .y((d) => yScale(d.avg))
      .curve(d3.curveBasis);

    const zoom = d3.zoom()
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [width, height]])
      .on('zoom', (event) => {
        const transform = event.transform;
        xScale.range([0, innerWidth].map(d => transform.applyX(d)));
        redrawChart();
      });

      const chart = svg
    .attr('viewBox', `0 0 ${width} ${height}`)
    .append('g')
    .attr('transform', `translate(${adjustedMargin.left},${adjustedMargin.top})`);

    svg.call(zoom);

    chart.append('g').attr('class', 'x-axis');
    chart.append('g').attr('class', 'y-axis');
    chart.append('g').attr('class', 'lines');
    chart.append('g').attr('class', 'tooltip-group');

    // Add clickable area for selecting points
    chart.append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('click', function (event) {
        const [mouseX] = d3.pointer(event);
        const x0 = xScale.invert(mouseX);
        const bisect = d3.bisector((d: StockData) => d.Date).left;
        const index = bisect(filteredData, x0, 1);
        const d0 = filteredData[index - 1];
        const d1 = filteredData[index];
        const closestPoint = !d0 || (d1 && x0 - d0.Date > d1.Date - x0) ? d1 : d0;
        selectedPoint = closestPoint;
        redrawChart();
      });

      const legend = chart.append('g')
      .attr('transform', `translate(${innerWidth / 2 - 100}, ${innerHeight + 60})`);

    const legendItems = [
      { label: selectedInterval.replace(/_/g, ' '), color: 'blue', key: 'return' },
      { label: 'Sentiment Score', color: 'red', key: 'sentiment' },
  
    ];

    legendItems.forEach((item, i) => {
      const group = legend.append('g').attr('transform', `translate(0, ${i * 25})`).style('cursor', 'pointer');

      group.append('rect').attr('width', 18).attr('height', 18).attr('fill', item.color);
      group.append('text').attr('x', 24).attr('y', 9).attr('dy', '.35em').text(item.label).style('font-size', '12px');

      group.on('click', () => {
        activeLines[item.key] = !activeLines[item.key];
        redrawChart();
      });
    });

    function redrawChart() {
      const t = d3.transition().duration(400);

      chart.select('.x-axis')
        .attr('transform', `translate(0,${innerHeight})`)
        .transition(t)
        .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b %Y') as any))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');

      chart.select('.y-axis')
        .transition(t)
        .call(d3.axisLeft(yScale));

      const lines = chart.select('.lines');
      lines.selectAll('*').remove();

      if (activeLines.return) lines.append('path').datum(filteredData).attr('fill', 'none').attr('stroke', 'blue').attr('stroke-width', 2).attr('d', returnLine);
      if (activeLines.sentiment) lines.append('path').datum(filteredData).attr('fill', 'none').attr('stroke', 'red').attr('stroke-width', 2).attr('d', sentimentLine);
      

      const tooltip = chart.select('.tooltip-group');
      tooltip.selectAll('*').remove();

      if (selectedPoint) {
        const x = xScale(selectedPoint.Date);
        const yReturn = yScale(selectedPoint[selectedInterval]);
        const ySentiment = yScale(selectedPoint.sent_score);

        if (activeLines.return) tooltip.append('circle')
          .attr('cx', x)
          .attr('cy', yReturn)
          .attr('r', 6)
          .attr('fill', 'orange')
          .attr('stroke', 'black')
          .attr('stroke-width', 1.5)
          .on('click', (event) => {
            event.stopPropagation();
          
          });

        if (activeLines.sentiment) tooltip.append('circle')
          .attr('cx', x)
          .attr('cy', ySentiment)
          .attr('r', 6)
          .attr('fill', 'limegreen')
          .attr('stroke', 'black')
          .attr('stroke-width', 1.5)
          .on('click', (event) => {
            event.stopPropagation();
            showTweet = true;
          });

        const g = tooltip.append('g')
          .attr('transform', `translate(${x + 15},${Math.min(yReturn, ySentiment) - 40})`)
          .attr('class', 'tooltip-box');

        g.append('rect')
          .attr('width', 220)
          .attr('height', 60)
          .attr('fill', '#fffbe6')
          .attr('stroke', '#333')
          .attr('stroke-width', 1.5)
          .attr('rx', 8)
          .attr('ry', 8)
          .attr('opacity', 0.9)
          .on('click', (event) => {
            event.stopPropagation();
            showTweet = true;
          });

        g.append('text')
          .attr('x', 10)
          .attr('y', 20)
          .style('font-size', '12px')
          .style('fill', '#333')
          .text(`Date: ${d3.timeFormat('%b %d, %Y')(selectedPoint.Date)}`);

        g.append('text')
          .attr('x', 10)
          .attr('y', 35)
          .style('font-size', '12px')
          .style('fill', '#333')
          .text(`Return: ${selectedPoint[selectedInterval].toFixed(2)}`);

        g.append('text')
          .attr('x', 10)
          .attr('y', 50)
          .style('font-size', '12px')
          .style('fill', '#333')
          .text(`Sentiment: ${selectedPoint.sent_score.toFixed(2)}`);
      }
    }

    redrawChart();
  }
</script>

<style>
  .chart-container {
    position: relative;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }

  .controls {
    margin-bottom: 20px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  label {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  select {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  .loading, .error {
    padding: 20px;
    text-align: center;
    font-size: 18px;
  }

  .error {
    color: red;
  }

  .tweet-card {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    max-width: 300px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
    font-size: 14px;
    line-height: 1.4;
  }

  .tweet-card::before {
    content: '';
    position: absolute;
    top: 10px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid white;
  }

  .tweet-card::after {
    content: '';
    position: absolute;
    top: 10px;
    left: -11px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #ddd;
    z-index: -1;
  }

  .close-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #666;

  }
  .toggle-btn {
  padding: 10px 16px;
  background-color: #58a3dc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: auto;
  transition: background-color 0.3s;
}

.toggle-btn:hover {
  background-color: #58a3dc;
}
</style>

<div class="chart-container">
  <h2>Stock Returns vs Sentiment Analysis</h2>

  {#if error}
    <div class="error">Error: {error}</div>
  {:else if loading}
    <div class="loading">Loading data...</div>
  {:else}
  <div class="controls">
    <label>
      Stock:
      <select bind:value={selectedStock}>
        {#each stocks as stock}
          <option value={stock}>{stock}</option>
        {/each}
      </select>
    </label>
    <label>
      Return Interval:
      <select bind:value={selectedInterval}>
        {#each intervals as interval}
          <option value={interval}>{interval.replace(/_/g, ' ')}</option>
        {/each}
      </select>
    </label>
    <button on:click={() => showTweet = !showTweet} class="toggle-btn">
      {showTweet ? 'Hide Tweets' : 'Show Tweets'}
    </button>
  </div>

 
    {#if selectedPoint && showTweet}
    <div class="tweet-card">
      <button class="close-btn" on:click={() => showTweet = false}>×</button>
      <strong>Tweet on {d3.timeFormat('%b %d, %Y')(selectedPoint.Date)}:</strong>
      {#if selectedPoint.Tweet}
        <p style="white-space: pre-wrap; word-break: break-word;">{selectedPoint.Tweet}</p>
      {:else}
        <p>No tweet available for this date</p>
      {/if}
    </div>
  {/if}
  <div style="display: none;">
    {#if filteredData.length > 0}
      Data sample: {JSON.stringify(filteredData[0])}
    {/if}
  </div>
<!-- Debug output (remove after testing) -->
{#if selectedPoint}
  <div style="display: none;">
    Debug: {JSON.stringify(selectedPoint.Tweet)}
  </div>
{/if}

    <svg id="chart-svg"></svg>
  {/if}
</div>