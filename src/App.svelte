<script lang="ts">
  import 'bulma/bulma.sass'
  // @ts-ignore
  import { Router } from 'svelte-router-spa'
  import { routes } from './routes'
  import Navbar from './components/Shared/Navbar.svelte'
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
