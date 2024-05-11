<script>
  import { reactive } from 'svelte';
    import AddNewBonusModal from './AddNewBonusModal.svelte';
    import Pagination from '../../../components/Pagination/Pagination.svelte';
  const edit1 = "../assets/img/icons8-edit-24.png"
  const edit2 = "../assets/img/icons8-tick-24.png"
  export let color = "light";

  let users = [
    { id: '1', name: 'Year End Bonus', department: 'All', designation: 'All', percentage: 5, activeFrom: '2022-01-01' },
    { id: '2', name: 'Engineering Excellence Award', department: 'Engineering', designation: 'Senior Software Engineer', percentage: 3, activeFrom: '2022-01-15' },
    { id: '3', name: 'Marketing Performance Bonus', department: 'Marketing', designation: 'All', percentage: 4, activeFrom: '2022-02-01' },
    { id: '4', name: 'Leadership Bonus', department: 'All', designation: 'Manager', percentage: 6, activeFrom: '2022-03-01' },
    { id: '5', name: 'Finance Achievement Award', department: 'Finance', designation: 'Financial Analyst', percentage: 5, activeFrom: '2022-04-01' },
];


// State variable to track editing mode for each user
let editingModes = {};

function toggleEditingMode(userId) {
  editingModes[userId] = !editingModes[userId];
}

function saveSalaryChanges(user) {
  // Logic to save the changes made to the salary
  console.log("Saved changes for user:", user);
  // Assuming you have backend logic here to update the salary
}

function editSalary(user) {
  toggleEditingMode(user.id);
  // You can perform additional actions here if needed
}

  let selectedUsers = new Set();

  function toggleSelection(userId) {
    if (selectedUsers.has(userId)) {
      selectedUsers.delete(userId);
    } else {
      selectedUsers.add(userId);
    }
    selectedUsers = new Set(selectedUsers); // Force rerender
  }

  function toggleSelectAll() {
    if (selectedUsers.size === users.length) {
      selectedUsers.clear();
    } else {
      users.forEach(user => selectedUsers.add(user.id));
    }
    selectedUsers = new Set(selectedUsers); // Force rerender
  }

  let showModal = false;

  function openModal() {
    showModal = true;
  }

  // Define pagination logic
  const usersPerPage = 5; // Adjust as needed
  let currentPage = 1;

 // Reactive statements to ensure proper updates
$: startIndex = (currentPage - 1) * usersPerPage;
$: endIndex = Math.min(startIndex + usersPerPage, users.length);
$: displayedUsers = users.slice(startIndex, endIndex);
$: totalPages = Math.ceil(users.length / usersPerPage);

  function handlePageChange(event) {
    console.log("Received page change:", event.detail.pageNumber);  // Confirm event reception
    currentPage = event.detail.pageNumber;
}
  
</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <div class="relative w-full px-4 max-w-full flex-grow flex-1">
    <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}"
    >
    Bonus Information
    </h3>
    <br/>
  </div>
  <div class="access-control">
    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={openModal}>Add New Bonus</button>
    <!-- {#if showModal}
  <AddNewBonusModal on:closeModal={() => showModal = false} />
{/if} -->
    <input type="search" class="mb-4 bg-gray-800 text-white rounded-lg px-4 py-2" placeholder="Search...">
    <table>
      <thead>
        <tr>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Name</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Designation</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Department</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Bonus</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Active From</th>
        </tr>
      </thead>
      <tbody>
        {#each displayedUsers as user (user.id)}
        <tr>
          <td class="table-data font-bold text-blueGray-600" title={user.name}>
            <!-- Name -->
            <div class="flex items-center">
              {#if editingModes[user.id]}
                <input type="text" bind:value={user.name}>
              {:else}
                <span>{user.name}</span>
              {/if}
            </div>
          </td>
          <td class="table-data" title={user.designation}>
            <!-- Designatiom -->
            <div class="flex items-center">
              {#if editingModes[user.id]}
                <input type="text" bind:value={user.designation}>
              {:else}
                <span>{user.designation}</span>
              {/if}
            </div>
          </td>
          <td class="table-data" title={user.department}>
            <!-- Department -->
            <div class="flex items-center">
              {#if editingModes[user.id]}
                <select bind:value={user.department}>
                  <option value="Finance">All</option>
                  <option value="Sales">Sales</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                </select>
              {:else}
                <span>{user.department}</span>
              {/if}
            </div>
          </td>
          <td class="table-data" title={user.percentage}>
            <!-- Percentage -->
            <div class="flex items-center">
              {#if editingModes[user.id]}
                <input type="number" class="w-16" bind:value={user.percentage}>
              {:else}
                <span>{user.percentage}</span>
              {/if}
            </div>
          </td>
          <td class="table-data" title={user.activeFrom}>
            <!-- Active From -->
            <div class="flex items-center">
              {#if editingModes[user.id]}
                <input type="date" bind:value={user.activeFrom}>
              {:else}
                <span>{user.activeFrom}</span>
              {/if}
            </div>
          </td>
          <td>
            <!-- Edit button -->
            <div class="flex items-center">
              {#if editingModes[user.id]}
                <!-- Save button -->
                <img src={edit2} alt="Save" class="icon-button cursor-pointer" on:click={() => {saveSalaryChanges(user); toggleEditingMode(user.id);}}>
              {:else}
                <!-- Edit button -->
                <img src={edit1} alt="Edit" class="icon-button cursor-pointer" on:click={() => editSalary(user)} />
              {/if}
            </div>
          </td>
        </tr>
        {/each}
      </tbody>
    </table>
    <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
  </div>
</div>