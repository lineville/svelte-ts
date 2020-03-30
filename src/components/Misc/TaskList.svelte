<script lang="ts">
  let tasks = [];
  let currentUser: string;

</script>

<div id="tasklist">
  <p>User Id: {currentUser}</p>
  {#each tasks as task}
    <li>{task.description}</li>
  {/each}
</div>
