<script lang="ts">
  const links = ['Stats', 'Timeline']
</script>

<style>

</style>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      {#each links as link}
        <li class="nav-item">
          <a class="nav-link" href="/{link}">{link}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
