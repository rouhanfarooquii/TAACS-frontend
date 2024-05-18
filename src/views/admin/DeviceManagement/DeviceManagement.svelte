<script>
  import { onMount, onDestroy } from 'svelte';
  import { createPopper } from "@popperjs/core";
  import Pagination from "../../../components/Pagination/Pagination.svelte";
  import { getAllDevicesApi, updateDeviceApi, deleteDeviceApi, addDeviceApi } from '../../../services/api'; // Import the functions

  export let color = "light";

  let deviceName = '';
  let deviceId = '';
  let deviceIp = '';
  let status = false;
  let showModal = false;
  let editModal = false;
  let currentDevice = null;
  let devices = [];

  async function fetchAllDevices() {
    try {
      const backendDevices = await getAllDevicesApi();
      for (let i = 0; i < backendDevices.length ; i++) {
        if(backendDevices[i].status == "Active"){
          backendDevices[i].status = true
        }
        else{
          backendDevices[i].status = false

        }
      }
      devices = JSON.parse(JSON.stringify(backendDevices));
      console.log('Fetched Devices:', devices);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  }

  onMount(() => {
    fetchAllDevices();
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  });

  async function addDevice() {
    if (validateInputs()) {
      try {
        const isDuplicate = devices.some(device => device.deviceName === deviceName || device.deviceId === deviceId || device.ip === deviceIp);
        
        if (isDuplicate) {
          alert('Device Name, ID, and IP must be unique.');
          return;
        }

        const response = await addDeviceApi({
          deviceName,
          deviceId,
          ip: deviceIp,
          status: status ? 'Active' : 'Inactive',
          hide: false
        });

        console.log('Add Response:', response);
        await fetchAllDevices();
        closeModal();
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the device. Please try again.');
      }
    }
  }

  async function updateDevice() {
    if (validateInputs()) {
      let temp = JSON.parse(JSON.stringify(currentDevice));
      if (temp) {
        try {
          console.log(temp);
          if(temp.status){
            temp.status = "Active"
          }
          else{
            temp.status = "Inactive"
          }
          const response = await updateDeviceApi(temp);
          console.log('Update Response:', response);
          await fetchAllDevices();
          closeModal();
        } catch (error) {
          console.error('Error updating device:', error);
          alert('An error occurred while updating the device status. Please try again.');
        }
      }
    }
  }

  async function deleteDevice(device) {
    try {
      const response = await deleteDeviceApi(device._id);
      console.log('Delete Response:', response);
      await fetchAllDevices();
    } catch (error) {
      console.error('Error deleting device:', error);
      alert('An error occurred while deleting the device. Please try again.');
    }
  }

  function validateInputs() {
    let isValid = true;

    if (!deviceName) {
      document.getElementById('device-name-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('device-name-error').style.display = 'none';
    }

    if (!deviceId) {
      document.getElementById('device-id-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('device-id-error').style.display = 'none';
    }

    if (!deviceIp) {
      document.getElementById('device-ip-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('device-ip-error').style.display = 'none';
    }

    return isValid;
  }

  function openModal() {
    showModal = true;
  }

  function openEditModal(device) {
    currentDevice = device;
    deviceName = device.deviceName;
    deviceId = device.deviceId;
    deviceIp = device.ip;
    status = device.status === 'Active';
    editModal = true;
  }

  function closeModal() {
    showModal = false;
    editModal = false;
    deviceName = '';
    deviceId = '';
    deviceIp = '';
    currentDevice = null;

    document.getElementById('device-name-error').style.display = 'none';
    document.getElementById('device-id-error').style.display = 'none';
    document.getElementById('device-ip-error').style.display = 'none';
  }

  const devicesPerPage = 5; 
  let currentPage = 1;

  $: startIndex = (currentPage - 1) * devicesPerPage;
  $: endIndex = Math.min(startIndex + devicesPerPage, devices.length);
  $: displayedDevices = devices.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(devices.length / devicesPerPage);

  function handlePageChange(event) {
    currentPage = event.detail.pageNumber;
  }

  let dropdownPopoverShow = new Array(devices.length).fill(false); 
  let btnDropdownRef = new Array(devices.length);
  let popoverDropdownRef = new Array(devices.length);

  function toggleDropdown(event, rowIndex) {
    event.stopPropagation();
    dropdownPopoverShow[rowIndex] = !dropdownPopoverShow[rowIndex];

    dropdownPopoverShow.forEach((open, index) => {
      if (index !== rowIndex) dropdownPopoverShow[index] = false;
    });

    if (dropdownPopoverShow[rowIndex]) {
      createPopper(btnDropdownRef[rowIndex], popoverDropdownRef[rowIndex], {
        placement: "bottom-start",
      });
    }
  }

  onDestroy(() => {
    window.removeEventListener('click', handleClickOutside, true);
  });

  $: {
    if (dropdownPopoverShow.includes(true)) {
      window.addEventListener('click', handleClickOutside, true);
    } else {
      window.removeEventListener('click', handleClickOutside, true);
    }
  }

  function handleClickOutside(event) {
    for (let i = 0; i < btnDropdownRef.length; i++) {
      const button = btnDropdownRef[i];
      const popover = popoverDropdownRef[i];

      if (button && !button.contains(event.target) && popover && !popover.contains(event.target)) {
        dropdownPopoverShow[i] = false;
      }
    }
  }
</script>

<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}">
  <div class="rounded-t mb-0 px-4 py-10 border-0">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full px-4 max-w-full flex-grow flex-1">
        <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
          Device Management
        </h3>
      </div>
      <button
        class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        type="button" on:click={openModal}
      >
        Add Device
      </button>
      {#if showModal || editModal}
      <div class="modal">
        <div class="modal-content">
          <div class="rounded-t mb-0 px-4 py-10 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-lg text-blueGray-700">
                  {editModal ? 'Edit Device' : 'Add Device'}
                </h3>
              </div>
            </div>
          </div>
          <div class="block w-full overflow-x-auto">
            <div class="px-4 py-5 flex-auto">
              <div class="flex flex-wrap">
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-name">
                      Device Name
                    </label>
                    <input type="text" id="device-name" placeholder="Device Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={currentDevice.deviceName}>
                    <span id="device-name-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-id">
                      Device ID
                    </label>
                    <input type="text" id="device-id" placeholder="Device ID" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={currentDevice.deviceId}>
                    <span id="device-id-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Device IP
                    </label>
                    <input type="text" id="device-ip" placeholder="Device IP" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={currentDevice.ip}>
                    <span id="device-ip-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  {#if editModal}
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="status">
                      Status
                    </label>
                    <label class="switch">
                      <input type="checkbox" id="status" class="hidden" bind:checked={currentDevice.status}>
                      <span class="slider round"></span> 
                    </label>
                  </div>
                  {/if}
                </div>
              </div>
              <div class="flex justify-end">
                <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"  on:click={editModal ? updateDevice : addDevice}>
                  {editModal ? 'Update' : 'Add'}
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
    </div>
  </div>
  <div class="block w-full overflow-x-auto">
    <table class="items-center w-full bg-transparent border-collapse">
      <thead>
        <tr>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Device Name
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Device ID
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Device IP
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {#each displayedDevices as device, rowIndex}
          <tr>
            <td class="table-data font-bold text-blueGray-600" title={device.deviceName}>{device.deviceName}</td>
            <td class="table-data" title={device.deviceId}>{device.deviceId}</td>
            <td class="table-data" title={device.ip}>{device.ip}</td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {#if device.status === true}
                <i class="fas fa-circle text-green-500 mr-2"></i> Active
              {:else}
                <i class="fas fa-circle text-red-500 mr-2"></i> Inactive
              {/if}
            </td>
            <td class="table-data">
              <div>
                <a
                  class="text-blueGray-500 py-1 px-3"
                  href="#pablo"
                  bind:this={btnDropdownRef[rowIndex]}
                  on:click={(event) => toggleDropdown(event, rowIndex)}
                >
                  <i class="fas fa-ellipsis-v"></i>
                </a>
                <div bind:this={popoverDropdownRef[rowIndex]} class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 {dropdownPopoverShow[rowIndex] ? 'block':'hidden'}" on:click|self={(e) => e.stopPropagation()}>
                  <a
                    href="#pablo" on:click={(e) => { e.preventDefault(); openEditModal(device); }}
                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                  >
                    Edit
                  </a>
                  <a
                    href="#pablo" on:click={(e) => { e.preventDefault(); deleteDevice(device); }}
                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                  >
                    Delete
                  </a>
                </div>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
  </div>
</div>