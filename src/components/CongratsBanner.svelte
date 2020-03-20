<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let fillCount: number;
  export let moveCount: number;

  const dispatch = createEventDispatcher();
</script>

<style>
  button {
    margin: 10px 10px;
  }
  #congrats {
    background-color: rgb(87, 231, 87);
    height: 80%;
    margin: 20px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
</style>

<div id="congrats">
  <h1>Congrats you did it in {moveCount} moves and {fillCount} fills!</h1>
  <button class="uk-button uk-button-secondary" on:click={() => dispatch('reset')}>Reset</button>
</div>
