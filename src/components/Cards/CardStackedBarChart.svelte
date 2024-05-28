<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js';
  import { getAllLeavesApi } from '../../services/api'; // Adjust the path as needed

  export let startDate;
  export let endDate;
  let leaveData = [];
  let chart;

  $: if (startDate && endDate) {
    loadLeaveData();
  }

  async function loadLeaveData() {
    try {
      const response = await getAllLeavesApi(startDate, endDate);
      leaveData = response || [];
      processLeaveData(leaveData);
    } catch (error) {
      console.error('Failed to load leave data:', error);
    }
  }

  function processLeaveData(data) {
    const departments = {};
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    data.forEach(request => {
      if (request.status === 'approved') {  // Filter for approved requests
        const department = request.employee.department.title;
        const fromDate = new Date(request.fromDate);
        const month = fromDate.getMonth();

        if (!departments[department]) {
          departments[department] = Array(12).fill(0);
        }
        departments[department][month] += 1;
      }
    });

    const datasets = Object.keys(departments).map((department, index) => {
      const colors = ['#ed64a6', '#4c51bf', '#38b2ac', '#ecc94b', '#f6ad55']; // Add more colors if needed
      return {
        label: department,
        backgroundColor: colors[index % colors.length],
        borderColor: colors[index % colors.length],
        data: departments[department],
        fill: false,
        barThickness: 8
      };
    });

    renderChart(months, datasets);
  }

  function renderChart(labels, datasets) {
    const config = {
      type: 'bar',
      data: {
        labels,
        datasets
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: 'rgba(0,0,0,.4)',
          },
          align: 'end',
          position: 'bottom',
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Month',
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: 'rgba(33, 37, 41, 0.3)',
                zeroLineColor: 'rgba(33, 37, 41, 0.3)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              stacked: true,
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Number of Leaves',
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: 'rgba(33, 37, 41, 0.2)',
                zeroLineColor: 'rgba(33, 37, 41, 0.15)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    const ctx = document.getElementById('stacked-bar-chart').getContext('2d');
    if (chart) {
      chart.destroy();
    }
    chart = new Chart(ctx, config);
  }

  onMount(() => {
    loadLeaveData();
  });
</script>

<div
  class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
>
  <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full max-w-full flex-grow flex-1">
        <h6 class="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
          Leave Rates
        </h6>
        <h2 class="text-blueGray-700 text-xl font-semibold">
          Leave Rates Against Months for Each Department
        </h2>
      </div>
    </div>
  </div>
  <div class="p-4 flex-auto">
    <div class="relative h-350-px">
      <canvas id="stacked-bar-chart"></canvas>
    </div>
  </div>
</div>
