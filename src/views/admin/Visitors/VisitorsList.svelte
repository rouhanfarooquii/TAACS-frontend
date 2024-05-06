<!-- <script>
    // core components
    import CardLineChart from "components/Cards/CardLineChart.svelte";
    import CardBarChart from "components/Cards/CardBarChart.svelte";
    import CardPageVisits from "components/Cards/CardPageVisits.svelte";
    import CardSocialTraffic from "components/Cards/CardSocialTraffic.svelte";
    export let location;
  </script>
  
  <div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <CardPageVisits />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <CardSocialTraffic />
      </div>
    </div>
  </div>
   -->

   <script>
    // core components
    import CardTable from "components/Cards/CardTable.svelte";
    import TableDropdown from "../../../components/Dropdowns/TableDropdown.svelte";
    import { onMount } from 'svelte';
    export let location;
    export let color = "light"
    let selectedState = 'all'; // Initial state
    let selectedTab = ''; // Default selected tab
  
    function selectTab(tab) {
      selectedTab = tab;
    }
  
    const handleTabClick = (state) => {
      selectedState = state;
    };
  
    let visitorsList = [
    { id: 1234, name: "John Doe", email: "john.doe@example.com", mobileNumber: "1234567890", date: "2024/03/26", reasonToVisit: "Doctor's Appointment", status: "Pending" },
    { id: 3524, name: "Jane Smith", email: "jane.smith@example.com", mobileNumber: "9876543210", date: "2024/04/09", reasonToVisit: "Family Emergency", status: "Upcoming" },
    { id: 3453, name: "Doe Wigan", email: "doe.wigan@example.com", mobileNumber: "4567890123", date: "2024/03/06", reasonToVisit: "Doctor's Appointment", status: "History" },
    { id: 1523, name: "Alice Johnson", email: "alice.johnson@example.com", mobileNumber: "7890123456", date: "2024/04/01", reasonToVisit: "Personal Leave", status: "Upcoming" },
    { id: 6234, name: "Bob Brown", email: "bob.brown@example.com", mobileNumber: "5678901234", date: "2024/03/15", reasonToVisit: "Vacation", status: "History" },
    { id: 9565, name: "Eve Adams", email: "eve.adams@example.com", mobileNumber: "3456789012", date: "2024/03/10", reasonToVisit: "Work Conference", status: "Pending" },
    { id: 1726, name: "Charlie Davis", email: "charlie.davis@example.com", mobileNumber: "6789012345", date: "2024/04/05", reasonToVisit: "Family Vacation", status: "Pending" },
    { id: 8234, name: "Grace Lee", email: "grace.lee@example.com", mobileNumber: "9012345678", date: "2024/03/25", reasonToVisit: "Medical Appointment", status: "Upcoming" },
    { id: 1237, name: "Frank Miller", email: "frank.miller@example.com", mobileNumber: "2345678901", date: "2024/04/12", reasonToVisit: "Training Workshop", status: "History" },
    { id: 1348, name: "Bill Gates", email: "bill.gates@example.com", mobileNumber: "4567890123", date: "2024/03/20", reasonToVisit: "Sick Leave", status: "Pending" },
    { id: 2345, name: "Elon Musk", email: "elon.musk@example.com", mobileNumber: "6543210987", date: "2024/05/01", reasonToVisit: "Business Meeting", status: "Upcoming" },
    { id: 3456, name: "Mark Zuckerberg", email: "mark.zuckerberg@example.com", mobileNumber: "7890123456", date: "2024/05/10", reasonToVisit: "Company Event", status: "Pending" },
    { id: 4567, name: "Jeff Bezos", email: "jeff.bezos@example.com", mobileNumber: "8901234567", date: "2024/05/15", reasonToVisit: "Strategy Planning", status: "Pending" }
];
  
  // Simulated fetch function
  async function fetchData() {
        // Simulate fetching data from a database
        try {
            const response = await fetch('/api/visitors');
            if (!response.ok) {
                throw new Error('Failed to fetch visitors');
            }
            visitorsList = await response.json();
            // Check for dates and move requests to appropriate tabs
            updateTabs();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
  
    async function approveRequest(request) {
    const requestId = request.id;
    try {
        // Simulated approval process
        const response = await fetch(`/api/visitors/${requestId}/approve`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'Approved' }),
        });
        if (!response.ok) {
            throw new Error(`Error updating visitor request: ${response.statusText}`);
        }
        // Update the local data only if successful
        const updatedRequest = await response.json();
        visitorsList = visitorsList.map(item => (item.id === requestId ? updatedRequest : item));
        // Move the request to the upcoming tab
        selectedTab = 'upcoming';
        // Check for dates and move requests to appropriate tabs
        updateTabs();
    } catch (error) {
        console.error('Error updating visitor request:', error);
    }
}
  
    async function rejectRequest(request) {
        const requestId = request.id;
        try {
            // Simulated rejection process
            const response = await fetch(`/api/visitors/${requestId}/reject`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Rejected' }),
            });
            if (!response.ok) {
                throw new Error(`Error updating visitor request: ${response.statusText}`);
            }
            // Remove the rejected request from the list
            visitorsList = visitorsList.filter(item => item.id !== requestId);
        } catch (error) {
            console.error('Error updating visitor request:', error);
        }
    }

    // Function to update tabs based on dates
