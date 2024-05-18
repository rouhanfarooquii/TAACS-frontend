<script>
// core components
import CardLineChart from "components/Cards/CardLineChart.svelte";
import CardBarChart from "components/Cards/CardBarChart.svelte";
import CardPageVisits from "components/Cards/CardPageVisits.svelte";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.svelte";
export let location;
export let color = "light";

let id= '';
let name= '';
let description= '';
let selectedDevices = [];
let doors= '';
let devicesToDeactivate = ['Main Entrance Scanner', 'Elevator Control', 'Security Cameras', 'Lobby Scanner', 'Conference Room Door Lock', 'Internal Security Cameras', 'Server Room Door Lock', 'Backup Generator Control', 'IT Department Access Control', 'Parking Garage Door Lock', 'Security Alarms', 'All Door Locks', 'Internal Communication Systems'];
let showModal = false;

let emergencyProtocols = [
    {
        id: 'EP001',
        name: 'Fire Drill',
        description: 'Protocol activated during a fire drill to ensure safety and evacuation.',
        devicesToDeactivate: ['Main Entrance Scanner', 'Elevator Control', 'Security Cameras'],
        doors: 'Always Open',
        isActive: false
    },
    {
        id: 'EP003',
        name: 'Medical Emergency',
        description: 'Protocol activated during a medical emergency to allow easy access for emergency services.',
        devicesToDeactivate: ['Lobby Scanner', 'Conference Room Door Lock', 'Internal Security Cameras'],
        doors: 'Always Open',
        isActive: false
    },
    {
        id: 'EP004',
        name: 'Power Outage',
        description: 'Protocol activated during a power outage to secure all sensitive areas.',
        devicesToDeactivate: ['Server Room Door Lock', 'Backup Generator Control', 'IT Department Access Control'],
        doors: 'Always Close',
        isActive: false
    },
    {
        id: 'EP006',
        name: 'Earthquake',
        description: 'Protocol activated during an earthquake to ensure structural safety and evacuation.',
        devicesToDeactivate: ['Elevator Control', 'Parking Garage Door Lock', 'Security Alarms'],
        doors: 'Always Open',
        isActive: false
    },
    {
        id: 'EP010',
        name: 'Tornado',
        description: 'Protocol activated during a tornado to ensure safety and evacuation.',
        devicesToDeactivate: ['All Door Locks', 'Security Cameras', 'Internal Communication Systems'],
        doors: 'Always Open',
        isActive: false
    }
];

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

// Function to open the modal
function openModal() {
    showModal = true;
}

function closeModal() {
    showModal = false;
    let name= '';
    let description= '';
    let selectedDevices = [];
    let doors= '';
}

export async function handleActivate(emergency) {
    emergency.isActive = true;
}

export async function handleDeactivate(emergency) {
    emergency.isActive = false;
}

export async function addProtocol() {
    emergency.isActive = false;
}

// Close the dropdown if the user clicks outside of it
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
                <div class="modal-content">
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
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                                            Name
                                        </label>
                                        <input type="text" id="name" placeholder="Protocol Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={name}>
                                    </div>
                                    <div class="relative mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                                            Description
                                        </label>
                                        <textarea id="description" placeholder="Enter Description" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={description}></textarea>
                                    </div>
                                    
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">Devices To Include</label>
                                        <div class="dropdown placeholder-blueGray-300 text-blueGray-600 bg-white text-sm rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                            <button on:click={toggleDropdown} class="dropbtn">Select devices</button>
                                            <div class={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
                                                {#each devicesToDeactivate as device}
                                                <div class="flex items-center">
                                                    <input type="checkbox" value={device} on:change={handleCheckboxChange} checked={selectedDevices.includes(device)} />
                                                    <label class="ml-2 text-sm text-blueGray-600">{device}</label>
                                                </div>
                                                {/each}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="relative mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
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
        {#each emergencyProtocols as emergency}
            <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h3 class="text-4xl font-bold text-blueGray-800">{emergency.name}</h3>
                <p class="text-blueGray-400 pb-6">{emergency.doors}</p>
                <div class="flex items-center mb-4">
                    <span class="mr-1">Devices: {emergency.devicesToDeactivate.join(', ')}</span>
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
