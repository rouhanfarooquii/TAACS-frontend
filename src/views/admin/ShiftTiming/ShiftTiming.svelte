<script>
    import { navigate } from 'svelte-routing';
    const edit1 = "../assets/img/icons8-edit-24.png"
    const view1 = "../assets/img/icons8-eye-24.png"
export let color = "light";
let shifts = [
    { id: 0, description: 'Off Day', startTime: '00:00', endTime: '00:00', morningShift: false, eveningShift: false, nightShift: false },
    { id: 1, description: 'Morning Shift', startTime: '08:00', endTime: '16:00', morningShift: true, eveningShift: false, nightShift: false },
    { id: 2, description: 'Evening Shift', startTime: '16:00', endTime: '00:00', morningShift: false, eveningShift: true, nightShift: false },
    { id: 3, description: 'Night Shift', startTime: '00:00', endTime: '08:00', morningShift: false, eveningShift: false, nightShift: true },
    { id: 4, description: 'Full Day Shift', startTime: '08:00', endTime: '00:00', morningShift: true, eveningShift: true, nightShift: false },
    { id: 5, description: 'Part-Time Morning Shift', startTime: '08:00', endTime: '12:00', morningShift: true, eveningShift: false, nightShift: false },
    { id: 9, description: 'Weekend Night Shift', startTime: '00:00', endTime: '08:00', morningShift: false, eveningShift: false, nightShift: true }
];


    function deleteShift(id) {
        shifts = shifts.filter(shift => shift.id !== id);
    }

    function editShift()
    {

    }

    function viewShift()
    {
      
    }

    function navigateToAddShift() {
    navigate('/admin/addshift');
    console.log("Yes");
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
</script>

   <div class="relative min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
    <button class="flex justify-end mb-4 bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={navigateToAddShift}>
      Add Shift
    </button>
    <button class=" flex bg-red-400 active:bg-red-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">
      Delete
  </button>
    <input type="search" class="mb-4 bg-gray-800 text-white rounded-lg px-4 py-2" placeholder="Search...">
    <label class="ml-3" for="showRecords">Show Records:</label>
  <select id="showRecords" class="small-dropdown rounded " onchange="{() => showRecords(this.value)}">
    <option value="10">10</option>
    <option value="20">20</option>
    <option value="30">30</option>
  </select>
    <div class="block w-full overflow-x-auto">
      <table>
        <thead>
            <tr>
              <th><input type="checkbox" class="rounded" on:click={toggleSelectAll}></th>
                <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Description</th>
                <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Start Time</th>
                <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">End Time</th>
                <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Morning Shift</th>
                <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Evening Shift</th>
                <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Night Shift</th>
                <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each shifts as shift (shift.id)}
            <tr>
              <td><input type="checkbox" checked={selectedShifts.has(shifts.id)} class="rounded" on:click={() => {console.log(selectedShifts.has(shifts.id)); toggleSelection(shifts.id)}}></td>
                <td>{shift.description}</td>
                <td>{shift.startTime}</td>
                <td>{shift.endTime}</td>
                <td><input type="checkbox" bind:checked={shift.morningShift} disabled /></td>
                <td><input type="checkbox" bind:checked={shift.eveningShift} disabled /></td>
                <td><input type="checkbox" bind:checked={shift.nightShift} disabled /></td>
                <td class="flex items-center">
                  <div class="mr-2">
                    <img src={edit1} alt="Edit" class="h-6 w-6 cursor-pointer" onclick={() => editShift(shift.id)} />
                  </div>
                  <div>
                    <img src={view1} alt="View" class="h-6 w-6 cursor-pointer" onclick={() => viewShift(shift.id)} />
                  </div>
                </td>
            </tr>
            {/each}
        </tbody>
    </table>
    </div>
   </div>