<script>
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
