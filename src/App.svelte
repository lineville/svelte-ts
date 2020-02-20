<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import { myStore } from "./store";

  import Counter from "./components/Counter.svelte";
  import HanoiTowers from "./components/HanoiTowers.svelte";
  import SquareRootButton from "./components/SquareRootButton.svelte";
  import SquareRootBind from "./components/SquareRootBind.svelte";

  const count = writable(100);
  const unsubscribe = count.subscribe(value => console.log("count", value));

  export let name: string;
  onMount(() => {
    console.log("App mounted");
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<style>
  main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
  <h1>Hello {name}!</h1>
  <p>
    <!-- * Uncomment any component you want to see -->
    <SquareRootButton />
    <SquareRootBind />

    <!-- <Counter /> -->
    <!-- <HanoiTowers /> -->
    <!-- <Counter value={1}>Counter 1</Counter>
    <Counter bind:value={$count} step={3}>Counter 2</Counter>
    <Counter bind:value={$myStore} step={5}>Counter 3</Counter> -->


  </p>
</main>
