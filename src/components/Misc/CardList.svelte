<script lang="ts">
  import { fly } from 'svelte/transition'
  export let cards = []
  export let visible = true
</script>

<style>
  li {
    display: inline-block;
    margin: 5px 5px 30px 5px;
  }
</style>

<ul>
  {#each cards as card, idx}
    <li key={idx} transition:fly={{ x: (idx === 0 ? -1 : 1) * 500, duration: 1000 }}>
      <div class="card">
        <div class="card-image">
          <figure class="image is-96x96">
            {#if visible}
              <img src={`/images/${card}.jpg`} alt="playing card" />
            {:else}
              <img src="/images/Gray_back.jpg" alt="playing card" />
            {/if}
          </figure>
        </div>
      </div>
    </li>
  {/each}
</ul>
