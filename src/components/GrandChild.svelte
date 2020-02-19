<script lang="ts">
  import { count } from '../stores/counter.ts'
  let count_value

  const unsubscribe = count.subscribe(value => {
    count_value = value
  })
</script>

<hr />

<span>Total: {count_value}</span>
