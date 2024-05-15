<script>
  import { navigate } from 'svelte-routing';
  import Pagination from '../../../components/Pagination/Pagination.svelte';
  const edit1 = "../assets/img/icons8-edit-24.png";
  const view1 = "../assets/img/icons8-eye-24.png";
  export let color = "light";

  let shifts = [
    { id: 0, description: 'Off Day', startTime: '00:00', endTime: '00:00', morningShift: false, eveningShift: false, nightShift: false },
    { id: 1, description: 'Morning Shift', startTime: '08:00', endTime: '16:00', morningShift: true, eveningShift: false, nightShift: false },
    { id: 2, description: 'Evening Shift', startTime: '16:00', endTime: '00:00', morningShift: false, eveningShift: true, nightShift: false },
    { id: 3, description: 'Night Shift', startTime: '00:00', endTime: '08:00', morningShift: false, eveningShift: false, nightShift: true },
    { id: 4, description: 'Full Day Shift', startTime: '08:00', endTime: '00:00', morningShift: true, eveningShift: true, nightShift: false },
    { id: 5, description: 'Part-Time Morning Shift', startTime: '08:00', endTime: '12:00', morningShift: true, eveningShift: false, nightShift: false },
    { id: 9, description: 'Weekend Night Shift', startTime: '00:00', endTime: '08:00', morningShift: false, eveningShift: false, nightShift: true },
    { id: 6, description: 'Part-Time Evening Shift', startTime: '16:00', endTime: '20:00', morningShift: false, eveningShift: true, nightShift: false },
    { id: 7, description: 'Late Night Shift', startTime: '00:00', endTime: '04:00', morningShift: false, eveningShift: false, nightShift: true },
    { id: 8, description: 'Weekend Morning Shift', startTime: '08:00', endTime: '12:00', morningShift: true, eveningShift: false, nightShift: false },
    { id: 10, description: 'Weekend Evening Shift', startTime: '16:00', endTime: '00:00', morningShift: false, eveningShift: true, nightShift: false },
    { id: 11, description: 'Weekend Full Day Shift', startTime: '08:00', endTime: '00:00', morningShift: true, eveningShift: true, nightShift: false },
    { id: 12, description: 'Late Morning Shift', startTime: '10:00', endTime: '14:00', morningShift: true, eveningShift: false, nightShift: false },
    { id: 13, description: 'Early Evening Shift', startTime: '14:00', endTime: '18:00', morningShift: false, eveningShift: true, nightShift: false },
    { id: 14, description: 'Overnight Shift', startTime: '20:00', endTime: '04:00', morningShift: false, eveningShift: false, nightShift: true },
    { id: 15, description: 'Extended Morning Shift', startTime: '06:00', endTime: '14:00', morningShift: true, eveningShift: false, nightShift: false },
    { id: 16, description: 'Extended Evening Shift', startTime: '12:00', endTime: '20:00', morningShift: false, eveningShift: true, nightShift: false },
    { id: 17, description: 'Weekend Overnight Shift', startTime: '20:00', endTime: '08:00', morningShift: false, eveningShift: false, nightShift: true },
    { id: 18, description: 'Holiday Morning Shift', startTime: '08:00', endTime: '12:00', morningShift: true, eveningShift: false, nightShift: false },
    { id: 19, description: 'Holiday Evening Shift', startTime: '16:00', endTime: '00:00', morningShift: false, eveningShift: true, nightShift: false },
    { id: 20, description: 'Holiday Full Day Shift', startTime: '08:00', endTime: '00:00', morningShift: true, eveningShift: true, nightShift: false }
  ];

  function deleteShift(id) {
    shifts = shifts.filter(shift => shift.id !== id);
  }

  function editShift(id) {
    // Edit shift logic here
  }

  function viewShift(id) {
    // View shift logic here
  }

  function navigateToAddShift() {
    navigate('/admin/addshift');
  }

  let selectedShifts = new Set();

  function toggleSelection(shiftId) {
    if (selectedShifts.has(shiftId)) {
      selectedShifts.delete(shiftId);
    } else {
      selectedShifts.add(shiftId);
    }
    selectedShifts = new Set(selectedShifts); // Force rerender
  }

  function toggleSelectAll() {
    if (selectedShifts.size === shifts.length) {
      selectedShifts.clear();
    } else {
      shifts.forEach(shift => selectedShifts.add(shift.id));
    }
    selectedShifts = new Set(selectedShifts); // Force rerender
  }

  function deleteSelectedShifts() {
    selectedShifts.forEach(id => deleteShift(id));
    selectedShifts.clear();
  }

  const shiftsPerPage = 5; // Adjust as needed
  let currentPage = 1;

  $: startIndex = (currentPage - 1) * shiftsPerPage;
  $: endIndex = Math.min(startIndex + shiftsPerPage, filteredShifts.length);
  $: filteredShifts = shifts.filter(shift => 
    shift.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  $: displayedShifts = filteredShifts.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(filteredShifts.length / shiftsPerPage);

  function handlePageChange(event) {
    currentPage = event.detail.pageNumber;
  }

  let searchQuery = '';

  $: searchResultText = searchQuery
    ? filteredShifts.length > 0
      ? `Rows Found: ${filteredShifts.length}`
      : "No Result Found"
    : '';
  $: searchResultColor = filteredShifts.length > 0 ? "text-blue-600 font-bold" : "text-red-600 font-bold";
</script>

<div class="relative min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <div class="relative w-full px-4 max-w-full flex-grow flex-1 flex justify-between items-center">
    <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
      Shift Timings
    </h3>
    <div class="flex space-x-4">
      <button class="bg-red-400 active:bg-red-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150" on:click={deleteSelectedShifts}>
        Delete
      </button>
      <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" on:click={navigateToAddShift}>
        Add Shift
      </button>
    </div>
  </div>
  <div class="flex items-center mb-4">
    <input type="search" class="bg-gray-800 text-white rounded-lg px-4 py-2" placeholder="Search..." bind:value={searchQuery}>
    {#if searchQuery}
      <span class="ml-4 text-sm {searchResultColor}">{searchResultText}</span>
    {/if}
  </div>
  <div class="block w-full overflow-x-auto">
    <table>
      <thead>
        <tr>
          <th><input type="checkbox" class="rounded" on:click={toggleSelectAll}></th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Description</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Start Time</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">End Time</th>
          <th class="px-6 text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Morning Shift</th>
          <th class="px-6 text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Evening Shift</th>
          <th class="px-6 text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Night Shift</th>
          <th class="px-6 text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each displayedShifts as shift (shift.id)}
        <tr>
          <td><input type="checkbox" checked={selectedShifts.has(shift.id)} class="rounded" on:click={() => toggleSelection(shift.id)}></td>
          <td class='table-data font-bold text-blueGray-600 wrap-text'>{shift.description}</td>
          <td class='table-data'>{shift.startTime}</td>
          <td class='table-data'>{shift.endTime}</td>
          <td class='table-data text-center'><input type="checkbox" disabled bind:checked={shift.morningShift} /></td>
          <td class='table-data text-center'><input type="checkbox" disabled bind:checked={shift.eveningShift}/></td>
          <td class='table-data text-center'><input type="checkbox" disabled bind:checked={shift.nightShift}/></td>
          <td class='table-data'>
            <div class="flex">
              <img src={edit1} alt="Edit" class="h-6 w-6 cursor-pointer" onclick={() => editShift(shift.id)} />
              <img src={view1} alt="View" class="h-6 w-6 cursor-pointer ml-2" onclick={() => viewShift(shift.id)} />
            </div>
          </td>
        </tr>
        {/each}
      </tbody>
    </table>
    <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
  </div>
</div>
