<script lang="ts">
  import { onMount } from 'svelte';
  import StatsTableDomestic from './StatsTableDomestic.svelte';
  const apiURL = 'https://corona.lmao.ninja/states/';

  let data = [];
  let stateOptions = [];
  let selectedState = 'New York';

  // const handleChange = async (e: any) => {
  //   selectedState = e.target.value;
  //   let res = await fetch(apiURL + selectedState);
  //   data = await res.json();
  // };

  onMount(async () => {
    console.log('Virus Stats Domestic Mounted');
    try {
      let res = await fetch(apiURL);
      data = await res.json();
      stateOptions = data.map((s: any, i: number) => ({
        id: i,
        state: s.state,
      }));
    } catch (e) {
      console.error('error fetching data', e);
    }
  });
</script>

<style>
  .countrySelector {
    height: 35px;
    width: 140px;
  }
</style>

<div id="countries-list">
  <h5>
    Covid19 Stats for
    <select bind:value={selectedState} class="countrySelector">
      {#each stateOptions as option}
        <option value={option.state}>
          {option.state}
        </option>
      {/each}
    </select>
  </h5>
  <StatsTableDomestic cases={data} />

</div>
