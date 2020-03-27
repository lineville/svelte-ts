<script lang="ts">
  import { onMount } from 'svelte';
  const apiURL = 'https://corona.lmao.ninja/countries/';

  let data = {};
  let countryOptions = [];
  let selectedCountry = 'China';

  const handleClick = async () => {
    let res = await fetch(apiURL + selectedCountry);
    data = await res.json();
  };

  onMount(async () => {
    console.log('Virus Stats Component Mounted');
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
    height: 50px;
  }

  table {
    text-align: center;
    align: center;
  }
</style>

<div id="countries-list">
  <h1>Covid19 Stats for {selectedCountry}</h1>
  <select bind:value={selectedCountry} class="countrySelector">
    {#each countryOptions as option}
      <option value={option.country}>
        {option.country}
        <img src={option.flag} alt={option.country} width={15} height={15} />
      </option>
    {/each}
  </select>
  <button on:click={handleClick}>Fetch Stats</button>

  <table>
    <tr>
      <td>Deaths</td>
      <td>{data.deaths}</td>
    </tr>
    <tr>
      <td>Deaths Today</td>
      <td>{data.todayDeaths}</td>
    </tr>
    <tr>
      <td>Cases Today</td>
      <td>{data.todayCases}</td>
    </tr>
    <tr>
      <td>Cases</td>
      <td>{data.cases}</td>
    </tr>
    <tr>
      <td>Recovered</td>
      <td>{data.recovered}</td>
    </tr>
    <tr>
      <td>Active</td>
      <td>{data.active}</td>
    </tr>
    <tr>
      <td>Critical</td>
      <td>{data.critical}</td>
    </tr>
    <tr>
      <td>Cases / Million</td>
      <td>{data.casesPerOneMillion}</td>
    </tr>
    <tr>
      <td>Deaths / Million</td>
      <td>{data.deathsPerOneMillion}</td>
    </tr>

  </table>
</div>
