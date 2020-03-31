<script lang="ts">
  import { onMount } from 'svelte';
  import StatsTableGlobal from './StatsTableGlobal.svelte';

  const apiURL = 'https://corona.lmao.ninja/countries/';

  let data = {};
  let countryOptions = [];
  let selectedCountry = 'China';

  const handleChange = async (e: any) => {
    selectedCountry = e.target.value;
    let res = await fetch(apiURL + selectedCountry);
    data = await res.json();
  };

  onMount(async () => {
    console.log('Virus Stats Global Mounted');

    try {
      let allCountries = await fetch(apiURL);
      countryOptions = await allCountries.json();
      countryOptions = countryOptions.map((c: any, i: number) => ({
        id: i,
        country: c.country,
        flag: c.countryInfo.flag,
      }));
      let res = await fetch(apiURL + selectedCountry);
      data = await res.json();
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
  <span>
    <select on:change={handleChange} value={selectedCountry} class="countrySelector custom-select">
      {#each countryOptions as option}
        <option value={option.country}>
          {option.country}
          <!-- <img src={option.flag} alt={option.country} width={15} height={15} /> -->
        </option>
      {/each}
    </select>
  </span>
  <StatsTableGlobal {...data} />

</div>
