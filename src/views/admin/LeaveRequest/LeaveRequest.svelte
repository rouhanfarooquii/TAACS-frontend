<script>
  // core components
  import CardTable from "components/Cards/CardTable.svelte";
  import TableDropdown from "../../../components/Dropdowns/TableDropdown.svelte";
  import { onMount } from 'svelte';
  export let location;
  export let color = "light"
  let selectedState = 'all'; // Initial state

  const handleTabClick = (state) => {
    selectedState = state;
  };

  let leaveRequests = [
      { id: 1234, name: "John Doe", role: "Software Engineer", from: "2024/03/26", to: "2024/03/29", reason: "Doctor's Appointment", status: "Pending" },
      { id: 3524, name: "Jane Smith", role: "Marketing Manager", from: "2024/04/09", to: "2024/04/12", reason: "Family Emergency", status: "Approved" },
      { id: 3453, name: "Doe Wigan", role: "Frontend Developer", from: "2024/03/06", to: "2024/03/09", reason: "Doctor's Appointment", status: "Rejected" },
      { id: 1523, name: "Alice Johnson", role: "HR Manager", from: "2024/04/01", to: "2024/04/02", reason: "Personal Leave", status: "Approved" },
      { id: 6234, name: "Bob Brown", role: "Sales Representative", from: "2024/03/15", to: "2024/03/16", reason: "Vacation", status: "Rejected" },
      { id: 9565, name: "Eve Adams", role: "Product Manager", from: "2024/03/10", to: "2024/03/11", reason: "Work Conference", status: "Pending" },
      { id: 1726, name: "Charlie Davis", role: "Finance Analyst", from: "2024/04/05", to: "2024/04/08", reason: "Family Vacation", status: "Pending" },
      { id: 8234, name: "Grace Lee", role: "Operations Coordinator", from: "2024/03/25", to: "2024/03/26", reason: "Medical Appointment", status: "Approved" },
      { id: 1237, name: "Frank Miller", role: "IT Support Specialist", from: "2024/04/12", to: "2024/04/13", reason: "Training Workshop", status: "Rejected" },
      { id: 1348, name: "Bill Gates", role: "CEO", from: "2024/03/20", to: "2024/03/21", reason: "Sick Leave", status: "Pending" }
  ];

export async function load({ fetch }) {
  const response = await fetch('/api/leaverequests');

  if (!response.ok) {
    throw new Error('Failed to fetch leave requests');
  }

  const leaveRequests = await response.json();

  return { leaveRequests };
}

export async function handleApprove(request) {
  const requestId = request.id;

  try {
    const response = await fetch(`/api/leaverequest/${requestId}/approve`, {
      method: 'PUT', // Specify PUT method for update
      headers: { 'Content-Type': 'application/json' }, // Optional header for JSON data
      body: JSON.stringify({ status: 'Approved' }), // Send status update in body
    });

    if (!response.ok) {
      throw new Error(`Error updating leave request: ${response.statusText}`);
    }

    const updatedRequest = await response.json(); // Parse response as JSON

    // Update local data only if successful
    const updatedLeaveRequests = leaveRequests.map(item => (
      item.id === requestId ? updatedRequest : item
    ));
    leaveRequests = updatedLeaveRequests;
  } catch (error) {
    console.error('Error updating leave request:', error);
    // Handle errors appropriately, e.g., display an error message to the user
  }
}

