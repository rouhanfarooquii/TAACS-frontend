<script>
  import { navigate } from 'svelte-routing';
  import BatchUpdateModal from './BatchUpdateModal.svelte';
  import Pagination from '../../../components/Pagination/Pagination.svelte';

  let showModal = false;

  function openModal() {
    showModal = true;
  }
  const edit1 = "../assets/img/icons8-edit-24.png"
  const edit2 = "../assets/img/icons8-tick-24.png"
  export let color = "light";

  let departments = ['Marketing', 'Finance', 'Human Resources', 'Information Technology', 'Sales', 'Operations'];
  let designations = ['Sales Manager', 'Software Engineer', 'Marketing Specialist', 'HR Manager', 'Financial Analyst'];
  let valueTypes = ['Percentage', 'Absolute', 'Change'];
  let selectedDepartment = '';
  let selectedDesignation = '';
  let selectedValueType = '';
  let value = '';

  let departmentDesignations = {
    "Marketing": ["Marketing Manager", "Marketing Coordinator", "Brand Manager", "Digital Marketing Specialist"],
    "Finance": ["Chief Financial Officer (CFO)", "Financial Analyst", "Accountant", "Finance Manager"],
    "Human Resources": ["Human Resources Manager", "Recruitment Specialist", "Training Coordinator", "HR Assistant"],
    "Information Technology": ["Chief Information Officer (CIO)", "IT Manager", "Systems Administrator", "Software Developer"],
    "Sales": ["Sales Manager", "Sales Representative", "Account Executive", "Business Development Manager"],
    "Operations": ["Operations Manager", "Operations Coordinator", "Supply Chain Manager", "Logistics Specialist"],
    "Customer Service": ["Customer Service Manager", "Customer Support Representative", "Client Relations Specialist"],
    "Legal": ["General Counsel", "Legal Assistant", "Paralegal", "Legal Counsel"],
    "Administration": ["Office Manager", "Executive Assistant", "Administrative Assistant", "Office Coordinator"]
  };
  let designation = [];

  // Disable designation field initially
  let isDesignationDisabled = true;

  let salaries = [
    { id: '1', name: 'Alice Budgies', department: 'Sales', designation: 'Sales Manager', salary: 80000 },
    { id: '2', name: 'Bob', department: 'Engineering', designation: 'Software Engineer', salary: 70000 },
    { id: '3', name: 'Charlie', department: 'Marketing', designation: 'Marketing Specialist', salary: 60000 },
    { id: '4', name: 'David', department: 'HR', designation: 'HR Manager', salary: 75000 },
    { id: '5', name: 'Eve', department: 'Finance', designation: 'Financial Analyst', salary: 65000 },
    { id: '6', name: 'Frank', department: 'Sales', designation: 'Sales Associate', salary: 55000 },
    { id: '7', name: 'Grace', department: 'Engineering', designation: 'Software Developer', salary: 72000 },
    { id: '8', name: 'Henry', department: 'Marketing', designation: 'Marketing Manager', salary: 68000 },
    { id: '9', name: 'Ivy', department: 'HR', designation: 'HR Specialist', salary: 60000 },
    { id: '10', name: 'Jack', department: 'Finance', designation: 'Financial Manager', salary: 78000 },
    { id: '11', name: 'Kate', department: 'Sales', designation: 'Sales Executive', salary: 60000 },
    { id: '12', name: 'Leo', department: 'Engineering', designation: 'Senior Software Engineer', salary: 85000 },
    { id: '13', name: 'Mia', department: 'Marketing', designation: 'Marketing Coordinator', salary: 55000 },
    { id: '14', name: 'Nick', department: 'HR', designation: 'HR Assistant', salary: 50000 },
    { id: '15', name: 'Olivia', department: 'Finance', designation: 'Financial Analyst', salary: 62000 },
  ];

  // State variable to track editing mode for each user
  let editingModes = {};

  function toggleEditingMode(userId) {
    editingModes[userId] = !editingModes[userId];
  }

  function saveSalaryChanges(salaries) {
    // Logic to save the changes made to the salary
    console.log("Saved changes for user:", salaries);
    // Assuming you have backend logic here to update the salary
  }

  function editSalary(salaries) {
    toggleEditingMode(salaries.id);
    // You can perform additional actions here if needed
  }

  let selectedUsers = new Set();

  // Define pagination logic
  const salariesPerPage = 5; // Adjust as needed
  let currentPage = 1;

  // Reactive statements to ensure proper updates
  $: startIndex = (currentPage - 1) * salariesPerPage;
  $: endIndex = Math.min(startIndex + salariesPerPage, filteredSalaries.length);
  $: displayedSalaries = filteredSalaries.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(filteredSalaries.length / salariesPerPage);

  function handlePageChange(event) {
    console.log("Received page change:", event.detail.pageNumber);  // Confirm event reception
    currentPage = event.detail.pageNumber;
  }

  function update() {
    // Logic to handle batch update
    console.log("Batch update performed");
    // You can add logic to perform batch update here
    // Reset fields after update
    selectedDepartment = '';
    selectedDesignation = '';
    selectedValueType = null;
    value = '';
  }

  function selectValueType(value) {
    selectedValueType = value;
  }

  function closeModal() {
    showModal = false;
    selectedDepartment = '';
    selectedDesignation = '';
    selectedValueType = '';
    value = '';
  }

  // Search filter logic
  let searchQuery = '';
  $: filteredSalaries = salaries.filter(salary => {
    return (
      salary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salary.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salary.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salary.salary.toString().includes(searchQuery)
    );
  });

  $: searchResultText = searchQuery
    ? filteredSalaries.length > 0
      ? `Rows Found: ${filteredSalaries.length}`
      : "No Result Found"
    : '';
  $: searchResultColor = filteredSalaries.length > 0 ? "text-blue-600 font-bold" : "text-red-600 font-bold";

