<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  // Props
  export let grid: string[][]
  export let selectedRow: number
  export let selectedColumn: number
  export let teleportEnabled: boolean
</script>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .selected {
    list-style-position: inside;
    border: 2px solid black;
    background: yellow;
  }

  #grid {
    position: relative;
    margin-top: 30px;
    border-radius: 25px;
    text-align: center;
  }

  .row {
    display: inline-block;
    text-align: center;
    padding: 10px;
    text-decoration: none;
  }
</style>

<div id="grid">
  <ul>
    {#each grid as row, idx1}
      <ul class="row">
        {#each row as col, idx2}
          {#if teleportEnabled}
            <li
              class={idx1 === selectedRow && idx2 === selectedColumn ? 'selected' : ''}
              on:click={() => dispatch('select', { x: idx1, y: idx2 })}>
              {grid[idx2][idx1]}
            </li>
          {:else}
            <li class={idx1 === selectedRow && idx2 === selectedColumn ? 'selected' : ''}>{grid[idx2][idx1]}</li>
          {/if}
        {/each}
      </ul>
    {/each}
  </ul>
</div>
