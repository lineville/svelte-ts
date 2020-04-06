<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  export let fillCount: number
  export let moveCount: number
  export let seconds: number

  const dispatch = createEventDispatcher()
</script>

<style>
  button {
    margin: 10px 10px;
  }
  #congrats {
    background-color: rgb(87, 231, 87);

    /* height: 80%;
    margin: 20px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center; */
  }
</style>

<!-- <div id="congrats">
</div> -->

<div class="modal is-active">
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">You Won!</p>
    </header>
    <section class="modal-card-body">
      <!-- Content ... -->
      <h1>Congrats you did it in {seconds} seconds, {moveCount} moves and {fillCount} fills!</h1>
      <button class="button is-primary" on:click={() => dispatch('reset')}>Reset</button>
      <button class="modal-close is-large" aria-label="close" />
    </section>
  </div>
  <!-- <div class="modal-content" id="congrats">
  </div> -->
</div>
