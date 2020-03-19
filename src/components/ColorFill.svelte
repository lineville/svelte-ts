<script lang="ts">
  import { colorFill, colors, randomGrid } from '../utils/ColorFill';
  import ColorGrid from './ColorGrid.svelte';

  export let rows = 0;
  export let columns = 0;

  let row = 0;
  let column = 0;
  let newColor: string;

  const colorOptions = colors.map((c, i) => ({ id: i + 1, color: c }));

  const initGrid = randomGrid(rows, columns);
  let grid: string[][];
  $: grid = initGrid;

  function handleSubmit() {
    grid = colorFill(grid, { x: column, y: row }, newColor);
    console.log(grid);
  }
</script>

<style>
  input,
  select,
  label {
    /* display: inline; */
    flex: 0 0;
    width: 60px;
    margin: 5px;
    display: flex;
  }

  button {
    margin: 10px;
  }

  #userInputs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
</style>

<div>
  <h1>Color Filler</h1>
  <div id="userInputs">
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
