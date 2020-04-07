<script lang="ts">
  let inputValue = 4
  $: outputValue = Math.sqrt(inputValue).toFixed(2)
</script>

<style>
  input {
    width: 80px;
  }
</style>

<div class="columns is-mobile is-centered">
  <div class="column is-half">
    <div class="field">
      <div class="control">
        <span>
          <input class="input is-primary" type="number" min={0} required bind:value={inputValue} />
          Square Root: {outputValue}
        </span>
      </div>
    </div>
  </div>
</div>
