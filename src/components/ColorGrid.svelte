<script lang="ts">
  export let grid: Array<Array<string>>;
</script>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  #grid {
    position: relative;
    margin-top: 30px;
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
          <li>{grid[idx1][idx2]}</li>
        {/each}
      </ul>
    {/each}
  </ul>
</div>
