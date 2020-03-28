<script lang="ts">
  export let deaths = 0;
  export let todayDeaths = 0;
  export let todayCases = 0;
  export let cases = 0;
  export let active = 0;
</script>

<style>
  tr {
    text-align: left;
  }

  td {
    border: 1px solid #ddd;
    padding: 8px;
  }
</style>

<table align="center">
  <tr>
    <td>Deaths</td>
    <td>{deaths}</td>
  </tr>
  <tr>
    <td>Deaths Today</td>
    <td>{todayDeaths}</td>
  </tr>
  <tr>
    <td>Cases Today</td>
    <td>{todayCases}</td>
  </tr>
  <tr>
    <td>Cases</td>
    <td>{cases}</td>
  </tr>
  <tr>
    <td>Active</td>
    <td>{active}</td>
  </tr>

</table>
