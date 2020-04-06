<script>
  import { onMount, onDestroy } from 'svelte'
  import { writable } from 'svelte/store'
  import { myStore } from './store'

  import Navbar from './components/Shared/Navbar.svelte'
  import { Router } from 'svelte-router-spa'
  import { routes } from './routes'

  onMount(() => {
    console.log('App mounted')
  })
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <Navbar />
  <Router {routes} />
</main>
