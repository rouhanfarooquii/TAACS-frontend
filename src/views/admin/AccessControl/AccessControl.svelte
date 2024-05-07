<!-- <script>
  // core components
  import CardSettings from "components/Cards/CardSettings.svelte";
  import CardProfile from "components/Cards/CardProfile.svelte";
  export let location;
</script>

<div class="flex flex-wrap">
  <div class="w-full lg:w-8/12 px-4">
    <CardSettings />
  </div>
  <div class="w-full lg:w-4/12 px-4">
    <CardProfile />
  </div>
</div> -->

<script>
  import { reactive } from 'svelte';
  export let color = "light";

  let users = [
    { id: '23006', name: 'Nawfal Ahmed', department: 'Marketing', designation: 'Manager', accessibleRooms: ['Conference Room', 'Building entrance'] },
    { id: '230060', name: 'Nawfal Ahmed', department: 'Marketing', designation: 'Manager', accessibleRooms: ['Conference Room', 'Building entrance'] },
    { id: '2300600', name: 'Nawfal Ahmed', department: 'Marketing', designation: 'Manager', accessibleRooms: ['Conference Room', 'Building entrance'] }
    // ... you can add more users here
  ];

  let selectedUsers = new Set();

  function toggleSelection(userId) {
    if (selectedUsers.has(userId)) {
      selectedUsers.delete(userId);
    } else {
      selectedUsers.add(userId);
    }
    selectedUsers = new Set(selectedUsers); // Force rerender
  }

  function toggleSelectAll() {
    if (selectedUsers.size === users.length) {
      selectedUsers.clear();
    } else {
      users.forEach(user => selectedUsers.add(user.id));
    }
    selectedUsers = new Set(selectedUsers); // Force rerender
  }

  function batchUpdate() {
    // Logic to handle batch update goes here
  }
</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <div class="access-control">
    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={batchUpdate}>Batch Update</button>
    <input type="search" class="mb-4 bg-gray-800 text-white rounded-lg px-4 py-2" placeholder="Search...">
    <table>
      <thead>
        <tr>
          <th><input type="checkbox" class="rounded" on:click={toggleSelectAll}></th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">UserID</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Department</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Designation</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Accessible Rooms</th>
        </tr>
      </thead>
      <tbody>
        {#each users as user (user.id)}
          <tr>
            <td><input type="checkbox" checked={selectedUsers.has(user.id)} class="rounded" on:click={() => {console.log(selectedUsers.has(user.id)); toggleSelection(user.id)}}></td>
            <td class="table-data" title={user.id}>{user.id}</td>
            <td class="table-data" title={user.department}>{user.department}</td>
            <td class="table-data" title={user.designation}>{user.designation}</td>
            <td class="table-data" title={user.accessibleRooms}>{user.accessibleRooms.join(', ')}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>