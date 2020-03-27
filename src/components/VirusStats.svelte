<script lang="ts">
  import VirusGlobal from './VirusGlobal.svelte';
  import VirusDomestic from './VirusDomestic.svelte';
  import Switch from './Switch.svelte';
  let global = true;
</script>

<style>
  .switch {
    margin: 10px 10px;
  }
</style>

<div>
  <h1>Coronavirus stats</h1>
  <!-- <div class="switch">
    <label for="globalSwitch">{global ? 'Global' : 'Domestic'}</label>
    <Switch bind:checked={global} />
  </div>

  <br /> -->

  <!-- {#if global} -->
    <VirusGlobal />
  <!-- {:else} -->
    <!-- <VirusDomestic /> -->
  <!-- {/if} -->

</div>
