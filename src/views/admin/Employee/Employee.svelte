<script>
  import { onMount } from 'svelte';
  import { getAllEmployeesApi, deleteEmployeeApi, updateEmployeePasswordApi } from '../../../services/api';
  import Pagination from "../../../components/Pagination/Pagination.svelte";
  import Multiselect from "../../../components/Dropdowns/MultiSelect.svelte";
  import { navigate } from 'svelte-routing';
  import ConfirmationModal from '../../../components/Confirmation/ConfirmationModal.svelte';
  import { getAllDepartmentsApi, getAllLocationsApi, getAllShiftTimingsApi, updateEmployeeApi, getAllLeavesApi,getAllParkingsApi,getAllRoomBookingsApi,getAllVisitorsApi } from '../../../services/api';
  import Toast from '../../../components/Confirmation/Toast.svelte';

  const edit1 = "../assets/img/icons8-edit-24.png";
  const view1 = "../assets/img/icons8-eye-24.png";
  let selectedEmployee = null;
  let showModal = false;
  let editModal = false;
  let reportModal = false;
  let passwordModal = false;
  let pass = '';
  export let color = "light";

  let filters = {
    search: '',
    active: ''
  };

  let employees = [];
  let filteredEmployees = [];

  let trueLocations = []
  let trueDepartments = []
  let trueShiftTimings = []

  let dropdownOpen = false;
  let selectedLocations = [];
  let accessibleLocations = [];

  let shiftTimings = [];

  let departments =[]

  let file = null
  
  let confirmationModal = false;
  let empToDelete = null;

  let dateFrom = '';
  let dateTo = '';

  let showToaster = false;
  let toasterMessage = '';
  let toasterType = '';

  function showToasterMessage(message, type) {
    toasterMessage = message;
    toasterType = type;
    showToaster = true;
    setTimeout(() => {
      showToaster = false;
    }, 3000); // Show toast for 3 seconds
  }

  function showDeleteConfirmation(selectedEmployee) {
    editModal = false;
    empToDelete = selectedEmployee;
    confirmationModal = true;
  }
  function closeConfirmationModal() {
    confirmationModal = false;
    empToDelete = null;
  }

  onMount(async () => {
    await fetchEmployees();
    await fetchLocations();
    await fetchDepartments();
    await fetchShiftTimings();
    await fetchDelLogicleaves();
    await fetchDelLogicRooms();
    await fetchDelLogicParkings();
  });


  let delLogicLeaves = []
  async function fetchDelLogicleaves() {
    try {
      delLogicLeaves = await getAllLeavesApi();
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  }

  let delLogicRooms = []
  async function fetchDelLogicRooms() {
    try {
      delLogicRooms = await getAllRoomBookingsApi();
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  }

  let delLogicParkings = []
  async function fetchDelLogicParkings() {
    try {
      delLogicParkings = await getAllParkingsApi();
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  }

  async function fetchEmployees() {
    try {
      const fetchedEmployees = await getAllEmployeesApi();
      filteredEmployees = fetchedEmployees;
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }

  async function fetchLocations() {
    try {
      trueLocations = await getAllLocationsApi();
      accessibleLocations = trueLocations.map(loc => loc.title);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }

  async function fetchShiftTimings() {
    try {
      trueShiftTimings = await getAllShiftTimingsApi();
      shiftTimings = trueShiftTimings.map(shift => shift.shiftName);
    } catch (error) {
      console.error('Error fetching shift timings:', error);
    }
  }

  async function fetchDepartments() {
    try {
      trueDepartments = await getAllDepartmentsApi();
      departments = trueDepartments.map(o => o.title);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  }

  function applyFilters() {
  currentPage = 1;
  filteredEmployees = employees.filter(employee => {
    const matchesSearch = filters.search === '' ||
      employee.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      employee.department.toLowerCase().includes(filters.search.toLowerCase()) ||
      employee.designation.toLowerCase().includes(filters.search.toLowerCase());

    const matchesActive = filters.active === '' ||
      (filters.active === 'true' && employee.active) ||
      (filters.active === 'false' && !employee.active);

    return matchesSearch && matchesActive;
  });
}

function clearFilters() {
  filters.search = '';
  filters.active = '';
  currentPage = 1;
  filteredEmployees = employees;
}

  function navigateToAddEmployee() {
    navigate('/admin/addemployee');
  }

  async function deleteEmployee() {
    try {

      for (let i = 0; i < delLogicParkings.length; i++) {
          if(delLogicParkings[i].employee._id.toString() == empToDelete._id.toString()){
            showToasterMessage('Cannot delete. Device is bind to a ' + delLogicParkings[i].employeeID + ' visitor ID', 'error');
            return;
          }
      }

      for (let i = 0; i < delLogicRooms.length; i++) {
          if(delLogicRooms[i].employee._id.toString() == empToDelete._id.toString()){
            showToasterMessage('Cannot delete. Department is bind to a Room ', 'error');
            return;
          }
      }

      for (let i = 0; i < delLogicLeaves.length; i++) {
          if(delLogicLeaves[i].employee._id.toString() == empToDelete._id.toString()){
            showToasterMessage('Cannot delete. Device is bind to a ' + delLogicLeaves[i] + ' Emergency ID', 'error');
            return;
          }
      }



        const msg = await deleteEmployeeApi(empToDelete._id);
        console.log(msg);
        showToasterMessage('Employee deleted successfully!', 'success');
        closeConfirmationModal();  // Ensure the modal is closed after deletion
        filteredEmployees = await getAllEmployeesApi();
    } catch (error) {
        console.error('Failed to delete employee:', error);
        showToasterMessage('An error occurred while deleting the employee. Please try again.', 'error');
    }
  }

  async function editEmployee() {

    let loc = []
    for (let index = 0; index < selectedLocations.length; index++) {
      loc.push(trueLocations.find(o => o.title == selectedLocations[index])._id)
      // loc.push(selectedLocations[index])
      // selectedEmployee.locations[index] = selectedEmployee.locations[index]._id
    }
    selectedEmployee.locations = loc
    let dep = trueDepartments.find(o => o.title == selectedEmployee.department)
    let des = dep.designations.find(o => o.title == selectedEmployee.designation)._id
    dep = dep._id
    selectedEmployee.department = dep
    selectedEmployee.designation = des
    let sif = trueShiftTimings.find(o => o.shiftName == selectedEmployee.shiftTiming)._id
    selectedEmployee.shiftTiming = sif

    // console.log(loc)
    // console.log(selectedEmployee._id)
    // return;

    const formData = new FormData();
    formData.append('_id', selectedEmployee._id);
    formData.append('employeeID', selectedEmployee.employeeID);
    formData.append('name', selectedEmployee.name);
    formData.append('mobileNumber', selectedEmployee.mobileNumber);
    formData.append('locations', loc);
    formData.append('department', dep);
    formData.append('designation', des);
    formData.append('gender', selectedEmployee.gender);
    formData.append('email', selectedEmployee.email);
    formData.append('address', selectedEmployee.address);
    formData.append('dateOfBirth', selectedEmployee.dateOfBirth);
    formData.append('cardIdNumber', selectedEmployee.cardIdNumber);
    formData.append('personalPassword', selectedEmployee.personalPassword);
    formData.append('fingerIndex1', selectedEmployee.fingerIndex1);
    formData.append('fingerIndex2', selectedEmployee.fingerIndex2);
    formData.append('isFingerAdded', selectedEmployee.isFingerAdded);
    formData.append('active', selectedEmployee.active);
    formData.append('salary', selectedEmployee.salary);
    formData.append('shiftTiming', sif);
    if(file) {formData.append('file', file);}

    try {
      await updateEmployeeApi(formData);
      closeModal()
      await fetchEmployees()
      showToasterMessage('Employee updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating employee:', error);
      showToasterMessage('An error occurred while updating the employee. Please try again.', 'error');
    }
  }

  // async function updatePassword() {
  //   const formData = new FormData();
  //   formData.append('_id', selectedEmployee._id);
  //   formData.append('password', selectedEmployee.password);

  //   console.log(formData);

  //   try {
  //     await updateEmployeeApi(formData);
  //     closeModal()
  //     await fetchEmployees()
  //     showToasterMessage('Password updated successfully!', 'success');
  //   } catch (error) {
  //     console.error('Error updating password:', error);
  //     showToasterMessage('An error occurred while updating the password. Please try again.', 'error');
  //   }
  // }

  async function updatePassword() {
    selectedEmployee.password = pass;

    const updateData = {
      _id: selectedEmployee._id,
      password: selectedEmployee.password
    };

    console.log(updateData);

    try {
      await updateEmployeePasswordApi(updateData);
      closeModal();
      await fetchEmployees();
      showToasterMessage('Password updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating password:', error);
      showToasterMessage('An error occurred while updating the password. Please try again.', 'error');
    }
  }


  function viewEmployee(employee) {
    selectedEmployee = employee
    showModal = true;
  }

  function viewAttendance(employee)
  {
    selectedEmployee = employee
    reportModal = true;
  }

  function setPassword(employee)
  {
    pass = '';
    selectedEmployee = employee
    passwordModal = true;
  }

  function openEditModal(emp) {
    let employee = JSON.parse(JSON.stringify(emp))
    employee.dateOfBirth = new Date(employee.dateOfBirth).toISOString().slice(0, 10)
    let temp = []
    for (let index = 0; index < employee.locations.length; index++) {
      temp.push(employee.locations[index].title)
    }
    selectedLocations = temp
    employee.department = employee.department.title
    employee.designation = employee.designation.title
    employee.shiftTiming = employee.shiftTiming.shiftName

    selectedEmployee = employee
    


    editModal = true;
  }

  function closeModal() {
    showModal = false;
    editModal = false;
    reportModal = false;
    passwordModal = false;
  }

  function validateInputs() {
    let isValid = true;

    // Validate all the required fields
    // ...

    return isValid;
  }

  // $: availableDesignations = selectedEmployee?.department ? departments[selectedEmployee.department] || [] : [];

  $: availableDesignations = selectedEmployee?.department ? (trueDepartments.find(d => d.title === selectedEmployee?.department)?.designations).map(o => o.title) || [] : [];

  // $: paginatedEmployees = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const itemsPerPage = 5;
let currentPage = 1;

$: startIndex = (currentPage - 1) * itemsPerPage;
$: endIndex = Math.min(startIndex + itemsPerPage, filteredEmployees.length);
$: displayedEmployees = filteredEmployees.slice(startIndex, endIndex);
$: totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

function handlePageChange(event) {
  currentPage = event.detail.pageNumber;
}

let searchQuery = '';

</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  {#if showToaster}
    <Toast message={toasterMessage} type={toasterType} />
  {/if}
  <!-- Add Employee Button -->
  <div class="flex justify-end mb-4">
    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
      <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
        Employee Information
      </h3>
    </div>
    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={navigateToAddEmployee}>
      Add Employee
    </button>
  </div>

  <!-- Search Bar -->
  <div class="flex mb-4">
    <div class="relative mb-3 w-4/10 mr-4">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="searchBar">Search:</label>
      <input type="text" id="searchBar" name="searchBar" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Search by ID, Name, Department, Designation" bind:value={filters.search} />
    </div>
    <div class="relative mb-3 w-auto">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="filterActive">Active:</label>
      <select id="filterActive" name="filterActive" class="border-0 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={filters.active}>
        <option value="">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
  </div>

  <!-- Buttons -->
  <div class="flex justify-end mb-1">
    <button on:click={applyFilters} class="bg-green-600 active:bg-green-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mr-2">Apply</button>
    <button on:click={clearFilters} class="bg-red-600 text-white active:bg-red-800 uppercase font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">Clear</button>
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
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Active</th>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Action</th>
      </tr>
    </thead>
    <tbody>
      {#each displayedEmployees as employee, index}
        <tr>
          <td class="table-data ">{(currentPage - 1) * itemsPerPage + index + 1}</td>
          <td class="table-data font-bold text-blueGray-600">{employee.name}</td>
          <td class="table-data">{employee.department.title}</td>
          <td class="table-data">{employee.designation.title}</td>
          <td class="table-data">{employee.active ? 'Yes' : 'No'}</td>
          <td class='table-data'>
            <div class="flex">
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <i class="fas fa-edit mr-2 text-sm cursor-pointer" on:click={() => openEditModal(employee)}></i>
              <i class="fas fa-eye mr-2 text-sm cursor-pointer" on:click={() => viewEmployee(employee)}></i>
              <i class="fas fa-table mr-2 text-sm cursor-pointer" on:click={() => viewAttendance(employee)}></i>
              {#if employee.password == null}
              <i class="fas fa-lock-open mr-2 text-sm cursor-pointer" on:click={() => setPassword(employee)}></i>
              {:else}
              <i class="fas fa-lock mr-2 text-sm cursor-pointer" on:click={() => setPassword(employee)}></i>
              {/if}
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
  <!-- <Pagination {currentPage} {itemsPerPage} totalItems={filteredEmployees.length} on:pageChange={handlePageChange} /> -->

  {#if confirmationModal}
  <ConfirmationModal
    message="Are you sure you want to delete this employee"
    onConfirm={deleteEmployee}
    onCancel={closeConfirmationModal}
  />
{/if}
  {#if showModal}
    <div class="modal">
      <div class="modal-content">
        <div class="rounded-t mb-0 px-4 py-10 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-blueGray-700">
                Employee Details
              </h3>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <div class="px-4 py-5 flex-auto">
            <div class="flex">
              <div class="w-full lg:w-6/12 px-4 mb-6">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-name">
                    ID:
                  </label>
                  <p>{selectedEmployee.employeeID}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-name">
                    Name:
                  </label>
                  <p>{selectedEmployee.name}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Phone Number:
                  </label>
                  <p>{selectedEmployee.mobileNumber}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-id">
                    Department:
                  </label>
                  <p>{selectedEmployee.department}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Designation:
                  </label>
                  <p>{selectedEmployee.designation}</p>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Gender:
                  </label>
                  <p>{selectedEmployee.gender}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Email:
                  </label>
                  <p>{selectedEmployee.email}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Address:
                  </label>
                  <p>{selectedEmployee.address}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Date of birth:
                  </label>
                  <p>{selectedEmployee.dateOfBirth}</p>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Card ID:
                  </label>
                  <p>{selectedEmployee.cardIdNumber}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Personal Password:
                  </label>
                  <p>{selectedEmployee.personalPassword}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Finger Index 1:
                  </label>
                  <p>{selectedEmployee.fingerIndex1}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Finger Index 2:
                  </label>
                  <p>{selectedEmployee.fingerIndex2}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Finger Added:
                  </label>
                  <p>{selectedEmployee.isFingerAdded ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Salary:
                  </label>
                  <p>{selectedEmployee.salary}</p>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Active:
                  </label>
                  <p>{selectedEmployee.active ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={closeModal}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  {#if editModal}
  <div class="modal">
    <div class="modal-content">
      <div class="rounded-t mb-0 px-4 py-10 border-0">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-lg text-blueGray-700">
              Edit Employee
            </h3>
          </div>
          <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"  on:click={() => showDeleteConfirmation(selectedEmployee)}>
              Delete
            </button>
          </div>
        </div>
      </div>
      <div class="block w-full overflow-x-auto">
        <div class="px-4 py-5 flex-auto">
          <div class="flex">
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-name">
                    Name:
                  </label>
                  <input type="text" id="name" placeholder="Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.name}>
                  <span id="name-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Phone Number:
                  </label>
                  <input type="number" min="0" id="phone-number" placeholder="03xx-xxxxxxx" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.mobileNumber}>
                  <span id="phone-number-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  <span id="phone-number-format-error" class="text-red-600 text-xs" style="display: none;">Enter correct number - 11 digits</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-id">
                    Department:
                  </label>
                  <select id="department" class="border-0 px-8 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.department}>
                    <option value="" disabled selected>Select Department</option>
                    {#each departments as dept}
                      <option value={dept}>{dept}</option>
                    {/each}
                  </select>
                  <span id="department-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Designation:
                  </label>
                  <select id="designation" class="border-0 px-8 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.designation} disabled={!selectedEmployee.department}>
                    <option value="" disabled selected>Select Designation</option>
                    {#each availableDesignations as desig}
                      <option value={desig}>{desig}</option>
                    {/each}
                  </select>
                  <span id="designation-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Gender:
                  </label>
                  <select id="gender" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.gender}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Prefer Not To Say</option>
                  </select>
                  <span id="gender-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Email:
                  </label>
                  <input type="text" id="email" placeholder="Email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.email}>
                  <span id="email-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  <span id="email-format-error" class="text-red-600 text-xs" style="display: none;">Email format incorrect</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Address:
                  </label>
                  <input type="text" id="address" placeholder="Address" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.address}>
                  <span id="address-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Date of birth:
                  </label>
                  <input type="date" id="date-of-birth" placeholder="Date of birth" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.dateOfBirth}>
                  <span id="date-of-birth-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Card ID:
                  </label>
                  <input type="text" id="card-id" placeholder="Card ID" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.cardIdNumber}>
                  <span id="card-id-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Personal Password
                  </label>
                  <input type="text" id="personal-password" placeholder="Personal Password" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.personalPassword}>
                  <span id="personal-password-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Finger Index 1:
                  </label>
                  <input type="number" min="0" id="finger-index-1" placeholder="Finger Index 1" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.fingerIndex1}>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Finger Index 2:
                  </label>
                  <input type="number" min="0" id="finger-index-2" placeholder="Finger Index 2" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.fingerIndex2}>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="accessible-devices">
                    Accessible Locations:
                  </label>
                  <Multiselect bind:selectedOptions={selectedLocations} options={accessibleLocations} />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Salary:
                  </label>
                  <input type="number" min="0" id="salary" placeholder="Salary" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.salary}>
                  <span id="salary-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Active:
                  </label>
                  <label class="switch">
                    <input type="checkbox" id="status" class="hidden" bind:checked={selectedEmployee.active}>
                    <span class="slider round"></span>
                  </label>
                  <span id="finger-added-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="shift-timing">
                    Shift Timing:
                  </label>
                  <select id="shift-timing" class="border-0 px-8 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.shiftTiming}>
                    <option value="" disabled selected>Select Shift Timing</option>
                    {#each shiftTimings as shift}
                      <option value={shift}>{shift}</option>
                    {/each}
                  </select>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                    Finger Added:
                  </label>
                  <label class="switch">
                    <input type="checkbox" id="status" class="hidden" bind:checked={selectedEmployee.isFingerAdded}>
                    <span class="slider round"></span>
                  </label>
                  <span id="finger-added-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={editEmployee}>
                Update
              </button>
              <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={closeModal}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
  {#if reportModal}
  <div class="modal">
    <div class="modal-content">
      <div class="rounded-t mb-0 px-4 py-10 border-0">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-lg text-blueGray-700">
              View Attendance
            </h3>
          </div>
        </div>
      </div>
      <div class="block w-full overflow-x-auto">
        <div class="px-4 py-5 flex-auto">
          <div class="flex">
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="date-from">
                  Date From:
                </label>
                <input type="date" id="date-from" bind:value={dateFrom} class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                <span id="date-from-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="date-to">
                  Date To:
                </label>
                <input type="date" id="date-to" bind:value={dateTo} class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
              </div>
            </div>
          </div>
          <div class="block w-full overflow-x-auto">
            <table id="attendance-table" class="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Date</th>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <!-- Example row -->
                <tr>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">2024-05-01</td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">Present</td>
                </tr>
                <!-- Additional rows will be added dynamically -->
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex justify-end mb-4">
          <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={closeModal}>
            Back
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
{#if passwordModal}
  <div class="modal">
    <div class="modal-content w-4/10">
      <div class="rounded-t mb-0 px-4 py-10 border-0">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-lg text-blueGray-700">
              {#if selectedEmployee.password == null}
                Set Password
              {:else}
                Change Password
              {/if}
            </h3>
          </div>
        </div>
      </div>
      <div class="block w-full overflow-x-auto">
        <div class="px-4 py-5 flex-auto">
          <div class="flex">
            <div class="w-full px-4">
              <div class="relative mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-name">
                  Name:
                </label>
                <input type="text" id="name" placeholder="Name" class="w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150" disabled bind:value={selectedEmployee.name}>
                <span id="name-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
              </div>
              <div class="relative mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                  Password
                </label>
                <input type="password" id="password" placeholder="Password" class="w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150" bind:value={pass} style="width: 100%;">
                <span id="password-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={updatePassword}>
              {#if selectedEmployee.password == null}
                Set Password
              {:else}
                Change Password
              {/if}
            </button>
            <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={closeModal}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
</div>
