<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js';
  import { getAllAttendances } from '../../services/api'; // Adjust the import according to your project structure

  let attendanceData = [];
  let mainChart, drillDownChart;
  export let startDate;
  export let endDate;

  $: if (startDate && endDate) {
    fetchData();
  }

  async function fetchData() {
    try {
      attendanceData = await getAllAttendances(startDate, endDate);
      processMainChartData(attendanceData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  function processMainChartData(attendanceData) {
    const departmentCounts = {};

    // Count employees in each department, ignoring entries with "N/A"
    attendanceData.forEach(record => {
      if (record.attendance !== 'N/A') {
        const department = record.employee.department.title;
        if (!departmentCounts[department]) {
          departmentCounts[department] = 0;
        }
        departmentCounts[department] += 1;
      }
    });

    const labels = Object.keys(departmentCounts);
    const data = Object.values(departmentCounts);

    renderMainChart(labels, data);
  }

  function renderMainChart(labels, data) {
    const ctx = document.getElementById('main-chart').getContext('2d');
    if (mainChart) {
      mainChart.destroy();
    }
    mainChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#3b3eac', '#0099c6', '#dd4477', '#66aa00', '#b82e2e'],
        }]
      },
      options: {
        responsive: true,
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0]._index;
            const department = labels[index];
            drillDown(department);
          }
        },
        title: {
          display: true,
          text: 'Number of Employees by Department'
        }
      }
    });
  }

  function drillDown(department) {
    const departmentAttendance = attendanceData.filter(att => att.employee.department.title === department && att.attendance !== 'N/A');

    const statusCounts = { Present: 0, Late: 0, Absent: 0 };
    departmentAttendance.forEach(record => {
      const status = record.attendance;
      if (status === 'Present') {
        statusCounts.Present += 1;
      } else if (status === 'Late') {
        statusCounts.Late += 1;
      } else if (status === 'Absent') {
        statusCounts.Absent += 1;
      }
    });

    const labels = Object.keys(statusCounts);
    const data = Object.values(statusCounts);

    renderDrillDownChart(department, labels, data);
  }

  function renderDrillDownChart(department, labels, data) {
    const ctx = document.getElementById('drilldown-chart').getContext('2d');
    if (drillDownChart) {
      drillDownChart.destroy();
    }
    drillDownChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['#3366cc', '#ff9900', '#dc3912'],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: `Attendance Breakdown for ${department}`
        }
      }
    });
  }

  onMount(() => {
    if (startDate && endDate) {
      fetchData();
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
          Employee Attendance Summary
        </h2>
      </div>
    </div>
  </div>
  <div class="p-4 flex-auto">
    <div class="relative h-400-px" style="width: 100%;">
      <canvas id="main-chart" style="width: 100%; height: 100%;"></canvas>
    </div>
    <div class="relative h-400-px" style="width: 100%;">
      <canvas id="drilldown-chart" style="width: 100%; height: 100%;"></canvas>
    </div>
  </div>
</div>
