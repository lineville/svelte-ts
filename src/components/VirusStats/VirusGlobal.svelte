<script lang="ts">
  import { onMount } from 'svelte'
  import StatsTableGlobal from './StatsTableGlobal.svelte'

  const apiURL = 'https://corona.lmao.ninja/v2/countries/'

  let data = {}
  let countryOptions = []
  let selectedCountry = 'USA'

  const handleChange = async (e: any) => {
    selectedCountry = e.target.value
    let res = await fetch(apiURL + selectedCountry)
    data = await res.json()
  }

  onMount(async () => {
    console.log('Virus Stats Global Mounted')

    try {
      let allCountries = await fetch(apiURL)
      countryOptions = await allCountries.json()
      countryOptions = countryOptions.map((c: any, i: number) => ({
        id: i,
        country: c.country,
        flag: c.countryInfo.flag,
      }))
      let res = await fetch(apiURL + selectedCountry)
      data = await res.json()
    } catch (e) {
      console.error('error fetching data', e)
    }
  })
</script>

<div id="countries-list is-center" class="field is-grouped is-grouped-centered">
  <p class="control has-icons-left">
    <span class="select">
      <select on:change={handleChange} value={selectedCountry}>
        {#each countryOptions as option}
          <option value={option.country}>{option.country}</option>
        {/each}
      </select>
    </span>
    <span class="icon is-small is-left">
      <i class="fas fa-globe" />
    </span>
  </p>
</div>

<StatsTableGlobal {...data} />
