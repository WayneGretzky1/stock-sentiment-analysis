<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import type { TLine_data } from "../types";
  import type { TLag_data } from "../types";
  import type { THeatmap_data } from "../types";
  import StoryOpen from "./StoryOpen.svelte";
  import StoryQ1 from "../lib/StoryQ1.svelte";
  import ReturnsSentimentLine from "$lib/Visualizations/ReturnsSentimentLine.svelte";
  import CorrelationLagBar from "$lib/Visualizations/CorrelationLagBar.svelte";
  import CausalityGraph from "$lib/Visualizations/CausalityGraph.svelte";

  let line_data: TLine_data[] = [];
  let lag_data: TLag_data[] = [];
  let heatmap_sentTostock_data: THeatmap_data[] = [];
  let heatmap_stockTosent_data: THeatmap_data[] = [];

  async function loadCsv() {
    try {
      const lineUrl = "./line_data.csv";
      d3.csv(lineUrl, (d): TLine_data => ({
        stock_name: d["stock_name"],
        date: new Date(d["date"]),
        sent_score: +d["sent_score"],
        one_day_return: +d["one_day_return"],
        two_day_return: +d["two_day_return"],
        three_day_return: +d["three_day_return"],
        seven_day_return: +d["seven_day_return"]
      })).then((data) => {
        line_data = data;
        console.log("line_data", line_data);
      });

      const lagUrl = "./lag_data.csv";
      d3.csv(lagUrl, (d): TLag_data => ({
        stock_name: d["stock_name"],
        max_correlation: +d["max_correlation"],
        lag: +d["lag"]
      })).then((data) => {
        lag_data = data;
        console.log("lag_data", lag_data);
      });

      const heatmap_sentTostockUrl = "./heatmap_sentimentTostock_data.csv";
      d3.csv(heatmap_sentTostockUrl, (d): THeatmap_data => ({
        stock_name: d["Stock Name"],
        one_day_lag: +d["1"],
        two_day_lag: +d["2"],
        three_day_lag: +d["3"],
        four_day_lag: +d["4"],
        five_day_lag: +d["5"]
      })).then((data) => {
        heatmap_sentTostock_data = data;
        console.log("heatmap_sentTostock_data", heatmap_sentTostock_data);
      });

      const heatmap_stockTosentUrl = "./heatmap_stockTosentiment_data.csv";
      d3.csv(heatmap_stockTosentUrl, (d): THeatmap_data => ({
        stock_name: d["Stock Name"],
        one_day_lag: +d["1"],
        two_day_lag: +d["2"],
        three_day_lag: +d["3"],
        four_day_lag: +d["4"],
        five_day_lag: +d["5"]
      })).then((data) => {
        heatmap_stockTosent_data = data;
        console.log("heatmap_stockTosent_data", heatmap_stockTosent_data);
      });
    } catch (error) {
      console.error("Error loading CSV:", error);
    }
  }

  onMount(loadCsv);
</script>

<!-- No container wrapper — just clean sections -->
<StoryOpen />
<StoryQ1 {line_data} />

<!-- <ReturnsSentimentLine /> -->
<!-- <CorrelationLagBar /> -->

<!-- <CausalityGraph /> -->



<style>
  /* Optional cleanup: nothing needed here unless you want padding for other pages */
</style>
