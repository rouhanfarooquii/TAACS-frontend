<script>
  import Pagination from "../../../components/Pagination/Pagination.svelte";
  import Toast from '../../../components/Confirmation/Toast.svelte';
  import { onMount } from 'svelte';
  import { getAllVisitorsApi, updateVisitorApprovedApi, updateVisitorRejectedApi } from '../../../services/api';

  export let location;
  export let color = "light";
  let selectedState = 'all'; // Initial state
  let selectedTab = 'pending'; // Default selected tab
  const currentDate = new Date();

  const handleTabClick = (state) => {
    selectedState = state;
  };

  let visitorsList = [];
  let showModal = false;
  let selectedRequest = null;
  let personalPassword = '';
  let cardIdNumber = '';

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

  async function loadVisitors() {
    try {
      visitorsList = await getAllVisitorsApi();
      console.log(visitorsList);
    } catch (error) {
      console.error('Failed to load visitors:', error);
    }
  }

  onMount(async () => {
    await loadVisitors();
  });

  function selectTab(tab) {
    selectedTab = tab;
    currentPage = 1; // Reset to first page on tab change
  }

  async function updateVisitorStatus(request, status) {
    const updateObj = { 
      status: status,
      personalPassword: personalPassword,
      cardIdNumber: cardIdNumber, 
      name: request.name, 
      email: request.email, 
      startTime: request.startTime, 
      endTime: request.endTime, 
      DateOfVisit: request.DateOfVisit,
      reasonOfVisiting: request.reasonOfVisiting, 
      fingerIndex1:request.fingerIndex1,
      fingerIndex2: request.fingerIndex2, 
      locations:request.locations,
      mobileNumber: request.mobileNumber,
      address: request.address,
      gender: request.gender,
      visitorID: request.visitorID,
      requestor: request.requestor,
      file: request.imagePath,
    };
    console.log('Update object:', updateObj);
    try {
      let responseMsg;
      if (status === 'approved') {
        responseMsg = await updateVisitorApprovedApi(request._id, updateObj);
        showToasterMessage('Visitor request approved', 'success');
      } else if (status === 'rejected') {
        responseMsg = await updateVisitorRejectedApi(request._id, updateObj);
        showToasterMessage('Visitor request rejected', 'success');
      }
      console.log('Update response:', responseMsg);
      loadVisitors(); // Refresh visitor requests after update
    } catch (error) {
      console.error('Error updating visitor request:', error);
      showToasterMessage('An error occurred while updating visitor request. Please try again.', 'error');
    }
  }

  function handleApprove(request) {
    selectedRequest = request;
    showModal = true;
    // updateVisitorStatus(request, 'Approved');
  }

  function handleReject(request) {
    updateVisitorStatus(request, 'Rejected');
  }

  function closeModal() {
    showModal = false;
    personalPassword = '';
    cardIdNumber = '';
  }

  function handleSubmit() {
    if (validateInputs()) {
      updateVisitorStatus(selectedRequest, 'approved');
      closeModal();
    } else {
      showToasterMessage('Please fill in all fields correctly', 'error');
    }
  }

  function validateInputs() {
    let valid = true;

    if (!cardIdNumber) {
      document.getElementById('card-id-error').innerText = '* Field is required';
      document.getElementById('card-id-error').style.display = 'block';
      valid = false;
    } else if (cardIdNumber.length < 10) {
      document.getElementById('card-id-error').innerText = 'Card ID Number must be 10 digits';
      document.getElementById('card-id-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('card-id-error').style.display = 'none';
    }

    if (!personalPassword) {
      document.getElementById('personal-password-error').innerText = '* Field is required';
      document.getElementById('personal-password-error').style.display = 'block';
      valid = false;
    } else if (personalPassword.length < 6) {
      document.getElementById('personal-password-error').innerText = 'Personal Password must be 6 digits';
      document.getElementById('personal-password-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('personal-password-error').style.display = 'none';
    }

    return valid;
  }

  function handleInput(event) {
    const { id, value } = event.target;

    if (!/^\d*$/.test(value)) {
      event.target.value = value.replace(/\D/g, '');
    }

    if (id === 'card-id') {
      cardIdNumber = event.target.value;
    } else if (id === 'personal-password') {
      personalPassword = event.target.value;
    }
  }

  function handleBlur(event) {
    validateInputs();
  }

  // Define pagination logic
  const leaveRequestsPerPage = 5; // Adjust as needed
  let currentPage = 1;

  // Reactive statements to ensure proper updates
  $: pendingLeaveRequests = visitorsList.filter(request => request.status.toLowerCase() === 'pending');
  $: pendingstartIndex = (currentPage - 1) * leaveRequestsPerPage;
  $: pendingendIndex = Math.min(pendingstartIndex + leaveRequestsPerPage, pendingLeaveRequests.length);
  $: pendingdisplayedleaveRequests = pendingLeaveRequests.slice(pendingstartIndex, pendingendIndex);
  $: pendingtotalPages = Math.ceil(pendingLeaveRequests.length / leaveRequestsPerPage);

  $: approvedLeaveRequests = visitorsList.filter(request => request.status.toLowerCase() === 'approved');
  $: approvedstartIndex = (currentPage - 1) * leaveRequestsPerPage;
  $: approvedendIndex = Math.min(approvedstartIndex + leaveRequestsPerPage, approvedLeaveRequests.length);
  $: approveddisplayedleaveRequests = approvedLeaveRequests.slice(approvedstartIndex, approvedendIndex);
  $: approvedtotalPages = Math.ceil(approvedLeaveRequests.length / leaveRequestsPerPage);

  $: historystartIndex = (currentPage - 1) * leaveRequestsPerPage;
  $: historyendIndex = Math.min(historystartIndex + leaveRequestsPerPage, visitorsList.length);
  $: historydisplayedleaveRequests = visitorsList.filter(request => {
  const dateToVisit = new Date(request.DateToVisit);
  const hasDatePassed = dateToVisit < currentDate;
  const isRejected = request.status === 'rejected';
  return hasDatePassed || isRejected;
});  $: historytotalPages = Math.ceil(historydisplayedleaveRequests.length / leaveRequestsPerPage);

  function handlePageChange(event) {
    currentPage = event.detail.pageNumber;
  }
</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  {#if showToaster}
    <Toast message={toasterMessage} type={toasterType} />
  {/if}
  {#if showModal}
  <div class="modal fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
    <div class="modal-content">
      <div class="rounded-t mb-0 px-4 border-0">
        <div class="flex items-center">
          <div class="relative w-full px-4max-w-full flex-grow flex-1">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Approve Visitor
            </h3>
          </div>
        </div>
      </div>
      <div class="block w-full overflow-x-auto">
        <div class="px-4 py-5 flex-auto">
          <div class="flex flex-wrap">
            <div class="w-full px-4">
              <div class="relative mb-4">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="cardIdNumber">
                  Card ID Number
                </label>
                <input type="text" id="card-id" maxlength="10" placeholder="Card ID" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={cardIdNumber} on:input={handleInput} on:blur={handleBlur}>
                <span id="card-id-error" class="text-red-600 text-xs" style="display: none;"></span>
              </div>
              <div class="relative mb-4">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="personalPassword">
                  Personal Password
                </label>
                <input type="text" id="personal-password" maxlength="6" placeholder="Personal Password" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={personalPassword} on:input={handleInput} on:blur={handleBlur}>
                <span id="personal-password-error" class="text-red-600 text-xs" style="display: none;"></span>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={handleSubmit}>
              Approve
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
  <div class="relative w-full px-4 max-w-full flex-grow flex-1">
    <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
      Visitors List
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
        <a href="#" class="inline-block p-4 {selectedTab === 'history' ? 'text-red-500 border-b-2 border-red-600 rounded-t-lg hover:border-blueGray-800 dark:hover:text-blueGray-200' : ''}" on:click={() => selectTab('history')}>History</a>
      </li>
    </ul>
  </div>

  {#if selectedTab === 'pending'}
  <div class="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {#each pendingdisplayedleaveRequests as request}
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h3 class="text-4xl font-bold text-blueGray-800">{request.name}</h3>
        <p class="text-blueGray-400 pb-6">{request.email} <br/> {request.mobileNumber}</p>
        <div class="flex items-center mb-4">
          <span class="mr-1">{new Date(request.DateOfVisit).toLocaleDateString()}</span>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg shadow dark:bg-gray-700">
          <p>Reason to visit: {request.reasonOfVisiting}</p>
        </div>
        <div class="flex justify-end mb-1 pt-6">
          <button 
            data-id="{request._id}" on:click={() => handleApprove(request)}
            class="bg-green-600 active:bg-green-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mr-2">Approve</button>
          <button
            data-id="{request._id}" on:click={() => handleReject(request)}
            class="bg-red-600 text-white active:bg-red-800 uppercase font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">Reject</button>
        </div>
      </div>
    {/each}
  </div>
  <br/>
  <Pagination currentPage={currentPage} totalPages={pendingtotalPages} on:pageChange={handlePageChange} />
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
          {#each approveddisplayedleaveRequests as request}
            <tr>
              <td class="table-data font-bold text-blueGray-600" title={request.name}>{request.name}</td>
              <td class="table-data" title={request.email}>{request.email}</td>
              <td class="table-data ml-12" title={request.mobileNumber}>{request.mobileNumber}</td>
              <td class="table-data" title={new Date(request.DateOfVisit).toLocaleDateString()}>{new Date(request.DateOfVisit).toLocaleDateString()}</td>
              <td class="table-data" title={request.reasonOfVisiting}>{request.reasonOfVisiting}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={approvedtotalPages} on:pageChange={handlePageChange} />
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
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Status 
            </th>
          </tr>
        </thead>
        <tbody>
          {#each historydisplayedleaveRequests as request}
            <tr>
              <td class="table-data font-bold text-blueGray-600" title={request.name}>{request.name}</td>
              <td class="table-data" title={request.email}>{request.email}</td>
              <td class="table-data" title={request.mobileNumber}>{request.mobileNumber}</td>
              <td class="table-data" title={new Date(request.DateOfVisith).toLocaleDateString()}>{new Date(request.DateOfVisith).toLocaleDateString()}</td>
              <td class="table-data" title={request.reasonOfVisiting}>{request.reasonOfVisiting}</td>
              <td class="table-data" title={request.status}>{request.status}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={historytotalPages} on:pageChange={handlePageChange} />
    </div>
  </div>
  {/if}
</div>