<script>
  // core components
  import CardTable from "components/Cards/CardTable.svelte";
  export let location;
  export let color = "light";

  // Define the leave requests data as an array of objects
  let leaveRequests = [
    { name: "John Doe", role: "Software Engineer", startDate: "2024-03-26", endDate: "2024-03-29", reason: "Doctor's Appointment" },
    { name: "Jane Smith", role: "Marketing Manager", startDate: "2024-04-09", endDate: "2024-04-12", reason: "Family Emergency" },
    { name: "Doe Wigan", role: "Frontend Developer", startDate: "2024-03-06", endDate: "2024-03-09", reason: "Doctor's Appointment" },
    { name: "Bill Gates", role: "CEO", startDate: "2024-03-20", endDate: "2024-03-21", reason: "Sick Leave" }
  ];
</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <div class="relative w-full px-4 max-w-full flex-grow flex-1">
    <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}"
    >
    Leave Requests
    </h3>
  </div>
  <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px pb-16">
      <li class="me-2">
        <a href="#" class="inline-block p-4 text-lightBlue-600 border-b-2 border-blue-600 rounded-t-lg  hover:border-blueGray-800 dark:hover:text-blueGray-200">Pending</a>
      </li>
      <li class="me-2">
        <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-blueGray-800 hover:border-blueGray-600 dark:hover:text-blueGray-200">Approve</a>
      </li>
      <li class="me-2">
        <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-blueGray-800 hover:border-blueGray-800 dark:hover:text-blueGray-200">Rejected</a>
      </li>
    </ul>
  </div>

  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {#each leaveRequests as request}
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h3 class="text-4xl font-bold text-blueGray-800">{request.name}</h3>
        <p class="text-blueGray-400 pb-6">{request.role}</p>
        <div class="flex items-center mb-4">
          <span class="mr-1">{request.startDate}</span>
          <span>&rarr;</span>
          <span class="ml-1">{request.endDate}</span>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg shadow dark:bg-gray-700">
          <p>Leave Reason: {request.reason}</p>
        </div>
        <div class="flex justify-end mb-1 pt-6">
          <button onclick="" class="bg-green-500 active:bg-green-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mr-2">Approve</button>
          <button onclick="" class="bg-red-400 active:bg-red-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">Reject</button>
        </div>
      </div>
    {/each}
  </div>
</div>
