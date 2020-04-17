<script lang="ts">
  import { fly } from 'svelte/transition'
  export let cards = []
  export let visible = true
</script>

<style>
  li {
    display: inline-block;
    margin: 5px 5px 5px 5px;
  }
</style>

<ul>
  {#each cards as card, idx}
    <li key={idx} transition:fly={{ x: (idx === 0 ? -1 : 1) * 500, duration: 500 }}>
      <div class="card">
        <div class="card-content">
          <p class="title">{visible ? `${card.suite} ${card.name} ${card.suite}` : '?????'}</p>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            {#if visible}
              <span>{card.value} {card.optionalValue ? 'or ' + card.optionalValue : ''}</span>
            {:else}
              <span>❤️ ♦️ ♣️ ♠️</span>
            {/if}
          </p>
        </footer>
      </div>
    </li>
  {/each}
</ul>
