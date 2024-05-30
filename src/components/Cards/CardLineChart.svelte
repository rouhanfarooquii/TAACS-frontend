<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js';
  import { getAllAttendances } from '../../services/api'; // Adjust the import according to your project structure

  export let startDate;
  export let endDate;
  let attendanceData = [];
  let chart;

  $: if (startDate && endDate) {
    fetchAttendanceData();
  }

  async function fetchAttendanceData() {
    try {
      const attendances = await getAllAttendances(startDate, endDate);
      console.log('Attendance Data:', attendances);
      attendanceData = attendances.filter(record => record.attendance !== 'N/A'); // Filter out 'N/A' entries
      console.log('Filtered Attendance Data:', attendanceData);
      processAttendanceData(attendanceData);
    } catch (error) {
      console.error('Failed to fetch attendance data:', error);
    }
  }

  function processAttendanceData(data) {
    const dailyAttendance = {};

    data.forEach(record => {
      const date = record.date.split('T')[0]; // Assuming the date is in ISO format
      if (!dailyAttendance[date]) {
        dailyAttendance[date] = { present: 0, total: 0 };
      }
      dailyAttendance[date].total += 1;
      if (record.attendance === 'Present') {
        dailyAttendance[date].present += 1;
      }
    });

    console.log('Daily Attendance Data:', dailyAttendance);

    const allLabels = Object.keys(dailyAttendance).sort();
    const attendanceRates = allLabels.map(date => {
      const { present, total } = dailyAttendance[date];
      return (present / total) * 100;
    });

    console.log('All Chart Labels:', allLabels);
    console.log('Attendance Rates:', attendanceRates);

    // Filter labels to show a limited number of dates on the x-axis
    const step = Math.ceil(allLabels.length / 10); // Adjust the step to control the number of labels displayed
    const labels = allLabels.filter((label, index) => index % step === 0);

    renderChart(labels, attendanceRates);
  }

  function renderChart(labels, data) {
    const ctx = document.getElementById('line-chart').getContext('2d');
    if (chart) {
      chart.destroy();
    }
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Average Attendance Rate',
            backgroundColor: '#4c51bf',
            borderColor: '#4c51bf',
            data: data,
            fill: false
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: 'Attendance Rate Over Time',
          fontColor: 'black',
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
          xAxes: [
            {
              ticks: {
                fontColor: 'rgba(0,0,0,.7)',
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Date',
                fontColor: 'black',
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
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: 'rgba(0,0,0,.7)',
                beginAtZero: true,
                callback: function(value) { return value + '%' }
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Attendance Rate',
                fontColor: 'black',
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
            },
          ],
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
          Average Attendance Rate Over Time
        </h2>
      </div>
    </div>
  </div>
  <div class="p-4 flex-auto">
    <div class="relative h-350-px" style="width: 100%;">
      <canvas id="line-chart" style="width: 100%;"></canvas>
    </div>
  </div>
</div>
