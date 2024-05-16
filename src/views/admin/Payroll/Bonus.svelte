<script>
  import { reactive } from 'svelte';
  import AddNewBonusModal from './AddNewBonusModal.svelte';
  import Pagination from '../../../components/Pagination/Pagination.svelte';
  const delete1 = "../assets/img/icons8-delete-24.png";
  export let color = "light";

  let bonusName = '';
  let activeDate = ''; 
  let value = '';
  let selectedDepartment = '';
  let selectedDesignation = '';
  let departments = ['Marketing', 'Finance', 'Human Resources', 'Information Technology', 'Sales', 'Operations'];
  let designations = ['Sales Manager', 'Software Engineer', 'Marketing Specialist', 'HR Manager', 'Financial Analyst'];
  let valueTypes = ['Percentage', 'Absolute'];
  let selectedValueType = '';

  let bonuses = [
    { id: '1', name: 'Year End Bonus', department: 'All', designation: 'All', percentage: 5, activeFrom: '2022-01-01' },
    { id: '2', name: 'Engineering Excellence Award', department: 'Engineering', designation: 'Senior Software Engineer', percentage: 3, activeFrom: '2022-01-15' },
    { id: '3', name: 'Marketing Performance Bonus', department: 'Marketing', designation: 'All', percentage: 4, activeFrom: '2022-02-01' },
    { id: '4', name: 'Leadership Bonus', department: 'All', designation: 'Manager', percentage: 6, activeFrom: '2022-03-01' },
    { id: '5', name: 'Finance Achievement Award', department: 'Finance', designation: 'Financial Analyst', percentage: 5, activeFrom: '2022-04-01' },
  ];

  function deleteBonus(id) {
    bonuses = bonuses.filter(bonus => bonus.id !== id);
  }

  function update() {
    if (!validateInputs()) {
      return;
    }
    console.log("Batch update performed");
    selectedDepartment = '';
    selectedDesignation = '';
    selectedValueType = null;
    value = '';
    closeModal();
  }

  function validateInputs() {
    let isValid = true;

    if (!bonusName) {
      document.getElementById('bonus-name-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('bonus-name-error').style.display = 'none';
    }

    if (!activeDate) {
      document.getElementById('activation-date-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('activation-date-error').style.display = 'none';
    }

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

  let selectedUsers = new Set();

  let showModal = false;

  function openModal() {
    showModal = true;
  }

  function selectValueType(value) {
    selectedValueType = value;
  }

  function closeModal() {
    showModal = false;
    bonusName = '';
    activeDate = '';
    selectedDepartment = '';
    selectedDesignation = '';
    selectedValueType = '';
    value = '';

    document.getElementById('bonus-name-error').style.display = 'none';
    document.getElementById('activation-date-error').style.display = 'none';
    document.getElementById('department-error').style.display = 'none';
    document.getElementById('designation-error').style.display = 'none';
    document.getElementById('value-type-error').style.display = 'none';
    document.getElementById('value-error').style.display = 'none';
  }

  const bonusesPerPage = 5; // Adjust as needed
  let currentPage = 1;

  $: startIndex = (currentPage - 1) * bonusesPerPage;
  $: endIndex = Math.min(startIndex + bonusesPerPage, filteredBonuses.length);
  $: filteredBonuses = bonuses.filter(bonus => 
    bonus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bonus.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bonus.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bonus.percentage.toString().includes(searchQuery)
  );
  $: displayedBonuses = filteredBonuses.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(filteredBonuses.length / bonusesPerPage);

  function handlePageChange(event) {
    currentPage = event.detail.pageNumber;
  }

  let searchQuery = '';

  $: searchResultText = searchQuery
    ? filteredBonuses.length > 0
      ? `Rows Found: ${filteredBonuses.length}`
      : "No Result Found"
    : '';
  $: searchResultColor = filteredBonuses.length > 0 ? "text-blue-600 font-bold" : "text-red-600 font-bold";
</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <div class="relative w-full px-4 max-w-full flex-grow flex-1">
    <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
      Bonus Information
    </h3>
    <br/>
  </div>
  <div class="access-control">
    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={openModal}>Add New Bonus</button>
    {#if showModal}
      <div class="modal">
        <div class="modal-content">
          <div class="rounded-t mb-0 px-4 py-10 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-lg text-blueGray-700">
                  Add New Bonus
                </h3>
              </div>
            </div>
          </div>
          <div class="block w-full overflow-x-auto">
            <div class="px-4 py-5 flex-auto">
              <div class="flex flex-wrap">
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="bonus-name">
                      Bonus Name
                    </label>
                    <input type="text" id="bonus-name" placeholder="Bonus Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={bonusName}>
                    <span id="bonus-name-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="activation-date">
                      Activation Date
                    </label>
                    <input type="date" id="activation-date" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={activeDate}>
                    <span id="activation-date-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="department">
                      Department:
                    </label>
                    <select class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedDepartment}>
                      <option value="" disabled selected>Select a department</option>
                      {#each departments as department}
                        <option value={department}>{department}</option>
                      {/each}
                    </select>
                    <span id="department-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="designation">
                      Designation:
                    </label>
                    <select class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedDesignation}>
                      <option value="" disabled selected>Select a designation</option>
                      {#each designations as designation}
                        <option value={designation}>{designation}</option>
                      {/each}
                    </select>
                    <span id="designation-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
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
                    <span id="value-type-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                </div>  
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="value">
                      Enter Value/Percentage:
                    </label>
                    <input type="number" id="value" placeholder="Enter Value/Percentage" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={value}>
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
    <div class="flex items-center mb-4">
      <input type="search" class="bg-gray-800 text-black rounded-lg px-4 py-2" placeholder="Search..." bind:value={searchQuery}>
      {#if searchQuery}
        <span class="ml-4 text-sm {searchResultColor}">{searchResultText}</span>
      {/if}
    </div>
    <table>
      <thead>
        <tr>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Name</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Designation</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Department</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Bonus</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Active From</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each displayedBonuses as bonus (bonus.id)}
        <tr>
          <td class="table-data font-bold text-blueGray-600" title={bonus.name}>
            <div class="flex items-center">
              <span>{bonus.name}</span>
            </div>
          </td>
          <td class="table-data" title={bonus.designation}>
            <div class="flex items-center">
              <span>{bonus.designation}</span>
            </div>
          </td>
          <td class="table-data" title={bonus.department}>
            <div class="flex items-center">
              <span>{bonus.department}</span>
            </div>
          </td>
          <td class="table-data" title={bonus.percentage}>
            <div class="flex items-center">
              <span>{bonus.percentage}%</span>
            </div>
          </td>
          <td class="table-data" title={bonus.activeFrom}>
            <div class="flex items-center">
              <span>{bonus.activeFrom}</span>
            </div>
          </td>
          <td>
            <div class="flex items-center">
              <img src={delete1} alt="Delete" class="icon-button cursor-pointer ml-4" on:click={() => deleteBonus(bonus.id)} />
            </div>
          </td>
        </tr>
        {/each}
      </tbody>
    </table>
    <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
  </div>
</div>