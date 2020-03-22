<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { myStore } from './store';

  import GitHubCorner from './components/GitHubCorner.svelte';
  // import ColorFill from './components/ColorFill.svelte';
  import CandyChomper from './components/CandyChomper.svelte';

  onMount(() => {
    console.log('App mounted');
  });
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>

  <GitHubCorner
    repositoryURL={'https://github.com/lineville/svelte-ts'}
    openInNewTab={true}
    color={'black'}
    side={'right'} />

  <h1>Svelte TypeScript Components</h1>
  <CandyChomper width={15} height={15} />
  <!-- <ColorFill width={15} height={15} /> -->

</main>
