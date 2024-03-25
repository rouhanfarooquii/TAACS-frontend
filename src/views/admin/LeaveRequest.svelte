<script>
    // core components
    import CardTable from "components/Cards/CardTable.svelte";
    export let location;
    export let color = "light";
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

    <!-- Card 1 -->
<div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
  <h3 class="text-4xl font-bold text-blueGray-800">John Doe</h3>
  <p class="text-blueGray-400 pb-6">Software Engineer</p>
  <div class="flex items-center mb-4">
    <span>2024-03-26</span>
    <span>&rarr;</span>
    <span>2024-03-29</span>
  </div>
  <div class="bg-gray-100 p-4 rounded-lg shadow dark:bg-gray-700">
    <p>Leave Reason: Doctor's Appointment</p>
  </div>
  <div class="flex justify-end mb-1 pt-6">
    <button onclick="" class="bg-green-500 active:bg-green-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mr-2">Approve</button>
    <button onclick="" class="bg-red-400 active:bg-red-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">Reject</button>
  </div>
</div>

    <!-- Card 2 -->
    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h3 class="text-4xl font-bold text-blueGray-800">Jane Smith</h3>
      <p class="text-blueGray-400 pb-6">Marketing Manager</p>
      <div class="flex items-center mb-4">
        <span>2024-04-09</span>
        <span>&rarr;</span>
        <span>2024-04-12</span>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg shadow dark:bg-gray-700">
        <p>Leave Reason: Family Emergency</p>
      </div>
      <div class="flex justify-end mb-1 pt-6">
        <button onclick="" class="bg-green-500 active:bg-green-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mr-2">Approve</button>
        <button onclick="" class="bg-red-400 active:bg-red-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">Reject</button>
      </div>
    </div>

        <!-- Card 3  -->
<div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
  <h3 class="text-4xl font-bold text-blueGray-800">Doe Wigan</h3>
  <p class="text-blueGray-400 pb-6">Frontend Developer</p>
  <div class="flex items-center mb-4">
    <span>2024-03-06</span>
    <span>&rarr;</span>
    <span>2024-03-09</span>
  </div>
  <div class="bg-gray-100 p-4 rounded-lg shadow dark:bg-gray-700">
    <p>Leave Reason: Doctor's Appointment</p>
  </div>
  <div class="flex justify-end mb-1 pt-6">
    <button onclick="" class="bg-green-500 active:bg-green-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mr-2">Approve</button>
    <button onclick="" class="bg-red-400 active:bg-red-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">Reject</button>
  </div>
</div>



    <!-- Add more cards here -->
  </div>
</div>
