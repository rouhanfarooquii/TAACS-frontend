<script>
  // core components
  import CardTable from "components/Cards/CardTable.svelte";
  import TableDropdown from "../../../components/Dropdowns/TableDropdown.svelte";
  import Pagination from "../../../components/Pagination/Pagination.svelte";
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
    { id: 1348, name: "Bill Gates", role: "CEO", from: "2024/03/20", to: "2024/03/21", reason: "Sick Leave", status: "Pending" },
    { id: 2456, name: "Sarah Cooper", role: "Project Manager", from: "2024/04/15", to: "2024/04/18", reason: "Maternity Leave", status: "Pending" },
    { id: 3654, name: "Michael Jordan", role: "Senior Developer", from: "2024/03/01", to: "2024/03/03", reason: "Family Reunion", status: "Approved" },
    { id: 4789, name: "Amanda White", role: "Customer Support Specialist", from: "2024/04/20", to: "2024/04/22", reason: "Personal Reasons", status: "Pending" },
    { id: 5643, name: "Tom Hardy", role: "Graphic Designer", from: "2024/03/05", to: "2024/03/08", reason: "Vacation", status: "Rejected" },
    { id: 6987, name: "Olivia Taylor", role: "Content Writer", from: "2024/04/25", to: "2024/04/26", reason: "Doctor's Appointment", status: "Approved" },
    { id: 7890, name: "Leonardo DiCaprio", role: "Art Director", from: "2024/03/12", to: "2024/03/13", reason: "Personal Leave", status: "Pending" },
    { id: 8321, name: "Jennifer Lawrence", role: "Public Relations Manager", from: "2024/04/28", to: "2024/04/30", reason: "Family Vacation", status: "Pending" },
    { id: 9145, name: "Mark Zuckerberg", role: "CTO", from: "2024/03/17", to: "2024/03/19", reason: "Sick Leave", status: "Pending" },
    { id: 1023, name: "Emma Watson", role: "Software Developer", from: "2024/04/02", to: "2024/04/05", reason: "Conference", status: "Approved" },
    { id: 1345, name: "Chris Hemsworth", role: "Product Designer", from: "2024/03/22", to: "2024/03/23", reason: "Personal Reasons", status: "Pending" },
    { id: 1852, name: "Scarlett Johansson", role: "Marketing Coordinator", from: "2024/04/07", to: "2024/04/09", reason: "Family Gathering", status: "Approved" },
    { id: 2034, name: "Brad Pitt", role: "Financial Analyst", from: "2024/03/26", to: "2024/03/29", reason: "Vacation", status: "Rejected" },
    { id: 2245, name: "Jennifer Aniston", role: "HR Specialist", from: "2024/04/10", to: "2024/04/11", reason: "Personal Leave", status: "Approved" },
    { id: 2457, name: "Ryan Reynolds", role: "Senior Marketing Manager", from: "2024/03/15", to: "2024/03/16", reason: "Doctor's Appointment", status: "Rejected" },
    { id: 2987, name: "Angelina Jolie", role: "PR Specialist", from: "2024/04/03", to: "2024/04/06", reason: "Vacation", status: "Pending" },
    { id: 3120, name: "Keanu Reeves", role: "Legal Advisor", from: "2024/03/27", to: "2024/03/28", reason: "Sick Leave", status: "Pending" },
    { id: 3356, name: "Margot Robbie", role: "UI/UX Designer", from: "2024/04/13", to: "2024/04/14", reason: "Personal Leave", status: "Approved" },
    { id: 3478, name: "Dwayne Johnson", role: "Sales Manager", from: "2024/03/19", to: "2024/03/20", reason: "Training Seminar", status: "Pending" },
    { id: 3658, name: "Tom Cruise", role: "Technical Support Specialist", from: "2024/04/05", to: "2024/04/06", reason: "Medical Appointment", status: "Rejected" },
    { id: 3789, name: "Emma Stone", role: "Customer Service Representative", from: "2024/03/22", to: "2024/03/23", reason: "Personal Reasons", status: "Pending" },
    { id: 3921, name: "Robert Downey Jr.", role: "IT Director", from: "2024/04/08", to: "2024/04/09", reason: "Family Vacation", status: "Approved" },
    { id: 4056, name: "Jennifer Lopez", role: "Operations Manager", from: "2024/03/03", to: "2024/03/04", reason: "Sick Leave", status: "Pending" },
    { id: 4123, name: "Chris Evans", role: "Software Engineer", from: "2024/04/16", to: "2024/04/17", reason: "Work Conference", status: "Pending" },
    { id: 4278, name: "Natalie Portman", role: "HR Generalist", from: "2024/03/09", to: "2024/03/12", reason: "Vacation", status: "Rejected" },
    { id: 4345, name: "Hugh Jackman", role: "Sales Associate", from: "2024/04/24", to: "2024/04/25", reason: "Personal Leave", status: "Approved" },
    { id: 4456, name: "Anne Hathaway", role: "Marketing Assistant", from: "2024/03/30", to: "2024/04/02", reason: "Family Trip", status: "Pending" },
    { id: 4567, name: "Meryl Streep", role: "Finance Manager", from: "2024/04/14", to: "2024/04/15", reason: "Doctor's Appointment", status: "Rejected" },
    { id: 4678, name: "Tom Hanks", role: "IT Technician", from: "2024/03/28", to: "2024/03/29", reason: "Training Workshop", status: "Pending" },
    { id: 4789, name: "Julia Roberts", role: "Customer Support Specialist", from: "2024/04/20", to: "2024/04/22", reason: "Personal Reasons", status: "Pending" },
    { id: 4890, name: "Will Smith", role: "CEO", from: "2024/03/24", to: "2024/03/25", reason: "Sick Leave", status: "Pending" },
    { id: 4923, name: "Kate Winslet", role: "Senior Developer", from: "2024/04/19", to: "2024/04/20", reason: "Family Reunion", status: "Approved" },
    { id: 5045, name: "Matthew McConaughey", role: "Customer Service Manager", from: "2024/03/10", to: "2024/03/11", reason: "Personal Leave", status: "Pending" },
    { id: 5123, name: "Charlize Theron", role: "Product Manager", from: "2024/04/26", to: "2024/04/27", reason: "Family Vacation", status: "Pending" },
    { id: 5234, name: "Johnny Depp", role: "Graphic Designer", from: "2024/03/02", to: "2024/03/03", reason: "Sick Leave", status: "Pending" },
    { id: 5345, name: "Nicole Kidman", role: "Marketing Director", from: "2024/04/27", to: "2024/04/28", reason: "Conference", status: "Approved" },
    { id: 5456, name: "George Clooney", role: "Finance Analyst", from: "2024/03/18", to: "2024/03/19", reason: "Personal Reasons", status: "Pending" },
    { id: 5567, name: "Cate Blanchett", role: "HR Manager", from: "2024/04/05", to: "2024/04/06", reason: "Vacation", status: "Rejected" },
    { id: 5678, name: "Kevin Costner", role: "Operations Coordinator", from: "2024/03/11", to: "2024/03/14", reason: "Sick Leave", status: "Pending" },
    { id: 5789, name: "Halle Berry", role: "IT Support Specialist", from: "2024/04/07", to: "2024/04/08", reason: "Training Seminar", status: "Pending" },
    { id: 5890, name: "Russell Crowe", role: "Software Engineer", from: "2024/03/21", to: "2024/03/22", reason: "Personal Leave", status: "Approved" },
    { id: 5923, name: "Angelina Jolie", role: "Marketing Manager", from: "2024/04/14", to: "2024/04/15", reason: "Family Vacation", status: "Pending" },
    { id: 6045, name: "Jim Carrey", role: "Product Manager", from: "2024/03/29", to: "2024/03/30", reason: "Sick Leave", status: "Pending" },
    { id: 6123, name: "Kate Beckinsale", role: "Financial Analyst", from: "2024/04/09", to: "2024/04/10", reason: "Personal Reasons", status: "Pending" },
    { id: 6234, name: "Bradley Cooper", role: "HR Specialist", from: "2024/03/25", to: "2024/03/26", reason: "Vacation", status: "Rejected" },
    { id: 6345, name: "Julianne Moore", role: "Software Developer", from: "2024/04/11", to: "2024/04/12", reason: "Work Conference", status: "Pending" },
    { id: 6456, name: "Robert Pattinson", role: "Graphic Designer", from: "2024/03/06", to: "2024/03/07", reason: "Doctor's Appointment", status: "Rejected" },
    { id: 6567, name: "Penelope Cruz", role: "HR Manager", from: "2024/04/22", to: "2024/04/23", reason: "Personal Leave", status: "Approved" },
    { id: 6678, name: "Colin Farrell", role: "Marketing Coordinator", from: "2024/03/07", to: "2024/03/08", reason: "Family Trip", status: "Pending" },
    { id: 6789, name: "Emma Stone", role: "Finance Manager", from: "2024/04/23", to: "2024/04/24", reason: "Doctor's Appointment", status: "Rejected" },
    { id: 6890, name: "Idris Elba", role: "HR Generalist", from: "2024/03/08", to: "2024/03/11", reason: "Vacation", status: "Pending" },
    { id: 6923, name: "Jennifer Garner", role: "Sales Associate", from: "2024/04/18", to: "2024/04/19", reason: "Personal Leave", status: "Approved" },
    { id: 7045, name: "Hugh Grant", role: "Marketing Assistant", from: "2024/03/12", to: "2024/03/13", reason: "Family Trip", status: "Pending" },
    { id: 7123, name: "Kate Hudson", role: "Finance Manager", from: "2024/04/29", to: "2024/04/30", reason: "Doctor's Appointment", status: "Rejected" },
    { id: 7245, name: "Matthew Perry", role: "IT Technician", from: "2024/03/17", to: "2024/03/18", reason: "Training Workshop", status: "Pending" },
    { id: 7345, name: "Naomi Watts", role: "Customer Support Specialist", from: "2024/04/01", to: "2024/04/02", reason: "Personal Reasons", status: "Pending" },
    { id: 7456, name: "Mel Gibson", role: "CEO", from: "2024/03/13", to: "2024/03/14", reason: "Sick Leave", status: "Pending" },
    { id: 7567, name: "Kate Winslet", role: "Senior Developer", from: "2024/04/02", to: "2024/04/03", reason: "Family Reunion", status: "Approved" },
    { id: 7678, name: "Ben Affleck", role: "Customer Service Manager", from: "2024/03/27", to: "2024/03/28", reason: "Personal Leave", status: "Pending" },
    { id: 7789, name: "Angelina Jolie", role: "Product Manager", from: "2024/04/17", to: "2024/04/18", reason: "Family Vacation", status: "Pending" },
    { id: 7890, name: "Leonardo DiCaprio", role: "Operations Manager", from: "2024/03/04", to: "2024/03/05", reason: "Sick Leave", status: "Pending" },
    { id: 7923, name: "Jennifer Lawrence", role: "Public Relations Manager", from: "2024/04/20", to: "2024/04/21", reason: "Conference", status: "Approved" },
    { id: 8045, name: "Mark Ruffalo", role: "Customer Service Representative", from: "2024/03/30", to: "2024/04/02", reason: "Personal Reasons", status: "Pending" },
    { id: 8123, name: "Emma Thompson", role: "IT Director", from: "2024/04/12", to: "2024/04/13", reason: "Family Vacation", status: "Approved" },
    { id: 8245, name: "Tom Hardy", role: "Operations Coordinator", from: "2024/03/23", to: "2024/03/24", reason: "Medical Appointment", status: "Rejected" },
    { id: 8345, name: "Cameron Diaz", role: "Software Engineer", from: "2024/04/06", to: "2024/04/07", reason: "Work Conference", status: "Pending" },
    { id: 8456, name: "Keanu Reeves", role: "Graphic Designer", from: "2024/03/10", to: "2024/03/11", reason: "Doctor's Appointment", status: "Rejected" },
    { id: 8567, name: "Harrison Ford", role: "HR Manager", from: "2024/04/24", to: "2024/04/25", reason: "Personal Leave", status: "Approved" },
    { id: 8678, name: "Nicolas Cage", role: "Marketing Coordinator", from: "2024/03/03", to: "2024/03/04", reason: "Family Trip", status: "Pending" },
    { id: 8789, name: "Matthew McConaughey", role: "Finance Manager", from: "2024/04/15", to: "2024/04/16", reason: "Doctor's Appointment", status: "Rejected" },
    { id: 8890, name: "Julia Roberts", role: "Sales Associate", from: "2024/03/22", to: "2024/03/23", reason: "Vacation", status: "Pending" },
    { id: 8923, name: "Will Smith", role: "Marketing Assistant", from: "2024/04/05", to: "2024/04/06", reason: "Personal Leave", status: "Approved" },
    { id: 9045, name: "Jennifer Aniston", role: "CEO", from: "2024/03/18", to: "2024/03/19", reason: "Sick Leave", status: "Pending" },
    { id: 9123, name: "Tom Cruise", role: "Senior Developer", from: "2024/04/08", to: "2024/04/09", reason: "Family Reunion", status: "Approved" },
    { id: 9245, name: "Charlize Theron", role: "Customer Service Manager", from: "2024/03/01", to: "2024/03/02", reason: "Personal Leave", status: "Pending" },
    { id: 9345, name: "Brad Pitt", role: "Product Manager", from: "2024/04/25", to: "2024/04/26", reason: "Family Vacation", status: "Pending" },
    { id: 9456, name: "Angelina Jolie", role: "Financial Analyst", from: "2024/03/07", to: "2024/03/08", reason: "Sick Leave", status: "Pending" },
    { id: 9567, name: "Matt Damon", role: "IT Support Specialist", from: "2024/04/20", to: "2024/04/21", reason: "Training Workshop", status: "Pending" },
    { id: 9678, name: "Scarlett Johansson", role: "Customer Support Specialist", from: "2024/03/11", to: "2024/03/14", reason: "Vacation", status: "Rejected" },
    { id: 9789, name: "Leonardo DiCaprio", role: "Software Engineer", from: "2024/04/28", to: "2024/04/29", reason: "Doctor's Appointment", status: "Rejected" },
    { id: 9890, name: "Jennifer Lawrence", role: "Marketing Coordinator", from: "2024/03/12", to: "2024/03/13", reason: "Personal Leave", status: "Approved" },
    { id: 9923, name: "Bradley Cooper", role: "Finance Manager", from: "2024/04/26", to: "2024/04/27", reason: "Family Vacation", status: "Pending" },
    { id: 10045, name: "Natalie Portman", role: "Operations Coordinator", from: "2024/03/20", to: "2024/03/21", reason: "Sick Leave", status: "Pending" }
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
      selectTab('pending'); // Set 'approve' tab as selected
    }, 1000);
  }

  // Simulate fetching data when the component mounts
  onMount(() => {
    fetchData();
  });

  // Define pagination logic
