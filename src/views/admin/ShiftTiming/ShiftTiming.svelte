<script>
  import { navigate } from 'svelte-routing';
  import Pagination from '../../../components/Pagination/Pagination.svelte';
  import { onMount } from 'svelte';
  import { getAllShiftTimingsApi,  updateShiftTimingApi, batchDeleteShiftTimingApi } from '../../../services/api';
  import Toast from '../../../components/Confirmation/Toast.svelte';

  const edit1 = "../assets/img/icons8-edit-24.png";
  const view1 = "../assets/img/icons8-eye-24.png";
  export let color = "light";
  let shiftSelected = null;
  let showModal = false;
  let editModal = false;

  let shifts = [];
  const shiftTypes = ["Morning", "Evening", "Night", "Half Day", "Afternoon", "custom"];

  let selectedShifts = new Set();
  let searchQuery = '';

  const shiftsPerPage = 5; 
  let currentPage = 1;

  let showToaster = false;
  let toasterMessage = '';
  let toasterType = '';

  function showToasterMessage(message, type) {
    toasterMessage = message;
    toasterType = type;
    showToaster = true;
    setTimeout(() => {
      showToaster = false;
    }, 3000); // Show toast for 3 seconds
  }

  onMount(async () => {
    await fetchShifts();
  });
  async function fetchShifts() {
  try {
    const rawShifts = await getAllShiftTimingsApi();
    shifts = rawShifts.map(shift => ({
      ...shift,
      shiftType: capitalizeFirstLetter(shift.shiftType)
    }));
    console.log(shifts);
  } catch (error) {
    console.error("Errorr fetching shifts:", error);
    shifts = []; // Fallback to an empty array in case of error
  }
}
 function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  async function updateShift(obj) {
    console.log(obj);
    try {
      const msg = await updateShiftTimingApi(obj);
      console.log(msg);
      await fetchShifts(); // Refresh the shift list
      showToasterMessage('Shift updated successfully!', 'success');
      closeModal(); // Close the modal after saving changes
    } catch (error) {
      showToasterMessage('An error occurred while updating the shift. Please try again.', 'error');
      console.error("Error updating shift:", error);
    }
  }

  function formatDateString(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Customize locale as needed, e.g., 'en-US'
}