function updateTabs() {
    const currentDate = new Date();
    visitorsList.forEach(request => {
        const requestDate = new Date(request.date);
        if (requestDate < currentDate) {
            // Move request to history tab if the date has passed
            request.status = 'History';
        } else if (request.status === 'Pending') {
            // Move request to upcoming tab if it was approved
            request.status = 'Upcoming';
        }
    });
}
  
    // Simulate fetching data when the component mounts
    onMount(() => {
      fetchData();
    });
  </script>
  
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
      <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}"
      >
      Visitors List
      </h3>
    </div>
    <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px pb-10">
          <li class="me-2">
              <a href="#" class="inline-block p-4 {selectedTab === 'pending' ? 'text-orange-500 border-b-2 border-orange-600 rounded-t-lg hover:border-blueGray-800 dark:hover:text-blueGray-200' : ''}" on:click={() => selectTab('pending')}>Pending</a>
          </li>
          <li class="me-2">
              <a href="#" class="inline-block p-4 {selectedTab === 'upcoming' ? 'text-green-500 border-b-2 border-green-600 rounded-t-lg hover:border-blueGray-800 dark:hover:text-blueGray-200' : ''}" on:click={() => selectTab('upcoming')}>Upcoming</a>
          </li>
          <li class="me-2">
              <a href="#" class="inline-block p-4 {selectedTab === 'history' ? 'text-red-500 border-b-2 border-red-600 rounded-t-lg hover:border-blueGray-800 dark:hover:text-blueGray-200' : ''}" on:click={() => selectTab('history')}>History</a>
          </li>
      </ul>
  </div>
  
    {#if selectedTab === 'pending'}
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {#each visitorsList.filter(request => request.status === 'Pending') as request}
        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h3 class="text-4xl font-bold text-blueGray-800">{request.name}</h3>
          <p class="text-blueGray-400 pb-6">{request.email} <br/> {request.mobileNumber}</p>
          <div class="flex items-center mb-4">
            <span class="mr-1">{request.date}</span>
          </div>
          <div class="bg-gray-100 p-4 rounded-lg shadow dark:bg-gray-700">
            <p>Reason to visit: {request.reasonToVisit}</p>
          </div>
          <div class="flex justify-end mb-1 pt-6">
            <button 
            data-id="{request._id}" onclick={() => approveRequest(request)}
            class="bg-green-500 active:bg-green-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mr-2">Approve</button>
            <button
            data-id="{request._id}" onclick={() => rejectRequest(request)}
            class="bg-red-400 active:bg-red-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">Reject</button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  
  {#if selectedTab === 'upcoming'}
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}">
    <div class="block w-full overflow-x-auto">
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Visitor Name
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Email
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Mobile Number 
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Date 
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Reason to visit
            </th>
          </tr>
        </thead>
        <tbody>
            {#each visitorsList.filter(request => request.status === 'Upcoming') as request}
            <tr>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                <span class="ml-3 font-bold {color === 'light' ? 'text-blueGray-600' : 'text-white'}">{request.name}</span>
              </td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{request.email}</td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{request.mobileNumber}</td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{request.date}</td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{request.reasonToVisit}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  {/if}
  
  {#if selectedTab === 'history'}
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}">
    <div class="block w-full overflow-x-auto">
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Visitor Name
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Email
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Mobile Number 
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Date 
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Reason to visit 
            </th>
          </tr>
        </thead>
        <tbody>
            {#each visitorsList.filter(request => request.status === 'History') as request}
            <tr>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                <span class="ml-3 font-bold {color === 'light' ? 'text-blueGray-600' : 'text-white'}">{request.name}</span>
              </td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{request.email}</td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{request.mobileNumber}</td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{request.date}</td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{request.reasonToVisit}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  {/if}
  
  
  </div>
  