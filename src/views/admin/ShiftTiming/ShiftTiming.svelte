<script>
  import { navigate } from 'svelte-routing';
  import Pagination from '../../../components/Pagination/Pagination.svelte';
  const edit1 = "../assets/img/icons8-edit-24.png";
  const view1 = "../assets/img/icons8-eye-24.png";
  export let color = "light";
  let shiftSelected = null;
  let showModal = false;
  let editModal = false;

  let shifts = [
    // Example shifts; replace with actual data as needed
    {
      id: 0,
      shiftName: 'Morning Shift',
      startTime: '06:00',
      endTime: '14:00',
      dateFrom: '2024-05-20',
      dateTo: '2024-05-20',
      recurrence: 'None',
      breaks: [{ start: '09:00', end: '09:15' }],
      location: 'Office',
      shiftType: 'Morning',
      customShiftType: '',
      notes: 'Regular morning shift',
    },
    {
      id: 1,
      shiftName: 'Evening Shift',
      startTime: '14:00',
      endTime: '22:00',
      dateFrom: '2024-05-20',
      dateTo: '2024-05-20',
      recurrence: 'None',
      breaks: [{ start: '17:00', end: '17:15' }],
      location: 'Office',
      shiftType: 'Evening',
      customShiftType: '',
      notes: 'Regular evening shift',
    },
  ];

  function deleteShift(id) {
    shifts = shifts.filter(shift => shift.id !== id);
  }

  function viewShift(id) {
    shiftSelected = shifts.find(shift => shift.id === id);
    showModal = true;
  }

  function openEditModal(id) {
    shiftSelected = shifts.find(shift => shift.id === id);
    editModal = true;
  }

  function closeModal() {
    showModal = false;
    editModal = false;
  }

  function navigateToAddShift() {
    navigate('/admin/addshift');
  }

  function saveEdit() {
    const index = shifts.findIndex(shift => shift.id === shiftSelected.id);
    if (index !== -1) {
      shifts[index] = { ...shiftSelected };
      closeModal();
    }
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
    shift.shiftName.toLowerCase().includes(searchQuery.toLowerCase())
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
  <div class="flex items-center mb-4">
    <input type="search" class="bg-gray-800 text-white rounded-lg px-4 py-2" placeholder="Search..." bind:value={searchQuery}>
    {#if searchQuery}
      <span class="ml-4 text-sm {searchResultColor}">{searchResultText}</span>
    {/if}
  </div>
  <div class="block w-full overflow-x-auto">
    <table class="items-center w-full bg-transparent border-collapse">
      <thead>
        <tr>
          <th><input type="checkbox" class="rounded" on:click={toggleSelectAll}></th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Shift Name/Title</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Start Time</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">End Time</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Date From</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Date To</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Location</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Shift Type</th>
          <th class="px-6 text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each displayedShifts as shift (shift.id)}
        <tr>
          <td><input type="checkbox" checked={selectedShifts.has(shift.id)} class="rounded" on:click={() => toggleSelection(shift.id)}></td>
          <td class='table-data font-bold text-blueGray-600 wrap-text'>{shift.shiftName}</td>
          <td class='table-data'>{shift.startTime}</td>
          <td class='table-data'>{shift.endTime}</td>
          <td class='table-data'>{shift.dateFrom}</td>
          <td class='table-data'>{shift.dateTo}</td>
          <td class='table-data'>{shift.location}</td>
          <td class='table-data'>{shift.shiftType === 'custom' ? shift.customShiftType : shift.shiftType}</td>
          <td class='table-data'>
            <div class="flex">
              <img src={edit1} alt="Edit" class="h-6 w-6 cursor-pointer" on:click={() => openEditModal(shift.id)} />
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <img src={view1} alt="View" class="h-6 w-6 cursor-pointer ml-2" on:click={() => viewShift(shift.id)} />
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
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4 mb-6">
                <h4 class="font-semibold text-lg text-blueGray-700">
                  General Information
                </h4>
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
              </div>
              <div class="w-full lg:w-6/12 px-4 mb-6">
                <h4 class="font-semibold text-lg text-blueGray-700">
                  Date Time Parameters
                </h4>
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
            </div>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4 mb-6">
                <h4 class="font-semibold text-lg text-blueGray-700">
                  Break Parameters
                </h4>
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
              </div>
              <div class="w-full lg:w-6/12 px-4 mb-6">
                <h4 class="font-semibold text-lg text-blueGray-700">
                  Notes/Description
                </h4>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="notes">
                    Notes:
                  </label>
                  <p>{shiftSelected.notes}</p>
                </div>
              </div>
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
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4 mb-6">
                <h4 class="font-semibold text-lg text-blueGray-700">
                  General Information
                </h4>
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
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                    <option value="Half Day">Half Day</option>
                    <option value="custom">Custom</option>
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
              </div>
              <div class="w-full lg:w-6/12 px-4 mb-6">
                <h4 class="font-semibold text-lg text-blueGray-700">
                  Date Time Parameters
                </h4>
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
            </div>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4 mb-6">
                <h4 class="font-semibold text-lg text-blueGray-700">
                  Break Parameters
                </h4>
                {#each shiftSelected.breaks as breakTime, index}
                  <div class="relative mb-3 flex items-center">
                    <div class="mr-2">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="break-start">
                        Break Start Time:
                      </label>
                      <input type="time" id="break-start" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={breakTime.start}>
                    </div>
                    <div class="mr-2">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="break-end">
                        Break End Time:
                      </label>
                      <input type="time" id="break-end" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={breakTime.end}>
                    </div>
                    <button class="text-red-600 text-xs" on:click={() => shiftSelected.breaks.splice(index, 1)}>Remove</button>
                  </div>
                {/each}
                <button class="bg-blue-600 text-white active:bg-blue-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" on:click={() => shiftSelected.breaks.push({ start: '', end: '' })}>
                  Add Break
                </button>
              </div>
              <div class="w-full lg:w-6/12 px-4 mb-6">
                <h4 class="font-semibold text-lg text-blueGray-700">
                  Notes/Description
                </h4>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="notes">
                    Notes:
                  </label>
                  <textarea id="notes" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={shiftSelected.notes}></textarea>
                </div>
              </div>
            </div>
            <div class="flex justify-end">
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