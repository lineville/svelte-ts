<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js';

  let canvas: any;
  let myChart: any;
  let data: any = {};
  let dates: string[] = [];
  let selectedMonths: number[] = [2, 3];
  let threshold = 100;
  const apiURL = 'https://pomber.github.io/covid19/timeseries.json';

  const createDataSet = (
    country: string,
  ): { label: string; backgroundColor: string; borderColor: string; data: any[] } => {
    let randColor = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
    let result = { label: country, backgroundColor: randColor, borderColor: randColor, fill: false, data: [] };
    result.data = data[country]
      .filter((day: any) => shouldInclude(day, selectedMonths))
      .map((day: any) => ({ x: day.date, y: day.deaths }));
    console.log(data[country]);
    return result;
  };

  const shouldInclude = ({ date }: any, validMonths: Array<number>): boolean => {
    return validMonths.includes(parseInt(date.split('-')[1]));
  };

  const totalDeaths = (country: string): number => {
    let total = 0;
    data[country].forEach((day: any) => {
      total += day.deaths;
    });
    return total;
  };

  const generateChart = (ctx: any): Chart => {
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
    });
  };

  onMount(async () => {
    console.log('Virus Timeline Mounted');
    try {
      let result = await fetch(apiURL);
      data = await result.json();
      dates = data[Object.keys(data)[0]].map((dataPoint: any) => dataPoint.date);
    } catch (e) {
      console.error('error fetching timeline data', e);
    } finally {
      const ctx = canvas.getContext('2d');
      myChart = generateChart(ctx);
    }
  });
</script>

<div>
  <h3>Timeline</h3>
  <p>Note: Only displaying countries with at least {threshold} total deaths.</p>

  <canvas id="timelineChart" bind:this={canvas} />

</div>
