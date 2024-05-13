<script>
  // library for creating dropdown menu appear on click
  import { onMount } from 'svelte';
  import { onDestroy } from 'svelte';
  import { createPopper } from "@popperjs/core";
  import Pagination from "../../../components/Pagination/Pagination.svelte";
  export let color = "light";

  let users = [
  {
    photo: "user1.jpg",
    id: "123456",
    name: "John Doe",
    dateTime: "2024-05-14 09:00:00",
    status: "Present",
    verType: "Face",
    device: "EzFace Device 1",
    timeZone: "UTC+5",
    finger: "Right Index Finger",
    deviceStatus: "Active"
  },
  {
    photo: "user2.jpg",
    id: "789012",
    name: "Jane Smith",
    dateTime: "2024-05-14 09:05:00",
    status: "Present",
    verType: "Face",
    device: "EzFace Device 1",
    timeZone: "UTC+5",
    finger: "Left Thumb",
    deviceStatus: "Active"
  },
  // Add more dummy data as needed
];



async function updateDevice() {
    if (currentDevice) {
        try {
            const response = await fetch('/api/updateDeviceStatus/${currentDevice.id}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: currentDevice.status })
            });

            if (response.ok) {
                closeModal(); // Close modal on success
                // Refresh the device list or mutate the state as needed
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updating the device status. Please try again.');
      }
    }
}

  function handlePageChange(event) {
    console.log("Received page change:", event.detail.pageNumber);  // Confirm event reception
    currentPage = event.detail.pageNumber;
}

</script>
  
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}">
    <div class="rounded-t mb-0 px-4 py-10 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
            Live Data
          </h3>
        </div>
        <input type="checkbox" id="showImage" name="showImage" class="mr-4">
        <label for="showImage" class="font-semibold mr-4">Show Image in Live Transactions</label>
        <button
          class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
        >
          Save
        </button>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Photo
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              ID
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Name
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              DateTime
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Status
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Verification Type
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Device
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Time Zone
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Finger Used 
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Status From Device
            </th>
          </tr>
        </thead>
        <tbody>
          {#each users as user}
                    <tr>
                        <td class="table-data font-bold text-blueGray-600 text-xs" title={user.photo}>{user.photo}</td>
                        <td class="table-data font-bold text-blueGray-600 text-xs" title={user.id}>{user.id}</td>
                        <td class="table-data font-bold text-blueGray-600 text-xs" title={user.name}>{user.name}</td>
                        <td class="table-data font-bold text-blueGray-600 text-xs" title={user.dateTime}>{user.dateTime}</td>
                        <td class="table-data font-bold text-blueGray-600 text-xs" title={user.status}>{user.status}</td>
                        <td class="table-data font-bold text-blueGray-600 text-xs"title={user.verType}>{user.verType}</td>
                        <td class="table-data font-bold text-blueGray-600 text-xs" title={user.device}>{user.device}</td>
                        <td class="table-data font-bold text-blueGray-600 text-xs" title={user.timeZone}>{user.timeZone}</td>
                        <td class="table-data font-bold text-blueGray-600 text-xs" title={user.finger}>{user.finger}</td>
                        <td class="table-data font-bold text-blueGray-600 text-xs" title={user.deviceStatus}>{user.deviceStatus}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>