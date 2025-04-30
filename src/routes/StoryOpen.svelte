<script lang="ts">
	import { fly, scale, fade } from "svelte/transition";
	import { base } from '$app/paths';

	let showTitle = false;
	let showBird = false;
	let showBirdText = false;
	let showSubtitle = false;
	let showArrow = false;

	let displayedText = "";
	const fullText =
		"A single tweet. A ripple of reactions. A shift in sentiment.\n\nDive into the data behind social media’s sway on the stock market — where patterns emerge, and price meets perception.";

	let scrollLocked = false;

	function reveal(node, callback) {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					callback();
					observer.unobserve(node);
				}
			},
			{ threshold: 0.9 }
		);
		observer.observe(node);
	}

	function lockScroll() {
		scrollLocked = true;
		document.body.style.overflowY = "hidden";
	}

	function unlockScroll() {
		scrollLocked = false;
		document.body.style.overflowY = "auto";
	}

	function typeText(text: string, speed = 25) {
		displayedText = "";
		let i = 0;
		const interval = setInterval(() => {
			displayedText += text[i];
			i++;
			if (i === text.length) {
				clearInterval(interval);
				showArrow = true;
			}
		}, speed);
	}
</script>

<div class="storyopen-wrapper">
	<section class="section scroll-intro">
		<p class="scroll-hint animated-pulse">Scroll to begin</p>
		<div class="down-arrow">&#8595;</div>
	</section>

	<section class="section hero" use:reveal={() => (showTitle = true)}>
		{#if showTitle}
			<h1 in:scale={{ duration: 800, start: 0.5 }}>
				STOCK SENTIMENT ANALYSIS:<br />THE SOCIAL MEDIA EFFECT
			</h1>
			<h2 class="main-intro contrast-text fade-in">
				Step inside a dynamic story where tweets spark trends and emotions move markets. 
				Explore the surprising power of social sentiment on stock prices — one post, one pattern, one ripple at a time.
			</h2>
		{/if}
	</section>

	<section class="section reduced-section light-blue" use:reveal={() => {
		showBird = true;
		setTimeout(() => (showBirdText = true), 1000);
	}}>
		{#if showBird}
			<img
				src="{base}/bird.png"
				alt="Twitter bird"
				class="bird"
				in:scale={{ duration: 1000, start: 0.3, easing: t => t * t }}
			/>
		{/if}

		{#if showBirdText}
			<p class="bird-message contrast-text" in:fade={{ duration: 1000 }}>
				Where voices echo and opinions fly — let’s begin where it all starts.
			</p>
		{/if}
	</section>

	<section class="section reduced-section light-blue" use:reveal={() => (showSubtitle = true)}>
		{#if showSubtitle}
			<h2 class="subtitle contrast-text"
				in:scale={{ duration: 800, start: 0.5, easing: t => t * t }}
				style="opacity: 1; transition: opacity 1s ease;"
			>
				Could a tweet be the next market mover?
			</h2>
		{/if}
	</section>

	<section class="section reduced-section light-blue" use:reveal={() => { typeText(fullText, 30); }}>
		<p class="tagline typewriter contrast-text">{displayedText}</p>
		{#if showArrow}
			<div class="arrow big-arrow" in:scale={{ duration: 800, start: 0.5 }}>
				&#8595;
			</div>
		{/if}
	</section>
</div>

<style>
	.section {
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		position: relative;
		overflow: hidden;
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}

	.section:not(.reduced-section) {
		height: 100vh;
	}

	.reduced-section {
		padding: 5vh 0;
	}

	.scroll-intro {
		height: 50vh;
		background-color: #f5f5f5;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.scroll-hint {
		font-size: 1.5vw;
		color: #555;
		animation: pulse 2s infinite;
	}

	.down-arrow {
		font-size: 2rem;
		color: #777;
		margin-top: 1vh;
		animation: bounce 1.5s infinite;
	}

	@keyframes pulse {
		0% { opacity: 0.6; }
		50% { opacity: 1; }
		100% { opacity: 0.6; }
	}

	@keyframes bounce {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(10px); }
	}

	.hero {
		background-color: #1da1f2;
	}

	.light-blue {
		background-color: #55b6f2;
	}

	h1 {
		font-size: 3vw;
		color: white;
		font-weight: 800;
		line-height: 1.4;
	}

	.main-intro,
	.subtitle,
	.bird-message,
	.tagline {
		font-size: 1.5rem;
		text-align: center;
		margin-top: 1rem;
		margin-bottom: 2rem;
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
		line-height: 1.6;
	}

	.contrast-text {
		color: #fffbea;
		text-shadow: 1px 1px 3px rgba(0,0,0,0.4);
	}

	.fade-in {
		animation: fadeInUp 1s ease-in-out;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.bird {
		width: 12vw;
		margin-top: -4vh;
	}

	.arrow {
		margin-top: 1vh;
		color: white;
	}

	.big-arrow {
		font-size: 5vw;
		animation: crazyBounce 1.5s infinite ease-in-out;
	}

	@keyframes crazyBounce {
		0% { transform: translateY(0px) rotate(0deg) scale(1); }
		25% { transform: translateY(10px) rotate(-10deg) scale(1.1); }
		50% { transform: translateY(0px) rotate(10deg) scale(1.05); }
		75% { transform: translateY(-8px) rotate(-5deg) scale(1.08); }
		100% { transform: translateY(0px) rotate(0deg) scale(1); }
	}

	:global(body) {
		overflow-x: hidden;
		margin: 0;
		padding: 0;
		scroll-snap-type: y mandatory;
	}

	:global(html) {
		scroll-behavior: smooth;
		touch-action: pan-y;
	}

	.storyopen-wrapper {
		position: relative;
		z-index: 200;
	}
</style>