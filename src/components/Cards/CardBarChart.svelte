<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js';
  import { getAllAttendances } from '../../services/api'; // Adjust the import according to your project structure

  let chart;
  export let startDate;
  export let endDate;

  $: if (startDate && endDate) {
    fetchAttendanceData();
  }

  async function fetchAttendanceData() {
    try {
      const attendances = await getAllAttendances(startDate, endDate);
      processAbsenteeismData(attendances);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  function processAbsenteeismData(attendances) {

    // Aggregate attendance data by department, filtering for absences
    const departmentData = attendances.reduce((map, att) => {
      
      const department = att.employee.department.title || 'Unknown';

      if (!map[department]) {
        map[department] = { daysAbsent: 0 };
      }

      if (att.attendance === 'Absent') { // Correctly check the attendance status
        map[department].daysAbsent += 1;
      }

      return map;
    }, {});

    const labels = Object.keys(departmentData);
    const absentsData = Object.values(departmentData).map(d => d.daysAbsent);

    renderChart(labels, absentsData);
  }

  function renderChart(labels, data) {
    const ctx = document.getElementById('bar-chart').getContext('2d');
    if (chart) {
      chart.destroy();
    }
    
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Absents',
          backgroundColor: '#4c51bf',
          borderColor: '#4c51bf',
          data: data,
          fill: false
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: 'Number of Absents',
          fontColor: 'white',
        },
        legend: {
          labels: {
            fontColor: 'rgba(0,0,0,.7)',
          },
          align: 'end',
          position: 'bottom',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          xAxes: [{
            ticks: {
              fontColor: 'rgba(0,0,0,.7)',
            },
            display: true,
            scaleLabel: {
              display: false,
              labelString: 'Department',
              fontColor: 'white',
            },
            gridLines: {
              display: false,
              borderDash: [2],
              borderDashOffset: [2],
              color: 'rgba(33, 37, 41, 0.3)',
              zeroLineColor: 'rgba(0, 0, 0, 0)',
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          }],
          yAxes: [{
            ticks: {
              fontColor: 'rgba(0,0,0,.7)',
              beginAtZero: true,
              callback: function(value) { return Math.floor(value); } // Ensure whole numbers
            },
            display: true,
            scaleLabel: {
              display: false,
              labelString: 'Number of Absents',
              fontColor: 'white',
            },
            gridLines: {
              borderDash: [3],
              borderDashOffset: [3],
              drawBorder: false,
              color: 'rgba(33, 37, 41, 0.2)',
              zeroLineColor: 'rgba(33, 37, 41, 0)',
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          }],
        },
      },
    });
  }

  onMount(() => {
    if (startDate && endDate) {
      fetchAttendanceData();
    }
  });
</script>

<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
  <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full max-w-full flex-grow flex-1">
        <h6 class="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
          Overview
        </h6>
        <h2 class="text-blueGray-700 text-xl font-semibold">
          Number of Absentees
        </h2>
      </div>
    </div>
  </div>
  <div class="p-4 flex-auto">
    <div class="relative h-350-px" style="width: 100%;">
      <canvas id="bar-chart" style="width: 100%;"></canvas>
    </div>
  </div>
</div>
