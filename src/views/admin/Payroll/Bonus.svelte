<script>
  import { onMount } from 'svelte';
  import Pagination from '../../../components/Pagination/Pagination.svelte';
  import { getAllDepartmentsApi, getAllPayrollsApi, addPayrollApi, deletePayrollApi } from '../../../services/api'; // Assuming you have an API service file
  import Toast from '../../../components/Confirmation/Toast.svelte';
  import ConfirmationModal from '../../../components/Confirmation/ConfirmationModal.svelte';

  export let color = "light";


  let bonusName = '';
  let activeDate = ''; 
  let value = '';
  let selectedDepartment = '';
  let selectedDesignation = '';
  let departments = [];
  let trueDepartments = [];
  let designations = [];
  let valueTypes = ['Percentage', 'Absolute'];
  let selectedValueType = '';

  let showToaster = false;
  let toasterMessage = '';
  let toasterType = '';

  let bonuses = [];

  let confirmationModal = false;
  let bonusToDelete = null;

  function showDeleteConfirmation(department) {
    bonusToDelete = department;
    confirmationModal = true;
  }
  function closeConfirmationModal() {
    confirmationModal = false;
    bonusToDelete = null;
  }

  onMount(async () => {
    await getAllDepartments();
    await fetchBonuses();
  });

  async function getAllDepartments() {
    trueDepartments = await getAllDepartmentsApi();
    departments = JSON.parse(JSON.stringify(trueDepartments));
    departments.push({ title: "All", _id: "All" });
  }

  async function update() {
    if (!validateInputs()) {
      return;
    }

    const isBonusNameDuplicate = bonuses.some(bonus => bonus.name === bonusName);
  
  if (isBonusNameDuplicate) {
    showToasterMessage('Bonus name must be unique.', 'error');
    return;
  }

    let department = selectedDepartment !== "All" ? trueDepartments.find(dept => dept.title === selectedDepartment) : { _id: "All", title: "All" };
    let designation = selectedDesignation !== "All" ? department.designations.find(des => des.title === selectedDesignation) : { _id: "All" };

    const newBonus = {
      name: bonusName,
      department: department._id,
      designation: designation._id,
      bonusValue: parseFloat(value),
      valueType: selectedValueType,
      activationDate: new Date(activeDate).toISOString()
    };

    // Log the form data for debugging
    // console.log('Form Data:', {
    //   bonusName,
    //   activeDate,
    //   value,
    //   selectedDepartment,
    //   selectedDesignation,
    //   selectedValueType
    // });

    // console.log('Payload being sent to API:', newBonus);

    // console.log(newBonus)
    // return;

    try {
      const responseMsg = await addPayrollApi(newBonus);
      console.log('Response from API:', responseMsg);
      await fetchBonuses(); // Refresh the bonuses list after adding a new bonus
      showToasterMessage('Bonus added successfully!', 'success');
      closeModal();
    } catch (error) {
      console.error('Error adding new bonus:', error);
      console.error('Error details:', error.response ? error.response.data : error.message);
      showToasterMessage('An error occurred while adding new bonus. Please try again.', 'error');
    }
  }

  async function fetchBonuses() {
    const bonusesFromApi = await getAllPayrollsApi();
    console.log('Bonuses from API:', bonusesFromApi);
    bonuses = bonusesFromApi.map(bonus => {
      const department = trueDepartments.find(dept => dept._id === bonus.department._id);
      const designation = department ? department.designations.find(des => des._id === bonus.designation._id) : { title: 'N/A' };
      return {
        ...bonus,
        departmentTitle: department ? department.title : 'N/A',
        designationTitle: designation ? designation.title : 'N/A',
        bonusValue: bonus.bonusValue,
        activationDate: bonus.activationDate
      };
    });
  }

  async function deleteBonus() {
    try {
      const responseMsg = await deletePayrollApi(bonusToDelete._id);
      console.log('Response from API:', responseMsg);
      bonuses = bonuses.filter(bonus => bonus._id !== id); // Update the bonuses list
      showToasterMessage('Bonus deleted successfully!', 'success');
      closeConfirmationModal();
    } catch (error) {
      console.error('Error deleting bonus:', error);
      console.error('Error details:', error.response ? error.response.data : error.message);
      showToasterMessage('An error occurred while deleting bonus. Please try again.', 'error');
    }
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

  let showModal = false;

  function openModal() {
    showModal = true;
  }

  function selectValueType(value) {
    selectedValueType = value;
  }

  function showToasterMessage(message, type) {
    toasterMessage = message;
    toasterType = type;
    showToaster = true;
    setTimeout(() => {
      showToaster = false;
    }, 3000); // Show toast for 3 seconds
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
    bonus.department.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bonus.value.toString().includes(searchQuery)
  );
  $: displayedBonuses = filteredBonuses.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(filteredBonuses.length / bonusesPerPage);

  function handlePageChange(event) {
    currentPage = event.detail.pageNumber;
  }

  let searchQuery = '';

  $: searchResultText = searchQuery
    ? filteredBonuses.length > 0
      ? ``
      : "No Result Found"
    : '';
  $: searchResultColor = filteredBonuses.length > 0 ? "text-blue-600 font-bold" : "text-red-600 font-bold";
</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  {#if showToaster}
    <Toast message={toasterMessage} type={toasterType} />
  {/if}
  <div class="flex justify-end mb-4">
    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
      <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
        Bonus Information
      </h3>
    </div>
    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={openModal}>Add New Bonus</button>
</div>
    {#if confirmationModal}
      <ConfirmationModal
        message="Are you sure you want to delete this device?"
        onConfirm={deleteBonus}
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
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="department">
                      Department:
                    </label>
                    <select class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedDepartment} on:change={setDesignation}>
                      <option value="" disabled selected>Select Department</option>
                      {#each departments as department}
                        <option value={department.title}>{department.title}</option>
                      {/each}
                    </select>
                    <span id="department-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="designation">
                      Designation:
                    </label>
                    <select class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedDesignation}>
                      <option value="" disabled selected>Select Designation</option>
                      {#each designations as designation}
                        <option value={designation.title}>{designation.title}</option>
                      {/each}
                    </select>
                    <span id="designation-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
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
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Bonus</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Active From</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each displayedBonuses as bonus (bonus._id)}
        <tr>
          <td class="table-data font-bold text-blueGray-600" title={bonus.name}>
            <div class="flex items-center">
              <span>{bonus.name}</span>
            </div>
          </td>
          <td class="table-data" title={bonus.designationTitle}>
            <div class="flex items-center">
              <span>{bonus.designationTitle}</span>
            </div>
          </td>          
          <td class="table-data" title={bonus.department.title}>
            <div class="flex items-center">
              <span>{bonus.department.title}</span>
            </div>
          </td>
          <td class="table-data" title={bonus.bonusValue}>
            <div class="flex items-center">
              <span>{bonus.bonusValue}</span>
            </div>
          </td>
          <td class="table-data" title={new Date(bonus.activationDate).toLocaleDateString()}>
            <div class="flex items-center">
              <span>{new Date(bonus.activationDate).toLocaleDateString()}</span>
            </div>
          </td>
          <td class="table-data">
            <div class="flex items-center">
              <i class="fas fa-trash-alt mr-2 text-sm cursor-pointer" on:click={() => showDeleteConfirmation(bonus)}></i>
            </div>
          </td>
        </tr>
        {/each}
      </tbody>
    </table>
    <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
</div>