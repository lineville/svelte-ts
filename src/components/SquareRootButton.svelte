<script lang="ts">
    let inputValue : number = 4;
    let outputValue : number = 2;

    const squareRoot = () : void => {
        outputValue = Math.sqrt(inputValue);
    }
</script>


<div>
    <input type="number" width="50%" min={0} required bind:value={inputValue}/>
    <button class="uk-button uk-button-primary" on:click={() => squareRoot()}>Square Root: {outputValue}</button>
</div>