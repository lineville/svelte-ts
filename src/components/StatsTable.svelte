<script lang="ts">
  export let deaths : number;
  export let todayDeaths : number;
  export let todayCases : number;
  export let cases : number;
  export let recovered : number;
  export let active : number;
  export let critical : number;
  export let casesPerOneMillion : number;
  export let deathsPerOneMillion : number;
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
    <td>{deaths || "Loading..."}</td>
  </tr>
  <tr>
    <td>Deaths Today</td>
    <td>{todayDeaths || "Loading..."}</td>
  </tr>
  <tr>
    <td>Cases Today</td>
    <td>{todayCases || "Loading..."}</td>
  </tr>
  <tr>
    <td>Cases</td>
    <td>{cases || "Loading..."}</td>
  </tr>
  <tr>
    <td>Recovered</td>
    <td>{recovered || "Loading..."}</td>
  </tr>
  <tr>
    <td>Active</td>
    <td>{active || "Loading..."}</td>
  </tr>
  <tr>
    <td>Critical</td>
    <td>{critical || "Loading..."}</td>
  </tr>
  <tr>
    <td>Cases / Million</td>
    <td>{casesPerOneMillion || "Loading..."}</td>
  </tr>
  <tr>
    <td>Deaths / Million</td>
    <td>{deathsPerOneMillion || "Loading..."}</td>
  </tr>

</table>
