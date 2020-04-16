<script lang="ts">
  import { fly } from 'svelte/transition'
  import { onMount } from 'svelte'
  import Chart from 'chart.js'
  import maxProfit from '../../utils/ProfitOptimizer'
  export let prices: Array<number> = [0]
  export let newPrice: number = 0
  export let availableBuys: number = 1
  let canvas: any
  let chart: Chart

  let editRowIndex: number = -1
  export let profit: number = 0

  const setProfit = (prices: Array<number>, availableBuys: number): void => {
    profit = maxProfit(prices, availableBuys)
  }

  const addPrice = (): void => {
    prices = [...prices, newPrice]
    setProfit(prices, availableBuys)
    chart.destroy()
    chart = generateChart()
  }

  const generateChart = (): Chart => {
    const ctx = canvas.getContext('2d')

    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: prices.map((p: number, i: number) => i),
        datasets: [
          {
            label: 'Price',
            data: prices,
            backgroundColor: 'rgb(0, 209, 178, 0.2)',
            borderColor: 'rgb(0, 209, 178, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    })
  }

  const clearPrices = (): void => {
    prices = [0]
    setProfit(prices, availableBuys)
    chart.destroy()
    chart = generateChart()
  }

  const handleChange = (event: any): void => {
    availableBuys = parseInt(event.target.value)
    setProfit(prices, availableBuys)
  }

  const editPrice = (day: number): void => {
    editRowIndex = day
  }

  const savePrice = (): void => {
    editRowIndex = -1
    setProfit(prices, availableBuys)
    chart.destroy()
    chart = generateChart()
  }

  const deleteDay = (day: number): void => {
    prices = prices.slice(0, day).concat(prices.slice(day + 1))
    setProfit(prices, availableBuys)
    chart.destroy()
    chart = generateChart()
  }

  onMount(() => {
    chart = generateChart()
  })
</script>

<style>
  label {
    margin-right: 15px;
  }
  input {
    width: 80px;
  }
</style>

<div>
  <h1>Max Profit Calculator</h1>
  <p>Add a few stocks, adjust the number of trades and calculate the max profit during that time period.</p>
  <hr />

  <div class="columns">

    <div class="column is-half">
      <canvas id="stockChart" bind:this={canvas} />
    </div>

    <div class="column is-half">
      <div class="field is-horizontal">
        <div class="field-label is-expanded">
          <label class="label">Stock Price</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input class="input is-info" type="number" name="newPrice" bind:value={newPrice} />

              <span class="icon is-small is-left">
                <i class="fa fa-dollar-sign" />
              </span>
              <button class="button is-info" on:click={() => addPrice()}>Add ➕</button>
            </p>
          </div>
        </div>

        <div class="field is-grouped is-grouped-centered">
          <div class="field-label">
            <label class="label">Trades</label>
          </div>
          <p class="control">
            <input class="input is-info is-narrow" type="number" id="trades" bind:value={availableBuys} />

          </p>
          <p class="control">
            <span class="tag is-primary is-large">Profit: $ {profit}</span>

          </p>
          <p class="control">
            <button class="button is-light" on:click={clearPrices}>Clear</button>
          </p>
        </div>
      </div>

      <hr />
      <ul>

        {#each prices as price, day}
          <li transition:fly={{ y: 200, duration: 500 }}>

            <span>
              Day {day}
              {#if day === editRowIndex}
                <!-- <p class="control is-expanded"> -->
                <input bind:value={price} type="number" class="input is-info" />
                <!-- </p> -->
              {:else}$ {price}{/if}
              <!-- <p class="control"> -->
              {#if day === editRowIndex}
                <button class="button is-small is-light is-success" on:click={savePrice}>✅ Save</button>
              {:else}
                <button class="button is-small is-light is-success" on:click={() => editPrice(day)}>✏️ Edit</button>
              {/if}
              <!-- </p> -->
              <!-- <p class="control"> -->
              <button class="button is-small is-light is-danger" on:click={() => deleteDay(day)}>🗑️ Delete</button>
              <!-- </p> -->
            </span>
          </li>
        {/each}

      </ul>
      <!-- <table class="table is-hoverable">
        <tr>
          <th>
            <div class="field is-horizontal">
              <div class="field-label is-expanded">
                <label class="label">Stock Price</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <input class="input is-info" type="number" name="newPrice" bind:value={newPrice} />

                    <span class="icon is-small is-left">
                      <i class="fa fa-dollar-sign" />
                    </span>
                    <button class="button is-info" on:click={() => addPrice()}>Add ➕</button>
                  </p>
                </div>
              </div>

              <div class="field is-grouped is-grouped-centered">
                <div class="field-label">
                  <label class="label">Trades</label>
                </div>
                <p class="control">
                  <input class="input is-info is-narrow" type="number" id="trades" bind:value={availableBuys} />

                </p>
                <p class="control">
                  <span class="tag is-primary is-large">Profit: $ {profit}</span>

                </p>
                <p class="control">
                  <button class="button is-light" on:click={clearPrices}>Clear</button>
                </p>
              </div>
            </div>
          </th>
        </tr>
        {#each prices as price, day}
          <tr transition:fly={{ y: 200, duration: 500 }}>
            <td>Day {day}</td>

            <td>
              {#if day === editRowIndex}
                <p class="control is-expanded">
                  <input bind:value={price} type="number" class="input is-info" />
                </p>
              {:else}$ {price}{/if}
            </td>

            <td>
              <p class="control">
                {#if day === editRowIndex}
                  <button class="button is-small is-light is-success" on:click={savePrice}>✅ Save</button>
                {:else}
                  <button class="button is-small is-light is-success" on:click={() => editPrice(day)}>✏️ Edit</button>
                {/if}
              </p>
            </td>
            <td>
              <p class="control">
                <button class="button is-small is-light is-danger" on:click={() => deleteDay(day)}>🗑️ Delete</button>
              </p>
            </td>
          </tr>
        {/each}
      </table> -->
    </div>
  </div>

</div>
