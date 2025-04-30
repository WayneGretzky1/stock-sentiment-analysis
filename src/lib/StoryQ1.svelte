<script lang="ts">
	import { Scroll } from "$lib";
	import type { TLine_data } from "../types";
	import "../lib/tweet.css";
	import "../lib/reply-chain.css";
	import ReturnsSentimentLine from "$lib/Visualizations/ReturnsSentimentLine.svelte";
	import CorrelationLagBar from "$lib/Visualizations/CorrelationLagBar.svelte";
	import CausalityGraph from "$lib/Visualizations/CausalityGraph.svelte";
	import { base } from '$app/paths';

	let showBird = $state(false);
	let morphToCircle = $state(false);
	let floatCircle = $state(false);
	let showTweet1 = $state(false);
	let showTweet2 = $state(false);
	let showReplyGlow = $state(false);
	let showLine = $state(false);
	let allowScrollToSection2 = $state(false);
	let heartLiked1 = $state(false);
	let heartLiked2 = $state(false);
	let heartLiked3 = $state(false);
	let heartLiked4 = $state(false);
	let heartLiked5 = $state(false);
	let showLineToSection3 = $state(false);
	let showTweet4 = $state(false);
	let allowScrollToSection4 = $state(false);
	let showLineToSection4 = $state(false);
	let showLineToSection17 = $state(false);
	let heartLiked6 = $state(false);
	let heartLiked7 = $state(false);
	let heartLiked8 = $state(false);
	let heartLiked9 = $state(false);
	let heartLiked10 = $state(false);
	let heartLiked11 = $state(false);
	let heartLiked12 = $state(false);
	let heartLiked13 = $state(false);
	let heartLiked14 = $state(false);
	let heartLiked15 = $state(false);
	let heartLiked16 = $state(false);
	let heartLiked17 = $state(false);
	let heartLiked18 = $state(false);
	let heartLiked19 = $state(false);
	let heartLiked20 = $state(false);
	let heartLiked21 = $state(false);
	let heartLiked22 = $state(false);
	let heartLiked23 = $state(false);
	let heartLiked24 = $state(false);
	let heartLiked25 = $state(false);
	let heartLiked26 = $state(false);
	let allowScrollToSection5 = $state(false);

	









	type Props = {
		line_data: TLine_data[];
	};
	let { line_data }: Props = $props();
	let progress: number = $state(0);

	function revealTweet1(node: HTMLElement) {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					showBird = true;
					setTimeout(() => morphToCircle = true, 2500);
					setTimeout(() => floatCircle = true, 3700);
					setTimeout(() => {
						showTweet1 = true;
						setTimeout(() => showReplyGlow = true, 4000);
					}, 5200);
					observer.unobserve(node);
				}
			},
			{ threshold: 0.6 }
		);
		observer.observe(node);
	}

	function revealTweet2(node: HTMLElement) {
	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting && allowScrollToSection2 && !showLineToSection3) {
				showTweet2 = true;

				// Slight scroll detected, trigger scroll to Section 3
				setTimeout(() => {
					showLineToSection3 = true;

					// setTimeout(() => {
					// 	document.getElementById("section-3")?.scrollIntoView({ behavior: "smooth" });
					// }, 2000);

					allowScrollToSection3 = true;
				}, 800);

				observer.unobserve(node);
			}
		},
		{ threshold: 0.9 } // 👈 triggers earlier (like 20% visible)
	);
	observer.observe(node);
}




	function toggleHeart1() {
		heartLiked1 = !heartLiked1;
	}

	function toggleHeart2() {
		heartLiked2 = !heartLiked2;
	}
	function toggleHeart3() {
		heartLiked3 = !heartLiked3;
	}
	function toggleHeart4() {
		heartLiked4 = !heartLiked4;
	}
	function toggleHeart5() {
		heartLiked5 = !heartLiked5;
	}
	function toggleHeart6() {
	heartLiked6 = !heartLiked6;
	}

	function toggleHeart7() {
		heartLiked7 = !heartLiked7;
		if (heartLiked7) {
			allowScrollToSection5 = true;
			// option-ally auto-scroll to section-5
			setTimeout(() => {
			document
				.getElementById("section-5")
				?.scrollIntoView({ behavior: "smooth" });
			}, 200);
  }
	}
	function toggleHeart8() {
	heartLiked8 = !heartLiked8;
	}
	function toggleHeart9() {
		heartLiked9 = !heartLiked9;
	}
	function toggleHeart10() {
		heartLiked10 = !heartLiked10;
	}
	function toggleHeart11() {
		heartLiked11 = !heartLiked11;
	}
		function toggleHeart12() {
		heartLiked12 = !heartLiked12;
	}
	function toggleHeart13() {
		heartLiked13 = !heartLiked13;
	}
	function toggleHeart14() {
		heartLiked14 = !heartLiked14;
	}
	function toggleHeart15() {
		heartLiked15 = !heartLiked15;
	}
	function toggleHeart16() {
		heartLiked16 = !heartLiked16;
	}
	function toggleHeart17() {
		heartLiked17 = !heartLiked17;
	}
	function toggleHeart18() {
		heartLiked18 = !heartLiked18;
	}

	function toggleHeart19() {
		heartLiked19 = !heartLiked19;
	}
	function toggleHeart20() {
		heartLiked20 = !heartLiked20;
	}
	function toggleHeart21() {
		heartLiked21 = !heartLiked21;
	}
	function toggleHeart22() {
		heartLiked22 = !heartLiked22;
	}
	function toggleHeart23() {
		heartLiked23 = !heartLiked23;
	}
	function toggleHeart24() {
		heartLiked24 = !heartLiked24;
	}
	function toggleHeart25() {
		heartLiked25 = !heartLiked25;
	}
	function toggleHeart26() {
		heartLiked26 = !heartLiked26;
	}


	function onReplyClick() {
		showLine = true;
		allowScrollToSection2 = true;

		let scrolled = 0;
		const step = 6;
		const limit = window.innerHeight * 0.9;
		const interval = setInterval(() => {
			window.scrollBy(0, step);
			scrolled += step;
			if (scrolled >= limit) {
				clearInterval(interval);
				document.getElementById("section-2")?.scrollIntoView({ behavior: "smooth" });
			}
		}, 10);
	}


	//section 3 freez and scroll
