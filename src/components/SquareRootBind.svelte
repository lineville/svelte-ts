<script>
  let inputValue = 4;
  $: outputValue = Math.sqrt(inputValue).toFixed(2);
</script>

<style>
  input {
    width: 60px;
  }

  #square-root-bind {
    margin: auto;
    width: 50%;
    padding: 10px;
  }
</style>

<div id="square-root-bind">
  <span>
    <input type="number" min={0} required bind:value={inputValue} />
    Square Root: {outputValue}
  </span>
</div>
