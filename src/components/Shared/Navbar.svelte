<script lang="ts">
  const links = ['Stats', 'Timeline']
  const emojis = ['🌐', '🗠']
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
      {#each links as link, idx}
        <a class="navbar-item" href="/{link}" rel="noopener">{emojis[idx]} {link}</a>
      {/each}

    </div>

    <div class="navbar-end">

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href="/">🕹️ Time Killers</a>

        <div class="navbar-dropdown">
          <a class="navbar-item" href="/colorfill" rel="noopener">🌈 Color Fill</a>
          <hr class="navbar-divider" />
          <a class="navbar-item" href="/candychomper" rel="noopener">🍬 Candy Chomper</a>
        </div>
      </div>

      <a class="navbar-item" href="https://medium.com/@lineville" target="_blank" rel="noopener">
        <span class="icon is-medium">
          <i class="fab fa-medium" />
        </span>
        <span>Blog</span>
      </a>
      <a class="navbar-item" href="https://github.com/lineville/svelte-ts" target="_blank" rel="noopener">
        <span class="icon is-medium">
          <i class="fab fa-github" />
        </span>
        <span>GitHub</span>
      </a>
    </div>
  </div>
</nav>
