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
    <button class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-4 ease-linear transition-all duration-150" type="button" on:click={batchUpdate}>BATCH UPDATE</button>
    <input type="search" class="mb-4 bg-gray-800 text-white rounded-lg px-4 py-2" placeholder="Search...">
    <table>
      <thead>
        <tr>
          <th><input type="checkbox" class="rounded" on:click={toggleSelectAll}></th>
          <th>UserID</th>
          <th>Department</th>
          <th>Designation</th>
          <th>Accessible Rooms</th>
        </tr>
      </thead>
      <tbody>
        {#each users as user (user.id)}
          <tr>
            <td><input type="checkbox" checked={selectedUsers.has(user.id)} class="rounded" on:click={() => {console.log(selectedUsers.has(user.id)); toggleSelection(user.id)}}></td>
            <td>{user.id}</td>
            <td>{user.department}</td>
            <td>{user.designation}</td>
            <td>{user.accessibleRooms.join(', ')}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>