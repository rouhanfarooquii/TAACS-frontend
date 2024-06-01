<script>
  import { onMount } from 'svelte';
  import Pagination from "../../../components/Pagination/Pagination.svelte";
  import MultiSelect from "../../../components/Dropdowns/MultiSelect.svelte";
  import Toast from '../../../components/Confirmation/Toast.svelte';
  import { getAllLocationsApi, addLocationApi, updateLocationApi, deleteLocationApi, getAllDevicesApi, getAllVisitorsApi,getAllRoomBookingsApi,getAllEmployeesApi,getAllEmergenciesApi } from '../../../services/api';
  import ConfirmationModal from '../../../components/Confirmation/ConfirmationModal.svelte';

  const edit1 = "../assets/img/icons8-edit-24.png";
  const edit2 = "../assets/img/icons8-tick-24.png";
  const delete1 = "../assets/img/icons8-delete-24.png";
  export let color = "light";

  let spaces = [];
  let editingModes = {};

  let devicesList = [];
  let selectedDevices = [];
  let featuresList = ["Workstation", "Adjustable desks", "Ergonomic office chairs", "Guest chairs", "Desktops", "Filing cabinets", "Shelves", "Locker", "Conference table", "Whiteboard", "Projector", "TV screen", "AC", "Telephone", "Printer", "Internet connection"];
  let selectedFeatures = [];

  let showToaster = false;
  let toasterMessage = '';
  let toasterType = '';

  let confirmationModal = false;
  let locToDelete = null;

  function showDeleteConfirmation(space) {
    locToDelete = space;
    confirmationModal = true;
  }
  function closeConfirmationModal() {
    confirmationModal = false;
    locToDelete = null;
  }

  onMount(async () => {
    await fetchLocations();
    await fetchDevices();
    await fetchDelLogicVisitors();
    await fetchDelLogicRooms();
    await fetchDelLogicEmployees();
    await fetchDelLogicEmergency();
  });

  async function fetchLocations() {
    try {
      const locations = await getAllLocationsApi(true);
      console.log('Fetched Locations:', locations);
      spaces = locations.map(loc => ({
        _id: loc._id,
        locationName: loc.title,
        devices: loc.devices.map(device => device.deviceName).join(', '),
        bookable: loc.bookable ? 'Yes' : 'No',
        capacity: loc.capacity,
        features: loc.features.join(', ')
      }));
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  }

  let delLogicVisitors = []
  async function fetchDelLogicVisitors() {
    try {
      delLogicVisitors = await getAllVisitorsApi();
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

  let delLogicEmployees = []
  async function fetchDelLogicEmployees() {
    try {
      delLogicEmployees = await getAllEmployeesApi();
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  }

  let delLogicEmergency = []
  async function fetchDelLogicEmergency() {
    try {
      delLogicEmergency = await getAllEmergenciesApi();
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  }

  let tempDevices = [];

  async function fetchDevices() {
    try {
      const devices = await getAllDevicesApi();
      tempDevices = devices;
      devicesList = devices.map(device => device.deviceName);
      console.log(devices);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  }

  async function saveSpaceChanges() {
    if (validateEditInputs()) {
      try {
        const isLocationNameDuplicate = spaces.some(space => space.locationName === locationName && space.id !== editingSpace.id);

      if (isLocationNameDuplicate) {
        showToasterMessage('Location Name must be unique.', 'error');
        return;
      }
        let tempdtosend = [];

        for (let i = 0; i < selectedDevices.length; i++) {
          for (let j = 0; j < tempDevices.length; j++) {
            if (selectedDevices[i] == tempDevices[j].deviceName) {
              tempdtosend.push(tempDevices[j]._id);
            }
          }
        }

        // console.log(bookable)
        // console.log({
        //   _id: editingSpace.id,
        //   title: locationName,
        //   devices: tempdtosend,
        //   bookable: bookable,
        //   capacity: Number(capacity),
        //   features: selectedFeatures
        // })
        // return;

        const response = await updateLocationApi({
          _id: editingSpace.id,
          title: locationName,
          devices: tempdtosend,
          bookable: bookable,
          capacity: Number(capacity),
          features: selectedFeatures
        });
        console.log('Update Response:', response);

        // Update the corresponding space in the spaces array
        const updatedSpace = spaces.find(space => space.id === editingSpace.id);
        if (updatedSpace) {
          updatedSpace.locationName = locationName;
          updatedSpace.devices = selectedDevices.join(', ');
          updatedSpace.bookable = bookable ? 'Yes' : 'No';
          updatedSpace.capacity = capacity;
          updatedSpace.features = selectedFeatures.join(', ');
        }

        await fetchLocations();
        showToasterMessage('Location updated successfully!', 'success');
        closeModal();
      } catch (error) {
        console.error("Error updating location:", error);
        showToasterMessage('An error occurred while updating location. Please try again.', 'error');
      }
    }
  }

  function openEditModal(space) {
    showEditModal = true;
    editingSpace = space;
    locationName = space.locationName;
    selectedDevices = space.devices.split(', ');
    bookable = space.bookable === 'Yes';
    capacity = space.capacity;
    selectedFeatures = space.features.split(', ');
  }

  function validateEditInputs() {
    let isValid = true;

    if (!locationName) {
      document.getElementById('locationName-edit-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('locationName-edit-error').style.display = 'none';
    }

    if (selectedDevices.length === 0) {
      document.getElementById('devices-edit-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('devices-edit-error').style.display = 'none';
    }

    if (!capacity) {
      document.getElementById('capacity-edit-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('capacity-edit-error').style.display = 'none';
    }

    if (selectedFeatures.length === 0) {
      document.getElementById('features-edit-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('features-edit-error').style.display = 'none';
    }

    return isValid;
  }

  async function deleteSpace() {
    try {
      for (let i = 0; i < delLogicVisitors.length; i++) {
        for (let j = 0; j < delLogicVisitors[i].locations.length; j++) {
          if(delLogicVisitors[i].locations[j].toString() == locToDelete._id.toString()){
            showToasterMessage('Cannot delete. Device is bind to a ' + delLogicVisitors[i].visitorID + ' visitor ID', 'error');
            return;
          }
        }
      }

      for (let i = 0; i < delLogicEmployees.length; i++) {
        for (let j = 0; j < delLogicEmployees[i].locations.length; j++) {
          if(delLogicEmployees[i].locations[j]._id.toString() == locToDelete._id.toString()){
            showToasterMessage('Cannot delete. Device is bind to a ' + delLogicEmployees[i].employeeID + ' visitor ID', 'error');
            return;
          }
        }
      }

      for (let i = 0; i < delLogicRooms.length; i++) {
        if(delLogicRooms[i].location._id.toString() == locToDelete._id.toString()){
          showToasterMessage('Cannot delete. Department is bind to a Room ', 'error');
          return;
        }
    }

      for (let i = 0; i < delLogicEmergency.length; i++) {
        for (let j = 0; j < delLogicEmergency[i].locations.length; j++) {
          if(delLogicEmergency[i].locations[j]._id.toString() == locToDelete._id.toString()){
            showToasterMessage('Cannot delete. Device is bind to a ' + delLogicEmergency[i].name + ' Emergency ID', 'error');
            return;
          }
        }
      }

      const response = await deleteLocationApi(locToDelete._id);
      console.log('Delete Response:', response);
      showToasterMessage('Location deleted successfully!', 'success');
      closeConfirmationModal();
      await fetchLocations();
    } catch (error) {
      console.error("Error deleting location:", error);
      showToasterMessage('An error occurred while deleting location. Please try again.', 'error');
    }
  }

  async function addSpace() {
    if (validateAddInputs()) {
      try {
        const isLocationNameDuplicate = spaces.some(space => space.locationName === locationName);

      if (isLocationNameDuplicate) {
        showToasterMessage('Location Name must be unique.', 'error');
        return;
      }

        const dataToSend = {
          title: locationName,
          devices: selectedDevices,
          bookable: bookable,
          capacity: Number(capacity),
          features: selectedFeatures
        };

        let tempdtosend = [];

        for (let i = 0; i < dataToSend.devices.length; i++) {
          for (let j = 0; j < tempDevices.length; j++) {
            if (selectedDevices[i] == tempDevices[j].deviceName) {
              tempdtosend.push(tempDevices[j]._id);
            }
          }
        }

        dataToSend.devices = tempdtosend;

        const response = await addLocationApi(dataToSend);
        console.log('Add Response:', response);
        await fetchLocations();
        showToasterMessage('Location added successfully!', 'success');
        showModal = false;
        showEditModal = false;
        locationName = '';
        selectedDevices = [];
        selectedFeatures = [];
        bookable = true;
        capacity = '';
      } catch (error) {
        console.error("Error adding location:", error);
        showToasterMessage('An error occurred while adding location. Please try again.', 'error');
      }
    }
  }

  let showModal = false;
  let showEditModal = false;
  let editingSpace = null;
  let locationName = '';
  let bookable = true;
  let capacity = '';

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    showEditModal = false;
    locationName = '';
    selectedDevices = [];
    selectedFeatures = [];
    bookable = true;
    capacity = '';
    resetValidationErrors();
  }

  function resetValidationErrors() {
    document.getElementById('locationName-error').style.display = 'none';
    document.getElementById('devices-error').style.display = 'none';
    document.getElementById('bookable-error').style.display = 'none';
    document.getElementById('capacity-error').style.display = 'none';
    document.getElementById('features-error').style.display = 'none';
    document.getElementById('locationName-edit-error').style.display = 'none';
    document.getElementById('devices-edit-error').style.display = 'none';
    document.getElementById('capacity-edit-error').style.display = 'none';
    document.getElementById('features-edit-error').style.display = 'none';
  }

  function validateAddInputs() {
    let isValid = true;

    if (!locationName) {
      document.getElementById('locationName-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('locationName-error').style.display = 'none';
    }

    if (selectedDevices.length === 0) {
      document.getElementById('devices-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('devices-error').style.display = 'none';
    }

    if (!capacity) {
      document.getElementById('capacity-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('capacity-error').style.display = 'none';
    }

    if (selectedFeatures.length === 0) {
      document.getElementById('features-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('features-error').style.display = 'none';
    }

    return isValid;
  }

  function showToasterMessage(message, type) {
    toasterMessage = message;
    toasterType = type;
    showToaster = true;
    setTimeout(() => {
      showToaster = false;
    }, 3000); // Show toast for 3 seconds
  }

  const spacesPerPage = 5;
  let currentPage = 1;

  $: startIndex = (currentPage - 1) * spacesPerPage;
  $: endIndex = Math.min(startIndex + spacesPerPage, filteredSpaces.length);
  $: filteredSpaces = spaces.filter(space => 
    space.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    space.features.toLowerCase().includes(searchQuery.toLowerCase()) ||
    space.devices.toLowerCase().includes(searchQuery.toLowerCase()) ||
    space.bookable.toLowerCase().includes(searchQuery.toLowerCase()) ||
    space.capacity.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );
  $: displayedSpaces = filteredSpaces.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(filteredSpaces.length / spacesPerPage);

  function handlePageChange(event) {
    currentPage = event.detail.pageNumber;
  }

  let searchQuery = '';

  $: searchResultText = searchQuery
    ? filteredSpaces.length > 0
      ? ``
      : "No Result Found"
    : '';
  $: searchResultColor = filteredSpaces.length > 0 ? "text-blue-600 font-bold" : "text-red-600 font-bold";
</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  {#if showToaster}
    <Toast message={toasterMessage} type={toasterType} />
  {/if}
  <div class="flex justify-end mb-4">
    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
      <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
        Device Groups Location
      </h3>
    </div>
    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={openModal}>Add Location</button>
  </div>
  {#if confirmationModal}
  <ConfirmationModal
    message="Are you sure you want to delete this location?"
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
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="locationName">
                    Location Name
                  </label>
                  <input type="text" id="locationName" placeholder="Location Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={locationName}>
                  <span id="locationName-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="devices">
                    Devices
                  </label>
                  <MultiSelect bind:selectedOptions={selectedDevices} options={devicesList} placeholder="Select Devices" />
                  <span id="devices-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="bookable">
                    Bookable
                  </label>
                  <div class="flex items-center">
                    <input type="checkbox" id="bookable" class="form-checkbox" bind:checked={bookable}>
                    <span class="ml-2 text-blueGray-600">{bookable ? 'Yes' : 'No'}</span>
                  </div>
                  <span id="bookable-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="capacity">
                    Capacity
                  </label>
                  <input type="number" min="0" id="capacity" placeholder="Capacity" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={capacity}>
                  <span id="capacity-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="features">
                    Features
                  </label>
                  <MultiSelect bind:selectedOptions={selectedFeatures} options={featuresList} placeholder="Select Features" />
                  <span id="features-error" class="text-red-600 text-xs overflow-x-auto" style="display: none;">* Field Required</span>
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
                Edit Location
              </h3>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <div class="px-4 py-5 flex-auto">
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="locationName">
                    Location Name
                  </label>
                  <input type="text" id="locationName" placeholder="Location Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={locationName}>
                  <span id="locationName-edit-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="devices">
                    Devices
                  </label>
                  <MultiSelect bind:selectedOptions={selectedDevices} options={devicesList} placeholder="Select Devices" />
                  <span id="devices-edit-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="bookable">
                    Bookable
                  </label>
                  <div class="flex items-center">
                    <input type="checkbox" id="bookable" class="form-checkbox" bind:checked={bookable}>
                    <span class="ml-2 text-blueGray-600">{bookable ? 'Yes' : 'No'}</span>
                  </div>
                  <span id="bookable-edit-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="capacity">
                    Capacity
                  </label>
                  <input type="number" min="0" id="capacity" placeholder="Capacity" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={capacity}>
                  <span id="capacity-edit-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="features">
                    Features
                  </label>
                  <MultiSelect bind:selectedOptions={selectedFeatures} options={featuresList} placeholder="Select Features" />
                  <span id="features-edit-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={saveSpaceChanges}>
                Save
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
  <div class="flex justify-between">
    <div class="relative mb-3">
      <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Search..." bind:value={searchQuery} />
    </div>
  </div>
  <p class="text-sm {searchResultColor}">{searchResultText}</p>
  <table>
    <thead>
      <tr>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Location Name</th>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Devices</th>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Bookable</th>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Capacity</th>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Features</th>
        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each displayedSpaces as space (space.id)}
        <tr>
          <td class="table-data font-bold text-blueGray-600" title={space.locationName}>
            {space.locationName}
          </td>
          <td class="table-data" title={space.devices}>
            {space.devices}
          </td>
          <td class="table-data" title={space.bookable}>
            {space.bookable}
          </td>
          <td class="table-data" title={space.capacity}>
            {space.capacity}
          </td>
          <td class="table-data" title={space.features}>
            {space.features}
          </td>
          <td>
            <div class="flex items-center">
              <i class="fas fa-edit mr-2 text-sm cursor-pointer" on:click={() => openEditModal(space)}></i>
              <i class="fas fa-trash-alt mr-2 text-sm cursor-pointer" on:click={() => showDeleteConfirmation(space)}></i>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
</div>
