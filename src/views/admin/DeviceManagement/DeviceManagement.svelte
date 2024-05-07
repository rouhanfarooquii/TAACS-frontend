<script>
  // library for creating dropdown menu appear on click
  import { createPopper } from "@popperjs/core";
  import AddDeviceModal from './AddDeviceModal.svelte';
  import Pagination from "../../../components/Pagination/Pagination.svelte";

  let showModal = false;

  function openModal() {
    showModal = true;
  }

  export let color = "light";

  let devices = [
    { name: "SIAdw aIDasduiaduwihhkokokJsd", id: 874329, ip: "192.168.1.14", status: "Active" },
    { name: "Device 2", id: 543217, ip: "192.168.1.16", status: "Inactive" },
    { name: "Device 3", id: 8741249, ip: "192.168.1.20", status: "Active" },
    { name: "Device 4", id: 524329, ip: "192.168.1.24", status: "Inactive" },
    { name: "Device 5", id: 123456, ip: "192.168.1.25", status: "Active" },
    { name: "Device 6", id: 654321, ip: "192.168.1.26", status: "Inactive" },
    { name: "Device 7", id: 135792, ip: "192.168.1.27", status: "Active" },
    { name: "Device 8", id: 987654, ip: "192.168.1.28", status: "Inactive" },
    { name: "Device 9", id: 246810, ip: "192.168.1.29", status: "Active" },
    { name: "Device 10", id: 111213, ip: "192.168.1.30", status: "Inactive" },
    { name: "Device 11", id: 141516, ip: "192.168.1.31", status: "Active" },
    { name: "Device 12", id: 171819, ip: "192.168.1.32", status: "Inactive" },
    { name: "Device 13", id: 202122, ip: "192.168.1.33", status: "Active" },
    { name: "Device 14", id: 232425, ip: "192.168.1.34", status: "Inactive" },
    { name: "Device 15", id: 262728, ip: "192.168.1.35", status: "Active" },
    { name: "Device 16", id: 293031, ip: "192.168.1.36", status: "Inactive" },
    { name: "Device 17", id: 323334, ip: "192.168.1.37", status: "Active" },
    { name: "Device 18", id: 353637, ip: "192.168.1.38", status: "Inactive" },
    { name: "Device 19", id: 383940, ip: "192.168.1.39", status: "Active" },
    { name: "Device 20", id: 414243, ip: "192.168.1.40", status: "Inactive" },
];

 
  // Array to store dropdown visibility for each device row
  let dropdownPopoverShow = new Array(devices.length).fill(false); 

  // Arrays to store references for dropdown buttons and popovers
  let btnDropdownRef = new Array(devices.length);
  let popoverDropdownRef = new Array(devices.length);

  const toggleDropdown = (event, rowIndex) => {
    event.preventDefault();
    // Toggle visibility for the clicked dropdown only
    dropdownPopoverShow[rowIndex] = !dropdownPopoverShow[rowIndex];

    // Hide all other dropdowns
    dropdownPopoverShow.fill(false, 0, rowIndex);
    dropdownPopoverShow.fill(false, rowIndex + 1);

    if (dropdownPopoverShow[rowIndex]) {
      createPopper(btnDropdownRef[rowIndex], popoverDropdownRef[rowIndex], {
        placement: "bottom-start",
      });
    }
  };

  // Define pagination logic
  const devicesPerPage = 5; // Adjust as needed
  let currentPage = 1;

  // Reactive statements to ensure proper updates
  $: startIndex = (currentPage - 1) * devicesPerPage;
  $: endIndex = Math.min(startIndex + devicesPerPage, devices.length);
  $: displayedDevices = devices.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(devices.length / devicesPerPage);

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
            Device Management
          </h3>
        </div>
        <button
          class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button" on:click={openModal}
        >
          Add Device
        </button>
        {#if showModal}
         <AddDeviceModal on:closeModal={() => showModal = false} />
        {/if}
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Device Name
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Device ID
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Device IP
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {#each displayedDevices as device, rowIndex}
                    <tr>
                        <td class="table-data font-bold text-blueGray-600" title={device.name}>{device.name}</td>
                        <td class="table-data" title={device.id}>{device.id}</td>
                        <td class="table-data"title={device.ip}>{device.ip}</td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {#if device.status === 'Active'}
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
                                    bind:this="{btnDropdownRef[rowIndex]}"
                                    on:click="{(event) => toggleDropdown(event, rowIndex)}"
                                >
                                    <i class="fas fa-ellipsis-v"></i>
                                </a>
                                <div
                                bind:this="{popoverDropdownRef[rowIndex]}"
                                class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 {dropdownPopoverShow[rowIndex] ? 'block':'hidden'}"
                                >
                                    <a
                                        href="#pablo" on:click={(e) => e.preventDefault()}
                                        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                    >
                                        Edit
                                    </a>
                                    <a
                                        href="#pablo" on:click={(e) => e.preventDefault()}
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