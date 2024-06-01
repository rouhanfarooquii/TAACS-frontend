<script>
  import Pagination from '../../../components/Pagination/Pagination.svelte';
  import MultiSelect from "../../../components/Dropdowns/MultiSelect.svelte";
  import Toast from '../../../components/Confirmation/Toast.svelte';
  export let color = "light";

  import { onMount } from 'svelte';
  import { getAllEmployeesApi, getAllDepartmentsApi, getAllLocationsApi, batchUpdateAccessControlApi } from '../../../services/api';

  let accessControlObject = [];
  let users = [];
  let showModal = false;
  let selectedDepartment = '';
  let selectedDesignation = '';
  let selectedRooms = [];
  let departments = [];
  let trueDepartments = []
  let designations = [];
  let trueAccessibleRooms = []
  let accessibleRooms = [];

  let selectedUsers = new Set();
  let searchQuery = '';

  let showToaster = false;
  let toasterMessage = '';
  let toasterType = '';

  onMount(async () => {
    await getAllAccess();
    await getAllDepartments();
    await getAllRooms();
  });

  async function getAllRooms(){
    trueAccessibleRooms = await getAllLocationsApi(true);
    accessibleRooms = JSON.parse(JSON.stringify(trueAccessibleRooms));
    accessibleRooms = accessibleRooms.map(loc => loc.title)
  }

  async function getAllDepartments(){
    trueDepartments = await getAllDepartmentsApi();
    departments = JSON.parse(JSON.stringify(trueDepartments));
    departments.push({title: "All", _id: "All"})
  }

  function setDesignation(event){
    const selectedDepartmentTitle = event.target.value;
    if (selectedDepartmentTitle === "All") {
      designations = [{title: "All", _id: "All"}];
      selectedDesignation = "All";
    } else {
      const selectedDept = trueDepartments.find(d => d.title === selectedDepartmentTitle);
      designations = [...selectedDept.designations, {title: "All", _id: "All"}];
      selectedDesignation = '';
    }
  }

  async function getAllAccess() {
    try {
      accessControlObject = await getAllEmployeesApi();
      users = accessControlObject
      for (let index = 0; index < users.length; index++) {        
        let names = "";
        for (let ind = 0; ind < users[index].locations.length; ind++) {
          names += users[index].locations[ind].title;
          if (ind < users[index].locations.length - 1) {
            names += ", ";
          }
        }
        users[index].locations = names;
      }
      console.log(users);
    } catch (error) {
      console.error("Error fetching access control data:", error);
    }
  }

  function showToasterMessage(message, type) {
    toasterMessage = message;
    toasterType = type;
    showToaster = true;
    setTimeout(() => {
      showToaster = false;
    }, 3000); // Show toast for 3 seconds
  }

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
      users.forEach(user => selectedUsers.add(user._id));
    }
    selectedUsers = new Set(selectedUsers); // Force rerender
  }

  let dropdownOpen = false;

  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown-content')) {
        dropdownOpen = false;
    }
  }

  async function batchUpdate() {
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

    let payloadDepartment
    if(selectedDepartment != "All"){
      payloadDepartment = (trueDepartments.find(d => d.title === selectedDepartment))
    }
    else{
      payloadDepartment = selectedDepartment
    }
    let payloadDesignation
    if(selectedDesignation != "All"){
      payloadDesignation = (payloadDepartment.designations.find(d => d.title === selectedDesignation))._id
    }
    else{
      payloadDesignation = selectedDesignation
    }
    if(selectedDepartment != "All"){
      payloadDepartment = payloadDepartment._id
    }
    let payloadLocations = []
    for (let index = 0; index < selectedRooms.length; index++) {
      payloadLocations.push((trueAccessibleRooms.find(d => d.title === selectedRooms[index]))._id)
    }

    const payload = {
      department: payloadDepartment,
      designation: payloadDesignation,
      locations: payloadLocations,
      users: Array.from(selectedUsers)
    };

    console.log('Payload sent to API:', payload);

    try {
      const response = await batchUpdateAccessControlApi(payload);
      console.log('Response from API:', response);
      showToasterMessage('Batch updated successfully!', 'success');
      closeModal();
      await getAllAccess();
    } catch (error) {
      console.error('Error updating access control:', error);
      showToasterMessage('An error occurred while updating access control. Please try again.', 'error');
    }
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

  const usersPerPage = 10; // Adjust as needed
  let currentPage = 1;

  $: startIndex = (currentPage - 1) * usersPerPage;
  $: endIndex = Math.min(startIndex + usersPerPage, filteredUsers.length);
  $: filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.employeeID.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.designation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.locations.toLowerCase().includes(searchQuery.toLowerCase())
  );
  $: displayedUsers = filteredUsers.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  function handlePageChange(event) {
    currentPage = event.detail.pageNumber;
  }

  $: searchResultText = searchQuery
    ? filteredUsers.length > 0
      ? ''
      : "No Result Found"
    : '';
  $: searchResultColor = filteredUsers.length > 0 ? "text-blue-600 font-bold" : "text-red-600 font-bold";

  $: if (searchQuery) currentPage = 1;
</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  {#if showToaster}
    <Toast message={toasterMessage} type={toasterType} />
  {/if}
  <div class="flex justify-end mb-4">
    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
      <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
        Access Control
      </h3>
    </div>
    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" on:click={openModal}>Batch Update</button>
  </div>
  <div class="flex justify-between">
    <div class="relative mb-3">
      <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Search..." bind:value={searchQuery} />
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
                <select class="border-0 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedDepartment} on:change={setDesignation}>
                  <option value="" disabled selected>Select Department</option>
                  {#each departments as department}
                    <option value={department.title}>{department.title}</option>
                  {/each}
                </select>
                <span id="department-designation-error" class="text-red-600 text-xs" style="display: none;">* Please select a department or designation</span>
              </div>
              <div class="relative mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                  Designation:
                </label>                  
                <select class="border-0 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedDesignation}>
                  <option value="" disabled selected>Select Designation</option>
                  {#each designations as designation}
                    <option value={designation.title}>{designation.title}</option>
                  {/each}
                </select>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">Accessible Rooms</label>
                <MultiSelect bind:selectedOptions={selectedRooms} options={accessibleRooms} placeholder="Select Rooms" />
                <span id="accessible-rooms-error" class="text-red-600 text-xs" style="display: none;">* Please select a room</span>
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
        <td class="align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{user.employeeID}</td>
        <td class="align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{user.name}</td>
        <td class="align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{user.department.title}</td>
        <td class="align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{user.designation.title}</td>
        <td class="table-data2">{user.locations}</td>
      </tr>
      {/each}
    </tbody>
  </table>
  <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
</div>