<script lang="ts">
  // Dependencies
  import { colorFill, colors, randomGrid, completedGrid } from '../utils/ColorFill';
  import ColorGrid from './ColorGrid.svelte';
  import CongratsBanner from './CongratsBanner.svelte';

  // Props
  export let height = 0;
  export let width = 0;

  // State
  let row: number;
  let column: number;
  let newColor: string;
  let fillCount = 0;
  let moveCount = 0;
  let completed = false;
  let teleportEnabled = false;
  const colorOptions = colors.map((c, i) => ({ id: i, color: c }));

  // Init random grid
  let grid: string[][];
  grid = randomGrid(width, height);
  row = Math.floor(Math.random() * height);
  column = Math.floor(Math.random() * width);

  // Fill the grid
  function handleSubmit() {
    grid = colorFill(grid, { x: column, y: row }, newColor);
    fillCount++;
    if (completedGrid(grid)) {
      completed = true;
    }
  }

  // Handle key presses
  function handleKeydown(event: KeyboardEvent) {
    if (!completed) {
      switch (event.keyCode) {
        // up
        case 38:
        case 87: {
          column = column - 1 < 0 ? width - 1 : column - 1;
          moveCount++;
          break;
        }
        // down
        case 40:
        case 83: {
          column = column + 1 > width - 1 ? 0 : column + 1;
          moveCount++;
          break;
        }
        // left
        case 37:
        case 65: {
          row = row - 1 < 0 ? height - 1 : row - 1;
          moveCount++;
          break;
        }
        // right
        case 39:
        case 68: {
          row = row + 1 > height - 1 ? 0 : row + 1;
          moveCount++;
          break;
        }
        case 13:
        case 32: {
          // enter
          handleSubmit();
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  // Reset state
  function reset() {
    row = 0;
    column = 0;
    fillCount = 0;
    moveCount = 0;
    completed = false;
    grid = randomGrid(width, height);
  }

  // Moves directly to given location
  function select(event: any) {
    row = event.detail.x;
    column = event.detail.y;
  }
</script>

<style>
  select,
  label {
    flex: 0 0;
    width: 60px;
    margin: 5px;
    display: flex;
  }

  span,
  button,
  input {
    margin: 10px 10px;
  }

  .emojiPicker {
    height: 50px;
  }

  #userInputs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  .container {
    align-items: center;
    justify-content: center;
  }
</style>

<svelte:window on:keydown={handleKeydown} />

<div class="container">
  <h1>Make them all the same color in as few moves as possible</h1>
  <p>
    You can use the arrow keys or WASD to navigate the grid.
    <br />
    Pressing enter, space or the fill button will fill all cells that are the same color as the current cell with the
    new color selected in the dropdown
    <br />
    Cheat will let you click to teleport without counting it as a move
  </p>

  {#if !completed}
    <div id="userInputs">
      <label for="newColor">Color</label>
      <select bind:value={newColor} class="emojiPicker">
        {#each colorOptions as option}
          <option value={option.color}>{option.color}</option>
        {/each}
      </select>

      <button type="submit" class="uk-button uk-button-primary" on:click={handleSubmit}>Fill</button>
      <span>Fills: {fillCount}</span>
      <span>Moves: {moveCount}</span>
      <span>Location ({row}, {column})</span>

      <input bind:value={teleportEnabled} type="checkbox" />
      <label for="cheatToggle">Cheat</label>
    </div>
  {:else}
    <CongratsBanner {moveCount} {fillCount} on:reset={reset} />
  {/if}

  <ColorGrid {grid} {teleportEnabled} selectedRow={row} selectedColumn={column} on:select={select} />
</div>
