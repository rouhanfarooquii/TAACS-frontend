<script>
  import Pagination from '../../../components/Pagination/Pagination.svelte';
  export let color = "light";
  let showModal = false;
  let selectedDepartment = '';
  let selectedDesignation = '';
  let selectedRooms = [];
  let departments = ['Marketing', 'Finance', 'Human Resources', 'Information Technology', 'Sales', 'Operations'];
  let designations = ['Sales Manager', 'Software Engineer', 'Marketing Specialist', 'HR Manager', 'Financial Analyst'];
  let accessibleRooms = ["Conference Room", "Testing Lab", "Meeting Room", "Lobby", "Lounge", "Cafeteria", "Admin Office", "Training Room", "Training Office"];

  let users = [
    { id: '23006', name: 'Nawfal Ahmed', department: 'Marketing', designation: 'Manager', accessibleRooms: ['Conference Room', 'Building entrance', 'Lobby', 'Lobby', 'Lobby', 'Lobby'] },
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
    { id: '23006010', name: 'Matthew Thomas', department: 'Marketing', designation: 'Training Coordinator', accessibleRooms: ['Training Room', 'Training Office'] },
    { id: '23006011', name: 'Amanda White', department: 'Administration', designation: 'Administrative Assistant', accessibleRooms: ['Admin Office', 'Reception Area'] },
    { id: '23006012', name: 'Kevin Lee', department: 'Production', designation: 'Production Supervisor', accessibleRooms: ['Production Floor', 'Warehouse'] },
    { id: '23006013', name: 'Olivia Harris', department: 'Human Resources', designation: 'HR Coordinator', accessibleRooms: ['HR Office', 'Interview Room'] },
    { id: '23006014', name: 'Robert Moore', department: 'Facilities', designation: 'Facilities Manager', accessibleRooms: ['Facilities Office', 'Maintenance Room'] },
    { id: '23006015', name: 'Ashley Clark', department: 'Purchasing', designation: 'Purchasing Manager', accessibleRooms: ['Purchasing Department', 'Inventory Room'] },
    { id: '23006016', name: 'Christopher Walker', department: 'Engineering', designation: 'Engineering Manager', accessibleRooms: ['Engineering Office', 'Prototype Lab'] },
    { id: '23006017', name: 'Stephanie Baker', department: 'Product Management', designation: 'Product Manager', accessibleRooms: ['Product Management Office', 'Boardroom'] }
  ];

  let selectedUsers = new Set();
  let searchQuery = '';

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
    // Validation checks
    let departmentDesignationError = !selectedDepartment && !selectedDesignation;
    let accessibleRoomsError = selectedRooms.length === 0;

    if (departmentDesignationError || accessibleRoomsError) {
      if (departmentDesignationError) {
        document.getElementById('department-designation-error').style.display = 'block';
      } else {
        document.getElementById('department-designation-error').style.display = 'none';
      }

      if (accessibleRoomsError) {
        document.getElementById('accessible-rooms-error').style.display = 'block';
      } else {
        document.getElementById('accessible-rooms-error').style.display = 'none';
      }

      return;
    }

    // Implement batch update logic here
  }

  function deleteSelectedUsers() {
    users = users.filter(user => !selectedUsers.has(user.id));
    selectedUsers.clear();
  }

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    selectedDepartment = '';
    selectedDesignation = '';
    selectedRooms = [];
    document.getElementById('department-designation-error').style.display = 'none';
    document.getElementById('accessible-rooms-error').style.display = 'none';
  }

  // Define pagination logic
  const usersPerPage = 10; // Adjust as needed
  let currentPage = 1;

  // Reactive statements to ensure proper updates
  $: startIndex = (currentPage - 1) * usersPerPage;
  $: endIndex = Math.min(startIndex + usersPerPage, filteredUsers.length);
  $: filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.id.includes(searchQuery) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.accessibleRooms.some(room => room.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  $: displayedUsers = filteredUsers.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  function handlePageChange(event) {
    console.log("Received page change:", event.detail.pageNumber);  // Confirm event reception
    currentPage = event.detail.pageNumber;
  }

  $: searchResultText = searchQuery
    ? filteredUsers.length > 0
      ? `Rows Found: ${filteredUsers.length}`
      : "No Result Found"
    : '';
  $: searchResultColor = filteredUsers.length > 0 ? "text-blue-600 font-bold" : "text-red-600 font-bold";

  // Reset currentPage to 1 whenever searchQuery changes
  $: if (searchQuery) currentPage = 1;
</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <div class="relative w-full px-4 max-w-full flex-grow flex-1">
    <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">Access Control</h3>
    <br/>
  </div>
  <div class="flex items-center justify-between mb-4">
    <input type="text" class="mb-4 bg-gray-800 text-black rounded-lg px-4 py-2" placeholder="Search..." bind:value={searchQuery} />
    <div class="flex space-x-2">
      <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" on:click={deleteSelectedUsers}>Delete</button>
      <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" on:click={openModal}>Batch Update</button>
    </div>
  </div>
  <p class="text-sm {searchResultColor}">{searchResultText}</p>
  {#if showModal}
  <div class="modal">
    <div class="modal-content">
      <div class="rounded-t mb-0 px-4 py-10 border-0">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-lg text-blueGray-700">Batch Update</h3>
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
                  <option value="">Select Department</option>
                  {#each departments as department}
                    <option value={department}>{department}</option>
                  {/each}
                </select>
                <span id="department-designation-error" class="text-red-600 text-xs" style="display: none;">* Please select a department or designation</span>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                  Designation:
                </label>                  
                <select class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedDesignation}>
                  <option value="">Select Designation</option>
                  {#each designations as designation}
                    <option value={designation}>{designation}</option>
                  {/each}
                </select>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">Accessible Rooms</label>
                {#each accessibleRooms as room}
                <div class="flex items-center">
                  <input type="checkbox" value={room} bind:group={selectedRooms} />
                  <label class="ml-2 text-sm text-blueGray-600" for="grid-password">{room}</label>
                </div>
                {/each}
                <span id="accessible-rooms-error" class="text-red-600 text-xs" style="display: none;">* Please select at least one accessible room</span>
              </div>
            </div>
          </div>
        </div>
        <div class="px-6 pb-6">
          <button class="bg-red-500 text-white active:bg-red-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={closeModal}>Close</button>
          <button class="bg-green-500 text-white active:bg-green-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={batchUpdate}>Update</button>
        </div>
      </div>
    </div>
  </div>
  {/if}
  <table class="w-full bg-transparent border-collapse">
    <thead>
      <tr>
        <th><input type="checkbox" on:click={toggleSelectAll} /></th>
        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">User ID</th>
        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Name</th>
        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Department</th>
        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Designation</th>
        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Accessible Rooms</th>
      </tr>
    </thead>
    <tbody>
      {#each displayedUsers as user}
      <tr>
        <td class="align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><input type="checkbox" checked={selectedUsers.has(user.id)} on:click={() => toggleSelection(user.id)} /></td>
        <td class="align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" title={user.id}>{user.id}</td>
        <td class="align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" title={user.name}>{user.name}</td>
        <td class="align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" title={user.department}>{user.department}</td>
        <td class="align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" title={user.designation}>{user.designation}</td>
        <td class="table-data2" title={user.accessibleRooms.join(', ')}>{user.accessibleRooms.join(', ')}</td>
      </tr>
      {/each}
    </tbody>
  </table>
  <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
</div>