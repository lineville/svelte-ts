<script lang="ts">
  import { onMount } from 'svelte'
  import Chart from 'chart.js'
  import maxProfit from '../../utils/ProfitOptimizer'
  export let prices: Array<number> = [0]
  export let newPrice: number = 0
  export let availableBuys: number = 1
  let canvas: any
  let chart: Chart

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

  onMount(() => {
    chart = generateChart()
  })
</script>

<style>
  input {
    max-width: 200px;
  }
  label {
    margin-right: 15px;
  }
</style>

<div>
  <h1>Max Profit Calculator</h1>
  <p>Add a few stocks, adjust the number of trades and calculate the max profit during that time period.</p>
  <hr />

  <div class="columns">

    <div class="column">
      <canvas id="stockChart" bind:this={canvas} />
    </div>

    <div class="column">
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
              <button class="button is-info" on:click={() => addPrice()}>Add to Stock Prices</button>
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-expanded">
          <label class="label"># of Trades</label>
        </div>
        <div class="field-body">

          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input class="input is-info" type="number" name="availableBuys" bind:value={availableBuys} />
              <span class="icon is-small is-left">
                <i class="fa fa-sync" />
              </span>

            </p>
          </div>
        </div>
      </div>

      <div class="field is-grouped is-grouped-centered">

        <p class="control">
          <span class="tag is-primary is-large">Profit: $ {profit}</span>

        </p>
        <p class="control">
          <button class="button is-light" on:click={clearPrices}>Clear</button>
        </p>
      </div>
    </div>

    <div class="column">
      <table class="table is-hoverable" align="center">
        <th>
          <div class="block">Stock Prices</div>
        </th>
        {#each prices as price, day}
          <tr>
            <td>Day {day}</td>
            <td>$ {price}</td>
          </tr>
        {/each}
      </table>
    </div>
  </div>

</div>
