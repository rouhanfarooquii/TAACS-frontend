<script>
  import CardLineChart from "components/Cards/CardLineChart.svelte";
  import CardBarChart from "components/Cards/CardBarChart.svelte";
  import CardPageVisits from "components/Cards/CardPageVisits.svelte";
  import CardSocialTraffic from "components/Cards/CardSocialTraffic.svelte";
  import MultiSelect from "../../../components/Dropdowns/MultiSelect.svelte";
  import { onMount } from 'svelte';
  import { getAllEmergenciesApi } from '../../../services/api';

  export let location;
  export let color = "light";

  let id = '';
  let name = '';
  let description = '';
  let selectedDevices = [];
  let doors = '';
  let devicesToDeactivate = [
    'Main Entrance Scanner', 'Elevator Control', 'Security Cameras', 'Lobby Scanner', 'Conference Room Door Lock',
    'Internal Security Cameras', 'Server Room Door Lock', 'Backup Generator Control', 'IT Department Access Control',
    'Parking Garage Door Lock', 'Security Alarms', 'All Door Locks', 'Internal Communication Systems'
  ];
  let showModal = false;

  let emergencies = [];

  async function loadEmergencies() {
    try {
      const emergenciesData = await getAllEmergenciesApi();
      emergencies = emergenciesData.map(emergency => ({
        id: emergency._id,
        name: emergency.name,
        description: emergency.description,
        devices: emergency.devices ? emergency.devices.join(', ') : 'None',
        doors: emergency.doors === 'open' ? 'Always Open' : 'Always Closed',
        isActive: emergency.active
      }));
      console.log("Emergencies loaded:", emergencies);
    } catch (error) {
      console.error('Failed to load emergencies:', error);
    }
  }

  onMount(() => {
    loadEmergencies();
  });

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

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    name = '';
    description = '';
    selectedDevices = [];
    doors = '';
  }

  async function handleActivate(emergency) {
    emergency.isActive = true;
    // Add logic to update the backend if necessary
  }

  async function handleDeactivate(emergency) {
    emergency.isActive = false;
    // Add logic to update the backend if necessary
  }

  function addProtocol() {
    if (validateInputs()) {
      const newProtocol = {
        id: `EP${(Math.random() * 1000).toFixed(0)}`,
        name,
        description,
        devicesToDeactivate: selectedDevices,
        doors,
        isActive: false
      };
      emergencies = [...emergencies, newProtocol];
      closeModal();
    }
  }

  function deleteProtocol(id) {
    emergencies = emergencies.filter(protocol => protocol.id !== id);
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

    if (!selectedDevices.length) {
      document.getElementById('devices-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('devices-error').style.display = 'none';
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
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="devicesToDeactivate">Devices To Include</label>
                  <MultiSelect bind:selectedOptions={selectedDevices} options={devicesToDeactivate} placeholder="Select Devices" />
                  <span id="devices-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                </div>
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="doors">
                    Doors:
                  </label>
                  <div class="flex items-center">
                    <label for="alwaysOpen" class="mr-2">
                      <input type="radio" id="alwaysOpen" name="doorStatus" value="Always Open" class="mr-1" bind:group={doors} />
                      Open
                    </label>
                    <label for="alwaysClosed">
                      <input type="radio" id="alwaysClosed" name="doorStatus" value="Always Closed" class="mr-1" bind:group={doors} />
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
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <button class="right top-2 transparent-button" on:click={() => deleteProtocol(emergency.id)}>
          <i class="fas fa-trash-alt text-blueGray-800"></i>
        </button>
        <h3 class="text-4xl font-bold text-blueGray-800">{emergency.name}</h3>
        <p class="text-blueGray-400 pb-6">{emergency.doors}</p>
        <div class="flex items-center mb-4">
          <span class="mr-1">Devices: {emergency.devices}</span>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg shadow dark:bg-gray-700">
          <p>Description: {emergency.description}</p>
        </div>
        <div class="flex justify-end mb-1 pt-6">
          <button
            data-id="{emergency.id}" 
            onclick={() => handleActivate(emergency)}
            class="bg-green-600 active:bg-green-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mr-2"
            disabled={emergency.isActive}
          >
            Activate
          </button>
          <button 
            data-id="{emergency.id}" 
            onclick={() => handleDeactivate(emergency)}
            class="bg-red-600 text-white active:bg-red-800 uppercase font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
            disabled={!emergency.isActive}
          >
            Deactivate
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>