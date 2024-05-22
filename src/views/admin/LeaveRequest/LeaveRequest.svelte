<script>
  // core components
  import CardTable from "components/Cards/CardTable.svelte";
  import TableDropdown from "../../../components/Dropdowns/TableDropdown.svelte";
  import Pagination from "../../../components/Pagination/Pagination.svelte";
  import { onMount } from 'svelte';
  import { getAllLeavesApi, updateLeaveApprovedApi, updateLeaveRejectedApi } from '../../../services/api';

  export let location;
  export let color = "light";
  let selectedState = 'all'; // Initial state

  const handleTabClick = (state) => {
    selectedState = state;
  };

  let leaveRequests = [];

  async function loadLeaveRequests() {
    try {
      leaveRequests = await getAllLeavesApi();
      console.log("Leave requests loaded:", leaveRequests);
    } catch (error) {
      console.error('Failed to load leave requests:', error);
    }
  }

  onMount(() => {
    loadLeaveRequests();
  });

  async function updateLeaveStatus(request, status) {
    const updateObj = {
      employee: request.employee._id,
      status: status,
      reason: request.reason,
      fromDate: request.fromDate,
      toDate: request.toDate
    };

    try {
      let responseMsg;
      if (status === 'approved') {
        responseMsg = await updateLeaveApprovedApi(updateObj);
      } else if (status === 'rejected') {
        responseMsg = await updateLeaveRejectedApi(updateObj);
      }
      console.log('Update response:', responseMsg);
      loadLeaveRequests(); // Refresh leave requests after update
    } catch (error) {
      console.error('Error updating leave request:', error);
    }
  }

  export function handleApprove(request) {
    updateLeaveStatus(request, 'approved');
  }

  export function handleReject(request) {
    updateLeaveStatus(request, 'rejected');
  }

  let selectedTab = 'pending'; // Default selected tab

  function selectTab(tab) {
    selectedTab = tab;
  }

  // Define pagination logic
  const leaveRequestsPerPage = 6; // Adjust as needed
  let currentPage = 1;

  // Reactive statements to ensure proper updates
  $: pendingLeaveRequests = leaveRequests.filter(request => request.status === 'pending');
  $: pendingstartIndex = (currentPage - 1) * leaveRequestsPerPage;
  $: pendingendIndex = Math.min(pendingstartIndex + leaveRequestsPerPage, pendingLeaveRequests.length);
  $: pendingdisplayedleaveRequests = pendingLeaveRequests.slice(pendingstartIndex, pendingendIndex);
  $: pendingtotalPages = Math.ceil(pendingLeaveRequests.length / leaveRequestsPerPage);

  // Reactive statements to ensure proper updates
  $: approvedLeaveRequests = leaveRequests.filter(request => request.status === 'approved');
  $: approvedstartIndex = (currentPage - 1) * leaveRequestsPerPage;
  $: approvedendIndex = Math.min(approvedstartIndex + leaveRequestsPerPage, approvedLeaveRequests.length);
  $: approveddisplayedleaveRequests = approvedLeaveRequests.slice(approvedstartIndex, approvedendIndex);
  $: approvedtotalPages = Math.ceil(approvedLeaveRequests.length / leaveRequestsPerPage);

  // Reactive statements to ensure proper updates
  $: rejectedLeaveRequests = leaveRequests.filter(request => request.status === 'rejected');
  $: rejectedstartIndex = (currentPage - 1) * leaveRequestsPerPage;
  $: rejectedendIndex = Math.min(rejectedstartIndex + leaveRequestsPerPage, rejectedLeaveRequests.length);
  $: rejecteddisplayedleaveRequests = rejectedLeaveRequests.slice(rejectedstartIndex, rejectedendIndex);
  $: rejectedtotalPages = Math.ceil(rejectedLeaveRequests.length / leaveRequestsPerPage);

  function handlePageChange(event) {
    console.log("Received page change:", event.detail.pageNumber);  // Confirm event reception
    currentPage = event.detail.pageNumber;
  }
</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <div class="relative w-full px-4 max-w-full flex-grow flex-1">
    <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
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
  <div class="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {#each pendingdisplayedleaveRequests as request}
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h3 class="text-4xl font-bold text-blueGray-800">{request.employee.name}</h3>
        <p class="text-blueGray-400 pb-6">{request.employee.department.title}</p>
        <div class="flex items-center mb-4">
          <span class="mr-1">{request.fromDate.split('T')[0]}</span>
          <span>&rarr;</span>
          <span class="ml-1">{request.toDate.split('T')[0]}</span>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg shadow dark:bg-gray-700">
          <p>Leave Reason: {request.reason}</p>
        </div>
        <div class="flex justify-end mb-1 pt-6">
          <button 
            data-id="{request._id}" onclick={() => handleApprove(request)}
            class="bg-green-600 active:bg-green-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mr-2">Approve</button>
          <button
            data-id="{request._id}" onclick={() => handleReject(request)}
            class="bg-red-600 text-white active:bg-red-800 uppercase font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">Reject</button>
        </div>
      </div>
    {/each}
  </div>
  <br/>
  <Pagination currentPage={currentPage} totalPages={pendingtotalPages} on:pageChange={handlePageChange} />
  {/if}

  {#if selectedTab === 'approved'}
  <div class="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-xl rounded-lg {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}">
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
          {#each approveddisplayedleaveRequests as request}
            <tr>
              <td class="table-data font-bold text-blueGray-600" title={request.employee.name}>{request.employee.name}</td>
              <td class="table-data" title={request.employee.department.title}>{request.employee.department.title}</td>
              <td class="table-data" title={request.fromDate.split('T')[0]}>{request.fromDate.split('T')[0]}</td>
              <td class="table-data" title={request.toDate.split('T')[0]}>{request.toDate.split('T')[0]}</td>
              <td class="table-data" title={request.reason}>{request.reason}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={approvedtotalPages} on:pageChange={handlePageChange} />
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
          {#each rejecteddisplayedleaveRequests as request}
            <tr>
              <td class="table-data font-bold text-blueGray-600" title={request.employee.name}>{request.employee.name}</td>
              <td class="table-data" title={request.employee.department.title}>{request.employee.department.title}</td>
              <td class="table-data" title={request.fromDate.split('T')[0]}>{request.fromDate.split('T')[0]}</td>
              <td class="table-data" title={request.toDate.split('T')[0]}>{request.toDate.split('T')[0]}</td>
              <td class="table-data" title={request.reason}>{request.reason}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={rejectedtotalPages} on:pageChange={handlePageChange} />
    </div>
  </div>
  {/if}
</div>