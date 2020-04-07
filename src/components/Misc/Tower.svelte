<script lang="ts">
  import Stack from '../utils/Stack'
  export let value: Stack<number>
  export let index: number
</script>

<span>Tower # {index}: {value.toString()}</span>
