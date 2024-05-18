<script>
  import { onMount } from 'svelte';
  import Pagination from "../../../components/Pagination/Pagination.svelte";
  import { getAllLocationsApi, addLocationApi, updateLocationApi, deleteLocationApi, getAllDevicesApi } from '../../../services/api';

  const edit1 = "../assets/img/icons8-edit-24.png";
  const edit2 = "../assets/img/icons8-tick-24.png";
  const delete1 = "../assets/img/icons8-delete-24.png";
  export let color = "light";

  let spaces = [];
  let editingModes = {};

  let devicesList = [];
  let featuresList = ["Feature1", "Feature2", "Feature3"];

  onMount(async () => {
    await fetchLocations();
    await fetchDevices();
  });

  async function fetchLocations() {
    try {
      const locations = await getAllLocationsApi();
      console.log('Fetched Locations:', locations);
      spaces = locations.map(loc => ({
        id: loc._id,
        locationName: loc.title,
        devices: loc.devices.map(device => device.title).join(', '),
        bookable: loc.bookable ? 'Yes' : 'No',
        capacity: loc.capacity,
        features: loc.features.join(', ')
      }));
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  }

  async function fetchDevices() {
    try {
      const devices = await getAllDevicesApi();
      console.log('Fetched Devices:', devices);
      devicesList = devices.map(device => device.title);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  }

  async function saveSpaceChanges(space) {
    console.log("Saved changes for space:", space);
    try {
      const response = await updateLocationApi({
        _id: space.id,
        title: space.locationName,
        devices: space.devices.split(', '),
        bookable: space.bookable === 'Yes',
        capacity: space.capacity,
        features: space.features.split(', ')
      });
      console.log('Update Response:', response);
      await fetchLocations();
    } catch (error) {
      console.error("Error updating location:", error);
    }
  }

  function editSpace(space) {
    toggleEditingMode(space.id);
  }

  function validateEditInputs(space) {
    if (!space.locationName || !space.devices || !space.bookable || !space.capacity || !space.features) {
      return false;
    }
    return true;
  }

  async function deleteSpace(space) {
    try {
      const response = await deleteLocationApi(space.id);
      console.log('Delete Response:', response);
      await fetchLocations();
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  }

  function toggleEditingMode(spaceId) {
    editingModes[spaceId] = !editingModes[spaceId];
  }

  let selectedSpaces = new Set();

  function toggleSelection(spaceId) {
    if (selectedSpaces.has(spaceId)) {
      selectedSpaces.delete(spaceId);
    } else {
      selectedSpaces.add(spaceId);
    }
    selectedSpaces = new Set(selectedSpaces);
  }

  function toggleSelectAll() {
    if (selectedSpaces.size === spaces.length) {
      selectedSpaces.clear();
    } else {
      spaces.forEach(space => selectedSpaces.add(space.id));
    }
    selectedSpaces = new Set(selectedSpaces);
  }

  let showModal = false;

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    locationName = '';
    devices = '';
    bookable = 'Yes';
    capacity = '';
    features = '';
    resetValidationErrors();
  }

  let dropdownOpen = false;


  function toggleDropdown() {
      dropdownOpen = !dropdownOpen;
  }

  function handleCheckboxChange(event) {
      const value = event.target.value;
      if (event.target.checked) {
          selectedDevices = [...selectedDevices, value];
      } else {
          selectedDevices = selectedDevices.filter(device => device !== value);
      }
  }

  function resetValidationErrors() {
    document.getElementById('locationName-error').style.display = 'none';
    document.getElementById('devices-error').style.display = 'none';
    document.getElementById('bookable-error').style.display = 'none';
    document.getElementById('capacity-error').style.display = 'none';
    document.getElementById('features-error').style.display = 'none';
  }

  function validateAddInputs() {
    let isValid = true;

    if (!locationName) {
      document.getElementById('locationName-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('locationName-error').style.display = 'none';
    }

    if (!devices) {
      document.getElementById('devices-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('devices-error').style.display = 'none';
    }

    if (!bookable) {
      document.getElementById('bookable-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('bookable-error').style.display = 'none';
    }

    if (!capacity) {
      document.getElementById('capacity-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('capacity-error').style.display = 'none';
    }

    if (!features) {
      document.getElementById('features-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('features-error').style.display = 'none';
    }

    return isValid;
  }

  async function addSpace() {
    if (validateAddInputs()) {
      const isDuplicate = spaces.some(space => space.locationName === locationName || space.features === features);

      if (isDuplicate) {
        alert('Location Name and Features must be unique.');
        return;
      }

      try {
        const response = await addLocationApi({
          title: locationName,
          devices: devices.split(', '),
          bookable: bookable === 'Yes',
          booked: false, // Assuming a default value for 'booked' since it's required
          capacity,
          features: features.split(', ')
        });
        console.log('Add Response:', response);
        closeModal();
        await fetchLocations();
      } catch (error) {
        console.error("Error adding location:", error);
        alert('Error adding location. Please try again.');
      }
    } else {
      alert('Please fill in all fields.');
    }
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
    space.capacity.toLowerCase().includes(searchQuery.toLowerCase())
  );
  $: displayedSpaces = filteredSpaces.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(filteredSpaces.length / spacesPerPage);

  function handlePageChange(event) {
    currentPage = event.detail.pageNumber;
  }

  let searchQuery = '';

  $: searchResultText = searchQuery
    ? filteredSpaces.length > 0
      ? `Rows Found: ${filteredSpaces.length}`
      : "No Result Found"
    : '';
  $: searchResultColor = filteredSpaces.length > 0 ? "text-blue-600 font-bold" : "text-red-600 font-bold";

  let locationName = '';
  let devices = '';
  let bookable = 'Yes';
  let capacity = '';
  let features = '';

</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <div class="flex justify-end mb-4">
    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
      <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
        Device Groups Location
      </h3>
    </div>
    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={openModal}>Add Location</button>
  </div>
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
                  <select id="devices" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={devices}>
                    <option value="">Select Devices</option>
                    {#each devicesList as device}
                      <option value={device}>{device}</option>
                    {/each}
                  </select>
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
                  <input type="text" id="capacity" placeholder="Capacity" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={capacity}>
                  <span id="capacity-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="features">
                    Features
                  </label>
                  <select id="features" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={features}>
                    <option value="">Select Features</option>
                    {#each featuresList as feature}
                      <option value={feature}>{feature}</option>
                    {/each}
                  </select>
                  <span id="features-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
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
      </tr>
    </thead>
    <tbody>
      {#each displayedSpaces as space (space.id)}
        <tr>
          <td class="table-data font-bold text-blueGray-600" title={space.locationName}>
            <div class="flex items-center">
              {#if editingModes[space.id]}
                <input type="text" class="salary-input" bind:value={space.locationName}>
              {:else}
                <span>{space.locationName}</span>
              {/if}
            </div>
          </td>
          <td class="table-data" title={space.devices}>
            <div class="flex items-center">
              {#if editingModes[space.id]}
                <select class="salary-input" bind:value={space.devices}>
                  {#each devicesList as device}
                    <option value={device}>{device}</option>
                  {/each}
                </select>
              {:else}
                <span>{space.devices}</span>
              {/if}
            </div>
          </td>
          <td class="table-data" title={space.bookable}>
            <div class="flex items-center">
              {#if editingModes[space.id]}
                <input type="checkbox" class="form-checkbox" bind:checked={space.bookable}>
                <span class="ml-2 text-blueGray-600">{space.bookable ? 'Yes' : 'No'}</span>
              {:else}
                <span>{space.bookable ? 'Yes' : 'No'}</span>
              {/if}
            </div>
          </td>
          <td class="table-data" title={space.capacity}>
            <div class="flex items-center">
              {#if editingModes[space.id]}
                <input type="text" class="salary-input1" bind:value={space.capacity}>
              {:else}
                <span>{space.capacity}</span>
              {/if}
            </div>
          </td>
          <td class="table-data" title={space.features}>
            <div class="flex items-center">
              {#if editingModes[space.id]}
                <select class="salary-input1" bind:value={space.features}>
                  {#each featuresList as feature}
                    <option value={feature}>{feature}</option>
                  {/each}
                </select>
              {:else}
                <span>{space.features}</span>
              {/if}
            </div>
          </td>
          <td>
            <div class="flex items-center">
              {#if editingModes[space.id]}
                <img src={edit2} alt="Save" class="icon-button cursor-pointer" on:click={() => { if(validateEditInputs(space)) { saveSpaceChanges(space); toggleEditingMode(space.id); } }}>
              {:else}
                <img src={edit1} alt="Edit" class="icon-button cursor-pointer" on:click={() => editSpace(space)} />
              {/if}
              <div class="ml-4">
                <img src={delete1} alt="Delete" class="icon-button cursor-pointer" on:click={() => deleteSpace(space)}>
              </div>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
</div>
