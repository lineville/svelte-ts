<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import { fly } from 'svelte/transition'
  import { sineInOut } from 'svelte/easing'
  export let cards = new Array<string>()
  export let visible = true
  const dispatch = createEventDispatcher()
</script>

<style>
  li {
    display: inline-block;
    margin: 5px 5px 30px 5px;
  }
</style>

{#each cards as card, idx (card + idx)}
  <li
    in:fly={{ x: (idx === 0 ? -1 : 1) * 2000, y: 0, easing: sineInOut, duration: 500, delay: 300, opacity: 0 }}
    out:fly={{ x: -2000, y: 0, easing: sineInOut, duration: 800, delay: 0, opacity: 0 }}
    on:outroend={() => dispatch('gone', { card: card })}>
    <div class="card">
      <div class="card-image">
        <figure class="image is-96x96">
          {#if visible || idx === 0}
            <img src={`/images/${card}.jpg`} alt="playing card" />
          {:else}<img src="/images/Gray_back.jpg" alt="playing card" />{/if}
        </figure>
      </div>
    </div>
  </li>
{/each}
