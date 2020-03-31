<script lang="ts">
  export let value: number = 0;
  export let step: number = 1;
</script>

<div>
  <slot>Default Counter</slot>
  <div>
    {value}
    <button class="btn btn-primary" on:click={() => (value += step)}>+</button>
    <button class="uk-button uk-button-secondary" on:click={() => (value -= step)}>-</button>
  </div>
</div>
