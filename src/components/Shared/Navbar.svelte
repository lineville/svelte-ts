<script lang="ts">
  const links = ['Stats', 'Timeline'];
</script>

<style>

</style>

<!-- <nav class="uk-navbar-container uk-dark" uk-navbar>
  <div class="uk-navbar-center uk-dark">
    <ul class="uk-navbar-nav">
      {#each links as link}
        <li class="uk-active">
          <a href="/{link}">{link}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav> -->

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      {#each links as link}
        <li class="nav-item">
          <a class="nav-link" href="/{link}">{link}</a>
        </li>
      {/each}
      <!-- <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li> -->
    </ul>
  </div>
</nav>
