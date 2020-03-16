<script lang="ts">
  import { colorFill, colors, randomGrid } from '../utils/ColorFill';
  import ColorGrid from './ColorGrid.svelte';

  export let rows: number = 0;
  export let columns: number = 0;

  let row = 0;
  let column = 0;
  let newColor: string;

  const colorOptions = colors.map((c, i) => ({ id: i + 1, color: c }));
  let grid: Array<Array<string>> = randomGrid(rows, columns);

  function handleSubmit() {
    grid = colorFill(grid, { x: column, y: row }, newColor);
  }
</script>

<style>
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
  input {
    display: inline;
    margin: 15px;
  }

  button,
  select {
    margin: 15px;
  }

  .emojiPicker {
    height: 50px;
  }

  .userInputs {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>

<div>
  <h1>Color Filler</h1>

  <div class="userInputs">
    <label for="row">Row</label>
    <input type="number" id="rowInput" bind:value={row} min={0} max={rows} />

    <label for="column">Column</label>
    <input type="number" id="columnInput" bind:value={column} min={0} max={columns} />

    <label for="newColor">Color</label>
    <select bind:value={newColor} class="emojiPicker">
      {#each colorOptions as option}
        <option value={option.color}>{option.color}</option>
      {/each}
    </select>

    <button type="submit" class="uk-button uk-button-primary" on:click={handleSubmit}>Fill</button>
  </div>

  <ColorGrid {grid} {rows} {columns} />
</div>