export async function handleReject(request) {
  const requestId = request.id;

  try {
    const response = await fetch(`/api/leaverequest/${requestId}/reject`, {
      method: 'PUT', // Specify PUT method for update
      headers: { 'Content-Type': 'application/json' }, // Optional header for JSON data
      body: JSON.stringify({ status: 'Rejected' }), // Send status update in body
    });

    if (!response.ok) {
      throw new Error(`Error updating leave request: ${response.statusText}`);
    }

    const updatedRequest = await response.json(); // Parse response as JSON

    // Update local data only if successful
    const updatedLeaveRequests = leaveRequests.map(item => (
      item.id === requestId ? updatedRequest : item
    ));
    leaveRequests = updatedLeaveRequests;
  } catch (error) {
    console.error('Error updating leave request:', error);
    // Handle errors appropriately, e.g., display an error message to the user
  }
}

  let selectedTab = 'pending'; // Default selected tab

  function selectTab(tab) {
    selectedTab = tab;
  }

  // Example function to simulate fetching data from a database
  function fetchData() {
    // Simulate fetching data from a database
    setTimeout(() => {
      // Assume data is fetched successfully
      selectTab('approve'); // Set 'approve' tab as selected
    }, 1000);
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
    Leave Requests
    </h3>
  </div>
  <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px pb-10">
        <li class="me-2">
            <a href="#" class="inline-block p-4 {selectedTab === 'pending' ? 'text-orange-500 border-b-2 border-orange-600 rounded-t-lg hover:border-blueGray-800 dark:hover:text-blueGray-200' : ''}" on:click={() => selectTab('pending')}>Pending</a>
        </li>
        <li class="me-2">
            <a href="#" class="inline-block p-4 {selectedTab === 'approved' ? 'text-green-500 border-b-2 border-green-600 rounded-t-lg hover:border-blueGray-800 dark:hover:text-blueGray-200' : ''}" on:click={() => selectTab('approved')}>Approved</a>
        </li>
        <li class="me-2">
            <a href="#" class="inline-block p-4 {selectedTab === 'rejected' ? 'text-red-500 border-b-2 border-red-600 rounded-t-lg hover:border-blueGray-800 dark:hover:text-blueGray-200' : ''}" on:click={() => selectTab('rejected')}>Rejected</a>
        </li>
    </ul>
</div>

  {#if selectedTab === 'pending'}
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {#each leaveRequests.filter(request => request.status === 'Pending') as request}
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h3 class="text-4xl font-bold text-blueGray-800">{request.name}</h3>
        <p class="text-blueGray-400 pb-6">{request.role}</p>
        <div class="flex items-center mb-4">
          <span class="mr-1">{request.from}</span>
          <span>&rarr;</span>
          <span class="ml-1">{request.to}</span>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg shadow dark:bg-gray-700">
          <p>Leave Reason: {request.reason}</p>
        </div>
        <div class="flex justify-end mb-1 pt-6">
          <button 
          data-id="{request._id}" onclick={() => handleApprove(request)}
          class="bg-green-500 active:bg-green-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mr-2">Approve</button>
          <button
          data-id="{request._id}" onclick={() => handleReject(request)}
          class="bg-red-400 active:bg-red-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">Reject</button>
        </div>
      </div>
    {/each}
  </div>
{/if}

{#if selectedTab === 'approved'}
<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}">
  <div class="block w-full overflow-x-auto">
    <table class="items-center w-full bg-transparent border-collapse">
      <thead>
        <tr>
          <th
            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
          >
            Employee Name
          </th>
          <th
            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
          >
            Position
          </th>
          <th
            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
          >
            From 
          </th>
          <th
            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
          >
            To 
          </th>
          <th
            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
          >
            Reason 
          </th>
        </tr>
      </thead>
      <tbody>
          {#each leaveRequests.filter(request => request.status === 'Approved') as request}
          <tr>
            <td class="table-data font-bold text-blueGray-600" title={request.name}>{request.name}</td>
            <td class="table-data" title={request.role}>{request.role}</td>
            <td class="table-data" title={request.from}>{request.from}</td>
            <td class="table-data" title={request.to}>{request.to}</td>
            <td class="table-data" title={request.reason}>{request.reason}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
{/if}

{#if selectedTab === 'rejected'}
<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}">
  <div class="block w-full overflow-x-auto">
    <table class="items-center w-full bg-transparent border-collapse">
      <thead>
        <tr>
          <th
            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
          >
            Employee Name
          </th>
          <th
            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
          >
            Position
          </th>
          <th
            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
          >
            From 
          </th>
          <th
            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
          >
            To 
          </th>
          <th
            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
          >
            Reason 
          </th>
        </tr>
      </thead>
      <tbody>
          {#each leaveRequests.filter(request => request.status === 'Rejected') as request}
          <tr>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
              <span class="ml-3 font-bold {color === 'light' ? 'text-blueGray-600' : 'text-white'}">{request.name}</span>
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{request.role}</td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{request.from}</td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{request.to}</td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{request.reason}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
{/if}


</div>
