<script>
  import { onMount } from 'svelte';
  import Pagination from "../../../components/Pagination/Pagination.svelte";
  import Toast from '../../../components/Confirmation/Toast.svelte';
  import { getAllDepartmentsApi, addDepartmentApi, updateDepartmentApi, deleteDepartmentApi,getAllEmployeesApi, } from '../../../services/api';
  import ConfirmationModal from '../../../components/Confirmation/ConfirmationModal.svelte';

  const edit1 = "../assets/img/icons8-edit-24.png";
  const edit2 = "../assets/img/icons8-tick-24.png";
  const delete1 = "../assets/img/icons8-delete-24.png";
  export let color = "light";

  let departments = [];

  let editingModes = {};
  let showModal = false;
  let editingMode = false;
  let currentEditDepartment = null;

  let departmentName = '';
  let designations = [];
  let newDesignation = '';

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

  let confirmationModal = false;
  let deptToDelete = null;

  function showDeleteConfirmation(department) {
    deptToDelete = department;
    confirmationModal = true;
  }
  function closeConfirmationModal() {
    confirmationModal = false;
    deptToDelete = null;
  }

  onMount(async () => {
    try {
      departments = await getAllDepartmentsApi();
      await fetchDelLogicEmployees();
      await fetchDelLogicRoom();
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    }
  });

  let delLogicLocations = []
  async function fetchDelLogicLocations() {
    try {
      delLogicLocations = await getAllLocationsApi(true);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  }

  let delLogicEmployees = []
  async function fetchDelLogicEmployees() {
    try {
      delLogicEmployees = await getAllEmployeesApi();
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  }

  function toggleEditingMode(departmentId) {
    editingModes[departmentId] = !editingModes[departmentId];
  }

  function editDepartment(department) {
    openModal(true, department);
  }

  function validateEditInputs(department) {
  if (!department.title || !department.designations.length) {
    showToasterMessage('All fields are required.', 'error');
    return false;
  }

  const lowerCaseDesignations = department.designations.map(d => d.title.toLowerCase());
  if (new Set(lowerCaseDesignations).size !== department.designations.length) {
    showToasterMessage('Designation names must be unique within the department!', 'error');
    return false;
  }

  return true;
}

  async function deleteDepartment() {
    try {
      for (let i = 0; i < delLogicEmployees.length; i++) {
          if(delLogicEmployees[i].department._id.toString() == deptToDelete._id.toString()){
            showToasterMessage('Cannot delete. Department is bind to a ' + delLogicEmployees[i].employeeID + ' Employee ID', 'error');
            return;
          }
      }

      const msg = await deleteDepartmentApi(deptToDelete._id);
      console.log(msg);
      showToasterMessage('Department deleted successfully!', 'success');
      closeConfirmationModal();
      departments = await getAllDepartmentsApi();
    } catch (error) {
      console.error('Failed to delete department:', error);
      showToasterMessage('An error occurred while deleting department. Please try again.', 'error');
    }
  }

  let selectedDepartments = new Set();

  function toggleSelection(departmentId) {
    if (selectedDepartments.has(departmentId)) {
      selectedDepartments.delete(departmentId);
    } else {
      selectedDepartments.add(departmentId);
    }
    selectedDepartments = new Set(selectedDepartments);
  }

  function toggleSelectAll() {
    if (selectedDepartments.size === departments.length) {
      selectedDepartments.clear();
    } else {
      departments.forEach(department => selectedDepartments.add(department.id));
    }
    selectedDepartments = new Set(selectedDepartments);
  }

  function openModal(isEdit = false, department = null) {
    showModal = true;
    editingMode = isEdit;
    if (isEdit && department) {
      currentEditDepartment = department;
      departmentName = department.title;
      designations = department.designations.map(d => d.title);
    } else {
      departmentName = '';
      designations = [];
      newDesignation = '';
    }
    resetValidationErrors();
  }

  function closeModal() {
    showModal = false;
    currentEditDepartment = null;
    departmentName = '';
    designations = [];
    newDesignation = '';
    resetValidationErrors();
  }

  function resetValidationErrors() {
    document.getElementById('departmentName-error').style.display = 'none';
    document.getElementById('designations-error').style.display = 'none';
  }

  function isDepartmentNameUnique(name, currentId = null) {
  return !departments.some(department => 
    department.title.toLowerCase() === name.toLowerCase() &&
    department._id !== currentId
  );
}


function validateAddInputs() {
    let isValid = true;

    if (!departmentName) {
      document.getElementById('departmentName-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('departmentName-error').style.display = 'none';
    }

    if (designations.length === 0) {
      document.getElementById('designations-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('designations-error').style.display = 'none';
    }

    const lowerCaseDesignations = designations.map(d => d.toLowerCase());
  if (new Set(lowerCaseDesignations).size !== designations.length) {
    showToasterMessage('Designation names must be unique within the department!', 'error');
    isValid = false;
  }

    return isValid;
  }

  async function addDepartment() {
  if (!isDepartmentNameUnique(departmentName)) {
    showToasterMessage('Department name must be unique!', 'error');
    return;
  }
  if (validateAddInputs()) {
    const newDepartment = { title: departmentName, designations: designations.map(d => ({ title: d })) };
    try {
      const msg = await addDepartmentApi(newDepartment);
      console.log(msg);
      departments = await getAllDepartmentsApi();
      showToasterMessage('Department added successfully!', 'success');
      closeModal();
    } catch (error) {
      console.error('Failed to add department:', error);
      showToasterMessage('An error occurred while adding department. Please try again.', 'error');
    }
  }
}

  async function saveDepartmentEdits() { 
  if (!isDepartmentNameUnique(departmentName, currentEditDepartment._id)) {
    showToasterMessage('Department name must be unique!', 'error');
    return;
  }
  if (validateAddInputs()) {
    const updatedDepartment = {
      ...currentEditDepartment,
      title: departmentName,
      designations: designations.map(d => ({ title: d }))
    };
    try {
      const msg = await updateDepartmentApi(updatedDepartment);
      console.log(msg);
      departments = await getAllDepartmentsApi();
      showToasterMessage('Department updated successfully!', 'success');
      closeModal();
    } catch (error) {
      console.error('Failed to update department:', error);
      showToasterMessage('An error occurred while updating department. Please try again.', 'error');
    }
  }
}

  function addDesignation() {
    if (newDesignation.trim()) {
      designations = [...designations, newDesignation.trim()];
      newDesignation = '';
    }
  }

  function removeDesignation(index) {
    designations = designations.filter((_, i) => i !== index);
  }

  function removeDesignationFromDepartment(department, index) {
    department.designations = department.designations.filter((_, i) => i !== index);
  }

  const departmentsPerPage = 5;
  let currentPage = 1;

  $: startIndex = (currentPage - 1) * departmentsPerPage;
  $: endIndex = Math.min(startIndex + departmentsPerPage, filteredDepartments.length);
  $: filteredDepartments = departments.filter(department => 
    department.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    department.designations.some(designation => designation.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  $: displayedDepartments = filteredDepartments.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(filteredDepartments.length / departmentsPerPage);

  function handlePageChange(event) {
    currentPage = event.detail.pageNumber;
  }

  let searchQuery = '';

  $: searchResultText = searchQuery
    ? filteredDepartments.length > 0
      ? ``
      : "No Result Found"
    : '';
  $: searchResultColor = filteredDepartments.length > 0 ? "text-blue-600 font-bold" : "text-red-600 font-bold";
</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  {#if showToaster}
    <Toast message={toasterMessage} type={toasterType} />
  {/if}
  <div class="flex justify-end mb-4">
    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
      <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
        Department and Designations
      </h3>
    </div>
    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={() => openModal(false)}>Add Department</button>
  </div>
  {#if confirmationModal}
  <ConfirmationModal
    message="Are you sure you want to delete this department"
    onConfirm={deleteDepartment}
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
                {editingMode ? 'Edit Department' : 'Add New Department'}
              </h3>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <div class="px-4 py-5 flex-auto">
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="departmentName">
                    Department Name
                  </label>
                  <input type="text" id="departmentName" placeholder="Department Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={departmentName}>
                  <span id="departmentName-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="newDesignation">
                    Designations
                  </label>
                  <div class="flex">
                    <input type="text" id="newDesignation" placeholder="Add Designation" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={newDesignation}>
                    <button class="bg-green-600 text-white active:bg-green-800 font-bold uppercase text-xs px-4 py-2 ml-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" on:click={addDesignation}>Add</button>
                  </div>
                  <span id="designations-error" class="text-red-600 text-xs" style="display: none;">* At least one designation is required</span>
                </div>
                <div>
                  {#each designations as designation, index}
                    <div class="flex items-center mb-2">
                      <span class="text-blueGray-600 text-sm">{designation}</span>
                      <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-2 py-1 ml-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" on:click={() => removeDesignation(index)}>Remove</button>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              {#if editingMode}
                <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={saveDepartmentEdits}>
                  Save
                </button>
              {:else}
                <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={addDepartment}>
                  Add
                </button>
              {/if}
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
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Department Name</th>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Designations</th>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"></th>
      </tr>
    </thead>
    <tbody>
      {#each displayedDepartments as department (department._id)}
        <tr>
          <td class="table-data font-bold text-blueGray-600" title={department.title}>
            <div class="flex items-center">
              {#if editingModes[department._id]}
                <input type="text" class="salary-input" bind:value={department.title}>
              {:else}
                <span>{department.title}</span>
              {/if}
            </div>
          </td>
          <td class="table-data" title={department.designations.map(d => d.title).join(', ')}>
            <div class="flex items-center">
              {#if editingModes[department._id]}
                <div>
                  {#each department.designations as designation, index}
                    <div class="flex items-center mb-2">
                      <input type="text" class="salary-input" bind:value={department.designations[index].title}>
                      <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-2 py-1 ml-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" on:click={() => removeDesignationFromDepartment(department, index)}>Remove</button>
                    </div>
                  {/each}
                  <div class="flex">
                    <input type="text" placeholder="Add Designation" class="salary-input" bind:value={newDesignation}>
                    <button class="bg-green-600 text-white active:bg-green-800 font-bold uppercase text-xs px-4 py-2 ml-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" on:click={() => { department.designations.push({ title: newDesignation }); newDesignation = ''; }}>Add</button>
                  </div>
                </div>
              {:else}
                <span>{department.designations.map(d => d.title).join(', ')}</span>
              {/if}
            </div>
          </td>
          <td>
            <div class="flex items-center">
              {#if editingModes[department._id]}
              <i class="fas fa-save mr-2 text-sm cursor-pointer" on:click={() => { if(validateEditInputs(department)) { saveDepartmentEdits(); toggleEditingMode(department._id); } }}></i>
              {:else}
              <i class="fas fa-edit mr-2 text-sm cursor-pointer" on:click={() => editDepartment(department)}></i>
              {/if}
              <div class="ml-2">
                <i class="fas fa-trash-alt mr-2 text-sm cursor-pointer" on:click={() => showDeleteConfirmation(department)}></i>
              </div>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
</div>
