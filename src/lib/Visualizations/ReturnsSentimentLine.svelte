<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { base } from '$app/paths';
  import { tick } from 'svelte'; // <-- ADD THIS TO YOUR IMPORTS


  interface StockData {
    StockName: string;
    Date: Date;
    sent_score: number;
    '1_DAY_RETURN': number;
    '2_DAY_RETURN': number;
    '3_DAY_RETURN': number;
    '7_DAY_RETURN': number;
  }

  type IntervalKey = '1_DAY_RETURN' | '2_DAY_RETURN' | '3_DAY_RETURN' | '7_DAY_RETURN';

  let normalizedData: StockData[] = [];
  let selectedStock = 'TSLA';
  let selectedInterval: IntervalKey = '1_DAY_RETURN';
  let loading = true;
  let error: string | null = null;
  let stocks: string[] = [];

  const width = 800;
  const height = 500;
  const margin = { top: 40, right: 150, bottom: 100, left: 60 };

  const intervals: IntervalKey[] = ['1_DAY_RETURN', '2_DAY_RETURN', '3_DAY_RETURN', '7_DAY_RETURN'];

  let selectedPoint: StockData | null = null;
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
        };
      });

      stocks = Array.from(new Set(normalizedData.map((d) => d.StockName))).sort();
      selectedStock = stocks.includes('TSLA') ? 'TSLA' : stocks[0];

      loading = false;
      await tick();  // ✨ wait for reactivity to update filteredData
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

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleTime()
      .domain(d3.extent(filteredData, (d) => d.Date) as [Date, Date])
      .range([0, innerWidth]);

    const yExtent = d3.extent(filteredData, (d) => d[selectedInterval]);
    const yScale = d3.scaleLinear()
      .domain([yExtent[0]! * 1.1, yExtent[1]! * 1.1])
      .range([innerHeight, 0]);

    const returnLine = d3.line<StockData>()
      .x((d) => xScale(d.Date))
      .y((d) => yScale(d[selectedInterval]))
      .curve(d3.curveBasis);

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
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.call(zoom);

    chart.append('g').attr('class', 'x-axis');
    chart.append('g').attr('class', 'y-axis');
    chart.append('g').attr('class', 'lines');
    chart.append('g').attr('class', 'tooltip-group');

    chart.append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mousemove', function (event) {
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
      .attr('transform', `translate(${innerWidth + 20}, 20)`);

    const legendItems = [
      { label: selectedInterval.replace(/_/g, ' '), color: 'blue', key: 'return' },
      { label: 'Sentiment Score', color: 'red', key: 'sentiment' },
      { label: 'Trend Line', color: 'green', key: 'trend' }
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
      // if (activeLines.trend) lines.append('path').datum(movingAverage(filteredData, selectedInterval)).attr('fill', 'none').attr('stroke', 'green').attr('stroke-width', 2).attr('stroke-dasharray', '4 2').attr('d', trendLine);

      const tooltip = chart.select('.tooltip-group');
      tooltip.selectAll('*').remove();

      if (selectedPoint) {
        const x = xScale(selectedPoint.Date);
        const yReturn = yScale(selectedPoint[selectedInterval]);
        const ySentiment = yScale(selectedPoint.sent_score);

        if (activeLines.return) tooltip.append('circle').attr('cx', x).attr('cy', yReturn).attr('r', 6).attr('fill', 'orange').attr('stroke', 'black').attr('stroke-width', 1.5);
        if (activeLines.sentiment) tooltip.append('circle').attr('cx', x).attr('cy', ySentiment).attr('r', 6).attr('fill', 'limegreen').attr('stroke', 'black').attr('stroke-width', 1.5);

        const g = tooltip.append('g').attr('transform', `translate(${x + 15},${Math.min(yReturn, ySentiment) - 40})`).attr('class', 'tooltip-box');

        g.append('rect').attr('width', 220).attr('height', 60).attr('fill', '#fffbe6').attr('stroke', '#333').attr('stroke-width', 1.5).attr('rx', 8).attr('ry', 8).attr('opacity', 0.9);
        g.append('text').attr('x', 10).attr('y', 20).style('font-size', '12px').style('fill', '#333').text(`Date: ${d3.timeFormat('%b %d, %Y')(selectedPoint.Date)}`);
        g.append('text').attr('x', 10).attr('y', 35).style('font-size', '12px').style('fill', '#333').text(`Return: ${selectedPoint[selectedInterval].toFixed(2)}`);
        g.append('text').attr('x', 10).attr('y', 50).style('font-size', '12px').style('fill', '#333').text(`Sentiment: ${selectedPoint.sent_score.toFixed(2)}`);
      }
    }

    redrawChart();
  }
</script>

<style>
  /* Keep your style, add extra if needed later */
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
    </div>
    <svg id="chart-svg"></svg>
  {/if}
</div>