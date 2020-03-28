<script lang="ts">
  // export let data = [];

  export let deaths: number;
  export let todayDeaths: number;
  export let todayCases: number;
  export let cases: number;
  export let active: number;
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
    <td>{deaths || 'Loading...'}</td>
  </tr>
  <tr>
    <td>Deaths Today</td>
    <td>{todayDeaths !== undefined ? todayDeaths : 'Loading...'}</td>
  </tr>
  <tr>
    <td>Cases Today</td>
    <td>{todayCases !== undefined ? todayCases : 'Loading...'}</td>
  </tr>
  <tr>
    <td>Cases</td>
    <td>{cases || 'Loading...'}</td>
  </tr>
  <tr>
    <td>Active</td>
    <td>{active || 'Loading...'}</td>
  </tr>

</table>
