<script>
  import { onMount, onDestroy } from 'svelte';
  import { getAllAttendances } from '../../../services/api'; 
  import Pagination from "../../../components/Pagination/Pagination.svelte";

  export let color = "light";
  let attendanceData = [];
  let pollInterval;

  function fixImagePath(imagePath) {
    return imagePath.replace(/\\/g, '/'); // Replace all backslashes with forward slashes
  }

  async function fetchData() {
    // const currentDate = new Date().toISOString().split('T')[0]
    const currentDate = new Date('2024-05-28')

    try {
      let data = await getAllAttendances(currentDate, currentDate);
      // console.log(data)
      // return;
      // Fix the image paths
      attendanceData = data.map(record => {
        if (record.imagePath) {
          record.imagePath = fixImagePath(record.imagePath);
        }
        return record;
      });
      console.log('Attendance Data:', attendanceData);
    } catch (error) {
      console.error('Failed to fetch attendance data:', error);
    }
  }

  onMount(() => {
    fetchData();
    pollInterval = setInterval(fetchData, 15000); // Poll every 15 seconds

    return () => {
      clearInterval(pollInterval);
    };
  });

  onDestroy(() => {
    clearInterval(pollInterval);
  });

  function handleRefresh() {
    console.log("Refresh button clicked");
    fetchData(); 
  }

  function handlePageChange(event) {
    console.log("Received page change:", event.detail.pageNumber); // Confirm event reception
    currentPage = event.detail.pageNumber;
  }
</script>


<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}">
  <div class="rounded-t mb-0 px-4 py-10 border-0">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full px-4 max-w-full flex-grow flex-1">
        <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
          Live Data
        </h3>
      </div>
      <button
        class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        type="button"
        on:click={handleRefresh}
      >
        Refresh
      </button>
    </div>
  </div>
  <div class="block w-full overflow-x-auto">
    <table class="items-center w-full bg-transparent border-collapse">
      <thead>
        <tr>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Photo
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            ID                               
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Name
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Date
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {#each attendanceData as record}
          <tr>
            <td class="table-data text-blueGray-600 text-xs">
              <img src={record.photo || 'placeholder.jpg'} alt="Employee Photo" class="w-8 h-8 rounded-full"/>
            </td>
            <td class="table-data text-blueGray-600 text-xs" title={record.employee.employeeID}>{record.employee.employeeID}</td>
            <td class="table-data font-bold text-blueGray-600 text-xs" title={record.employee.name}>{record.employee.name}</td>
            <td class="table-data text-blueGray-600 text-xs" title={record.date}>{record.date}</td>
            <td class="table-data text-blueGray-600 text-xs" title={record.attendance}>{record.attendance}</td>

          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>