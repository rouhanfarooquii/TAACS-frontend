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
    { id: 0, description: 'Off Day', startTime: '00:00', endTime: '00:00', morningShift: false, eveningShift: false, nightShift: false, halfDayShift: false,
        shiftCode: 'OFF', remarks: 'Rest day', selectedShiftType: 'Off', allowArrivalTime: '', arrivalFinishTime: '', startTime1: '00:00', maxHour: '', endTime1: '00:00', minHours1: '',
        lateTime: '', totalWorkingHours: '0', earlyGoingMinHrs: '', minHours: '0', earlyOverTime: '0', generalOverTime: '0', timeBaseShift: false, hourBaseShift: true,
        startTime2: '', endTime2: '', deductable: true, totalBreakTime: '0', maxShiftHours: '0', maxShiftOutTime: '00:00', maxOverTimeHours: '0', textileMaxOutTime: '00:00' },

    { id: 1, description: 'Morning Shift', startTime: '06:00', endTime: '14:00', morningShift: true, eveningShift: false, nightShift: false, halfDayShift: false,
        shiftCode: 'MORN', remarks: '', selectedShiftType: 'Morning', allowArrivalTime: '05:45', arrivalFinishTime: '06:15', startTime1: '06:00', maxHour: '8', endTime1: '14:00', minHours1: '4',
        lateTime: '00:15', totalWorkingHours: '8', earlyGoingMinHrs: '2', minHours: '4', earlyOverTime: '0.5', generalOverTime: '2', timeBaseShift: true, hourBaseShift: false,
        startTime2: '14:00', endTime2: '14:30', deductable: true, totalBreakTime: '0.5', maxShiftHours: '8.5', maxShiftOutTime: '14:30', maxOverTimeHours: '2.5', textileMaxOutTime: '14:30' },

    { id: 2, description: 'Evening Shift', startTime: '14:00', endTime: '22:00', morningShift: false, eveningShift: true, nightShift: false, halfDayShift: false,
        shiftCode: 'EVEN', remarks: '', selectedShiftType: 'Evening', allowArrivalTime: '13:45', arrivalFinishTime: '14:15', startTime1: '14:00', maxHour: '8', endTime1: '22:00', minHours1: '4',
        lateTime: '00:15', totalWorkingHours: '8', earlyGoingMinHrs: '2', minHours: '4', earlyOverTime: '0.5', generalOverTime: '2', timeBaseShift: true, hourBaseShift: false,
        startTime2: '22:00', endTime2: '22:30', deductable: true, totalBreakTime: '0.5', maxShiftHours: '8.5', maxShiftOutTime: '22:30', maxOverTimeHours: '2.5', textileMaxOutTime: '22:30' },

    { id: 3, description: 'Night Shift', startTime: '22:00', endTime: '06:00', morningShift: false, eveningShift: false, nightShift: true, halfDayShift: false,
        shiftCode: 'NIGHT', remarks: '', selectedShiftType: 'Night', allowArrivalTime: '21:45', arrivalFinishTime: '22:15', startTime1: '22:00', maxHour: '8', endTime1: '06:00', minHours1: '4',
        lateTime: '00:15', totalWorkingHours: '8', earlyGoingMinHrs: '2', minHours: '4', earlyOverTime: '0.5', generalOverTime: '2', timeBaseShift: true, hourBaseShift: false,
        startTime2: '06:00', endTime2: '06:30', deductable: true, totalBreakTime: '0.5', maxShiftHours: '8.5', maxShiftOutTime: '06:30', maxOverTimeHours: '2.5', textileMaxOutTime: '06:30' },

    { id: 4, description: 'Half Day Shift Morning', startTime: '08:00', endTime: '12:00', morningShift: true, eveningShift: false, nightShift: false, halfDayShift: true,
        shiftCode: 'HDSM', remarks: 'Half day morning shift', selectedShiftType: 'Half Day Morning', allowArrivalTime: '07:45', arrivalFinishTime: '08:15', startTime1: '08:00', maxHour: '4', endTime1: '12:00', minHours1: '2',
        lateTime: '00:15', totalWorkingHours: '4', earlyGoingMinHrs: '1', minHours: '2', earlyOverTime: '0.5', generalOverTime: '1', timeBaseShift: true, hourBaseShift: false,
        startTime2: '12:00', endTime2: '12:30', deductable: true, totalBreakTime: '0.5', maxShiftHours: '4.5', maxShiftOutTime: '12:30', maxOverTimeHours: '1.5', textileMaxOutTime: '12:30' },

    { id: 5, description: 'Half Day Shift Evening', startTime: '14:00', endTime: '18:00', morningShift: false, eveningShift: true, nightShift: false, halfDayShift: true,
        shiftCode: 'HDSE', remarks: 'Half day evening shift', selectedShiftType: 'Half Day Evening', allowArrivalTime: '13:45', arrivalFinishTime: '14:15', startTime1: '14:00', maxHour: '4', endTime1: '18:00', minHours1: '2',
        lateTime: '00:15', totalWorkingHours: '4', earlyGoingMinHrs: '1', minHours: '2', earlyOverTime: '0.5', generalOverTime: '1', timeBaseShift: true, hourBaseShift: false,
        startTime2: '18:00', endTime2: '18:30', deductable: true, totalBreakTime: '0.5', maxShiftHours: '4.5', maxShiftOutTime: '18:30', maxOverTimeHours: '1.5', textileMaxOutTime: '18:30' },

    { id: 6, description: 'Split Shift', startTime: '06:00', endTime: '10:00', morningShift: true, eveningShift: false, nightShift: false, halfDayShift: false,
        shiftCode: 'SPLT', remarks: 'Morning part of split shift', selectedShiftType: 'Split Morning', allowArrivalTime: '05:45', arrivalFinishTime: '06:15', startTime1: '06:00', maxHour: '4', endTime1: '10:00', minHours1: '2',
        lateTime: '00:15', totalWorkingHours: '4', earlyGoingMinHrs: '1', minHours: '2', earlyOverTime: '0.5', generalOverTime: '1', timeBaseShift: true, hourBaseShift: false,
        startTime2: '10:00', endTime2: '10:30', deductable: true, totalBreakTime: '0.5', maxShiftHours: '4.5', maxShiftOutTime: '10:30', maxOverTimeHours: '1.5', textileMaxOutTime: '10:30' },

    { id: 7, description: 'Split Shift Evening', startTime: '18:00', endTime: '22:00', morningShift: false, eveningShift: true, nightShift: false, halfDayShift: false,
        shiftCode: 'SPLTE', remarks: 'Evening part of split shift', selectedShiftType: 'Split Evening', allowArrivalTime: '17:45', arrivalFinishTime: '18:15', startTime1: '18:00', maxHour: '4', endTime1: '22:00', minHours1: '2',
        lateTime: '00:15', totalWorkingHours: '4', earlyGoingMinHrs: '1', minHours: '2', earlyOverTime: '0.5', generalOverTime: '1', timeBaseShift: true, hourBaseShift: false,
        startTime2: '22:00', endTime2: '22:30', deductable: true, totalBreakTime: '0.5', maxShiftHours: '4.5', maxShiftOutTime: '22:30', maxOverTimeHours: '1.5', textileMaxOutTime: '22:30' },

    { id: 8, description: 'Overtime Shift', startTime: '', endTime: '', morningShift: false, eveningShift: false, nightShift: false, halfDayShift: false,
    shiftCode: 'OT', remarks: '', selectedShiftType: 'Overtime', allowArrivalTime: '', arrivalFinishTime: '', startTime1: '', maxHour: '', endTime1: '', minHours1: '',
    lateTime: '', totalWorkingHours: '', earlyGoingMinHrs: '', minHours: '', earlyOverTime: '', generalOverTime: '', timeBaseShift: false, hourBaseShift: false,
    startTime2: '', endTime2: '', deductable: true, totalBreakTime: '', maxShiftHours: '', maxShiftOutTime: '', maxOverTimeHours: '', textileMaxOutTime: '' },

    { id: 9, description: 'Holiday Shift', startTime: '', endTime: '', morningShift: false, eveningShift: false, nightShift: false, halfDayShift: false,
        shiftCode: 'HOL', remarks: '', selectedShiftType: 'Holiday', allowArrivalTime: '', arrivalFinishTime: '', startTime1: '', maxHour: '', endTime1: '', minHours1: '',
        lateTime: '', totalWorkingHours: '', earlyGoingMinHrs: '', minHours: '', earlyOverTime: '', generalOverTime: '', timeBaseShift: false, hourBaseShift: false,
        startTime2: '', endTime2: '', deductable: true, totalBreakTime: '', maxShiftHours: '', maxShiftOutTime: '', maxOverTimeHours: '', textileMaxOutTime: '' },

    { id: 10, description: 'Weekend Shift', startTime: '', endTime: '', morningShift: false, eveningShift: false, nightShift: false, halfDayShift: false,
        shiftCode: 'WEND', remarks: '', selectedShiftType: 'Weekend', allowArrivalTime: '', arrivalFinishTime: '', startTime1: '', maxHour: '', endTime1: '', minHours1: '',
        lateTime: '', totalWorkingHours: '', earlyGoingMinHrs: '', minHours: '', earlyOverTime: '', generalOverTime: '', timeBaseShift: false, hourBaseShift: false,
        startTime2: '', endTime2: '', deductable: true, totalBreakTime: '', maxShiftHours: '', maxShiftOutTime: '', maxOverTimeHours: '', textileMaxOutTime: '' }
];

  function deleteShift(id) {
    shifts = shifts.filter(shift => shift.id !== id);
  }

  function editShift(id) {

  }

  function viewShift(id) {
    shiftSelected = shifts.find(shift => shift.id === id);
    showModal = true;
    // View shift logic here
  }

  function openEditModal(id) {
    shiftSelected = shifts.find(shift => shift.id === id);
  editModal = true
  }

  function closeModal()
{
  showModal = false;
  editModal = false;
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
          <th class="px-6 text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Half Day Shift</th>
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
          <td class='table-data text-center'><input type="checkbox" disabled bind:checked={shift.halfDayShift}/></td>
          <td class='table-data'>
            <div class="flex">
              <img src={edit1} alt="Edit" class="h-6 w-6 cursor-pointer" on:click={editShift(shift.id)} />
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <img src={view1} alt="View" class="h-6 w-6 cursor-pointer ml-2" on:click={viewShift(shift.id)} />
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
                  General Information
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-name">
                      Shift Code:
                    </label>
                    <p>{shiftSelected.shiftCode}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Shift Description:
                    </label>
                    <p>{shiftSelected.description}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Remarks:
                    </label>
                    <p>{shiftSelected.remarks}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-id">
                      Shift:
                    </label>
                    {#if shiftSelected.morningShift}
                      <p>Morning Shift</p>
                    {/if}
                    {#if shiftSelected.eveningShift}
                      <p>Evening Shift</p>
                    {/if}
                    {#if shiftSelected.nightShift}
                      <p>Night Shift</p>
                    {/if}
                    {#if shiftSelected.halfDayShift}
                      <p>Half Day Shift</p>
                    {/if}
                  </div>
                  
                </div>
                <h4 class="font-semibold text-lg text-blueGray-700">
                  Date Time Parameters
                </h4>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Allow Arrvial Time:
                    </label>
                    <p>{shiftSelected.allowArrivalTime}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Arrival Finish Time:
                    </label>
                    <p>{shiftSelected.arrivalFinishTime}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Start Time:
                    </label>
                    <p>{shiftSelected.startTime1}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      End Time:
                    </label>
                    <p>{shiftSelected.endTime1}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Late Time:
                    </label>
                    <p>{shiftSelected.lateTime}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Total Working Hours:
                    </label>
                    <p>{shiftSelected.totalWorkingHours}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Early going Min/Hrs:
                    </label>
                    <p>{shiftSelected.earlyGoingMinHrs}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Min Hours:
                    </label>
                    <p>{shiftSelected.minHours}</p>
                  </div>
                </div>
                <h4 class="font-semibold text-lg text-blueGray-700">
                  Advance Option Parameters
                </h4>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Max Shift Hours:
                    </label>
                    <p>{shiftSelected.maxShiftHours}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Max Shift Out Time:
                    </label>
                    <p>{shiftSelected.maxShiftOutTime}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Max Over Time Hours:
                    </label>
                    <p>{shiftSelected.maxOverTimeHours}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Textile Max Out Time:
                    </label>
                    <p>{shiftSelected.textileMaxOutTime}</p>
                  </div>
                </div>
                <h4 class="font-semibold text-lg text-blueGray-700">
                  Half Day Parameters
                </h4>
                <div class="w-full lg:w-6/12 px-4">
                 <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Time Base Shift:
                    </label>
                    <p>{shiftSelected.timeBaseShift}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Hour Base Shift:
                    </label>
                    <p>{shiftSelected.hourBaseShift}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Start Time:
                    </label>
                    <p>{shiftSelected.startTime1}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Max Hours:
                    </label>
                    <p>{shiftSelected.maxHour}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      End Time:
                    </label>
                    <p>{shiftSelected.endTime1}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Min Hours:
                    </label>
                    <p>{shiftSelected.minHours1}</p>
                  </div>
                </div>
                <h4 class="font-semibold text-lg text-blueGray-700">
                  Break Parameters
                </h4>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Start Time:
                    </label>
                    <p>{shiftSelected.startTime2}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      End Time:
                    </label>
                    <p>{shiftSelected.endTime2}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                     Deductable
                    </label>
                    <p>{shiftSelected.deductable}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Total Break Time:
                    </label>
                    <p>{shiftSelected.totalBreakTime}</p>
                  </div>
                </div>
                <h4 class="font-semibold text-lg text-blueGray-700">
                  Over Time Parameters
                </h4>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Early Over Time:
                    </label>
                    <p>{shiftSelected.earlyOverTime}</p>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      General Over Time:
                    </label>
                    <p>{shiftSelected.generalOverTime}</p>
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

      <!-- {#if editModal}
      <div class="modal">
        <div class="modal-content">
          <div class="rounded-t mb-0 px-4 py-10 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-lg text-blueGray-700">
                  Edit Employee
                </h3>
              </div>
            </div>
          </div>
          <div class="block w-full overflow-x-auto">
            <div class="px-4 py-5 flex-auto">
              <div class="flex">
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-name">
                      Name:
                    </label>
                    <input type="text" id="name" placeholder="Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.name}>
                    <span id="name-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Phone Number:
                    </label>
                    <input type="text" id="phone-number" placeholder="Phone Number" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.phoneNumber}>
                    <span id="phone-number-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                    <span id="phone-number-format-error" class="text-red-600 text-xs" style="display: none;">Enter correct number - 11 digits</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Location:
                    </label>
                    <input type="text" id="location" placeholder="Location" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.location}>
                    <span id="location-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-id">
                      Department:
                    </label>
                    <input type="text" id="department" placeholder="Department" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.department}>
                    <span id="department-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Designation:
                    </label>
                    <input type="text" id="designation" placeholder="Designation" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.designation}>
                    <span id="designation-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Gender:
                    </label>
                    <input type="text" id="gender" placeholder="Gender" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.gender}>
                    <span id="gender-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Email:
                    </label>
                    <input type="text" id="email" placeholder="Email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.email}>
                    <span id="email-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                    <span id="email-format-error" class="text-red-600 text-xs" style="display: none;">Email format incorrect</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Address:
                    </label>
                    <input type="text" id="address" placeholder="Address" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.address}>
                    <span id="address-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Date of birth:
                    </label>
                    <input type="date" id="date-of-birth" placeholder="Date of birth" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.dateOfBirth}>
                    <span id="date-of-birth-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Card ID:
                    </label>
                    <input type="text" id="card-id" placeholder="Card ID" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.cardIdNumber}>
                    <span id="card-id-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Personal Password:
                    </label>
                    <input type="text" id="personal-password" placeholder="Personal Password" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.personalPassword}>
                    <span id="personal-password-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>                  
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Finger Index 1:
                    </label>
                    <input type="number" id="finger-index-1" placeholder="Finger Index 1" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.fingerIndex1}>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Finger Index 2:
                    </label>
                    <input type="number" id="finger-index-2" placeholder="Finger Index 2" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.fingerIndex2}>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Finger Added:
                    </label>
                    <label class="switch">
                      <input type="checkbox" id="status" class="hidden" bind:checked={selectedEmployee.isFingerAdded}>
                      <span class="slider round"></span> 
                    </label>
                    <span id="finger-added-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Salary:
                    </label>
                    <input type="number" id="salary" placeholder="Salary" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.salary}>
                    <span id="salary-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Active:
                    </label>
                    <input type="text" id="active" placeholder="Active" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.active}>
                    <span id="active-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Employee Type:
                    </label>
                    <input type="text" id="employee-type" placeholder="Employee Type" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.employeeType}>
                    <span id="employee-type-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                </div>
              </div>
              <div class="flex justify-end">
                <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"  on:click={editEmployee}>
                  Update
                </button>
                <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={closeModal}>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/if} -->
</div>
