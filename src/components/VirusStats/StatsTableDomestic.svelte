<script lang="ts">
  export let deaths = 0
  export let todayDeaths = 0
  export let todayCases = 0
  export let cases = 0
  export let active = 0

  const cleanData = (value: any): number => {
    return value === null || value === undefined ? 0 : value
  }
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
    <td>{cleanData(deaths)}</td>
  </tr>
  <tr>
    <td>Deaths Today</td>
    <td>{cleanData(todayDeaths)}</td>
  </tr>
  <tr>
    <td>Cases Today</td>
    <td>{cleanData(todayCases)}</td>
  </tr>
  <tr>
    <td>Cases</td>
    <td>{cleanData(cases)}</td>
  </tr>
  <tr>
    <td>Active</td>
    <td>{cleanData(active)}</td>
  </tr>

</table>
