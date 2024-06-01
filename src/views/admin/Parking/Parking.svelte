<script>
  import { onMount } from 'svelte';
  import { getAllParkingsApi, updateParkingApi, deleteParkingApi, addParkingApi, getAllEmployeesApi } from '../../../services/api';
  import Pagination from "../../../components/Pagination/Pagination.svelte";
  import QrCode from '../../../components/QR/QRCode.svelte';
  import Toast from '../../../components/Confirmation/Toast.svelte';
  import ConfirmationModal from '../../../components/Confirmation/ConfirmationModal.svelte';

  export let color = "light";

  let spaces = [];
  let Employeeslist = [];
  let tempEmployees = [];
  let editingModes = {};
  let showModal = false;
  let showEditModal = false;
  let parkingSlot = '';
  let location = '';
  let carId = '';
  let empName = '';
  let carMake = '';
  let cardRfidNo = '';
  let employeeId = '';

  let editParkingSlot = '';
  let editLocation = '';
  let editCarId = '';
  let editEmpName = '';
  let editCarMake = '';
  let editCardRfidNo = '';
  let editEmployeeId = '';
  let editSpaceId = '';

  let locations = [ 'SC Parking', 'Tabba Parking', 'Library Parking', 'Ground Parking']; 

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
  let spaceToDelete = null;

  function showDeleteConfirmation(space) {
    spaceToDelete = space;
    confirmationModal = true;
  }
  function closeConfirmationModal() {
    confirmationModal = false;
    spaceToDelete = null;
  }

  async function fetchParkingData() {
    try {
      const response = await getAllParkingsApi();
      console.log('API Response:', response);
      const backendParkingData = response.parking;
      spaces = backendParkingData.map(parking => ({
        id: parking._id,
        parkingSlot: parking.parkingSlot,
        location: parking.location,
        carId: parking.carId,
        empName: parking.employee.name,
        carMake: parking.carMake,
        cardRfidNo: parking.employee.cardIdNumber,
        employeeId: parking.employee.employeeId
      }));
      console.log('Fetched Parking Data:', spaces);
    } catch (error) {
      console.error('Error fetching parking data:', error);
    }
  }

  async function fetchEmployees() {
    try {
      const employees = await getAllEmployeesApi();
      tempEmployees = employees;
      Employeeslist = employees.map(employee => employee);
      console.log(employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }

  onMount(() => {
    fetchParkingData();
    fetchEmployees();
  });

  async function deleteSpace() {
    try {
      const response = await deleteParkingApi(spaceToDelete.id);
      console.log('Delete Response:', response);
      showToasterMessage('Space deleted successfully!', 'success');
      closeConfirmationModal();
      await fetchParkingData();
    } catch (error) {
      console.error('Error deleting space:', error);
      showToasterMessage('An error occurred while deleting the space. Please try again.', 'error');
    }
  }

  async function saveSpaceChanges() {
    if (!validateInputs(true)) {
        return;
    }

    const isDuplicateParkingSlot = spaces.some(space => space.parkingSlot === editParkingSlot && space.id !== editSpaceId);
  const isDuplicateCarId = spaces.some(space => space.carId === editCarId && space.id !== editSpaceId);

  if (isDuplicateParkingSlot && isDuplicateCarId) {
    showToasterMessage('Parking slot and Car ID must be unique', 'error');
    return;
  }

  if (isDuplicateParkingSlot) {
    showToasterMessage('Parking slot must be unique', 'error');
    return;
  }

  if (isDuplicateCarId) {
    showToasterMessage('Car ID must be unique', 'error');
    return;
  }

    const selectedEmployee = Employeeslist.find(employee => employee.name === editEmpName);

    if (!selectedEmployee) {
      showToasterMessage('Selected employee not found', 'error');
      return;
    }

    const updatedSpaceData = {
      _id: editSpaceId,
      parkingSlot: editParkingSlot,
      location: editLocation,
      carId: editCarId,
      employee: selectedEmployee._id,
      carMake: editCarMake
    };

    try {
      await updateParkingApi(updatedSpaceData);
      closeEditModal();
      await fetchParkingData(); // Refresh data after update
      showToasterMessage('Space updated successfully!', 'success');
      console.log("Saved changes for space:", updatedSpaceData);
    } catch (error) {
      console.error('Error updating space:', error);
      showToasterMessage('An error occurred while updating space. Please try again.', 'error');
    }
  }

  async function addSpace() {
    if (!validateInputs()) {
        return;
    }

    const isDuplicateParkingSlot = spaces.some(space => space.parkingSlot === parkingSlot);
  const isDuplicateCarId = spaces.some(space => space.carId === carId);

  if (isDuplicateParkingSlot && isDuplicateCarId) {
    showToasterMessage('Parking slot and Car ID must be unique', 'error');
    return;
  }

  if (isDuplicateParkingSlot) {
    showToasterMessage('Parking slot must be unique', 'error');
    return;
  }

  if (isDuplicateCarId) {
    showToasterMessage('Car ID must be unique', 'error');
    return;
  }
    const selectedEmployee = Employeeslist.find(employee => employee.name === empName);

    if (!selectedEmployee) {
      showToasterMessage('Selected employee not found', 'error');
      return;
    }

    const newParkingData = {
      parkingSlot,
      location,
      carId,
      employee: selectedEmployee._id,
      carMake
    };

    try {
      await addParkingApi(newParkingData);
      await fetchParkingData(); // Refresh data after adding
      showToasterMessage('Space added successfully!', 'success');
      closeModal();
    } catch (error) {
      console.error('Error adding space:', error);
      showToasterMessage('An error occurred while adding space. Please try again.', 'error');
    }
  }

  function validateInputs(isEdit = false) {
    let isValid = true;

    const parkingSlot = document.getElementById(isEdit ? 'editParkingSlot' : 'parkingSlot').value;
    const location = document.getElementById(isEdit ? 'editLocation' : 'location').value;
    const carId = document.getElementById(isEdit ? 'editCarId' : 'carId').value;
    const empName = document.getElementById(isEdit ? 'editEmpName' : 'empName').value;
    const carMake = document.getElementById(isEdit ? 'editCarMake' : 'carMake').value;
    const cardRfidNo = document.getElementById(isEdit ? 'editCardRfidNo' : 'cardRfidNo').value;

    // Validate Parking Slot
    if (!parkingSlot) {
        const errorElement = document.getElementById(isEdit ? 'editParkingSlot-error' : 'parkingSlot-error');
        if (errorElement) {
            errorElement.style.display = 'block';
        }
        isValid = false;
    } else {
        const errorElement = document.getElementById(isEdit ? 'editParkingSlot-error' : 'parkingSlot-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // Validate Location
    if (!location) {
        const errorElement = document.getElementById(isEdit ? 'editLocation-error' : 'location-error');
        if (errorElement) {
            errorElement.style.display = 'block';
        }
        isValid = false;
    } else {
        const errorElement = document.getElementById(isEdit ? 'editLocation-error' : 'location-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    if (!carId) {
        const errorElement = document.getElementById(isEdit ? 'editCarId-error' : 'carId-error');
        if (errorElement) {
            errorElement.innerText = '* Field Required';
            errorElement.style.display = 'block';
        }
        isValid = false;
    } else {
        const errorElement = document.getElementById(isEdit ? 'editCarId-error' : 'carId-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }

        const carIdFormat = /^([A-Z]{2,3}-\d{3,4})$/; // Example formats: ABC-123 or AB-1234
        const errorFormatElement = document.getElementById(isEdit ? 'editCarIdNum-error' : 'carIdNum-error');
        if (!carIdFormat.test(carId)) {
            if (errorFormatElement) {
                errorFormatElement.innerText = 'Invalid Car ID format. Please use the format: ABC-123 or AB-1234';
                errorFormatElement.style.display = 'block';
            }
            isValid = false;
        } else {
            if (errorFormatElement) {
                errorFormatElement.style.display = 'none';
            }
        }
    }

    // Validate Employee Name
    if (!empName) {
        const errorElement = document.getElementById(isEdit ? 'editEmpName-error' : 'empName-error');
        if (errorElement) {
            errorElement.style.display = 'block';
        }
        isValid = false;
    } else {
        const errorElement = document.getElementById(isEdit ? 'editEmpName-error' : 'empName-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // Validate Car Make
    if (!carMake) {
        const errorElement = document.getElementById(isEdit ? 'editCarMake-error' : 'carMake-error');
        if (errorElement) {
            errorElement.style.display = 'block';
        }
        isValid = false;
    } else {
        const errorElement = document.getElementById(isEdit ? 'editCarMake-error' : 'carMake-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // Validate Card RFID No
    if (!cardRfidNo) {
        const errorElement = document.getElementById(isEdit ? 'editCardRfidNo-error' : 'cardRfidNo-error');
        if (errorElement) {
            errorElement.style.display = 'block';
        }
        isValid = false;
    } else {
        const errorElement = document.getElementById(isEdit ? 'editCardRfidNo-error' : 'cardRfidNo-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    return isValid;
}

  function openEditModal(space) {
    editSpaceId = space.id;
    editParkingSlot = space.parkingSlot;
    editLocation = space.location;
    editCarId = space.carId;
    editEmpName = space.empName;
    editCarMake = space.carMake;
    editCardRfidNo = space.cardRfidNo;
    editEmployeeId = space.employeeId;
    showEditModal = true;
  }

  function closeEditModal() {
    showEditModal = false;
    editParkingSlot = '';
    editLocation = '';
    editCarId = '';
    editEmpName = '';
    editCarMake = '';
    editCardRfidNo = '';
    editEmployeeId = '';
  }

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    parkingSlot = '';
    location = '';
    carId = '';
    empName = '';
    carMake = '';
    cardRfidNo = '';
    employeeId = '';
    resetValidationErrors();
    showModal = false;
  }

  function resetValidationErrors() {
    const parkingSlotError = document.getElementById('parkingSlot-error');
    const locationError = document.getElementById('location-error');
    const carIdError = document.getElementById('carId-error');
    const empNameError = document.getElementById('empName-error');
    const carMakeError = document.getElementById('carMake-error');
    const cardRfidNoError = document.getElementById('cardRfidNo-error');
    const editParkingSlotError = document.getElementById('editParkingSlot-error');
    const editLocationError = document.getElementById('editLocation-error');
    const editCarIdError = document.getElementById('editCarId-error');
    const editEmpNameError = document.getElementById('editEmpName-error');
    const editCarMakeError = document.getElementById('editCarMake-error');
    const editCardRfidNoError = document.getElementById('editCardRfidNo-error');
    const editCarIdNumError = document.getElementById('editCarIdNum-error');
    const carIdNumError = document.getElementById('carIdNum-error');

    if (parkingSlotError) parkingSlotError.style.display = 'none';
    if (locationError) locationError.style.display = 'none';
    if (carIdError) carIdError.style.display = 'none';
    if (empNameError) empNameError.style.display = 'none';
    if (carMakeError) carMakeError.style.display = 'none';
    if (cardRfidNoError) cardRfidNoError.style.display = 'none';
    if (editParkingSlotError) editParkingSlotError.style.display = 'none';
    if (editLocationError) editLocationError.style.display = 'none';
    if (editCarIdError) editCarIdError.style.display = 'none';
    if (editEmpNameError) editEmpNameError.style.display = 'none';
    if (editCarMakeError) editCarMakeError.style.display = 'none';
    if (editCardRfidNoError) editCardRfidNoError.style.display = 'none';
    if (editCarIdNumError) editCarIdNumError.style.display = 'none';
    if (carIdNumError) carIdNumError.style.display = 'none';
  }

  const spacesPerPage = 5;
  let currentPage = 1;

  $: startIndex = (currentPage - 1) * spacesPerPage;
  $: endIndex = Math.min(startIndex + spacesPerPage, filteredSpaces.length);
  $: filteredSpaces = spaces.filter(space => 
    space.parkingSlot.toLowerCase().includes(searchQuery.toLowerCase()) ||
    space.carId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    space.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    space.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    space.carMake.toLowerCase().includes(searchQuery.toLowerCase())
  );
  $: displayedSpaces = filteredSpaces.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(filteredSpaces.length / spacesPerPage);

  function handlePageChange(event) {
    currentPage = event.detail.pageNumber;
  }

  let searchQuery = '';

  $: searchResultText = searchQuery
    ? filteredSpaces.length > 0
      ? ''
      : 'No Result Found'
    : '';
  $: searchResultColor = filteredSpaces.length > 0 ? "text-blue-600 font-bold" : "text-red-600 font-bold";

  let selectedSpaces = new Set();
</script>

<!-- HTML structure for the component -->
<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  {#if showToaster}
    <Toast message={toasterMessage} type={toasterType} />
  {/if}
  <div class="flex justify-end mb-4">
    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
      <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
        Parking Information
      </h3>
    </div>
    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={openModal}>Assign New Space</button>
  </div>
  {#if confirmationModal}
  <ConfirmationModal
    message="Are you sure you want to delete this department"
    onConfirm={deleteSpace}
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
                Assign New Space
              </h3>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <div class="px-4 py-5 flex-auto">
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="parkingSlot">
                    Parking Slot
                  </label>
                  <input type="text" id="parkingSlot" placeholder="Parking Slot" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={parkingSlot}>
                  <span id="parkingSlot-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="location">
                    Location
                  </label>
                  <select id="location" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={location}>
                    <option value="">Select Location</option>
                    {#each locations as loc}
                      <option value={loc}>{loc}</option>
                    {/each}
                  </select>
                  <span id="location-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="carId">
                    Car ID
                  </label>
                  <input type="text" id="carId" placeholder="Car ID" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={carId}>
                  <span id="carId-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  <span id="carIdNum-error" class="text-red-600 text-xs" style="display: none;">Invalid Car ID format. Please use the format: ABC-123 or AB-1234'</span>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="empName">
                    Employee Name
                  </label>
                  <select id="empName" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={empName}>
                    <option value="">Select Employee</option>
                    {#each Employeeslist as employee}
                      <option value={employee.name}>{employee.name} ({employee.employeeID})</option>
                    {/each}
                  </select>
                  <span id="empName-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="carMake">
                    Car Make
                  </label>
                  <input type="text" id="carMake" placeholder="Car Make" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={carMake}>
                  <span id="carMake-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="cardRfidNo">
                    Card RFID No
                  </label>
                  <input type="text" id="cardRfidNo" placeholder="Card RFID No" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={cardRfidNo}>
                  <span id="cardRfidNo-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={addSpace}>
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
    {#if showEditModal}
    <div class="modal">
      <div class="modal-content">
        <div class="rounded-t mb-0 px-4 py-10 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-blueGray-700">
                Edit Space
              </h3>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <div class="px-4 py-5 flex-auto">
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="editParkingSlot">
                    Parking Slot
                  </label>
                  <input type="text" id="editParkingSlot" placeholder="Parking Slot" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={editParkingSlot}>
                  <span id="editParkingSlot-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="editLocation">
                    Location
                  </label>
                  <select id="editLocation" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={editLocation}>
                    <option value="">Select Location</option>
                    {#each locations as loc}
                      <option value={loc}>{loc}</option>
                    {/each}
                  </select>
                  <span id="editLocation-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="editCarId">
                    Car ID
                  </label>
                  <input type="text" id="editCarId" placeholder="Car ID" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={editCarId}>
                  <span id="editCarId-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  <span id="editCarIdNum-error" class="text-red-600 text-xs" style="display: none;">Invalid Car ID format. Please use the format: ABC-123 or AB-1234'</span>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="editEmpName">
                    Employee Name
                  </label>
                  <select id="editEmpName" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={editEmpName}>
                    <option value="">Select Employee</option>
                    {#each Employeeslist as employee}
                      <option value={employee.name}>{employee.name} ({employee.employeeID})</option>
                    {/each}
                  </select>
                  <span id="editEmpName-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="editCarMake">
                    Car Make
                  </label>
                  <input type="text" id="editCarMake" placeholder="Car Make" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={editCarMake}>
                  <span id="editCarMake-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="editCardRfidNo">
                    Card RFID No
                  </label>
                  <input type="text" id="editCardRfidNo" placeholder="Card RFID No" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={editCardRfidNo}>
                  <span id="editCardRfidNo-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={saveSpaceChanges}>
                Save
              </button>
              <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={closeEditModal}>
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
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Parking Slot</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Location</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Car ID</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Employee Name</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Car Make</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">QR Code</th>
        </tr>
      </thead>
      <tbody>
        {#each displayedSpaces as space (space.id)}
          <tr>
            <td class="table-data font-bold text-blueGray-600" title={space.parkingSlot}>
              <div class="flex items-center">
                {#if editingModes[space.id]}
                  <input type="text" class="salary-input" bind:value={space.parkingSlot}>
                {:else}
                  <span>{space.parkingSlot}</span>
                {/if}
              </div>
            </td>
            <td class="table-data" title={space.location}>
              <div class="flex items-center">
                {#if editingModes[space.id]}
                  <input type="text" class="salary-input1" bind:value={space.location}>
                {:else}
                  <span>{space.location}</span>
                {/if}
              </div>
            </td>
            <td class="table-data" title={space.carId}>
              <div class="flex items-center">
                {#if editingModes[space.id]}
                  <input type="text" class="salary-input" bind:value={space.carId}>
                {:else}
                  <span>{space.carId}</span>
                {/if}
              </div>
            </td>
            <td class="table-data" title={space.empName}>
              <div class="flex items-center">
                {#if editingModes[space.id]}
                  <input type="text" class="salary-input1" bind:value={space.empName}>
                {:else}
                  <span>{space.empName}</span>
                {/if}
              </div>
            </td>
            <td class="table-data" title={space.carMake}>
              <div class="flex items-center">
                {#if editingModes[space.id]}
                  <input type="text" class="salary-input1" bind:value={space.carMake}>
                {:else}
                  <span>{space.carMake}</span>
                {/if}
              </div>
            </td>
            <td>
              <QrCode data={space.carId.toString()} />
            </td>
            <td>
              <div class="flex items-center">
                {#if editingModes[space.id]}
                <i class="fas fa-save mr-2 text-sm cursor-pointer" on:click={() => {saveSpaceChanges()}}></i>
                {:else}
                <i class="fas fa-edit mr-2 text-sm cursor-pointer" on:click={() => openEditModal(space)}></i>
                {/if}
                <div class="ml-2">
                  <i class="fas fa-trash-alt mr-2 text-sm cursor-pointer" on:click={() => showDeleteConfirmation(space)}></i>
                </div>
              </div>
            </td>
          </tr>
      {/each}
      </tbody>
    </table>
    <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
</div>
