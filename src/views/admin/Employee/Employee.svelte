<!-- <script>
  let employees = []; // Replace with actual employee data

  let filters = {

  };

  function applyFilters() {
    // Apply filters logic here
  }

  function clearFilters() {
    // Clear filters logic here
  }

  function showRecords(value) {
    // Show x records logic here
  }
</script>

<div
  class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16 px-4 py-20"
>



<hr class="my-4">

<table class="min-w-full">
  <thead>
    <tr>
      <th class="px-4 py-2">#</th>
      <th class="px-4 py-2">Employee</th>
      <th class="px-4 py-2">Details</th>
      <th class="px-4 py-2">Role</th>
      <th class="px-4 py-2">Active</th>
      <th class="px-4 py-2">Added On</th>
      <th class="px-4 py-2">Modified On</th>
      <th class="px-4 py-2">Action</th>
    </tr>
  </thead>
  <tbody>
    {#each employees as employee, index}
      <tr>
        <td class="border px-4 py-2">{index + 1}</td>
        <td class="border px-4 py-2">{employee.name}</td>
        <td class="border px-4 py-2">{employee.details}</td>
        <td class="border px-4 py-2">{employee.role}</td>
        <td class="border px-4 py-2">{employee.active ? 'Yes' : 'No'}</td>
        <td class="border px-4 py-2">{employee.addedOn}</td>
        <td class="border px-4 py-2">{employee.modifiedOn}</td>
        <td class="border px-4 py-2">Action</td>
      </tr>
    {/each}
  </tbody>
</table>

<div class="mt-4">
  <label for="showRecords">Show Records:</label>
  <select id="showRecords" onchange="{() => showRecords(this.value)}">
    <option value="10">10</option>
    <option value="20">20</option>
    <option value="30">30</option>
  </select>
</div>
</div> -->

<script>
  import { navigate } from 'svelte-routing';
  let employees = []; // Replace with actual employee data

  let filters = {
    name: '',
    position: '',
    active: '',
    department: '',
    location: '',
    experience: '',
    education: '',
    language: '',
    skill: '',
    gender: '',
    employeeID: '',
    maritalStatus: ''
  };

  function applyFilters() {
    // Apply filters logic here
  }

  function clearFilters() {
    // Clear filters logic here
  }

  function showRecords(value) {
    // Show x records logic here
  }

  function navigateToAddEmployee() {
    navigate('/admin/Employee/addemployee');
  }
</script>


<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <!-- Add Employee Button -->
  <div class="flex justify-end mb-4">
    <button class=" bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={navigateToAddEmployee}>
      Add Employee
    </button>
  </div>
  <!-- Filters Row 1 -->
  <div class="flex justify-between mb-4">
    <!-- Filter by EmployeeID -->
    <div>
      <label for="filterEmployeeID">Employee ID:</label>
      <br>
      <input type="text" id="filterEmployeeID" name="filterEmployeeID" class="filter-input" placeholder="Employee ID" onchange="{() => applyFilters()}">
    </div>
    <!-- Filter by Name -->
    <div>
      <label for="filterName">Name:</label>
      <br>
      <input type="text" id="filterName" name="filterName" class="filter-input" placeholder="Name" onchange="{() => applyFilters()}">
    </div>
   <!-- Filter by Department -->
   <div>
    <label for="filterDepartment">Department:</label>
    <br>
    <input type="text" id="filterDepartment" name="filterDepartment" class="filter-input" placeholder="Department" onchange="{() => applyFilters()}">
  </div>
  </div>

  <!-- Filters Row 2 -->
  <div class="flex justify-between mb-4">
    <!-- Filter by Position -->
    <div>
      <label for="filterPosition">Position:</label>
      <br>
      <input type="text" id="filterPosition" name="filterPosition" class="filter-input" placeholder="Position" onchange="{() => applyFilters()}">
    </div>
    <!-- Filter by Experience -->
    <div>
      <label for="filterExperience">Experience:</label>
      <br>
      <select id="filterExperience" name="filterExperience" class="filter-input" onchange="{() => applyFilters()}">
        <option value="">All</option>
        <option value="0-1">0-1 years</option>
        <option value="1-3">1-3 years</option>
        <option value="3-5">3-5 years</option>
        <option value="5+">5+ years</option>
      </select>
    </div>
    <!-- Filter by Active -->
    <div>
      <label for="filterActive">Active:</label>
      <br>
      <select id="filterActive" name="filterActive" class="filter-input" onchange="{() => applyFilters()}">
        <option value="">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
  </div>

 <!-- Buttons -->
<div class="flex justify-end mb-1">
  <button onclick="applyFilters()" class="bg-green-500 active:bg-green-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mr-2">Apply</button>
  <button onclick="clearFilters()" class="bg-red-400 active:bg-red-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">Clear</button>
</div>

  <!-- Divider -->
  <hr class="my-2">

  <!-- Table -->
  <table class="min-w-full">
    <thead>
      <tr>
        <th class="px-4 py-2">#</th>
        <th class="px-4 py-2">Employee</th>
        <th class="px-4 py-2">Details</th>
        <th class="px-4 py-2">Role</th>
        <th class="px-4 py-2">Active</th>
        <th class="px-4 py-2">Added On</th>
        <th class="px-4 py-2">Modified On</th>
        <th class="px-4 py-2">Action</th>
      </tr>
    </thead>
    <tbody>
      {#each employees as employee, index}
      <tr>
        <td class="border px-4 py-2">{index + 1}</td>
        <td class="border px-4 py-2">{employee.name}</td>
        <td class="border px-4 py-2">{employee.details}</td>
        <td class="border px-4 py-2">{employee.role}</td>
        <td class="border px-4 py-2">{employee.active ? 'Yes' : 'No'}</td>
        <td class="border px-4 py-2">{employee.addedOn}</td>
        <td class="border px-4 py-2">{employee.modifiedOn}</td>
        <td class="border px-4 py-2">Action</td>
      </tr>
      {/each}
    </tbody>
  </table>

<!-- Show x Records -->
<div class="mt-4">
  <label for="showRecords">Show Records:</label>
  <select id="showRecords" class="small-dropdown rounded" onchange="{() => showRecords(this.value)}">
    <option value="10">10</option>
    <option value="20">20</option>
    <option value="30">30</option>
  </select>
</div>

</div>

