<script>
  import CardLineChart from "components/Cards/CardLineChart.svelte";
  import CardBarChart from "components/Cards/CardBarChart.svelte";
  import CardPageVisits from "components/Cards/CardPageVisits.svelte";
  import CardSocialTraffic from "components/Cards/CardSocialTraffic.svelte";
  import MultiSelect from "../../../components/Dropdowns/MultiSelect.svelte";
  import Toast from '../../../components/Confirmation/Toast.svelte';
  import { onMount } from 'svelte';
  import { getAllEmergenciesApi, addEmergencyApi, activateEmergencyApi, deactivateEmergencyApi, getAllLocationsApi, deleteEmergencyApi } from '../../../services/api';

  export let location;
  export let color = "light";

  let id = '';
  let name = '';
  let description = '';
  let selectedLocations = [];
  let doors = 'Closed';
  let trueLocations = [];
  let locations = [];
  let showModal = false;
  let dropdownOpen = false;  // Define the variable

  let emergencies = [];

  let showToaster = false;
  let toasterMessage = '';
  let toasterType = '';

  async function loadEmergencies() {
    try {
      const emergenciesData = await getAllEmergenciesApi();

      // console.log(emergenciesData)
      // return;
      emergencies = JSON.parse(JSON.stringify(emergenciesData));

      for (let i = 0; i < emergencies.length; i++) {
        console.log(emergencies[i].locations)
        for (let j = 0; j < emergencies[i].locations.length; j++) {
          emergencies[i].locations[j] = emergencies[i].locations[j].title
        }
      }
      console.log(emergencies);

    } catch (error) {
      console.error('Failed to load emergencies:', error);
    }
  }

  onMount(async () => {
    await loadEmergencies();
    await fetchLocations()
  });

  async function fetchLocations() {
    try {
      trueLocations = await getAllLocationsApi();
      locations = trueLocations.map(loc => loc.title)
      // console.log(locations)
    } catch (error) {
      console.error("Error fetching room bookings:", error);
      locations = [];
    }
  }

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  function handleCheckboxChange(event) {
    const value = event.target.value;
    if (event.target.checked) {
      selectedLocations = [...selectedLocations, value];
    } else {
      selectedLocations = selectedLocations.filter(location => location !== value);
    }
  }

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    name = '';
    description = '';
    selectedLocations = [];
    doors = 'Closed';
  }

  async function handleActivate(id) {
    try {
      await activateEmergencyApi(id)
      await loadEmergencies()
      showToasterMessage('Protocol activated', 'success');
    } catch (error) {
      console.error('Failed to activate emergency:', error);
      showToasterMessage('An error occurred while activating protocol. Please try again.', 'error');
    }
  }

  async function handleDeactivate(id) {
    try {
      await deactivateEmergencyApi(id)
      await loadEmergencies()
      showToasterMessage('Protocol deactivated', 'success');
    } catch (error) {
      console.error('Failed to deactivate emergency:', error);
      showToasterMessage('An error occurred while deactivating protocol. Please try again.', 'error');
    }
  }

  async function addProtocol() {
    if (validateInputs()) {
      const newProtocol = {
        name,
        description,
        locations: [],
        doors,
        active: false
      };

      for (let index = 0; index < selectedLocations.length; index++) {
        newProtocol.locations.push(trueLocations.find(l => l.title === selectedLocations[index])._id)
      }

      try {
        await addEmergencyApi(newProtocol);
        await loadEmergencies();
        showToasterMessage('Protocol added successfully!', 'success');
        closeModal();
      } catch (error) {
        console.error('Error adding emergency:', error);
        showToasterMessage('An error occurred while adding protocol. Please try again.', 'error');
      }
    }
  }

  async function deleteProtocol(id) {
    try {
      const responseMsg = await deleteEmergencyApi(id);
      console.log('Delete response:', responseMsg);
      showToasterMessage('Protocol deleted successfully!', 'success');
      loadEmergencies(); // Refresh emergencies after deletion
    } catch (error) {
      console.error('Error deleting emergency:', error);
      showToasterMessage('An error occurred while deleting protocol. Please try again.', 'error');
    }
  }

  function showToasterMessage(message, type) {
    toasterMessage = message;
    toasterType = type;
    showToaster = true;
    setTimeout(() => {
      showToaster = false;
    }, 3000); // Show toast for 3 seconds
  }

  function validateInputs() {
    let isValid = true;

    if (!name) {
      document.getElementById('name-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('name-error').style.display = 'none';
    }

    if (!description) {
      document.getElementById('description-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('description-error').style.display = 'none';
    }

    if (!selectedLocations.length) {
      document.getElementById('locations-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('locations-error').style.display = 'none';
    }

    if (!doors) {
      document.getElementById('doors-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('doors-error').style.display = 'none';
    }

    return isValid;
  }

  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown-content')) {
      dropdownOpen = false;
    }
  }
</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  {#if showToaster}
    <Toast message={toasterMessage} type={toasterType} />
  {/if}
  <div class="flex justify-end mb-4">
    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
      <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
        Emergency
      </h3>
    </div>
    <button
      class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
      type="button" on:click={openModal}>
      New Protocol
    </button>
  </div>
  {#if showModal}
    <div class="modal">
      <div class="modal-content1">
        <div class="rounded-t mb-0 px-4 py-10 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-blueGray-700">
                Define Protocol
              </h3>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <div class="px-4 py-5 flex-auto">
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="name">
                    Name
                  </label>
                  <input type="text" id="name" placeholder="Protocol Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={name}>
                  <span id="name-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="description">
                    Description
                  </label>
                  <textarea id="description" placeholder="Enter Description" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={description}></textarea>
                  <span id="description-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="locations">Locations To Include</label>
                  <MultiSelect bind:selectedOptions={selectedLocations} options={locations} placeholder="Select Locations" />
                  <span id="locations-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="doors">
                    Doors:
                  </label>
                  <div class="flex items-center">
                    <label for="aOpen" class="mr-2">
                      <input type="radio" id="Open" name="doorStatus" value="Open" class="mr-1" bind:group={doors} />
                      Open
                    </label>
                    <label for="Closed">
                      <input type="radio" id="Closed" name="doorStatus" value="Closed" class="mr-1" bind:group={doors} />
                      Closed
                    </label>
                  </div>
                  <span id="doors-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"  on:click={addProtocol}>
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
  <div class="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {#each emergencies as emergency}
      <div style="border-color: {emergency.active ? 'green' : 'rgba(228, 228, 231, var(--tw-border-opacity))'};" class="w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <button class="right top-2 transparent-button" on:click={() => deleteProtocol(emergency._id)}>
          <i class="fas fa-trash-alt text-blueGray-800"></i>
        </button>
        <h3 class="text-4xl font-bold text-blueGray-800">{emergency.name}</h3>
        <p class="text-blueGray-400 pb-6">{emergency.doors}</p>
        <div class="flex items-center mb-4">
          <span class="mr-1">Locations: {emergency.locations}</span>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg shadow dark:bg-gray-700">
          <p>Description: {emergency.description}</p>
        </div>
        <div class="flex justify-end mb-1 pt-6">
          <button
          on:click={() => handleActivate(emergency._id)}
          class="bg-green-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mr-2 active:bg-green-700"
          disabled={emergency.active}
          style="opacity: {emergency.active ? 0.6 : 1}; cursor: {emergency.active ? 'not-allowed' : 'pointer'}"
        >
          Activate
        </button>
        <button
          on:click={() => handleDeactivate(emergency._id)}
          class="bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 active:bg-red-800"
          disabled={!emergency.active}
          style="opacity: {!emergency.active ? 0.6 : 1}; cursor: {!emergency.active ? 'not-allowed' : 'pointer'}"
        >
          Deactivate
        </button>
        </div>
      </div>
    {/each}
  </div>
</div>