function viewShift(shift) {
  shiftSelected = {
    shiftName: shift.shiftName,
    startTime: shift.startTime,
    endTime: shift.endTime,
    recurrence: shift.recurrence,
    breakStartTime: shift.breakStartTime,
    breakEndTime: shift.breakEndTime,
    shiftType: shift.shiftType,
    notes: shift.notes,
    dateFrom: formatDateString(shift.dateFrom),
    dateTo: formatDateString(shift.dateTo),
  };
  showModal = true;
  console.log('Shift selected for view:', shiftSelected);
}

  // function viewShift(shift) {
  //   shiftSelected = shift;
  //   showModal = true;
  //   console.log('Shift selected for view:', shiftSelected);
  // }

  

  function openEditModal(shift) {
    console.log(shift);
    shiftSelected = { 
      ...shift, 
      dateFrom: formatDate(shift.dateFrom),
      dateTo: formatDate(shift.dateTo),
    }; 
    // shiftSelected.breakTimings = formatBreakTimings(shift.breaks);
    editModal = true;
    console.log('Shift selected for edit:', shiftSelected);
  }

  function closeModal() {
    showModal = false;
    editModal = false;
  }

  function navigateToAddShift() {
    navigate('/admin/addshift');
  }

  function saveEdit() {
    updateShift(shiftSelected);
  }

  function parseBreakTimings(breakTimings) {
    return breakTimings.split(',').map(b => {
      const [start, end] = b.split('-').map(t => t.trim());
      return { start, end };
    });
  }

  function formatBreakTimings(breaks) {
    if (!breaks || breaks.length === 0) return '';
    return breaks.map(b => `${b.start} - ${b.end}`).join(', ');
  }

  function formatDate(date) {
    return new Date(date).toISOString().split('T')[0];
  }

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
      shifts.forEach(shift => selectedShifts.add(shift._id));
    }
    selectedShifts = new Set(selectedShifts); // Force rerender
  }

  async function deleteSelectedShifts() {
    let ids = [...selectedShifts];
    console.log(ids);

    try {
      const msg = await batchDeleteShiftTimingApi({ids: ids});
      console.log(msg);
      await fetchShifts();
      showToasterMessage('Shift deleted successfully!', 'success'); 
    } catch (error) {
      console.error("Error deleting shifts:", error);
      showToasterMessage('An error occurred while deleting the shift. Please try again.', 'error');
    }
  }

  $: startIndex = (currentPage - 1) * shiftsPerPage;
  $: endIndex = Math.min(startIndex + shiftsPerPage, filteredShifts.length);
  $: filteredShifts = shifts.filter(shift => 
    shift.shiftName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  $: displayedShifts = filteredShifts.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(filteredShifts.length / shiftsPerPage);

  function handlePageChange(event) {
    currentPage = event.detail.pageNumber;
  }

  $: searchResultText = searchQuery
    ? filteredShifts.length > 0
      ? `Rows Found: ${filteredShifts.length}`
      : "No Result Found"
    : '';
  $: searchResultColor = filteredShifts.length > 0 ? "text-blue-600 font-bold" : "text-red-600 font-bold";

</script>

<div class="relative min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <div class="flex justify-end mb-4">
    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
      <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
        Shift Timings
      </h3>
    </div>
    <button class="bg-red-600 text-white active:bg-red-800 uppercase font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={deleteSelectedShifts}>
      Delete
    </button>
    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" on:click={navigateToAddShift}>
      Add Shift
    </button>
  </div>
  <div class="flex justify-between">
    <div class="relative mb-3">
      <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Search..." bind:value={searchQuery} />
    </div>
  </div>
  <p class="text-sm {searchResultColor}">{searchResultText}</p>
  <div class="block w-full overflow-x-auto">
    <table class="items-center w-full bg-transparent border-collapse">
      <thead>
        <tr>
          <th class="bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            <input type="checkbox" class="rounded" on:click={toggleSelectAll}>
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Shift Name/Title</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Start Time</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">End Time</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Date From</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Date To</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Shift Type</th>
          <th class="px-6 text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each displayedShifts as shift (shift._id)}
        <tr>
          <td class="table-date">
            <input type="checkbox" checked={selectedShifts.has(shift._id)} class="rounded" on:click={() => toggleSelection(shift._id)}>
          </td>
          <td class='table-data font-bold text-blueGray-600 wrap-text'>{shift.shiftName}</td>
          <td class='table-data'>{shift.startTime}</td>
          <td class='table-data'>{shift.endTime}</td>
          <td class='table-data'>{formatDateString(shift.dateFrom)}</td>
          <td class='table-data'>{formatDateString(shift.dateTo)}</td>
          <td class='table-data'>{shift.shiftType === 'custom' ? shift.customShiftType : shift.shiftType}</td>
          <td class='table-data'>
            <div class="flex items-center">
              <i class="fas fa-edit mr-2 text-sm cursor-pointer" on:click={() => openEditModal(shift)}></i>
              <i class="fas fa-eye mr-2 text-sm cursor-pointer" on:click={() => viewShift(shift)}></i>
            </div>
          </td>
        </tr>
        {/each}
      </tbody>
    </table>
    <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
  </div>

  {#if showModal}
    <div class="modal">
      <div class="modal-content">
        <div class="rounded-t mb-0 px-4 py-10 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-blueGray-700">
                Shift Details
              </h3>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <div class="px-4 py-5 flex-auto">
            <div class="flex">
              <div class="w-full lg:w-6/12 px-4 mb-6">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="shift-name">
                    Shift Name:
                  </label>
                  <p>{shiftSelected.shiftName}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="shift-type">
                    Shift Type:
                  </label>
                  <p>{shiftSelected.shiftType === 'custom' ? shiftSelected.customShiftType : shiftSelected.shiftType}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="notes">
                    Notes:
                  </label>
                  <p>{shiftSelected.notes}</p>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="date-from">
                    Date From:
                  </label>
                  <p>{shiftSelected.dateFrom}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="date-to">
                    Date To:
                  </label>
                  <p>{shiftSelected.dateTo}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="start-time">
                    Start Time:
                  </label>
                  <p>{shiftSelected.startTime}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="end-time">
                    End Time:
                  </label>
                  <p>{shiftSelected.endTime}</p>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="start-time">
                    Break Start Time:
                  </label>
                  <p>{shiftSelected.breakStartTime}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="end-time">
                    Break End Time:
                  </label>
                  <p>{shiftSelected.breakEndTime}</p>
                </div>
              </div>
              <!-- <div class="w-full lg:w-6/12 px-4">
                {#each shiftSelected.breaks as breakTime}
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="break-start">
                      Break Start Time:
                    </label>
                    <p>{breakTime.start}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="break-end">
                      Break End Time:
                    </label>
                    <p>{breakTime.end}</p>
                  </div>
                {/each}
              </div> -->
            </div> 
            <div class="flex justify-end">
              <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={closeModal}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  {#if editModal}
    <div class="modal">
      <div class="modal-content">
        <div class="rounded-t mb-0 px-4 py-10 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-blueGray-700">
                Edit Shift
              </h3>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <div class="px-4 py-5 flex-auto">
            <div class="flex">
              <div class="w-full lg:w-6/12 px-4 mb-6">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="shift-name">
                    Shift Name:
                  </label>
                  <input type="text" id="shift-name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={shiftSelected.shiftName}>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="shift-type">
                    Shift Type:
                  </label>
                  <select id="shift-type" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={shiftSelected.shiftType}>
                    <option value="" disabled>Select Shift Type</option>
                    {#each shiftTypes as shiftType}
                      <option value={shiftType}>{shiftType}</option>
                    {/each}
                  </select>
                </div>
                {#if shiftSelected.shiftType === 'custom'}
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="custom-shift-type">
                      Custom Shift Type:
                    </label>
                    <input type="text" id="custom-shift-type" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={shiftSelected.customShiftType}>
                  </div>
                {/if}
                <div class="relative mb-2">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="notes">
                    Notes:
                  </label>
                  <textarea id="notes" class="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={shiftSelected.notes}></textarea>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="date-from">
                    Date From:
                  </label>
                  <input type="date" id="date-from" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={shiftSelected.dateFrom}>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="date-to">
                    Date To:
                  </label>
                  <input type="date" id="date-to" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={shiftSelected.dateTo}>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="start-time">
                    Start Time:
                  </label>
                  <input type="time" id="start-time" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={shiftSelected.startTime}>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="end-time">
                    End Time:
                  </label>
                  <input type="time" id="end-time" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={shiftSelected.endTime}>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="break-start">
                    Break Start Time:
                  </label>
                  <input type="time" id="break-start" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={shiftSelected.breakStartTime}>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="break-end">
                    Break End Time:
                  </label>
                  <input type="time" id="break-end" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={shiftSelected.breakEndTime}>
                </div>
              </div>
            </div>
            <div class="flex justify-end mt-4">
              <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={saveEdit}>
                Save
              </button>
              <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
