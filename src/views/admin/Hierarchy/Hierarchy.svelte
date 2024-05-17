<script>
  import { onMount } from 'svelte';
  import { onDestroy } from 'svelte';
  import Pagination from "../../../components/Pagination/Pagination.svelte";

  const edit1 = "../assets/img/icons8-edit-24.png";
  const edit2 = "../assets/img/icons8-tick-24.png";
  const delete1 = "../assets/img/icons8-delete-24.png";
  export let color = "light";

  let departments = [
    { id: '1', departmentName: 'Human Resources', designations: ['Manager', 'Assistant', 'Intern'] },
    { id: '2', departmentName: 'Finance', designations: ['Accountant', 'Analyst', 'Intern'] },
    { id: '3', departmentName: 'IT', designations: ['Developer', 'SysAdmin', 'Intern'] },
    // ... other departments
  ];

  let editingModes = {};

  function toggleEditingMode(departmentId) {
    editingModes[departmentId] = !editingModes[departmentId];
  }

  function saveDepartmentChanges(department) {
    console.log("Saved changes for department:", department);
  }

  function editDepartment(department) {
    toggleEditingMode(department.id);
  }

  function validateEditInputs(department) {
    if (!department.departmentName || !department.designations.length) {
      alert("All fields are required.");
      return false;
    }
    return true;
  }

  function deleteDepartment(department) {
    departments = departments.filter(d => d.id !== department.id);
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

  let showModal = false;

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    departmentName = '';
    designations = [];
    newDesignation = '';
    resetValidationErrors();
  }

  function resetValidationErrors() {
    document.getElementById('departmentName-error').style.display = 'none';
    document.getElementById('designations-error').style.display = 'none';
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

    return isValid;
  }

  async function addDepartment() {
    if (validateAddInputs()) {
      const isDuplicate = departments.some(department => department.departmentName === departmentName);

      if (isDuplicate) {
        alert('Department Name must be unique.');
        return;
      }

      departments.push({ id: Date.now().toString(), departmentName, designations: [...designations] });
      closeModal();
    } else {
      alert('Please fill in all fields.');
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
    department.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    department.designations.some(designation => designation.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  $: displayedDepartments = filteredDepartments.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(filteredDepartments.length / departmentsPerPage);

  function handlePageChange(event) {
    currentPage = event.detail.pageNumber;
  }

  let searchQuery = '';

  $: searchResultText = searchQuery
    ? filteredDepartments.length > 0
      ? `Rows Found: ${filteredDepartments.length}`
      : "No Result Found"
    : '';
  $: searchResultColor = filteredDepartments.length > 0 ? "text-blue-600 font-bold" : "text-red-600 font-bold";

  let departmentName = '';
  let designations = [];
  let newDesignation = '';

</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <div class="flex justify-end mb-4">
    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
      <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
        Department and Designations
      </h3>
    </div>
    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={openModal}>Add Department</button>
  </div>
  {#if showModal}
    <div class="modal">
      <div class="modal-content">
        <div class="rounded-t mb-0 px-4 py-10 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-blueGray-700">
                Add New Department
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
              <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={addDepartment}>
                Add
              </button>
              <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
  <div class="flex items-center mb-4">
    <input type="search" class="bg-gray-800 text-black rounded-lg px-4 py-2" placeholder="Search..." bind:value={searchQuery}>
    {#if searchQuery}
      <span class="ml-4 text-sm {searchResultColor}">{searchResultText}</span>
    {/if}
  </div>
  <table>
    <thead>
      <tr>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Department Name</th>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Designations</th>
      </tr>
    </thead>
    <tbody>
      {#each displayedDepartments as department (department.id)}
        <tr>
          <td class="table-data font-bold text-blueGray-600" title={department.departmentName}>
            <div class="flex items-center">
              {#if editingModes[department.id]}
                <input type="text" class="salary-input" bind:value={department.departmentName}>
              {:else}
                <span>{department.departmentName}</span>
              {/if}
            </div>
          </td>
          <td class="table-data" title={department.designations.join(', ')}>
            <div class="flex items-center">
              {#if editingModes[department.id]}
                <div>
                  {#each department.designations as designation, index}
                    <div class="flex items-center mb-2">
                      <input type="text" class="salary-input" bind:value={department.designations[index]}>
                      <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-2 py-1 ml-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" on:click={() => removeDesignationFromDepartment(department, index)}>Remove</button>
                    </div>
                  {/each}
                  <div class="flex">
                    <input type="text" placeholder="Add Designation" class="salary-input" bind:value={newDesignation}>
                    <button class="bg-green-600 text-white active:bg-green-800 font-bold uppercase text-xs px-4 py-2 ml-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" on:click={() => { department.designations = [...department.designations, newDesignation]; newDesignation = ''; }}>Add</button>
                  </div>
                </div>
              {:else}
                <span>{department.designations.join(', ')}</span>
              {/if}
            </div>
          </td>
          <td>
            <div class="flex items-center">
              {#if editingModes[department.id]}
                <img src={edit2} alt="Save" class="icon-button cursor-pointer" on:click={() => { if(validateEditInputs(department)) { saveDepartmentChanges(department); toggleEditingMode(department.id); } }}>
              {:else}
                <img src={edit1} alt="Edit" class="icon-button cursor-pointer" on:click={() => editDepartment(department)} />
              {/if}
              <div class="ml-4">
                <img src={delete1} alt="Delete" class="icon-button cursor-pointer" on:click={() => deleteDepartment(department)}>
              </div>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
</div>
