<script lang="ts">
  const links = ['Stats', 'Timeline']
  let mobileView = false
</script>

<style>
  button {
    border: none;
  }
</style>

<nav class="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">

    <button
      role="button"
      class="navbar-burger burger"
      class:is-active={mobileView}
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
      on:click={() => {
        mobileView = !mobileView
      }}>
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>
  </div>

  <div id="navbarBasicExample" class="navbar-menu" class:is-active={mobileView}>
    <div class="navbar-start">
      {#each links as link}
        <a class="navbar-item" href="/{link}">{link}</a>
      {/each}
    </div>
    <div class="navbar-end">

      <a class="navbar-item" href="https://medium.com/@lineville" target="_blank">
        <span class="icon is-medium">
          <i class="fab fa-medium" />
        </span>
        <span>Blog</span>
      </a>
      <a class="navbar-item" href="https://github.com/lineville/svelte-ts" target="_blank">
        <span class="icon is-medium">
          <i class="fab fa-github" />
        </span>
        <span>GitHub</span>
      </a>
    </div>
  </div>
</nav>
