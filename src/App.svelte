<script>
  import 'bulma/bulma.sass'
  import { writable } from 'svelte/store'
  import { myStore } from './store'
  import Navbar from './components/Shared/Navbar.svelte'
  import BlackJack from './components/Misc/BlackJack.svelte'
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
  <BlackJack />
</main>
