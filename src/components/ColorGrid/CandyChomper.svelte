<script lang="ts">
  // Dependencies
  import { onDestroy } from 'svelte'
  import { randomGrid, completedGrid } from '../../utils/ColorFill'
  import { chomp, swapCandies } from '../../utils/CandyChomper'
  import ColorGrid from './ColorGrid.svelte'
  import CongratsBanner from './CongratsBanner.svelte'

  // Props
  export let height = 15
  export let width = 15
  export let numColors = 6

  // State
  let row: number
  let column: number
  let grid: string[][]
  let chomps = 0
  let moveCount = 0
  let completed = false
  let seconds = 0
  let teleportEnabled = false

  // Set up timer
  const onTick = () => seconds++
  let interval = setInterval(onTick, 1000)
  onDestroy(() => clearInterval(interval))

  // Initialize grid
  // const init = (() => {
  //   grid = randomGrid(width, height, numColors)
  //   row = Math.floor(Math.random() * height)
  //   column = Math.floor(Math.random() * width)
  // })()

  // Fill the grid
  const handleSubmit = () => {
    grid = swapCandies(grid, { x: column, y: row })

    grid = chomp(grid, { x: column, y: row })
    chomps++
    if (completedGrid(grid)) {
      completed = true
      clearInterval(interval)
    }
  }

  // Handle key presses
  const handleKeydown = (event: KeyboardEvent) => {
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
        case 'D': {
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
  const reset = () => {
    row = 0
    column = 0
    moveCount = 0
    completed = false
    grid = randomGrid(width, height, numColors)
    seconds = 0
    setInterval(() => onTick, 1000)
  }

  // Moves directly to given location
  const select = (event: any) => {
    row = event.detail.x
    column = event.detail.y
  }
</script>

<style>
  span,
  button {
    margin: 10px 10px;
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

<!-- Sets up key handler on the window -->
<svelte:window on:keydown={handleKeydown} />

<div class="container">
  <h1>Candy Chomper</h1>
  <p>
    You can use the arrow keys or WASD to navigate the grid.
    <br />
    Try chomping the candy by pressing space, enter or the chomp button when you find three in a row!
  </p>

  {#if !completed}
    <div id="userInputs">
      <button type="submit" class="button is-primary" on:click={handleSubmit}>Chomp</button>
      <span>Chomps: {chomps}</span>
      <span>Moves: {moveCount}</span>
      <span>Location: ({row}, {column})</span>
      <span>Time: {seconds} seconds</span>
    </div>
  {:else}
    <CongratsBanner {moveCount} fillCount={chomps} {seconds} on:reset={reset} />
  {/if}

  <ColorGrid {grid} {teleportEnabled} selectedRow={row} selectedColumn={column} on:select={select} />
</div>
