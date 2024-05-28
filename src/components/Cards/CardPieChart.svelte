<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js';
    import { getAllAttendances, getAllDepartmentsApi, getAllEmployeesApi } from '../../services/api'; // Adjust the import according to your project structure
  
    let attendanceData = [];
    let departments = [];
    let employees = [];
    let chart;
  
    async function fetchData() {
      const startDate = '2024-05-01'; // Example start date
      const endDate = '2024-05-31';   // Example end date
  
      try {
        const [attendances, departmentsData, employeesData] = await Promise.all([
          getAllAttendances(startDate, endDate),
          getAllDepartmentsApi(),
          getAllEmployeesApi()
        ]);
        console.log('Attendance Data:', attendances); // Debugging: log the fetched data
        console.log('Departments Data:', departmentsData); // Debugging: log the fetched data
        console.log('Employees Data:', employeesData); // Debugging: log the fetched data
  
        attendanceData = attendances;
        departments = departmentsData;
        employees = employeesData;
        processAttendanceData(attendanceData, departments, employees);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
  
    function processAttendanceData(attendanceData, departments, employees) {
      const departmentData = {};
  
      // Initialize department data structure
      departments.forEach(department => {
        departmentData[department.name] = { present: 0, late: 0, absent: 0 };
      });
  
      // Populate department data with attendance records
      attendanceData.forEach(record => {
        const employee = employees.find(emp => emp.id === record.employeeId);
        if (employee && departmentData[employee.department]) {
          const department = employee.department;
          const status = record.status;
          if (status === 'Present') {
            departmentData[department].present += 1;
          } else if (status === 'Late') {
            departmentData[department].late += 1;
          } else if (status === 'Absent') {
            departmentData[department].absent += 1;
          }
        } else {
          console.warn(`Employee or department not found for record:`, record); // Debugging: Warn if department is not found
        }
      });
  
      console.log('Processed Department Data:', departmentData); // Debugging: log the processed department data
  
      const labels = Object.keys(departmentData);
      const dataPresent = labels.map(dept => departmentData[dept].present);
      const dataLate = labels.map(dept => departmentData[dept].late);
      const dataAbsent = labels.map(dept => departmentData[dept].absent);
  
      renderChart(labels, dataPresent, dataLate, dataAbsent);
    }
  
    function renderChart(labels, dataPresent, dataLate, dataAbsent) {
      const ctx = document.getElementById('pie-chart').getContext('2d');
      if (chart) {
        chart.destroy();
      }
      chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Present',
            data: dataPresent,
            backgroundColor: '#4caf50',
            borderColor: '#4caf50',
            fill: false
          }, {
            label: 'Late',
            data: dataLate,
            backgroundColor: '#ff9800',
            borderColor: '#ff9800',
            fill: false
          }, {
            label: 'Absent',
            data: dataAbsent,
            backgroundColor: '#f44336',
            borderColor: '#f44336',
            fill: false
          }]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: 'Employee Attendance Summary',
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
          }
        },
      });
    }
  
    onMount(() => {
      fetchData();
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
      <div class="relative h-350-px" style="width: 100%;">
        <canvas id="pie-chart" style="width: 100%;"></canvas>
      </div>
    </div>
  </div>
  