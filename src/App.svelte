<script>
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { myStore } from './store';

  import GitHubCorner from './components/Shared/GitHubCorner.svelte';
  import Navbar from './components/Shared/Navbar.svelte';
  import { Router } from 'svelte-router-spa';
  import { routes } from './routes';

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
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<Navbar />
<main>

  <GitHubCorner
    repositoryURL={'https://github.com/lineville/svelte-ts'}
    openInNewTab={true}
    color={'black'}
    side={'right'} />

  <Router {routes} />

  <!-- <VirusStats /> -->
  <!-- <h1>Svelte TypeScript Components</h1> -->
  <!-- <CandyChomper width={8} height={8} numColors={3} /> -->
  <!-- <ColorFill width={15} height={15} /> -->

</main>
