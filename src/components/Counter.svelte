<script lang="ts">
  // export let value: number = 0
  import { count } from '../stores/counter.ts'
  export let step: number = 1
  export let localValue: number = 0
</script>

<div>
  <slot>Default Counter</slot>
  <div>
    {localValue}
    <button
      on:click={() => {
        localValue += step
        count.update(n => n + step)
      }}>
      Add
    </button>
    <button
      on:click={() => {
        localValue -= step
        count.update(n => n - step)
      }}>
      Subtract
    </button>
  </div>
</div>
