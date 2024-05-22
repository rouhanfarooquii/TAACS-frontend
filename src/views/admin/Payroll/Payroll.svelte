<script>
  import { navigate } from 'svelte-routing';
  import Pagination from '../../../components/Pagination/Pagination.svelte';
  import { onMount } from 'svelte';
  import { getAllDepartmentsApi, getAllEmployeesApi, updateEmployeeJSONApi, batchUpdatePayrollApi } from '../../../services/api';

  let showModal = false;

  function openModal() {updateEmployeeJSONApi
    showModal = true;
  }

  const edit1 = "../assets/img/icons8-edit-24.png";
  const edit2 = "../assets/img/icons8-tick-24.png";
  export let color = "light";

  let departments = [];
  let trueDepartments = [];
  let designations = [];
  let valueTypes = ['Percentage', 'Absolute', 'Change'];
  let selectedDepartment = '';
  let selectedDesignation = '';
  let selectedValueType = '';
  let value = '';
  let employees = []; // Variable to store employee data

  // Disable designation field initially
  let isDesignationDisabled = true;

  // State variable to track editing mode for each user
  let editingModes = {};

  function toggleEditingMode(employeeId) {
    editingModes[employeeId] = !editingModes[employeeId];
  }

  async function saveSalaryChanges(employee) {
    let tempEmployee = JSON.parse(JSON.stringify(employee));
    tempEmployee.department = tempEmployee.department._id
    tempEmployee.designation = tempEmployee.designation._id
    for (let index = 0; index < tempEmployee.locations.length; index++) {
      tempEmployee.locations[index] = tempEmployee.locations[index]._id
    }
    delete tempEmployee.__v
    // console.log(tempEmployee)
    // return;
    try {
      // const updatedEmployee = { ...employee, salary: employee.salary }; // Only update the salary
      const responseMsg = await updateEmployeeJSONApi(tempEmployee);
      console.log('Response from API:', responseMsg);
      toggleEditingMode(employee._id); // Exit editing mode after save
    } catch (error) {
      console.error('Error updating salary:', error);
      console.error('Error details:', error.response ? error.response.data : error.message);
    }
  }

  function editSalary(employee) {
    toggleEditingMode(employee._id);
    // You can perform additional actions here if needed
  }

  let selectedUsers = new Set();

  // Define pagination logic
  const employeesPerPage = 5; // Adjust as needed
  let currentPage = 1;

  // Reactive statements to ensure proper updates
  $: startIndex = (currentPage - 1) * employeesPerPage;
  $: endIndex = Math.min(startIndex + employeesPerPage, filteredEmployees.length);
  $: displayedEmployees = filteredEmployees.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  function handlePageChange(event) {
    console.log("Received page change:", event.detail.pageNumber);  // Confirm event reception
    currentPage = event.detail.pageNumber;
  }

  async function update() {
    if (!validateBatchUpdateInputs()) {
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

    let temp = {
      department: payloadDepartment,
      designation: payloadDesignation,
      value: value,
      valueType: selectedValueType
    }

    try {
      const response = await batchUpdatePayrollApi(temp);
      console.log('Response from API:', response);
      selectedDepartment = '';
      selectedDesignation = '';
      selectedValueType = null;
      value = '';
      closeModal();
      await fetchEmployees();
    } catch (error) {
      console.error('Error updating access control:', error);
    }

    // console.log(temp)

    // return;
    // // Logic to handle batch update
    // console.log("Batch update performed");
    // // You can add logic to perform batch update here
    // // Reset fields after update
    // selectedDepartment = '';
    // selectedDesignation = '';
    // selectedValueType = null;
    // value = '';
    // closeModal();
  }

  function validateBatchUpdateInputs() {
    let isValid = true;

    if (!selectedDepartment) {
      document.getElementById('department-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('department-error').style.display = 'none';
    }

    if (!selectedDesignation) {
      document.getElementById('designation-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('designation-error').style.display = 'none';
    }

    if (!selectedValueType) {
      document.getElementById('value-type-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('value-type-error').style.display = 'none';
    }

    if (!value || parseFloat(value) === 0) {
      document.getElementById('value-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('value-error').style.display = 'none';
    }

    return isValid;
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

    document.getElementById('department-error').style.display = 'none';
    document.getElementById('designation-error').style.display = 'none';
    document.getElementById('value-type-error').style.display = 'none';
    document.getElementById('value-error').style.display = 'none';
  }

  // Search filter logic
  let searchQuery = '';
  $: filteredEmployees = employees.filter(employee => {
    return (
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.designation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.salary.toString().includes(searchQuery)
    );
  });

  $: searchResultText = searchQuery
    ? filteredEmployees.length > 0
      ? `Rows Found: ${filteredEmployees.length}`
      : "No Result Found"
    : '';
  $: searchResultColor = filteredEmployees.length > 0 ? "text-blue-600 font-bold" : "text-red-600 font-bold";

  onMount(async () => {
    await getAllDepartments();
    await fetchEmployees(); // Fetch employees on component mount
  });

  async function getAllDepartments() {
    trueDepartments = await getAllDepartmentsApi();
    departments = JSON.parse(JSON.stringify(trueDepartments));
    departments.push({ title: "All", _id: "All" });
  }

  async function fetchEmployees() {
    employees = await getAllEmployeesApi();
  }

  function setDesignation(event) {
    const selectedDepartmentTitle = event.target.value;
    if (selectedDepartmentTitle === "All") {
      designations = [{ title: "All", _id: "All" }];
      selectedDesignation = "All";
    } else {
      const selectedDept = trueDepartments.find(d => d.title === selectedDepartmentTitle);
      designations = [...selectedDept.designations, { title: "All", _id: "All" }];
      selectedDesignation = '';
    }
  }
</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <div class="flex justify-end mb-4">
    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
      <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
        Salary Information
      </h3>
    </div>
    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={openModal}>Batch Update</button>
</div>
    {#if showModal}
      <div class="modal">
        <div class="modal-content1">
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
                <div class="w-full lg:w-7/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                      Department:
                    </label>
                    <select class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedDepartment} on:change={setDesignation}>
                      <option value="" disabled selected>Select a department</option>
                      {#each departments as department}
                        <option value={department.title}>{department.title}</option>
                      {/each}
                    </select>
                    <span id="department-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                      Designation:
                    </label>
                    <select class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedDesignation}>
                      <option value="" disabled selected>Select a designation</option>
                      {#each designations as designation}
                        <option value={designation.title}>{designation.title}</option>
                      {/each}
                    </select>
                    <span id="designation-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                </div>
                <div class="w-full lg:w-7/12 px-4">
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
                    <span id="value-type-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="value">
                      Enter Value/Percentage:
                    </label>
                    <input type="number" min="0" id="value" placeholder="Enter Value/Percentage" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={value}>
                    <span id="value-error" class="text-red-600 text-xs" style="display: none;">* Value should not be zero</span>
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
    <div class="flex justify-between">
      <div class="relative mb-3">
        <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Search..." bind:value={searchQuery} />
      </div>
    </div>
    <p class="text-sm {searchResultColor}">{searchResultText}</p>
    <table>
      <thead>
        <tr>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Name</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Designation</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Department</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Salary</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Action</th>
        </tr>
      </thead>
      <tbody>
        {#each displayedEmployees as employee (employee._id)}
        <tr>
          <td class="table-data font-bold text-blueGray-600" title={employee.name}>{employee.name}</td>
          <td class="table-data" title={employee.designation.title}>{employee.designation.title}</td>
          <td class="table-data" title={employee.department.title}>{employee.department.title}</td>
          <td class="table-data" title={employee.salary}>
            <!-- Salary -->
            <div class="flex items-center">
              {#if editingModes[employee._id]}
                <input type="number" class="salary-input width80px text-xs" bind:value={employee.salary}>
              {:else}
                <span>{employee.salary}</span>
              {/if}
            </div>
          </td>
          <td>
            <!-- Edit button -->
            <div class="flex items-center">
              {#if editingModes[employee._id]}
              <i class="fas fa-save mr-2 text-sm cursor-pointer" on:click={() => saveSalaryChanges(employee)}></i>
              {:else}
              <i class="fas fa-edit mr-2 text-sm cursor-pointer" on:click={() => editSalary(employee)}></i>
              {/if}
            </div>
          </td>
        </tr>
        {/each}
      </tbody>
    </table>
    <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
</div>