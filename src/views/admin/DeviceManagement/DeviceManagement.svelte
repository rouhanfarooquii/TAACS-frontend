<script>
  import { onMount, onDestroy } from 'svelte';
  import Pagination from "../../../components/Pagination/Pagination.svelte";
  import { getAllDevicesApi, updateDeviceApi, deleteDeviceApi, addDeviceApi, getAllLocationsApi, } from '../../../services/api';
  import ConfirmationModal from '../../../components/Confirmation/ConfirmationModal.svelte';
  import Toast from '../../../components/Confirmation/Toast.svelte';

  export let color = "light";

  let deviceName = '';
  let deviceId = '';
  let deviceIp = '';
  let status = false;
  let showModal = false;
  let editModal = false;
  let confirmationModal = false;
  let currentDevice = null;
  let deviceToDelete = null;
  let devices = [];
  
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

  async function fetchAllDevices() {
    try {
      const backendDevices = await getAllDevicesApi();
      backendDevices.forEach(device => device.status = device.status === "Active");
      devices = JSON.parse(JSON.stringify(backendDevices));
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  }

  let delLogicLocations = []
  async function fetchDelLogicLocations() {
    try {
      delLogicLocations = await getAllLocationsApi(true);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  }

  onMount(async () => {
    await fetchAllDevices();
    await fetchDelLogicLocations()
  });

  async function addDevice() {
  if (validateInputs()) {
    try {
      const isDeviceNameDuplicate = devices.some(device => device.deviceName === deviceName);
      const isDeviceIdDuplicate = devices.some(device => device.deviceId === Number(deviceId));
      const isDeviceIpDuplicate = devices.some(device => device.ip === deviceIp);

      
      if (isDeviceNameDuplicate && isDeviceIdDuplicate && isDeviceIpDuplicate) {
        showToasterMessage('Device name, ID, and IP should all be unique.', 'error');
        return;
      }
      if (isDeviceNameDuplicate && isDeviceIdDuplicate) {
        showToasterMessage('Device name and ID should be unique.', 'error');
        return;
      }
      if (isDeviceNameDuplicate && isDeviceIpDuplicate) {
        showToasterMessage('Device name and IP should be unique.', 'error');
        return;
      }
      if (isDeviceIdDuplicate && isDeviceIpDuplicate) {
        showToasterMessage('Device ID and IP should be unique.', 'error');
        return;
      }
      if (isDeviceNameDuplicate) {
        showToasterMessage('Device name should be unique.', 'error');
        return;
      }
      if (isDeviceIdDuplicate) {
        showToasterMessage('Device ID should be unique.', 'error');
        return;
      }
      if (isDeviceIpDuplicate) {
        showToasterMessage('Device IP should be unique.', 'error');
        return;
      }

      // console.log('Adding device:', { deviceName, deviceId, deviceIp, status });

      let res = await addDeviceApi({
        deviceName,
        deviceId,
        ip: deviceIp,
        status: status ? 'Active' : 'Inactive',
        hide: false
      });
      if(res == "Device not found online"){
        showToasterMessage('Device not found online', 'error');
      }
      else{
        showToasterMessage('Device added successfully!', 'success');
      }
      await fetchAllDevices();
      closeModal();
    } catch (error) {
      console.error('Error:', error);
      showToasterMessage('An error occurred while adding the device. Please try again.', 'error');
    }
  }
}

  async function updateDevice() {
    if (validateInputs() && currentDevice) {
    const isDeviceNameDuplicate = devices.some(device => device.deviceName === deviceName && device._id !== currentDevice._id);
    const isDeviceIdDuplicate = devices.some(device => device.deviceId === Number(deviceId) && device._id !== currentDevice._id);
    const isDeviceIpDuplicate = devices.some(device => device.ip === deviceIp && device._id !== currentDevice._id);

    if (isDeviceNameDuplicate && isDeviceIdDuplicate && isDeviceIpDuplicate) {
      showToasterMessage('Device name, ID, and IP should all be unique.', 'error');
      return;
    }
    if (isDeviceNameDuplicate && isDeviceIdDuplicate) {
      showToasterMessage('Device name and ID should be unique.', 'error');
      return;
    }
    if (isDeviceNameDuplicate && isDeviceIpDuplicate) {
      showToasterMessage('Device name and IP should be unique.', 'error');
      return;
    }
    if (isDeviceIdDuplicate && isDeviceIpDuplicate) {
      showToasterMessage('Device ID and IP should be unique.', 'error');
      return;
    }
    if (isDeviceNameDuplicate) {
      showToasterMessage('Device name should be unique.', 'error');
      return;
    }
    if (isDeviceIdDuplicate) {
      showToasterMessage('Device ID should be unique.', 'error');
      return;
    }
    if (isDeviceIpDuplicate) {
      showToasterMessage('Device IP should be unique.', 'error');
      return;
    }
      try {
        const updatedDevice = { ...currentDevice, deviceName, deviceId, ip: deviceIp, status: status ? "Active" : "Inactive" };
        await updateDeviceApi(updatedDevice);
        await fetchAllDevices();
        showToasterMessage('Device updated successfully!', 'success');
        closeModal();
      } catch (error) {
        console.error('Error updating device:', error);
        showToasterMessage('An error occurred while updating the device status. Please try again.', 'error');
        // alert('An error occurred while updating the device status. Please try again.');
      }
    }
  }

  function showDeleteConfirmation(device) {
    deviceToDelete = device;
    confirmationModal = true;
  }

  async function confirmDeleteDevice() {
    try {
      for (let i = 0; i < delLogicLocations.length; i++) {
        for (let j = 0; j < delLogicLocations[i].devices.length; j++) {
          if(delLogicLocations[i].devices[j]._id.toString() == deviceToDelete._id.toString()){
            showToasterMessage('Cannot delete. Device is bind to a ' + delLogicLocations[i].title + ' Location', 'error');
            return;
          }
        }
      }

      await deleteDeviceApi(deviceToDelete._id);
      await fetchAllDevices();
      showToasterMessage('Device deleted successfully!', 'success');
      closeConfirmationModal();
    } catch (error) {
      console.error('Error deleting device:', error);
      showToasterMessage('An error occurred while deleting the device. Please try again.', 'error');
      // alert('An error occurred while deleting the device. Please try again.');
    }
  }

  function closeConfirmationModal() {
    confirmationModal = false;
    deviceToDelete = null;
  }

  function validateInputs() {
    let isValid = true;

    const deviceName = document.getElementById('device-name').value;
    const deviceId = document.getElementById('device-id').value;
    const deviceIp = document.getElementById('device-ip').value;

    // Validate Device Name
    if (!deviceName) {
        document.getElementById('device-name-error').innerText = '* Field Required';
        document.getElementById('device-name-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('device-name-error').style.display = 'none';
    }

    // Validate Device ID
    if (!deviceId) {
        document.getElementById('device-id-error').innerText = '* Field Required';
        document.getElementById('device-id-error').style.display = 'block';
        isValid = false;
    } else if (isNaN(deviceId)) {
        document.getElementById('device-id-error').innerText = 'Device ID must be a number.';
        document.getElementById('device-id-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('device-id-error').style.display = 'none';
    }

    // Validate Device IP
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;
    if (!deviceIp) {
        document.getElementById('device-ip-error').innerText = '* Field Required';
        document.getElementById('device-ip-error').style.display = 'block';
        isValid = false;
    } else if (!ipPattern.test(deviceIp)) {
        document.getElementById('device-ip-error').innerText = 'Invalid IP address format. (xxx.xxx.xxx.xxx)';
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
    status = device.status;
    editModal = true;
  }

  function closeModal() {
    showModal = false;
    editModal = false;
    deviceName = '';
    deviceId = '';
    deviceIp = '';
    status = false;
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
</script>

<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}">
  {#if showToaster}
    <Toast message={toasterMessage} type={toasterType} />
  {/if}
  <div class="rounded-t mb-0 px-4 py-10 border-0">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full px-4 max-w-full flex-grow flex-1">
        <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
          Device Management
        </h3>
      </div>
      <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={openModal}>
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
                    <input type="text" id="device-name" placeholder="Device Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={deviceName}>
                    <span id="device-name-error" class="text-red-600 text-xs" style="display: none;"></span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-id">
                      Device ID
                    </label>
                    <input type="text" id="device-id" placeholder="Device ID" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={deviceId}>
                    <span id="device-id-error" class="text-red-600 text-xs" style="display: none;"></span>
                  </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                      Device IP
                    </label>
                    <input type="text" id="device-ip" placeholder="Device IP" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={deviceIp}>
                    <span id="device-ip-error" class="text-red-600 text-xs" style="display: none;"></span>
                  </div>
                  {#if editModal}
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="status">
                      Status
                    </label>
                    <label class="switch">
                      <input type="checkbox" id="status" class="hidden" bind:checked={status}>
                      <span class="slider round"></span> 
                    </label>
                  </div>
                  {/if}
                </div>
              </div>
              <div class="flex justify-end">
                <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={editModal ? updateDevice : addDevice}>
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
      {#if confirmationModal}
      <ConfirmationModal
        message="Are you sure you want to delete this device?"
        onConfirm={confirmDeleteDevice}
        onCancel={closeConfirmationModal}
      />
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
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {#each displayedDevices as device, rowIndex}
          <tr>
            <td class="table-data font-bold text-blueGray-600" title={device.deviceName}>{device.deviceName}</td>
            <td class="table-data" title={device.deviceId}>{device.deviceId}</td>
            <td class="table-data" title={device.ip}>{device.ip}</td>
            <td class="table-data">
              {#if device.status === true}
                <i class="fas fa-circle text-green-500 mr-2"></i> Active
              {:else}
                <i class="fas fa-circle text-red-500 mr-2"></i> Inactive
              {/if}
            </td>
            <td class="table-data">
              <div class="flex items-center">
                <i class="fas fa-edit mr-2 text-sm cursor-pointer" on:click={() => openEditModal(device)}></i>
                <i class="fas fa-trash-alt text-sm cursor-pointer" on:click={() => showDeleteConfirmation(device)}></i>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
  </div>
</div>