const leaveRequestsPerPage = 6; // Adjust as needed
let currentPage = 1;

// Reactive statements to ensure proper updates
$: pendingLeaveRequests = leaveRequests.filter(request => request.status === 'Pending');
$: pendingstartIndex = (currentPage - 1) * leaveRequestsPerPage;
$: pendingendIndex = Math.min(pendingstartIndex + leaveRequestsPerPage, pendingLeaveRequests.length);
$: pendingdisplayedleaveRequests = pendingLeaveRequests.slice(pendingstartIndex, pendingendIndex);
$: pendingtotalPages = Math.ceil(pendingLeaveRequests.length / leaveRequestsPerPage);

// Reactive statements to ensure proper updates
$: approvedLeaveRequests = leaveRequests.filter(request => request.status === 'Approved');
$: approvedstartIndex = (currentPage - 1) * leaveRequestsPerPage;
$: approvedendIndex = Math.min(approvedstartIndex + leaveRequestsPerPage, approvedLeaveRequests.length);
$: approveddisplayedleaveRequests = approvedLeaveRequests.slice(approvedstartIndex, approvedendIndex);
$: approvedtotalPages = Math.ceil(approvedLeaveRequests.length / leaveRequestsPerPage);

// Reactive statements to ensure proper updates
$: rejectedLeaveRequests = leaveRequests.filter(request => request.status === 'Rejected');
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
  <div class="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {#each pendingdisplayedleaveRequests as request}
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
            <td class="table-data font-bold text-blueGray-600" title={request.name}>{request.name}</td>
            <td class="table-data" title={request.role}>{request.role}</td>
            <td class="table-data" title={request.from}>{request.from}</td>
            <td class="table-data" title={request.to}>{request.to}</td>
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
    <Pagination currentPage={currentPage} totalPages={rejectedtotalPages} on:pageChange={handlePageChange} />
  </div>
</div>
{/if}


</div>
