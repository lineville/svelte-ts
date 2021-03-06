<script lang="ts">
  import { onMount } from 'svelte'
  import Chart from 'chart.js'

  const apiURL = 'https://pomber.github.io/covid19/timeseries.json'
  const yAxesOptions = ['deaths', 'confirmed', 'recovered']

  let canvas: any
  let chart: any
  let data: any = {}
  let selectedMonths: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  let threshold = 1000
  let dataSelection = 'deaths'

  const createDataSet = (
    country: string,
  ): { label: string; backgroundColor: string; borderColor: string; data: any[] } => {
    let randColor = '#' + ((Math.random() * 0xffffff) << 0).toString(16)
    let result = { label: country, backgroundColor: randColor, borderColor: randColor, fill: false, data: [] }
    result.data = data[country]
      .filter((day: any) => shouldInclude(day, selectedMonths))
      .map((day: any) => ({ x: day.date, y: day[dataSelection] }))
    return result
  }

  const shouldInclude = ({ date }: any, validMonths: Array<number>): boolean => {
    return validMonths.includes(parseInt(date.split('-')[1]))
  }

  const totalDeaths = (country: string): number => {
    const days = data[country]
    return days[days.length - 1].deaths
  }

  const generateChart = (): Chart => {
    const ctx = canvas.getContext('2d')

    return new Chart(ctx, {
      type: 'line',
      data: {
        datasets: Object.keys(data)
          .filter((country) => totalDeaths(country) >= threshold)
          .map((country) => createDataSet(country)),
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          text: 'Chart.js Time Scale',
        },
        responsive: true,
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                parser: 'YYYY MM DD',
                tooltipFormat: 'YYYY MM DD',
              },
              scaleLabel: {
                display: true,
                labelString: 'Date',
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: dataSelection,
              },
            },
          ],
        },
      },
    })
  }

  const refreshGrid = () => {
    chart.destroy()
    chart = generateChart()
  }

  onMount(async () => {
    try {
      let result = await fetch(apiURL)
      data = await result.json()
    } catch (e) {
      console.error('error fetching timeline data', e)
    } finally {
      chart = generateChart()
    }
  })
</script>

<style>
  label {
    /* Hack to center the form */
    padding-left: 25vw;
  }
</style>

<div>
  <h1>Timeline</h1>

  <div class="field is-grouped is-grouped-centered">
    <div class="field-label"><label for="threshold" class="label">Threshold</label></div>
    <div class="field-body">
      <div class="field is-narrow">
        <p class="control"><input class="input is-info" type="number" bind:value={threshold} /></p>
      </div>
      <div class="field has-addons">
        <div class="control">
          <div class="select">
            <select bind:value={dataSelection}>
              {#each yAxesOptions as dataSelection}
                <option>{dataSelection}</option>
              {/each}
            </select>
          </div>
        </div>
        <div class="control">
          <button type="submit" class="button is-primary" on:click={refreshGrid}>Refresh Chart</button>
        </div>
      </div>
    </div>
  </div>

  <h2>Only displaying countries with at least {threshold} total {dataSelection}</h2>

  <!-- CHART -->
  <div class="chart-container" style="position: relative; height:90vh; width:95vw">
    <canvas id="timelineChart" bind:this={canvas} />
  </div>
</div>
