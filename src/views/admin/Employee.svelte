<script>
  let countries = ["Country 1", "Country 2", "Country 3"]; // Replace with actual country data
  let cities = ["City 1", "City 2", "City 3"]; // Replace with actual city data
  let provinces = ["Province 1", "Province 2", "Province 3"]; // Replace with actual province data
  let depts = ["Dept 1", "Dept 2", "Dept 3"]; // Replace with actual department data
  let subDepts = ["Sub Dept 1", "Sub Dept 2", "Sub Dept 3"]; // Replace with actual sub-department data
  let designations = ["Designation 1", "Designation 2", "Designation 3"]; // Replace with actual designation data
  let employees = []; // Replace with actual employee data

  let filters = {
    country: "",
    city: "",
    province: "",
    CNIC: "",
    dept: "",
    subDept: "",
    designation: ""
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

<!-- Filters -->
<div class="grid grid-cols-3 gap-4 mb-4">
  <!-- Country -->
  <div>
    <label for="country">Country:</label>
    <select id="country" bind:value={filters.country}>
      <option value="">Select Country</option>
      {#each countries as country}
        <option value={country}>{country}</option>
      {/each}
    </select>
  </div>
  <!-- City -->
  <div>
    <label for="city">City:</label>
    <select id="city" bind:value={filters.city}>
      <option value="">Select City</option>
      {#each cities as city}
        <option value={city}>{city}</option>
      {/each}
    </select>
  </div>
  <!-- Province -->
  <div>
    <label for="province">Province:</label>
    <select id="province" bind:value={filters.province}>
      <option value="">Select Province</option>
      {#each provinces as province}
        <option value={province}>{province}</option>
      {/each}
    </select>
  </div>
  <!-- CNIC -->
  <div>
    <label for="CNIC">CNIC#:</label>
    <input type="text" id="CNIC" bind:value={filters.CNIC} />
  </div>
  <!-- Dept -->
  <div>
    <label for="dept">Dept:</label>
    <select id="dept" bind:value={filters.dept}>
      <option value="">Select Dept</option>
      {#each depts as dept}
        <option value={dept}>{dept}</option>
      {/each}
    </select>
  </div>
  <!-- Sub Dept -->
  <div>
    <label for="subDept">Sub-Dept:</label>
    <select id="subDept" bind:value={filters.subDept}>
      <option value="">Select Sub-Dept</option>
      {#each subDepts as subDept}
        <option value={subDept}>{subDept}</option>
      {/each}
    </select>
  </div>
  <!-- Designation -->
  <div>
    <label for="designation">Designation:</label>
    <select id="designation" bind:value={filters.designation}>
      <option value="">Select Designation</option>
      {#each designations as designation}
        <option value={designation}>{designation}</option>
      {/each}
    </select>
  </div>
  <!-- Apply and Clear buttons -->
  <div class="col-span-3 flex justify-end">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={applyFilters}>Apply</button>
    <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2" on:click={clearFilters}>Clear</button>
  </div>
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
