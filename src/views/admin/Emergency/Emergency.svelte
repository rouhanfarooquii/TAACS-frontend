<script>
    // core components
    import CardLineChart from "components/Cards/CardLineChart.svelte";
    import CardBarChart from "components/Cards/CardBarChart.svelte";
    import CardPageVisits from "components/Cards/CardPageVisits.svelte";
    import CardSocialTraffic from "components/Cards/CardSocialTraffic.svelte";
    export let location;

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
            id: 'EP002',
            name: 'Intruder Alert',
            description: 'Protocol activated when an unauthorized person is detected on the premises.',
            devicesToDeactivate: ['All Door Locks', 'Security Alarms', 'Emergency Sirens'],
            doors: 'Always Close',
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
            id: 'EP005',
            name: 'Gas Leak',
            description: 'Protocol activated during a gas leak to ensure safe evacuation and ventilation.',
            devicesToDeactivate: ['Cafeteria Gas Valve Control', 'HVAC System', 'Main Entrance Door Lock'],
            doors: 'Always Open',
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
            id: 'EP007',
            name: 'Bomb Threat',
            description: 'Protocol activated during a bomb threat to ensure immediate evacuation and safety.',
            devicesToDeactivate: ['Main Entrance Scanner', 'Security Alarms', 'Internal Communication Systems'],
            doors: 'Always Open',
            isActive: false
        },
        {
            id: 'EP008',
            name: 'Active Shooter',
            description: 'Protocol activated during an active shooter situation to secure all areas.',
            devicesToDeactivate: ['All Door Locks', 'Security Cameras', 'Emergency Sirens'],
            doors: 'Always Close',
            isActive: false
        },
        {
            id: 'EP009',
            name: 'Flood',
            description: 'Protocol activated during a flood to ensure safety and evacuation.',
            devicesToDeactivate: ['Basement Door Lock', 'HVAC System', 'Main Entrance Door Lock'],
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

    export async function handleActivate(emergency) {
        emergency.isActive = true;
    }

    export async function handleDeactivate(emergency) {
        emergency.isActive = false;
    }
</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
    <div class="relative w-full px-4 max-w-full flex-grow flex-1 flex items-center justify-between">
        <h3 class="font-semibold text-lg text-blueGray-700">
            Emergency
        </h3>
        <button
            class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        >
            New Emergency
        </button>
    </div>

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
                        class="bg-green-500 active:bg-green-700 uppercase text-white font-bold hover:shadow-md shadow text-sm px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mr-2"
                        disabled={emergency.isActive}
                    >
                        Activate
                    </button>
                    <button 
                        data-id="{emergency.id}" 
                        onclick={() => handleDeactivate(emergency)}
                        class="bg-red-400 active:bg-red-500 uppercase text-white font-bold hover:shadow-md shadow text-sm px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        disabled={!emergency.isActive}
                    >
                        Deactivate
                    </button>
                </div>
            </div>
        {/each}
    </div>
</div>
