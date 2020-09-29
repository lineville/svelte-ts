<script lang="ts">
  // Dependencies
  import { onDestroy } from 'svelte'
  import { colorFill, colors, randomGrid, completedGrid, shuffleGrid } from '../../utils/ColorFill'
  import ColorGrid from './ColorGrid.svelte'
  import CongratsBanner from './CongratsBanner.svelte'

  // Props
  export let height = 15
  export let width = 15

  // State
  let row: number
  let column: number
  let newColor: string
  let fillCount = 0
  let moveCount = 0
  let completed = false
  let teleportEnabled = false
  let seconds = 0
  const colorOptions = colors.map((c, i) => ({ id: i, color: c }))

  // Init random grid
  let grid: string[][]
  grid = randomGrid(width, height, 5)
  row = Math.floor(Math.random() * height)
  column = Math.floor(Math.random() * width)

  // Set up timer
  let interval = setInterval(onTick, 1000)
  onDestroy(() => clearInterval(interval))

  // Fill the grid
  function handleSubmit() {
    grid = colorFill(grid, { x: column, y: row }, newColor)
    fillCount++
    if (completedGrid(grid)) {
      completed = true
      clearInterval(interval)
    }
  }

  // Executes every second
  function onTick() {
    seconds++
    grid = shuffleGrid(grid)
  }

  // Handle key presses
  function handleKeydown(event: KeyboardEvent) {
    if (!completed) {
      switch (event.key) {
        // up
        case 'ArrowUp':
        case 'W': {
          column = column - 1 < 0 ? width - 1 : column - 1
          moveCount++
          break
        }
        // down
        case 'ArrowDown':
        case 'S': {
          column = column + 1 > width - 1 ? 0 : column + 1
          moveCount++
          break
        }
        // left
        case 'ArrowLeft':
        case 'A': {
          row = row - 1 < 0 ? height - 1 : row - 1
          moveCount++
          break
        }
        // right
        case 'ArrowRight':
        case 'D': {
          row = row + 1 > height - 1 ? 0 : row + 1
          moveCount++
          break
        }
        case 'Enter': {
          // enter
          handleSubmit()
          break
        }
        default: {
          break
        }
      }
    }
  }

  // Reset state
  function reset() {
    row = 0
    column = 0
    fillCount = 0
    moveCount = 0
    completed = false
    grid = randomGrid(width, height, 5)
    seconds = 0
    setInterval(() => onTick, 1000)
  }

  // Moves directly to given location
  function select(event: any) {
    row = event.detail.x
    column = event.detail.y
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
    height: 40px;
    width: 70px;
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
  <h1>Controls:</h1>
  <br />
  <p>Use the arrow keys or WASD to navigate the grid</p>
  <p>Press enter, space or the fill button to fill all cells that match the color of your location</p>
  <p>Cheat will let you click to teleport without counting it as a move</p>

  {#if !completed}
    <div id="userInputs">
      <label for="newColor">Color</label>
      <select bind:value={newColor} class="emojiPicker">
        {#each colorOptions as option}
          <option value={option.color}>{option.color}</option>
        {/each}
      </select>

      <button type="submit" class="button is-primary" on:click={handleSubmit}>Fill</button>
      <span>Fills: {fillCount}</span>
      <span>Moves: {moveCount}</span>
      <span>Location: ({row}, {column})</span>
      <span>Time: {seconds} seconds</span>

      <input bind:checked={teleportEnabled} type="checkbox" class="checkbox" />
      <label for="cheatToggle">Cheat</label>
    </div>
  {:else}
    <CongratsBanner {moveCount} {fillCount} {seconds} on:reset={reset} />
  {/if}

  <ColorGrid {grid} {teleportEnabled} selectedRow={row} selectedColumn={column} on:select={select} />
</div>
