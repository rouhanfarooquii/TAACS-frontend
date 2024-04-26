<script>
    // core components
    import CardTable from "../../../components/Cards/CardTable.svelte";
    import TableDropdown from "../../../components/Dropdowns/TableDropdown.svelte";

    import { navigate } from 'svelte-routing';
    function navigateToAddDevice() {
    navigate('/admin/adddevice');
  }
  
    export let color = "light";
    
    let devices = [
      { name: "Device 1", id: 874329, ip: "192.168.1.14", status: "Active" },
      { name: "Device 2", id: 543217, ip: "192.168.1.16", status: "Pending" },
      { name: "Device 3", id: 8741249, ip: "192.168.1.20", status: "Active" },
      { name: "Device 4", id: 524329, ip: "192.168.1.24", status: "Active" }
    ];

    
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
          class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={navigateToAddDevice}
          type="button"
        >
          Add Device
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
          {#each devices as device}
            <tr>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                <span class="ml-3 font-bold {color === 'light' ? 'text-blueGray-600' : 'text-white'}">{device.name}</span>
              </td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{device.id}</td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{device.ip}</td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {#if device.status === 'Active'}
                <i class="fas fa-circle text-green-500 mr-2"></i> Active
                {:else}
                <i class="fas fa-circle text-orange-500 mr-2"></i> Inactive
                {/if}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
              >
                <TableDropdown />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  