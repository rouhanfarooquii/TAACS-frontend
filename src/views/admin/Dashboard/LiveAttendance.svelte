<script>
  import { onMount, onDestroy } from 'svelte';
  import { getAllAttendances } from '../../../services/api'; // Adjust the import according to your project structure
  import Pagination from "../../../components/Pagination/Pagination.svelte";

  export let color = "light";
  let attendanceData = [];
  let pollInterval;

  function fixImagePath(imagePath) {
    return imagePath.replace(/\\/g, '/'); // Replace all backslashes with forward slashes
  }

  async function fetchData() {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    try {
      let data = await getAllAttendances(currentDate, currentDate);
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
    pollInterval = setInterval(fetchData, 60000); // Poll every 60 seconds

    return () => {
      clearInterval(pollInterval);
    };
  });

  onDestroy(() => {
    clearInterval(pollInterval);
  });

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
      <input type="checkbox" id="showImage" name="showImage" class="mr-4">
      <label for="showImage" class="font-semibold mr-4">Show Image in Live Transactions</label>
      <button
        class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        type="button"
      >
        Save
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
            DateTime
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Status
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Verification Type
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Device
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Time Zone
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Finger Used 
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Status From Device
          </th>
        </tr>
      </thead>
      <tbody>
        {#each attendanceData as record}
          <tr>
            <td class="table-data text-blueGray-600 text-xs">
              <img src={record.imagePath || 'placeholder.jpg'} alt="Employee Photo" class="w-8 h-8 rounded-full"/>
            </td>
            <td class="table-data text-blueGray-600 text-xs" title={record.employee.employeeID}>{record.employee.employeeID}</td>
            <td class="table-data font-bold text-blueGray-600 text-xs" title={record.employee.name}>{record.employee.name}</td>
            <td class="table-data text-blueGray-600 text-xs" title={record.date}>{new Date(record.date).toLocaleString()}</td>
            <td class="table-data text-blueGray-600 text-xs" title={record.attendance}>{record.attendance}</td>
            <td class="table-data text-blueGray-600 text-xs" title={record.device}>{record.device}</td>
            <td class="table-data text-blueGray-600 text-xs" title={record.employee.fingerIndex1}>{record.employee.fingerIndex1}</td>
            <td class="table-data text-blueGray-600 text-xs" title={record.statusFromDevice}>{record.statusFromDevice}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
