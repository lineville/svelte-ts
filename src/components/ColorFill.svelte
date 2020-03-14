<script lang="ts">
  import { colorFill, colors, randomGrid } from '../utils/ColorFill';
  import ColorGrid from './ColorGrid.svelte';

  export let rows: number;
  export let columns: number;

  let row = 0;
  let column = 0;
  let newColor: string;

  const colorOptions = colors.map((c, i) => ({ id: i + 1, color: c }));

  // const initGrid = [
  //   ['🟥', '🟥', '🟥', '🟦', '🟪'],
  //   ['🟥', '🟪', '🟥', '🟦', '🟪'],
  //   ['🟦', '🟦', '🟩', '🟪', '🟪'],
  //   ['🟫', '🟨', '🟩', '🟨', '🟪'],
  //   ['🟨', '🟪', '🟪', '🟫', '🟥'],
  // ];
  const initGrid = randomGrid(5, 5);

  $: grid = initGrid;

  function handleSubmit() {
    grid = colorFill(grid, { x: column, y: row }, newColor);
    console.log(grid);
  }
</script>

<style>
  input {
    display: inline;
  }

  button {
    margin: 10px;
  }
</style>

<div>
  <h1>Color Filler</h1>
  <div>
    <label for="row">Row</label>
    <input type="number" id="rowInput" bind:value={row} min={0} max={rows} />
    <label for="column">Column</label>
    <input type="number" id="columnInput" bind:value={column} min={0} max={columns} />
    <label for="newColor">Color</label>
    <select bind:value={newColor}>
      {#each colorOptions as option}
        <option value={option.color}>{option.color}</option>
      {/each}
    </select>
    <button type="submit" class="uk-button uk-button-primary" on:click={handleSubmit}>Fill</button>
  </div>

  <ColorGrid {grid} />

</div>
