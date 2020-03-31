<script lang="ts">
  import VirusGlobal from './VirusGlobal.svelte';
  import VirusDomestic from './VirusDomestic.svelte';
  import VirusTimeline from './VirusTimeline.svelte';
  import Switch from '../Shared/Switch.svelte';
  let global = true;
  let showTimeline = false;
</script>

<style>
  .switch {
    margin: 10px 10px;
  }
</style>

<div>
  <h3>Covid-19 Stats by {global ? 'Country' : 'State'}</h3>

  <div class="switch" visible={showTimeline === false}>
    <label for="globalSwitch">{global ? 'Global' : 'Domestic'}</label>
    <Switch bind:checked={global} />
  </div>

  <br />

  {#if global}
    <VirusGlobal />
  {:else}
    <VirusDomestic />
  {/if}

</div>
