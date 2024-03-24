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
  let employees = []; // Replace with actual employee data

  let filters = {
    name: '',
    role: '',
    active: '',
    department: '',
    location: '',
    experience: '',
    education: '',
    language: '',
    skill: '',
    gender: '',
    nationality: '',
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
</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16 px-4 py-20">

  <!-- Filters Row 1 -->
  <div class="flex justify-between mb-4">
    <!-- Filter by Name -->
    <div>
      <label for="filterName">Name:</label>
      <input type="text" id="filterName" name="filterName" placeholder="Filter by name" onchange="{() => applyFilters()}">
    </div>
    <!-- Filter by Role -->
    <div>
      <label for="filterRole">Role:</label>
      <input type="text" id="filterRole" name="filterRole" placeholder="Filter by role" onchange="{() => applyFilters()}">
    </div>
    <!-- Filter by Active -->
    <div>
      <label for="filterActive">Active:</label>
      <select id="filterActive" name="filterActive" onchange="{() => applyFilters()}">
        <option value="">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
  </div>

  <!-- Filters Row 2 -->
  <div class="flex justify-between mb-4">
    <!-- Filter by Department -->
    <div>
      <label for="filterDepartment">Department:</label>
      <input type="text" id="filterDepartment" name="filterDepartment" placeholder="Filter by department" onchange="{() => applyFilters()}">
    </div>
    <!-- Filter by Location -->
    <div>
      <label for="filterLocation">Location:</label>
      <input type="text" id="filterLocation" name="filterLocation" placeholder="Filter by location" onchange="{() => applyFilters()}">
    </div>
    <!-- Filter by Experience -->
    <div>
      <label for="filterExperience">Experience:</label>
      <select id="filterExperience" name="filterExperience" onchange="{() => applyFilters()}">
        <option value="">All</option>
        <option value="0-1">0-1 years</option>
        <option value="1-3">1-3 years</option>
        <option value="3-5">3-5 years</option>
        <option value="5+">5+ years</option>
      </select>
    </div>
  </div>

  <!-- Filters Row 3 -->
  <div class="flex justify-between mb-4">
    <!-- Filter by Education -->
    <div>
      <label for="filterEducation">Education:</label>
      <select id="filterEducation" name="filterEducation" onchange="{() => applyFilters()}">
        <option value="">All</option>
        <option value="bachelor">Bachelor's</option>
        <option value="master">Master's</option>
        <option value="phd">PhD</option>
      </select>
    </div>
    <!-- Filter by Language -->
    <div>
      <label for="filterLanguage">Language:</label>
      <input type="text" id="filterLanguage" name="filterLanguage" placeholder="Filter by language" onchange="{() => applyFilters()}">
    </div>
    <!-- Filter by Skill -->
    <div>
      <label for="filterSkill">Skill:</label>
      <input type="text" id="filterSkill" name="filterSkill" placeholder="Filter by skill" onchange="{() => applyFilters()}">
    </div>
  </div>

  <!-- Filters Row 4 -->
  <div class="flex justify-between mb-4">
    <!-- Filter by Gender -->
    <div>
      <label for="filterGender">Gender:</label>
      <select id="filterGender" name="filterGender" onchange="{() => applyFilters()}">
        <option value="">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
    <!-- Filter by Nationality -->
    <div>
      <label for="filterNationality">Nationality:</label>
      <input type="text" id="filterNationality" name="filterNationality" placeholder="Filter by nationality" onchange="{() => applyFilters()}">
    </div>
    <!-- Filter by Marital Status -->
    <div>
      <label for="filterMaritalStatus">Marital Status:</label>
      <select id="filterMaritalStatus" name="filterMaritalStatus" onchange="{() => applyFilters()}">
        <option value="">All</option>
        <option value="single">Single</option>
        <option value="married">Married</option>
        <option value="divorced">Divorced</option>
      </select>
    </div>
  </div>

 <!-- Buttons -->
<div class="flex justify-end mb-4">
  <button onclick="applyFilters()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">Apply</button>
  <button onclick="clearFilters()" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Clear</button>
</div>

  <!-- Divider -->
  <hr class="my-4">

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
    <select id="showRecords" onchange="{() => showRecords(this.value)}">
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  </div>
</div>

