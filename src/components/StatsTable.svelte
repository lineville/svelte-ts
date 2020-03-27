<script lang="ts">
  export let deaths;
  export let todayDeaths;
  export let todayCases;
  export let cases;
  export let recovered;
  export let active;
  export let critical;
  export let casesPerOneMillion;
  export let deathsPerOneMillion;
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
    <td>Recovered</td>
    <td>{recovered}</td>
  </tr>
  <tr>
    <td>Active</td>
    <td>{active}</td>
  </tr>
  <tr>
    <td>Critical</td>
    <td>{critical}</td>
  </tr>
  <tr>
    <td>Cases / Million</td>
    <td>{casesPerOneMillion}</td>
  </tr>
  <tr>
    <td>Deaths / Million</td>
    <td>{deathsPerOneMillion}</td>
  </tr>

</table>
