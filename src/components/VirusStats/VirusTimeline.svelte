<script lang="ts">
  import { onMount } from 'svelte'
  import Chart from 'chart.js'

  const apiURL = 'https://pomber.github.io/covid19/timeseries.json'

  let canvas: any
  let chart: any
  let data: any = {}
  let dates: string[] = []
  let countries: string[] = []
  let selectedMonths: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  let threshold = 500

  const createDataSet = (
    country: string,
  ): { label: string; backgroundColor: string; borderColor: string; data: any[] } => {
    let randColor = '#' + ((Math.random() * 0xffffff) << 0).toString(16)
    let result = { label: country, backgroundColor: randColor, borderColor: randColor, fill: false, data: [] }
    result.data = data[country]
      .filter((day: any) => shouldInclude(day, selectedMonths))
      .map((day: any) => ({ x: day.date, y: day.deaths }))
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
          .filter(country => totalDeaths(country) >= threshold)
          .map(country => createDataSet(country)),
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          text: 'Chart.js Time Scale',
        },
        // responsive: true,
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
              // ticks: {
              //   max: 7000,
              // },
              scaleLabel: {
                display: true,
                labelString: 'Deaths',
              },
            },
          ],
        },
      },
    })
  }

  const refreshGrid = () => {
    chart = generateChart()
  }

  onMount(async () => {
    console.log('Virus Timeline Mounted')
    try {
      let result = await fetch(apiURL)
      data = await result.json()
      dates = data[Object.keys(data)[0]].map((dataPoint: any) => dataPoint.date)
      countries = Object.keys(data)
        .sort((a, b) => totalDeaths(b) - totalDeaths(a))
        .slice(0, 10)
    } catch (e) {
      console.error('error fetching timeline data', e)
    } finally {
      chart = generateChart()
    }
  })
</script>

<div>
  <h3>Timeline</h3>
  <p>Note: Only displaying countries with at least {threshold} total deaths.</p>
  <input type="number" bind:value={threshold} />
  <button class="btn btn-primary" on:click={refreshGrid}>Refresh Chart</button>

  <canvas id="timelineChart" bind:this={canvas} />

</div>
