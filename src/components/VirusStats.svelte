<script lang="ts">
  import VirusGlobal from './VirusGlobal.svelte';
  import VirusDomestic from './VirusDomestic.svelte';
  import VirusTimeline from './VirusTimeline.svelte';
  import Switch from './Switch.svelte';
  let global = true;
  let showTimeline = false;
</script>

<style>
  button,
  .switch {
    margin: 10px 10px;
  }
</style>

<div>
  <h1>Coronavirus stats</h1>
  {#if showTimeline}
    <button class="uk-button uk-button-primary" on:click={() => (showTimeline = false)}>Stats</button>
    <VirusTimeline />
  {:else}
    <div class="switch" visible={showTimeline === false}>
      <label for="globalSwitch">{global ? 'Global' : 'Domestic'}</label>
      <Switch bind:checked={global} />
    </div>
    <button class="uk-button uk-button-primary" on:click={() => (showTimeline = true)}>TimeLine</button>

    <br />

    {#if global}
      <VirusGlobal />
    {:else}
      <VirusDomestic />
    {/if}
  {/if}

</div>
