<script lang="ts">
  import maxProfit from '../../utils/ProfitOptimizer'
  export let prices: Array<number> = []
  export let newPrice: number = 0
  export let availableBuys: number = 3

  export let profit: number = 0

  function setProfit(prices: Array<number>, availableBuys: number) {
    profit = maxProfit(prices, availableBuys)
  }

  function addPrice() {
    prices = [...prices, newPrice]
  }
</script>

<style>
  input {
    width: 60px;
    margin: 0px, 0px;
    padding: 0px, 0px;
  }
</style>

<div>
  <span>Stock Prices: {prices.join(' ')}</span>
  <hr />

  <label for="newPrice">Price</label>
  <input name="newPrice" type="number" bind:value={newPrice} />
  <button class="button is-info" on:click={() => addPrice()}>Add to Stock Prices</button>

  <br />
  <br />
  <br />

  <label for="availableBuys">Trades</label>
  <input name="availableBuys" type="number" bind:value={availableBuys} />
  <button class="button is-primary" on:click={() => setProfit(prices, availableBuys)}>Max Profit: {profit}</button>
</div>
