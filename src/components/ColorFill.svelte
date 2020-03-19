<script lang="ts">
  import { colorFill, colors, randomGrid, completedGrid } from '../utils/ColorFill';
  import ColorGrid from './ColorGrid.svelte';

  export let height = 0;
  export let width = 0;

  let row = 0;
  let column = 0;
  let newColor: string;
  let fillCount = 0;
  let moveCount = 0;
  let completed = false;
  const colorOptions = colors.map((c, i) => ({ id: i, color: c }));

  let grid: string[][];
  $: grid = randomGrid(width, height);

  function handleSubmit() {
    grid = colorFill(grid, { x: column, y: row }, newColor);
    fillCount++;
    if (completedGrid(grid)) {
      completed = true;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!completed) {
      switch (event.keyCode) {
        case 38: {
          column = column - 1 < 0 ? width - 1 : column - 1;
          moveCount++;
          break;
        }
        case 40: {
          column = column + 1 > width - 1 ? 0 : column + 1;
          moveCount++;
          break;
        }
        case 37: {
          row = row - 1 < 0 ? height - 1 : row - 1;
          moveCount++;
          break;
        }
        case 39: {
          row = row + 1 > height - 1 ? 0 : row + 1;
          moveCount++;
          break;
        }
        case 13: {
          handleSubmit();
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  function reset() {
    row = 0;
    column = 0;
    fillCount = 0;
    moveCount = 0;
    completed = false;
    grid = randomGrid(width, height);
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

  span {
    margin: 5px;
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

  #congrats {
    background-color: green;
    width: 100%;
    height: 100%;
    margin: 20px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<svelte:window on:keydown={handleKeydown} />

<div>
  <h1>Make them all the same color in as few fills as possible</h1>
  <p>You can use the arrow keys and enter key to navigate the grid</p>

  {#if completed}
    <div id="congrats">
      <h1>Congrats you did it in {moveCount} moves and {fillCount} fills!</h1>
      <button class="uk-button uk-button-secondary" on:click={reset}>Reset</button>
    </div>
  {:else}
    <div id="userInputs">
      <label for="newColor">Color</label>
      <select bind:value={newColor} class="emojiPicker">
        {#each colorOptions as option}
          <option value={option.color}>{option.color}</option>
        {/each}
      </select>

      <button type="submit" class="uk-button uk-button-primary" on:click={handleSubmit}>Fill</button>
      <span>Fills: {fillCount}</span>
      <span>Total Moves: {moveCount}</span>
    </div>
  {/if}

  <ColorGrid {grid} selectedRow={row} selectedColumn={column} />
</div>
