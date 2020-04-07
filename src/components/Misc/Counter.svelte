<script lang="ts">
  export let value: number = 0
  export let step: number = 1
</script>

<style>
  button {
    margin-left: 10px;
    margin-right: 10px;
  }
</style>

<div>
  <div>
    <button class="button" on:click={() => (value += step)}>➕</button>
    <span>{value}</span>
    <button class="button" on:click={() => (value -= step)}>➖</button>
  </div>
</div>
