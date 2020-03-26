<script>
	import Counter from './components/Counter.svelte'
	import Temperature from './components/Temperature.svelte'
	import FlightBooker from './components/FlighBooker.svelte'

	const options = ['counter', 'temperature', 'flightBooker']
	let selected = options[0]
	let componentHash = {
		counter: { label: 'Counter', component: Counter },
		temperature: { label: 'Temperature converter', component: Temperature },
		flightBooker: { label: 'Flight Booker', component: FlightBooker }
	}
</script>
<div class="app-container">
	<nav>
		<h1>Xstate svelte examples</h1>
		<ul>
			{#each options as option}
				<li class:active={ selected === option } on:click={() => selected = option}>
					{componentHash[option].label}
				</li>
			{/each}
		</ul>
	</nav>
	<main>
		<svelte:component this={componentHash[selected].component} />
	</main>
</div>

<style>
	:global(body) {
		padding: 0;
	}

	:global(button.btn) {
    margin-top: 15px;
    border: none;
    cursor: pointer;
    background-color: #ff3e00;
    color: white;
    padding: 7px 15px;
    border-radius: 7px;
    font-weight: bold;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, .4);
    transition: transform .2s;
  }

  :global(button.btn:active, button:not(:disabled):active) {
    background-color: #ff3e00;
    transform: translateY(2px)
  }

  :global(button.btn:disabled) {
    background-color: #eee;
		cursor: auto;
  }

	.app-container {
		display: flex;
	}

	nav {
		width: 300px;
		border-right: 1px solid #ccc;
		min-height: 100vh;
	}

	main {
		flex: 1;
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		text-align: center;
	}

	ul {
		padding: 0;
		list-style-type: none;
	}

	li {
		padding: 5px 20px;
		cursor: pointer;
	}

	li:hover {
		background-color: #ddd;
	}

	.active, li:hover.active {
		background-color: #ff3e00;
		color: white;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>