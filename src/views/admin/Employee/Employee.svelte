<script>
  import { navigate } from 'svelte-routing';
  const edit1 = "../assets/img/icons8-edit-24.png"
    const view1 = "../assets/img/icons8-eye-24.png"
  let employees = [
    { id: 1, name: 'John Doe', department: 'HR', designation: 'Manager', details: 'Lorem ipsum', active: true },
    { id: 2, name: 'Jane Smith', department: 'Marketing', designation: 'Executive', details: 'Lorem ipsum', active: false },
    { id: 3, name: 'Bob Johnson', department: 'Sales', designation: 'Representative', details: 'Lorem ipsum', active: true },
    { id: 4, name: 'Alice Brown', department: 'IT', designation: 'Developer', details: 'Lorem ipsum', active: true },
    { id: 5, name: 'Mike Davis', department: 'Finance', designation: 'Analyst', details: 'Lorem ipsum', active: false },
    { id: 6, name: 'Emily Chen', department: 'Operations', designation: 'Coordinator', details: 'Lorem ipsum', active: true },
    { id: 7, name: 'Tom Harris', department: 'HR', designation: 'Generalist', details: 'Lorem ipsum', active: false },
    { id: 8, name: 'Sarah Lee', department: 'Marketing', designation: 'Specialist', details: 'Lorem ipsum', active: true },
    { id: 9, name: 'James Martin', department: 'Sales', designation: 'Manager', details: 'Lorem ipsum', active: true },
    { id: 10, name: 'Katherine White', department: 'IT', designation: 'QA Engineer', details: 'Lorem ipsum', active: false },
    { id: 11, name: 'Daniel Taylor', department: 'Finance', designation: 'Manager', details: 'Lorem ipsum', active: true },
    { id: 12, name: 'Lisa Nguyen', department: 'Operations', designation: 'Supervisor', details: 'Lorem ipsum', active: false },
    { id: 13, name: 'Brian Hall', department: 'HR', designation: 'Director', details: 'Lorem ipsum', active: true },
    { id: 14, name: 'Melissa Thompson', department: 'Marketing', designation: 'Executive', details: 'Lorem ipsum', active: false },
    { id: 15, name: 'Kevin Brooks', department: 'Sales', designation: 'Representative', details: 'Lorem ipsum', active: true },
    { id: 16, name: 'Rebecca Garcia', department: 'IT', designation: 'Developer', details: 'Lorem ipsum', active: true },
    { id: 17, name: 'Michael Rodriguez', department: 'Finance', designation: 'Analyst', details: 'Lorem ipsum', active: false },
    { id: 18, name: 'Elizabeth Lewis', department: 'Operations', designation: 'Coordinator', details: 'Lorem ipsum', active: true },
    { id: 19, name: 'William Jackson', department: 'HR', designation: 'Generalist', details: 'Lorem ipsum', active: false },
    { id: 20, name: 'Amy Walker', department: 'Marketing', designation: 'Specialist', details: 'Lorem ipsum', active: true },
  ]; // Replace with actual employee data
  export let color = "light";

  let filters = {
    search: '',
    experience: '',
    active: ''
  };

  let filteredEmployees = employees;

  function applyFilters() {
    filteredEmployees = employees.filter(employee => {
      const matchesSearch = filters.search === '' || 
        employee.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        employee.department.toLowerCase().includes(filters.search.toLowerCase()) ||
        employee.designation.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesExperience = filters.experience === '' || 
        (filters.experience === '0-1' && employee.experience >= 0 && employee.experience <= 1) ||
        (filters.experience === '1-3' && employee.experience > 1 && employee.experience <= 3) ||
        (filters.experience === '3-5' && employee.experience > 3 && employee.experience <= 5) ||
        (filters.experience === '5+' && employee.experience > 5);

      const matchesActive = filters.active === '' || 
        (filters.active === 'true' && employee.active) ||
        (filters.active === 'false' && !employee.active);

      return matchesSearch && matchesExperience && matchesActive;
    });
  }

  function clearFilters() {
    filters.search = '';
    filters.experience = '';
    filters.active = '';
    filteredEmployees = employees;
  }

  function showRecords(value) {
    // Show x records logic here
  }

  function navigateToAddEmployee() {
    navigate('/admin/addemployee');
  }

  function editEmployee(employee)
    {

    }

    function viewEmployee(employeesId)
    {
      navigate('/employee/${employeeId}');
      
    }
</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <!-- Add Employee Button -->
  <div class="flex justify-end mb-4">
    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
      <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
        Employee Information
      </h3>
    </div>
    <button class=" bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={navigateToAddEmployee}>
      Add Employee
    </button>
  </div>

  <!-- Search Bar -->
  <div class="flex justify-between mb-4">
    <div>
      <label for="searchBar">Search:</label>
      <br>
      <input type="text" id="searchBar" name="searchBar" class="filter-input" placeholder="Search by ID, Name, Department, Designation" bind:value={filters.search} />
    </div>
    <div>
      <label for="filterExperience">Experience:</label>
      <br>
      <select id="filterExperience" name="filterExperience" class="filter-input" bind:value={filters.experience}>
        <option value="">All</option>
        <option value="0-1">0-1 years</option>
        <option value="1-3">1-3 years</option>
        <option value="3-5">3-5 years</option>
        <option value="5+">5+ years</option>
      </select>
    </div>
    <div>
      <label for="filterActive">Active:</label>
      <br>
      <select id="filterActive" name="filterActive" class="filter-input" bind:value={filters.active}>
        <option value="">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
  </div>

  <!-- Buttons -->
  <div class="flex justify-end mb-1">
    <button on:click={applyFilters} class="bg-green-500 active:bg-green-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mr-2">Apply</button>
    <button on:click={clearFilters} class="bg-red-400 active:bg-red-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">Clear</button>
  </div>

  <!-- Divider -->
  <hr class="my-2">

  <!-- Table -->
  <table class="min-w-full">
    <thead>
      <tr>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">#</th>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Employee</th>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Department</th>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Designation</th>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Details</th>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Active</th>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Action</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredEmployees as employee, index}
        <tr>
          <td class="table-data">{index + 1}</td>
          <td class="table-data">{employee.name}</td>
          <td class="table-data">{employee.department}</td>
          <td class="table-data">{employee.designation}</td>
          <td class="table-data">{employee.details}</td>
          <td class="table-data">{employee.active ? 'Yes' : 'No'}</td>
          <td class='table-data'>
            <div class="flex">
              <img src={edit1} alt="Edit" class="h-6 w-6 cursor-pointer" onclick={() => editEmployee(employee.id)} />
              <img src={view1} alt="View" class="h-6 w-6 cursor-pointer ml-2" onclick={() => viewEmployee(employee.id)} />
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- Show x Records -->
  <div class="mt-4">
    <label for="showRecords">Show Records:</label>
    <select id="showRecords" class="small-dropdown rounded" on:change="{() => showRecords(this.value)}">
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  </div>
</div>
