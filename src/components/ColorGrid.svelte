<script lang="ts">
  export let grid: string[][];
  export let selectedRow: 0;
  export let selectedColumn: 0;
</script>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .selected {
    list-style-position: inside;
    border: 1px solid black;
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
    padding: 15px;
    text-decoration: none;
  }
</style>

<div id="grid">
  <ul>
    {#each grid as row, idx1}
      <ul class="row">
        {#each row as col, idx2}
          <li class={idx1 === selectedRow && idx2 === selectedColumn ? 'selected' : ''}>{grid[idx2][idx1]}</li>
        {/each}
      </ul>
    {/each}
  </ul>
</div>
