<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js';
    import { getAllAttendances, getAllDepartmentsApi } from '../../services/api'; // Adjust the import according to your project structure
  
    let chart;
  
    async function fetchAttendanceData() {
      const startDate = '2024-05-01'; // Example start date
      const endDate = '2024-05-31';   // Example end date
  
      try {
        const attendances = await getAllAttendances(startDate, endDate);
        const departments = await getAllDepartmentsApi();
        console.log('Attendance Data:', attendances);
        console.log('Department Data:', departments);
        processAbsenteeismData(attendances, departments);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
  
    function processAbsenteeismData(attendances, departments) {
      // Aggregate attendance data by department
      const departmentData = attendances.reduce((map, att) => {
        const departmentId = att.departmentId; // Assuming att.departmentId contains the department ID
        if (!map[departmentId]) {
          map[departmentId] = { daysAbsent: 0, totalWorkingDays: 0, employeeCount: 0 };
        }
        map[departmentId].daysAbsent += att.daysAbsent;
        map[departmentId].totalWorkingDays += att.totalWorkingDays;
        map[departmentId].employeeCount += 1;
        return map;
      }, {});
  
      // Calculate absenteeism rate for each department
      const absenteeismData = Object.keys(departmentData).map(departmentId => {
        const { daysAbsent, totalWorkingDays, employeeCount } = departmentData[departmentId];
        const department = departments.find(dept => dept.id === departmentId);
        return {
          department: department ? department.name : 'Unknown',
          absenteeismRate: (daysAbsent / (totalWorkingDays * employeeCount)) * 100
        };
      });
  
      console.log('Absenteeism Data:', absenteeismData);
  
      const labels = absenteeismData.map(d => d.department);
      const absenteeismRates = absenteeismData.map(d => d.absenteeismRate.toFixed(2)); // Ensuring the rate is correctly formatted
  
      renderChart(labels, absenteeismRates);
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
            label: 'Absenteeism Rate (%)',
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
            text: 'Absenteeism Rate',
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
                callback: function(value) { return value + '%' }
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Absenteeism Rate',
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
      fetchAttendanceData();
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
            Absenteeism Rate
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