let showTweet3 = $state(false);
let allowScrollToSection3 = $state(false);

function revealTweet3(node: HTMLElement) {
	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting && allowScrollToSection3) {
				setTimeout(() => {
					showTweet3 = true;

					// trigger line + scroll after 3
					setTimeout(() => {
						showLineToSection4 = true;
						setTimeout(() => {
							document.getElementById("section-4")?.scrollIntoView({ behavior: "smooth" });
							allowScrollToSection4 = true;
						}, 0); // delay after line animates
					}, 0);

				}, 0);
				observer.unobserve(node);
			}
		},
		{ threshold: 0.1}
	);
	observer.observe(node);
}

	//section 4 freez and scroll
	function revealTweet4(node: HTMLElement) {
	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting && allowScrollToSection4) {
				showTweet4 = true;
				observer.unobserve(node);
			}
		},
		{ threshold: 0.6 }
	);
	observer.observe(node);
}


let showVideo = true;



</script>

<video class="background-video" autoplay muted loop playsinline>
	<source src="{base}/bg.mp4" type="video/mp4" />
</video>


<div class="content-overlay">


	<!-- SECTION 1 -->
	<section class="tweet-block bird-start" use:revealTweet1>
		{#if showBird && !morphToCircle}
			<img src="{base}/bird.png" alt="Twitter bird" class="bird-fly-in" />
			
			  
			  
		{/if}

		{#if morphToCircle && !showTweet1}
			<div class="circle" class:float-anim={floatCircle}></div>
		{/if}

		{#if showTweet1}
			<div class="tweet-wrapper">
				<div class="tweet">
					<div class="tweet-header">
						<img src="{base}/brock_headshot.jpg" alt="brock's headshot" class="profile-img" />
						<div class="user-info">
							<div class="name-line">
								<span class="name">Brock</span>
								<span class="username">@brockbye</span>
								<img class="badge" src="{base}/Twitter_Verified_Badge.png" alt="verified badge" />
							</div>
						</div>
					</div>

					<p class="message">
						y'know, i've been wondering, with all of the craziness online, does social media sentiment affect the price of stocks?
					</p>

					<p class="date">9:32 AM · 4/3/25</p>

					<p style="font-size: 14px; color: #888; margin-top: 10px;">
						💬 Click the reply icon below to continue reading the next tweet.
					</p>

					<div class="actions">
						<button class="icon-btn glow-ring-wrapper {showReplyGlow ? 'glow-ring' : ''}" aria-label="reply" onclick={onReplyClick}>
							<img class="icon" src="{base}/reply.png" alt="reply" />
						</button>

						<button class="icon-btn" aria-label="Repost this tweet">
							<img class="icon repost" src="{base}/repost.png" alt="Repost this tweet" />
						</button>

						<button class="icon-btn" aria-label="Like this tweet" onclick={toggleHeart1}>
							<svg class="icon heart {heartLiked1 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked1 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>

						<button class="icon-btn" aria-label="share">
							<img class="icon" src="{base}/share.svg" alt="share" />
						</button>
					</div>
				</div>
			</div>
		{/if}
	</section>

	<!-- LINE ANIMATION SECTION -->
	{#if showLine}
		<div class="line-container">
			<div class="vertical-line"></div>
		</div>
	{/if}

	<!-- SECTION 2 (Locked until triggered) -->
	<section class="tweet-block tweet-section {allowScrollToSection2 ? 'unlocked' : 'locked'}" use:revealTweet2 id="section-2">
		{#if showTweet2}
			<div class="tweet-wrapper">
				<div class="tweet">
					<div class="tweet-header">
						<img src="{base}/mohammad.png" alt="mohammad" class="profile-img" />
						<div class="user-info">
							<div class="name-line">
								<span class="name">Mohammad</span>
								<span class="username">@moha27</span>
								<img class="badge" src="{base}/Twitter_Verified_Badge.png" alt="verified badge" />
							</div>
						</div>
					</div>

					<p class="message">
						Funny you should ask that! I currently work with a team of researchers on this exact topic and we were wondering the same thing! give me a moment to share what we found
					</p>

					<p class="date">9:35 AM · 4/3/25</p>

					<div class="actions">
						<button class="icon-btn" aria-label="reply">
							<img class="icon" src="{base}/reply.png" alt="reply" />
						</button>

						<button class="icon-btn" aria-label="repost">
							<img class="icon repost" src="{base}/repost.png" alt="repost" />
						</button>

						<button class="icon-btn" aria-label="like" onclick={toggleHeart2}>
							<svg class="icon heart {heartLiked2 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked2 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>

						<button class="icon-btn" aria-label="share">
							<img class="icon" src="{base}/share.svg" alt="share" />
						</button>
					</div>
				</div>
			</div>
		{/if}
	</section>


	{#if showLineToSection3}
	<!-- Place this OUTSIDE section-3 -->
	<div class="reply-line-section3-container">
		<div class="reply-line-section3"></div>
	</div>
	{/if}



	<!-- SECTION 3: REPLY CHAIN STACKED STYLE -->
	<section class="tweet-block tweet-section {allowScrollToSection3 ? 'unlocked' : 'locked'}" use:revealTweet3 id="section-3">
		{#if showTweet3}
		<div class="reply-thread-stacked">
			<!-- Reply 1: Anon 2 -->
			<div class="tweet reply-chain">
				<div class="vertical-reply-line"></div>
				<div class="tweet-header">
					<img src="{base}/pr.png" alt="pr" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">sivapriya_gopi</span>
							<span class="username">@sivapriya_gopi</span>
						</div>
					</div>
				</div>

				<div class="tweet-body">
					<p class="message">dudeeee i've been wondering this my whole life omg finally is askign this</p>
					<p class="date">9:36 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="reply">
							<img class="icon" src="{base}/reply.png" alt="reply" />
						</button>
						<button class="icon-btn" aria-label="repost">
							<img class="icon repost" src="{base}/repost.png" alt="repost" />
						</button>
						<button class="icon-btn" aria-label="like" onclick={toggleHeart3}>
							<svg class="icon heart {heartLiked3 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked3 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="share">
							<img class="icon" src="{base}/share.svg" alt="share" />
						</button>
					</div>
				</div>
			</div>

			<!-- Reply 2: Anon 3 -->
			<div class="tweet reply-chain">
				<div class="vertical-reply-line"></div>
				<div class="tweet-header">
					<img src="{base}/epic.png" alt="epic" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">Epic</span>
							<span class="username">@EpicEpicBoy360</span>
						</div>
					</div>
				</div>

				<div class="tweet-body">
					<p class="message">A stock is a tiny piece of ownership in a company that you can buy, sell, or hold to potentially make money as the company's value grows.</p>
					<p class="date">9:37 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="reply">
							<img class="icon" src="{base}/reply.png" alt="reply" />
						</button>
						<button class="icon-btn" aria-label="Repost this tweet">
							<img class="icon repost" src="{base}/repost.png" alt="repost" />
						</button>
						<button class="icon-btn" aria-label="Like this tweet" onclick={toggleHeart4}>
							<svg class="icon heart {heartLiked4 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked4 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="Share this tweet">
							<img class="icon" src="{base}/share.svg" alt="share" />
						</button>
					</div>
				</div>
			</div>

			<!-- Reply 3: Speak 1 -->
			<div class="tweet reply-chain">
				<div class="tweet-header">
					<img src="{base}/mohammad.png" alt="mohammad" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">mohammad</span>
							<span class="username">@moha27</span>
							<img class="badge" src="{base}/Twitter_Verified_Badge.png" alt="verified badge" />
						</div>
					</div>
				</div>

				<div class="tweet-body">
					<p class="message">
						We were looking into two datasets: One which contained the top twenty-five stocks at the time along with its stock data, and another dataset with over 80,000 tweets about those companies. We used eleven of these stocks to get our insights.
					</p>
					<p class="date">9:38 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="reply">
							<img class="icon" src="{base}/reply.png" alt="reply" />
						</button>
						<button class="icon-btn" aria-label="repost">
							<img class="icon repost" src="{base}/repost.png" alt="repost" />
						</button>
						<button class="icon-btn" aria-label="like" onclick={toggleHeart5}>
							<svg class="icon heart {heartLiked5 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked5 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="share">
							<img class="icon" src="{base}/share.svg" alt="share" />
						</button>
					</div>
				</div>
			</div>
		</div>
		{/if}
	</section>

	<!-- SECTION 4: VIZ -->
	{#if showLineToSection4}
	<div class="reply-line-section4-container">
		<div class="reply-line-section4"></div>
	</div>
	{/if}

	<section class="tweet-block tweet-section {allowScrollToSection4 ? 'unlocked' : 'locked'}" use:revealTweet4 id="section-4">
		{#if showTweet4}
		<div class="reply-thread-stacked">
			<!-- Speak 2 Tweet 1 -->
			<div class="tweet reply-chain">
				<div class="tweet-header">
					<img src="{base}/nick.png" alt="nick" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">niketha</span>
							<span class="username">@niketha</span>
						</div>
					</div>
				</div>
				<div class="tweet-body">
					<p class="message">
						University computer science graduate here, I can add onto this: To define this, we used a line chart representing the one-day returns, or daily percentage change in stock price, smoothed out using a simple moving average (SMA), representing an average daily return over the past two weeks, in blue.
					</p>
					<p class="date">9:39 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="reply"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>
						<button class="icon-btn" aria-label="like" onclick={toggleHeart6}>
							<svg class="icon heart {heartLiked6 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked6 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="share"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>

			<!-- Speak 2 Tweet 2 -->
			<div class="tweet reply-chain">
				<div class="tweet-header">
					<img src="{base}/nick.png" alt="nick" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">niketha</span>
							<span class="username">@gniketha</span>
						</div>
					</div>
				</div>
				<div class="tweet-body">
					<p class="message">
						We also had our mean sentiment score of tweets for that day in red — but you won’t catch this chart until you smash that ❤️ first!
					</p>
					<p class="date">9:40 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="reply"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>
						<button class="icon-btn" aria-label="like" onclick={toggleHeart7}>
							<svg class="icon heart {heartLiked7 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked7 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="share"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>
		</div>
		{/if}
	</section>

	<!-- SECTION 5: CHART 1 -->
	{#if allowScrollToSection5}
  {#if showLineToSection3}
    <div class="reply-line-section3-container">
      <div class="reply-line-section3"></div>
    </div>
  {/if}

  <section class="tweet-block tweet-section unlocked" id="section-5">
    <div style="width: 90%; height: 850px; margin-left: 10px; background-color: white; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"> 
      <ReturnsSentimentLine />

	  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
		<p style="color: #333; font-size: 16px; line-height: 1.6;">
		  <strong>A stock return:</strong> Reflects the daily percent change in stock price, influenced by price movements and dividends.
		</p>
		<p style="color: #1a73e8; font-size: 14px;">
		  <strong>Blue line:</strong> A simple moving average (SMA) smooths daily returns over two weeks.
		</p>
		<p style="color: #e63946; font-size: 14px;">
		  <strong>Red line:</strong> Mean sentiment score from tweets on the same day.
		</p>
		<p style="color: #333; font-size: 14px;">
		  <strong>Y-axis:</strong> Displays normalized values:
		</p>
		<ul style="margin-top: 10px; padding-left: 20px; font-size: 14px; color: #333;">
		  <li>Normalized return = today's return / absolute max return of the year</li>
		  <li>Normalized sentiment = today's sentiment / absolute max sentiment of the year</li>
		</ul>
	  </div>
    </div>
  </section>




	<!-- SECTION 6: CHART 2 -->
	{#if showLineToSection3}
	<!-- Place this OUTSIDE section-3 -->
	<div class="reply-line-section3-container">
		<div class="reply-line-section3"></div>
	</div>
	{/if}


	<!-- SECTION 6: Final Replies -->
	<section class="tweet-block tweet-section {allowScrollToSection4 ? 'unlocked' : 'locked'}" use:revealTweet4 id="section-6">
		<div class="reply-thread-stacked">
			<!-- Reply 1: Speak 2 -->
			<div class="tweet reply-chain">
				<div class="vertical-reply-line"></div>
				<div class="tweet-header">
					<img src="{base}/nick.png" alt="nick" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">niketha</span>
							<span class="username">@niketha</span>
						</div>
					</div>
				</div>

				<div class="tweet-body">
					<p class="message">One can see that there is a direct trend between the lines. When one rises, the other also rises, and vice versa.</p>
					<p class="date">9:45 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="reply"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>
						<button class="icon-btn" aria-label="like" onclick={toggleHeart8}>
							<svg class="icon heart {heartLiked8 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked8 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="share"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>

			<!-- Reply 2: Speak 1 -->
			<div class="tweet reply-chain">
				<div class="vertical-reply-line"></div>
				<div class="tweet-header">
					<img src="{base}/mohammad.png" alt="mohammad" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">mohammad</span>
							<span class="username">@mohammad</span>
							<img class="badge" src="{base}/Twitter_Verified_Badge.png" alt="verified badge" />

						</div>
					</div>
				</div>

				<div class="tweet-body">
					<p class="message">TLDR: Yes, there is a relationship.</p>
					<p class="date">9:46 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="reply"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>
						<button class="icon-btn" aria-label="like" onclick={toggleHeart9}>
							<svg class="icon heart {heartLiked9 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked9 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="share"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>

			<!-- Reply 3: Anon 4 -->
			<div class="tweet reply-chain">
				<div class="tweet-header">
					<img src="{base}/B.png" alt="B" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">LavanyaSekar</span>
							<span class="username">@LavanyaSekar</span>
						</div>
					</div>
				</div>

				<div class="tweet-body">
					<p class="message">bro what is this, this chart is laggier than my grandma</p>
					<p class="date">9:47 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="reply"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>
						<button class="icon-btn" aria-label="like" onclick={toggleHeart10}>
							<svg class="icon heart {heartLiked10 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked10 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="share"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- SECTION 7: VIZ -->
	{#if showLine}
		<div class="line-container">
			<div class="vertical-line"></div>
		</div>
	{/if}


	<!-- SECTION 7: Speak 3 Observation -->
	<section class="tweet-block tweet-section {allowScrollToSection4 ? 'unlocked' : 'locked'}" use:revealTweet4 id="section-7">
		<div class="reply-thread-stacked">
			<!-- Single Tweet: Speak 3 -->
			<div class="tweet reply-chain">
				<div class="tweet-header">
					<img src="{base}/C.png" alt="C" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">rema</span>
							<span class="username">@rema</span>
						</div>
					</div>
				</div>

				<div class="tweet-body">
					<p class="message">
						That's a good point. One can observe that there is some lag time between one line rising and the other one rising. It would also help if the relationship between the trends of the lines and their lag time was quantified.
					</p>
					<p class="date">9:49 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="reply"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>
						<button class="icon-btn" aria-label="like" onclick={toggleHeart11}>
							<svg class="icon heart {heartLiked11 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked11 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="share"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- SECTION 8: VIZ -->
	{#if showLineToSection4}
	<div class="reply-line-section4-container">
		<div class="reply-line-section4"></div>
	</div>
	{/if}

	<section class="tweet-block tweet-section {allowScrollToSection4 ? 'unlocked' : 'locked'}" use:revealTweet4 id="section-8">
		<div class="reply-thread-stacked">
			<!-- Reply 1: Speak 3 -->
			<div class="tweet reply-chain">
				<div class="vertical-reply-line"></div>
				<div class="tweet-header">
					<img src="{base}/C.png" alt="C" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">rema</span>
							<span class="username">@rema</span>
						</div>
					</div>
				</div>
				<div class="tweet-body">
					<p class="message">
						We can quantify the relationship between sentiment and returns, and lag time for a stock by using a colored bar chart to represent the relation between a stock and its maximum correlation, with its color representing the amount and direction of lag.
					</p>
					<p class="date">9:43 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="reply"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>						<button class="icon-btn" aria-label="like" onclick={toggleHeart12}>
							<svg class="icon heart {heartLiked12 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked12 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="share"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>

			<!-- Reply 2: Speak 3 -->
			<div class="tweet reply-chain">
				<div class="vertical-reply-line"></div>
				<div class="tweet-header">
					<img src="{base}/C.png" alt="C" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">rema</span>
							<span class="username">@rema</span>
						</div>
					</div>
				</div>
				<div class="tweet-body">
					<p class="message">
						Significance of correlation ranged from 0 meaning no correlation to &gt; 0.8 meaning a strong correlation.
					</p>
					<p class="date">9:44 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="reply"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>						<button class="icon-btn" aria-label="like" onclick={toggleHeart13}>
							<svg class="icon heart {heartLiked13 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked13 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="share"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- SECTION 9: second chart lagbar -->
	{#if showLineToSection3}
	<div class="reply-line-section3-container">
		<div class="reply-line-section3"></div>
	</div>
	{/if}

	<section class="tweet-block tweet-section {allowScrollToSection4 ? 'unlocked' : 'locked'}" use:revealTweet4 id="section-9">
		<div style="background-color: #e8f5fd; padding: 2rem; width: 100%;">
			<CorrelationLagBar />
			<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 8px; line-height: 1.6; color: #333; max-width: 600px; margin: auto;">
				<p style="font-size: 16px; font-weight: bold;">Quantifying Sentiment-Return Relationships</p>
				<p>
				  To analyze the relationship between sentiment and returns for a stock, we calculate correlations by shifting the sentiment line ±7 days. 
				  A colored bar chart is used to represent the lag day with the highest correlation.
				</p>
				<p style="font-size: 16px; font-weight: bold;">Findings</p>
				<p>
					We found 6 stocks with weak to moderate correlations and a lag of 0 days, suggesting a highly reactive return-sentiment relationship. However, the causation—whether sentiment drives returns or vice versa—remains unclear.
				</p>
			  </div>			  
		</div>
	</section>

	<!-- SECTION 10: VIZ -->

	{#if showLineToSection3}
	<!-- Place this OUTSIDE section-3 -->
	<div class="reply-line-section3-container">
		<div class="reply-line-section3"></div>
	</div>
	{/if}

	<section class="tweet-block tweet-section {allowScrollToSection4 ? 'unlocked' : 'locked'}" use:revealTweet4 id="section-10">
		<div class="reply-thread-stacked">
			<!-- Anon 6 -->
			<div class="tweet reply-chain">
				<div class="vertical-reply-line"></div>
				<div class="tweet-header">
					<img src="{base}/A.png" alt="A" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">sam</span>
							<span class="username">@sam</span>
						</div>
					</div>
				</div>
				<div class="tweet-body">
					<p class="message">Why is having zero lag color the bar in red?</p>
					<p class="date">9:46 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="Reply"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="Repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>
						<button class="icon-btn" aria-label="Like" onclick={toggleHeart14}>
							<svg class="icon heart {heartLiked14 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked14 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="Share"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>

			<!-- Speak 4 - Explanation -->
			<div class="tweet reply-chain">
				<div class="vertical-reply-line"></div>
				<div class="tweet-header">
					<img src="{base}/E.png" alt="E" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">eto</span>
							<span class="username">@eto</span>
						</div>
					</div>
				</div>
				<div class="tweet-body">
					<p class="message">Good question, we determined that the weakly correlated to moderately correlated stocks have their highest correlations when lag is zero, and we wanted to highlight this finding.</p>
					<p class="date">9:47 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="Reply"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="Repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>
						<button class="icon-btn" aria-label="Like" onclick={toggleHeart15}>
							<svg class="icon heart {heartLiked15 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked15 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="Share"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>

			<!-- Speak 4 - Detail -->
			<div class="tweet reply-chain">
				<div class="tweet-header">
					<img src="{base}/E.png" alt="E" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">eto</span>
							<span class="username">@eto</span>
						</div>
					</div>
				</div>
				<div class="tweet-body">
					<p class="message">For the eleven stocks, it can be seen that TSLA has a moderate correlation, while AMD, NIO, AAPL, AMZN, META, GOOG, PG have weak to moderate correlations.</p>
					<p class="date">9:48 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="Reply"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="Repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>
						<button class="icon-btn" aria-label="Like" onclick={toggleHeart16}>
							<svg class="icon heart {heartLiked16 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked16 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="Share"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- SECTION 11: VIZ -->
	{#if showLineToSection4}
	<div class="reply-line-section4-container">
		<div class="reply-line-section4"></div>
	</div>
	{/if}

	<section class="tweet-block tweet-section {allowScrollToSection4 ? 'unlocked' : 'locked'}" use:revealTweet4 id="section-11">
		<div class="reply-thread-stacked">
			<!-- Anon 7 -->
			<div class="tweet reply-chain">
				<div class="vertical-reply-line"></div>
				<div class="tweet-header">
					<img src="{base}/E.png" alt="E" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">eto</span>
							<span class="username">@eto</span>
						</div>
					</div>
				</div>
				<div class="tweet-body">
						<p class="message" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 15px; border: 1px solid #ddd; border-radius: 8px;">
						<strong>Economic factors with similar correlations:</strong><br>
						- <strong>Consumer confidence spending:</strong> 0.3 to 0.4<br>
						- <strong>Oil prices:</strong> 0.2 to 0.4<br>
						- <strong>Exchange rates (USD index):</strong> 0.2 to 0.35
					  	</p>
					<p class="date">9:49 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="reply"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>						<button class="icon-btn" aria-label="Like this tweet" onclick={toggleHeart17}>
							<svg class="icon heart {heartLiked17 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked17 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="share"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>
			<div class="tweet reply-chain">
				<div class="vertical-reply-line"></div>
				<div class="tweet-header">
					<img src="{base}/D.png" alt="D" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">LOLO</span>
							<span class="username">@LOLO</span>
						</div>
					</div>
				</div>
				<div class="tweet-body">
					<p class="message">surely this is all coming from somewhere? what's causing it? back this up with a source or i don't believe u</p>
					<p class="date">9:49 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="reply"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>						<button class="icon-btn" aria-label="Like this tweet" onclick={toggleHeart17}>
							<svg class="icon heart {heartLiked17 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked17 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="share"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>

			<!-- Speak 5 -->
			<div class="tweet reply-chain">
				<div class="tweet-header">
					<img src="{base}/F.png" alt="F" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">leuth</span>
							<span class="username">@datasleuth</span>
						</div>
					</div>
				</div>
				<div class="tweet-body">
					<p class="message">
						Right, we needed to determine which is causing what. Are people positively tweeting about a stock and it grows in turn or is it that a stock is doing well and people begin to tweet positively. In other words, is sentiment affecting stock or is it that stock affects sentiment? Are we able to prove causality, or at least suggest that sentiment has predictive power for stock's returns?
					</p>
					<p class="date">9:50 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="reply"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>						<button class="icon-btn" aria-label="Like this tweet" onclick={toggleHeart18}>
							<svg class="icon heart {heartLiked18 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked18 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="share"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- SECTION 12: VIZ -->
	{#if showLineToSection3}
	<!-- Place this OUTSIDE section-3 -->
	<div class="reply-line-section3-container">
		<div class="reply-line-section3"></div>
	</div>
	{/if}

	<section class="tweet-block tweet-section {allowScrollToSection4 ? 'unlocked' : 'locked'}" use:revealTweet4 id="section-12">
		<div class="reply-thread-stacked">
			<!-- Speak 5 - Tweet 1 -->
			<div class="tweet reply-chain">
				<div class="vertical-reply-line"></div>
				<div class="tweet-header">
					<img src="{base}/F.png" alt="F" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">leuth</span>
							<span class="username">@datasleuth</span>
						</div>
					</div>
				</div>
				<div class="tweet-body">
					<p class="message">
						By running a granger test, when testing a hypothesis, you can test using a single dataset to find an outcome if using it alongside a new dataset will better predict an outcome.
					</p>
					<p class="date">9:52 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>
						<button class="icon-btn" onclick={toggleHeart19}>
							<svg class="icon heart {heartLiked19 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked19 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>

			<!-- Anon 8 -->
			<div class="tweet reply-chain">
				<div class="vertical-reply-line"></div>
				<div class="tweet-header">
					<img src="{base}/G.png" alt="G" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">brain</span>
							<span class="username">@toomuchbrain</span>
						</div>
					</div>
				</div>
				<div class="tweet-body">
					<p class="message">all this is hurting my head i'm too dumb for this</p>
					<p class="date">9:53 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>
						<button class="icon-btn" onclick={toggleHeart20}>
							<svg class="icon heart {heartLiked20 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked20 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>

			<!-- Speak 5 - Tweet 2 -->
			<div class="tweet reply-chain">
				<div class="tweet-header">
					<img src="{base}/F.png" alt="F" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">leuth</span>
							<span class="username">@datasleuth</span>
						</div>
					</div>
				</div>
				<div class="tweet-body">
					<p class="message">
						If you take a look back at our bar chart, there is zero lag time for six of the maximally correlated stocks between returns and sentiment.
					</p>
					<p class="date">9:54 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>
						<button class="icon-btn" onclick={toggleHeart21}>
							<svg class="icon heart {heartLiked21 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked21 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>
		</div>
	</section>


	<!-- SECTION 13: VIZ -->
	{#if showLine}
		<div class="line-container">
			<div class="vertical-line"></div>
		</div>
	{/if}

	<section class="tweet-block tweet-section {allowScrollToSection4 ? 'unlocked' : 'locked'}" use:revealTweet4 id="section-13">
		<div class="reply-thread-stacked">
			<!-- Speak 6 -->
			<div class="tweet reply-chain">
				<div class="vertical-reply-line"></div>
				<div class="tweet-header">
					<img src="{base}/sauske.png" alt="sauske" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">sauske</span>
							<span class="username">@sauske</span>
						</div>
					</div>
				</div>
				<div class="tweet-body">
					<p class="message">
						In other words, both axes are highly reactive to one another, yet it is still unclear which is the driving factor.
					</p>
					<p class="date">9:55 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="reply"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>
						<button class="icon-btn" aria-label="like" onclick={toggleHeart22}>
							<svg class="icon heart {heartLiked22 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked22 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="share"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- SECTION 14: Graph 3 -->
	{#if showLineToSection3}
	<!-- Place this OUTSIDE section-3 -->
	<div class="reply-line-section3-container">
		<div class="reply-line-section3"></div>
	</div>
	{/if}

	<section class="tweet-block tweet-section {allowScrollToSection4 ? 'unlocked' : 'locked'}" use:revealTweet4 id="section-14">
		<div style="background-color: #e8f5fd; padding: 2rem; width: 100%;">
			<CausalityGraph /> 	
			<div style="position: relative; top: -50px; font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 8px; line-height: 1.6; color: #333; max-width: 800px; margin: auto;">
				<p style="font-size: 16px; font-weight: bold;">The Granger Test and Predictive Metrics</p>
				<p>
					The Granger test evaluates whether one data set (sentiment) improves predictions for another (returns). If truth value (p) less than 0.05, it indicates predictive power. By calculating -log10(p), smaller p-values yield higher predictive scores, highlighting stronger evidence. We test both views.
				</p>
				<p style="font-size: 16px; font-weight: bold;">Findings</p>
				<ul style="margin-top: 10px; padding-left: 20px; font-size: 14px; color: #333;">
					<li><strong>Sentiment Predicting Returns:</strong> Sufficient evidence supports sentiment data as a predictor of returns.</li>
					<li><strong>Returns Predicting Sentiment:</strong> Insufficient evidence for returns predicting sentiment.</li>
				</ul>
				<p>
					These findings suggest sentiment influences returns, making it a potential predictive tool in stock analysis.
				</p>
			</div>
		</div>
	</section>

	<!-- SECTION 15: VIZ -->
	{#if showLineToSection3}
	<!-- Place this OUTSIDE section-3 -->
	<div class="reply-line-section3-container">
		<div class="reply-line-section3"></div>
	</div>
	{/if}

	<section class="tweet-block tweet-section {allowScrollToSection4 ? 'unlocked' : 'locked'}" use:revealTweet4 id="section-15">
		<div class="reply-thread-stacked">
			<!-- Speak 6 Tweet 1 -->
			<div class="tweet reply-chain">
				<div class="vertical-reply-line"></div>
				<div class="tweet-header">
					<img src="{base}/sauske.png" alt="sauske" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">sauske</span>
							<span class="username">@sauske</span>
						</div>
					</div>
				</div>

				<div class="tweet-body">
					<p class="message">
						After performing the granger test on both sides, it suggests that for the stocks NIO, AMZN, MSFT, GOOG, and PG, the sentiment has predictive power for returns.
					</p>
					<p class="date">9:45 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>						<button class="icon-btn" onclick={toggleHeart23}>
							<svg class="icon heart {heartLiked23 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked23 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>

			<!-- Speak 6 Tweet 2 -->
			<div class="tweet reply-chain">
				<div class="tweet-header">
					<img src="{base}/sauske.png" alt="sauske" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">sauske</span>
							<span class="username">@sauske</span>
						</div>
					</div>
				</div>

				<div class="tweet-body">
					<p class="message">
						So, there is not enough evidence to support stock affecting sentiment as seen in the tests on both sides, it confirms that sentiment has predictive power for returns. There also may be a feedback loop for TSLA as its predictive signal score is strong for both sides of sentiment and returns.
					</p>
					<p class="date">9:46 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>						<button class="icon-btn" onclick={toggleHeart24}>
							<svg class="icon heart {heartLiked24 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked24 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- SECTION 16: VIZ -->
	{#if showLineToSection4}
	<div class="reply-line-section4-container">
		<div class="reply-line-section4"></div>
	</div>
	{/if}


	<section class="tweet-block tweet-section {allowScrollToSection4 ? 'unlocked' : 'locked'}" use:revealTweet4 id="section-16">
		<div class="reply-thread-stacked">

			<!-- Tweet 1: Anon 9 -->
			<div class="tweet reply-chain">
				<div class="vertical-reply-line"></div>
				<div class="tweet-header">
					<img src="{base}/h.png" alt="h" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">clown</span>
							<span class="username">@chartclown</span>
						</div>
					</div>
				</div>

				<div class="tweet-body">
					<p class="message">
						lol i didn't need a graph to tell me that just look online it's obv for tesla
					</p>
					<p class="date">9:47 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn" aria-label="reply">
							<img class="icon" src="{base}/reply.png" alt="reply" />
						</button>
						<button class="icon-btn" aria-label="repost">
							<img class="icon repost" src="{base}/repost.png" alt="repost" />
						</button>
						<button class="icon-btn" aria-label="like" onclick={toggleHeart25}>
							<svg class="icon heart {heartLiked25 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked25 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn" aria-label="share">
							<img class="icon" src="{base}/share.svg" alt="share" />
						</button>
					</div>
				</div>
			</div>

			<!-- Removed Tweets -->
			<div class="tweet removed-tweet">
				<p class="removed-message">This Tweet violated the Twitter Rules.</p>
			</div>

			<div class="tweet removed-tweet">
				<p class="removed-message">This Tweet violated the Twitter Rules.</p>
			</div>

			<div class="tweet removed-tweet">
				<p class="removed-message">This Tweet violated the Twitter Rules.</p>
			</div>

		</div>
	</section>

	<!-- SECTION 17: VIZ -->
	{#if showLineToSection4}
	<div class="reply-line-section17-container">
		<div class="reply-line-section17"></div>
	</div>
	{/if}

	<section class="tweet-block tweet-section {allowScrollToSection4 ? 'unlocked' : 'locked'}" use:revealTweet4 id="section-17">
		<div class="reply-thread-stacked">
			<!-- Speak 1 -->
			<div class="tweet reply-chain">
				<div class="vertical-reply-line"></div>
				<div class="tweet-header">
					<img src="{base}/mohammad.png" alt="mohammad" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">mohammad</span>
							<span class="username">@mohammad</span>
							<img class="badge" src="{base}/Twitter_Verified_Badge.png" alt="verified badge" />
						</div>
					</div>
				</div>
		
				<div class="tweet-body">
					<p class="message">Anyways, clearly, there is a relationship between sentiment and stock returns, and we found and proved that sentiment scores have a predictive power on returns.</p>
					<p class="date">9:50 AM · 4/3/25</p>
					<div class="actions">
						<button class="icon-btn"><img class="icon" src="{base}/reply.png" alt="reply" /></button>
						<button class="icon-btn" aria-label="repost"><img class="icon repost" src="{base}/repost.png" alt="repost" /></button>						<button class="icon-btn" onclick={toggleHeart26}>
							<svg class="icon heart {heartLiked26 ? 'filled' : ''}" viewBox="0 0 24 24" fill={heartLiked26 ? "#1da1f2" : "none"} stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0s-1.5 3.5 0 4.8l5.8 5.5 5.8-5.5c1.5-1.3 1.5-3.5 0-4.8z"/>
							</svg>
						</button>
						<button class="icon-btn"><img class="icon" src="{base}/share.svg" alt="share" /></button>
					</div>
				</div>
			</div>
		
			<!-- Emoji Tweet 1 -->
			<div class="tweet reply-chain">
				<div class="tweet-header">
					<img src="{base}/i.png" alt="i" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">loaded</span>
							<span class="username">@overloaded</span>
						</div>
					</div>
				</div>
				<div class="tweet-body">
					<p class="message" style="font-size: 2rem;">🧠💥</p>
					<p class="date">9:51 AM · 4/3/25</p>
				</div>
			</div>
		
			<!-- Emoji Tweet 2 -->
			<div class="tweet reply-chain">
				<div class="tweet-header">
					<img src="{base}/j.png" alt="j" class="profile-img" />
					<div class="user-info">
						<div class="name-line">
							<span class="name">doubtful</span>
							<span class="username">@doubtful</span>
						</div>
					</div>
				</div>
				<div class="tweet-body">
					<p class="message" style="font-size: 2rem;">🤨</p>
					<p class="date">9:51 AM · 4/3/25</p>
				</div>
			</div>
		
			<!-- Removed by moderator -->
			<div class="removed-tweet">This Tweet violated the Twitter Rules.</div>
		</div>

	
</section>
{/if}
</div>



<Scroll bind:progress --scrolly-story-width="0">
	<div slot="viz"></div>
</Scroll>


<style>
	.tweet-block {
	  width: 100%;
	  max-width: 900px;
	  margin: 1.5rem auto;
	  padding: 1rem;
	  background: transparent;
	  transition: opacity 0.3s;
	  z-index: 3;
	  min-height: 45vh;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	}
  
	.bird-start {
	  height: 35vh;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  scroll-snap-align: start;
	}
  
	.line-container,
	.reply-line-section3-container,
	.reply-line-section4-container,
	.reply-line-section17-container {
	  height: 10vh;
	  margin: 0.5rem 0;
	  width: 100vw;
	  display: flex;
	  align-items: flex-start;
	  justify-content: center;
	  scroll-snap-align: none;
	  position: relative;
	  background-color: transparent;
	  z-index: 1;
	}
  
	.vertical-line,
	.reply-line-section3,
	.reply-line-section4,
	.reply-line-section17 {
	  width: 3px;
	  height: 0;
	  background: #1da1f2;
	  animation: drawLine 2s ease forwards;
	  margin-top: 4px;
	  z-index: 1;
	}
  
	@keyframes drawLine {
	  from { height: 0; }
	  to { height: 10vh; }
	}
  
	@keyframes drawLineShort {
	  from { height: 0; }
	  to { height: 10vh; }
	}
  
	@keyframes drawLineSection4 {
	  from { height: 0; }
	  to { height: 10vh; }
	}
  
	@keyframes drawLineSection17 {
	  from { height: 0; }
	  to { height: 10vh; }
	}

	@media screen and (max-width: 768px) {
  		.bird-start {
    		height: 45vh;
  }
}
  
	.background-video {
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100vw;
	  height: 100vh;
	  object-fit: cover;
	  z-index: 0;
	  pointer-events: none;
	  opacity: 0.5;
	}
  
	.content-overlay {
	  position: relative;
	  z-index: 4;
	}
  </style>
  


