<!-- <script>
  // core components
  import CardSettings from "components/Cards/CardSettings.svelte";
  import CardProfile from "components/Cards/CardProfile.svelte";
  export let location;
</script>

<div class="flex flex-wrap">
  <div class="w-full lg:w-8/12 px-4">
    <CardSettings />
  </div>
  <div class="w-full lg:w-4/12 px-4">
    <CardProfile />
  </div>
</div> -->

<script>
  import { reactive } from 'svelte';
  import Pagination from '../../../components/Pagination/Pagination.svelte';
  export let color = "light";
  let showModal = false;
  let selectedDepartment = '';
  let selectedDesignation = '';
  let selectedRooms = [];
  let departments = ['Marketing', 'Finance', 'Human Resources', 'Information Technology', 'Sales', 'Operations'];
  let designations = ['Sales Manager', 'Software Engineer', 'Marketing Specialist', 'HR Manager', 'Financial Analyst'];
  let accessibleRooms = ["Conference Room", "Testing Lab", "Meeting Room", "Lobby", "Lounge", "Cafeteria", "Admin Office", "Training Room", "Training Office"];


function openModal() {
  showModal = true;
}

function closeModal() {
  showModal = false;
  selectedDepartment = '';
  selectedDesignation = '';
  selectedRooms = [];
}

  let users = [
    { id: '23006', name: 'Nawfal Ahmed', department: 'Marketing', designation: 'Manager', accessibleRooms: ['Conference Room', 'Building entrance'] },
    { id: '230060', name: 'John Doe', department: 'HR', designation: 'Assistant Manager', accessibleRooms: ['Meeting Room', 'Lobby'] },
    { id: '2300600', name: 'Jane Smith', department: 'Finance', designation: 'Senior Accountant', accessibleRooms: ['Finance Office', 'Lounge'] },
    { id: '23006001', name: 'Emily Johnson', department: 'Operations', designation: 'Supervisor', accessibleRooms: ['Operations Room', 'Cafeteria'] },
    { id: '23006002', name: 'Michael Brown', department: 'IT', designation: 'System Administrator', accessibleRooms: ['Server Room', 'IT Office'] },
    { id: '23006003', name: 'Samantha Taylor', department: 'Sales', designation: 'Sales Representative', accessibleRooms: ['Sales Floor', 'Break Room'] },
    { id: '23006004', name: 'David Wilson', department: 'Customer Service', designation: 'Customer Support Specialist', accessibleRooms: ['Customer Service Desk', 'Break Room'] },
    { id: '23006005', name: 'Jennifer Martinez', department: 'Research and Development', designation: 'Research Scientist', accessibleRooms: ['Lab', 'Research Office'] },
    { id: '23006006', name: 'William Anderson', department: 'Legal', designation: 'Legal Counsel', accessibleRooms: ['Legal Department', 'Library'] },
    { id: '23006007', name: 'Sarah Thompson', department: 'Public Relations', designation: 'PR Specialist', accessibleRooms: ['PR Office', 'Media Room'] },
    { id: '23006008', name: 'Daniel Garcia', department: 'Supply Chain', designation: 'Logistics Manager', accessibleRooms: ['Warehouse', 'Shipping Office'] },
    { id: '23006009', name: 'Jessica Rodriguez', department: 'Quality Assurance', designation: 'QA Analyst', accessibleRooms: ['Testing Lab', 'QA Office'] },
    { id: '23006010', name: 'Matthew Thomas', department: 'Training', designation: 'Training Coordinator', accessibleRooms: ['Training Room', 'Training Office'] },
    { id: '23006011', name: 'Amanda White', department: 'Administration', designation: 'Administrative Assistant', accessibleRooms: ['Admin Office', 'Reception Area'] },
    { id: '23006012', name: 'Kevin Lee', department: 'Production', designation: 'Production Supervisor', accessibleRooms: ['Production Floor', 'Warehouse'] },
    { id: '23006013', name: 'Olivia Harris', department: 'Human Resources', designation: 'HR Coordinator', accessibleRooms: ['HR Office', 'Interview Room'] },
    { id: '23006014', name: 'Robert Moore', department: 'Facilities', designation: 'Facilities Manager', accessibleRooms: ['Facilities Office', 'Maintenance Room'] },
    { id: '23006015', name: 'Ashley Clark', department: 'Purchasing', designation: 'Purchasing Manager', accessibleRooms: ['Purchasing Department', 'Inventory Room'] },
    { id: '23006016', name: 'Christopher Walker', department: 'Engineering', designation: 'Engineering Manager', accessibleRooms: ['Engineering Office', 'Prototype Lab'] },
    { id: '23006017', name: 'Stephanie Baker', department: 'Product Management', designation: 'Product Manager', accessibleRooms: ['Product Management Office', 'Boardroom'] }
];


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

  function batchUpdate() {
    // Logic to handle batch update goes here
  }

  // Define pagination logic
  const usersPerPage = 10; // Adjust as needed
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
    Access Control
    </h3>
    <br/>
  </div>
  <div class="access-control">
    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={openModal}>Batch Update</button>
    {#if showModal}
    <div class="modal">
      <div class="modal-content">
        <div class="rounded-t mb-0 px-4 py-10 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-blueGray-700">
                Batch Update
              </h3>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <div class="px-4 py-5 flex-auto">
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                    Department:
                  </label>
                  <select class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedDepartment}>
                    {#each departments as department}
                      <option value={department}>{department}</option>
                    {/each}
                  </select>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                    Designation:
                  </label>
                  <select class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedDesignation}>
                    {#each designations as designation}
                      <option value={designation}>{designation}</option>
                    {/each}
                  </select>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                    Rooms:
                  </label>
                  <select class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" multiple bind:value={selectedRooms}>
                    {#each accessibleRooms as room}
                      <option value={room}>{room}</option>
                    {/each}
                  </select>
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={update}>Update</button>
              <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>      
      </div>
    </div>
    {/if}
    <input type="search" class="mb-4 bg-gray-800 text-white rounded-lg px-4 py-2 {color === 'light' ? 'text-blueGray-700' : 'text-white'}" placeholder="Search...">
    <table>
      <thead>
        <tr>
          <th><input type="checkbox" class="rounded" on:click={toggleSelectAll}></th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">UserID</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Employee Name</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Department</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Designation</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Accessible Rooms</th>
        </tr>
      </thead>
      <tbody>
        {#each displayedUsers as user (user.id)}
          <tr>
            <td><input type="checkbox" checked={selectedUsers.has(user.id)} class="rounded" on:click={() => {console.log(selectedUsers.has(user.id)); toggleSelection(user.id)}}></td>
            <td class="table-data" title={user.id}>{user.id}</td>
            <td class="table-data" title={user.name}>{user.name}</td>
            <td class="table-data" title={user.department}>{user.department}</td>
            <td class="table-data" title={user.designation}>{user.designation}</td>
            <td class="table-data" title={user.accessibleRooms}>{user.accessibleRooms.join(', ')}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
  </div>
</div>