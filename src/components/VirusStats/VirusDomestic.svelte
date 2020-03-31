<script lang="ts">
  import { onMount } from 'svelte'
  import StatsTableDomestic from './StatsTableDomestic.svelte'
  const apiURL = 'https://corona.lmao.ninja/states/'

  let data = new Array<{ state: string }>()
  let stateOptions = []
  let selectedState = 'New York'
  let selectedStateData = {}

  const handleChange = async (e: any) => {
    selectedState = e.target.value
    selectedStateData = data.filter(s => s.state === selectedState)[0] || {}
  }

  onMount(async () => {
    console.log('Virus Stats Domestic Mounted')
    try {
      let res = await fetch(apiURL)
      data = await res.json()
      stateOptions = data.map((s: any, i: number) => ({
        id: i,
        state: s.state,
      }))
      selectedStateData = data.filter(s => s.state === selectedState)[0] || {}
    } catch (e) {
      console.error('error fetching data', e)
    }
  })
</script>

<style>
  .countrySelector {
    height: 35px;
    width: 140px;
  }
</style>

<div id="states-list">
  <select on:change={handleChange} value={selectedState} class="countrySelector custom-select">
    {#each stateOptions as option}
      <option value={option.state}>{option.state}</option>
    {/each}
  </select>
  <StatsTableDomestic {...selectedStateData} />

</div>
