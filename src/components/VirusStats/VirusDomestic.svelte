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
      stateOptions = data.sort().map((s: any, i: number) => ({
        id: i,
        state: s.state,
      }))
      selectedStateData = data.filter(s => s.state === selectedState)[0] || {}
    } catch (e) {
      console.error('error fetching data', e)
    }
  })
</script>

<div id="countries-list is-center" class="field is-grouped is-grouped-centered is-narrow">
  <p class="control">
    <span class="select">
      <select on:change={handleChange} value={selectedState}>
        {#each stateOptions as option}
          <option value={option.state}>{option.state}</option>
        {/each}
      </select>
    </span>
  </p>
</div>

<StatsTableDomestic {...selectedStateData} />