</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <div class="relative w-full px-4 max-w-full flex-grow flex-1">
    <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
      Salary Information
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
                      Enter Value/Percentage:
                    </label>
                    <input type="text" id="Enter Value/Percentage" placeholder="Enter Value/Percentage" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={value}>
                  </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="value-type">
                      Value Type:
                    </label>
                    <div id="value-type" class="flex">
                      {#each valueTypes as type}
                        <label class="inline-flex items-center mt-3 mr-3">
                          <input type="radio" class="form-radio h-5 w-5 text-blueGray-600" value={type} on:click={() => selectValueType(type)} checked={selectedValueType === type}>
                          <span class="ml-2 text-blueGray-600">{type}</span>
                        </label>
                      {/each}
                    </div>
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
    <input type="search" class="mb-4 bg-gray-800 text-black rounded-lg px-4 py-2" placeholder="Search..." bind:value={searchQuery}>
    {#if searchQuery}
      <span class="{searchResultColor}">{searchResultText}</span>
    {/if}
    <table>
      <thead>
        <tr>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Name</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Designation</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Department</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Salary</th>
        </tr>
      </thead>
      <tbody>
        {#each displayedSalaries as salaries (salaries.id)}
        <tr>
          <td class="table-data font-bold text-blueGray-600" title={salaries.name}>{salaries.name}</td>
          <td class="table-data" title={salaries.designation}>{salaries.designation}</td>
          <td class="table-data" title={salaries.department}>{salaries.department}</td>
          <td class="table-data" title={salaries.salary}>
            <!-- Salary -->
            <div class="flex items-center">
              {#if editingModes[salaries.id]}
                <input type="number" class="salary-input width80px text-xs" style="" bind:value={salaries.salary}>
              {:else}
                <span>{salaries.salary}</span>
              {/if}
            </div>
          </td>
          <td>
            <!-- Edit button -->
            <div class="flex items-center">
              {#if editingModes[salaries.id]}
                <!-- Save button -->
                <img src={edit2} alt="Save" class="icon-button cursor-pointer" on:click={() => {saveSalaryChanges(salaries); toggleEditingMode(salaries.id);}}>
              {:else}
                <!-- Edit button -->
                <img src={edit1} alt="Edit" class="icon-button cursor-pointer" on:click={() => editSalary(salaries)} />
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
