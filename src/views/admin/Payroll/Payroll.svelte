<script>
  import { reactive } from 'svelte';
  const edit1 = "../assets/img/icons8-edit-48.png"
  export let color = "light";

  let users = [
    { id: '1', name: 'Alice', department: 'Sales', designation: 'Sales Manager', salary: 80000 },
    { id: '2', name: 'Bob', department: 'Engineering', designation: 'Software Engineer', salary: 70000 },
    { id: '3', name: 'Charlie', department: 'Marketing', designation: 'Marketing Specialist', salary: 60000 },
    { id: '4', name: 'David', department: 'HR', designation: 'HR Manager', salary: 75000 },
    { id: '5', name: 'Eve', department: 'Finance', designation: 'Financial Analyst', salary: 65000 },
    { id: '6', name: 'Frank', department: 'Sales', designation: 'Sales Associate', salary: 55000 },
    { id: '7', name: 'Grace', department: 'Engineering', designation: 'Software Developer', salary: 72000 },
    { id: '8', name: 'Henry', department: 'Marketing', designation: 'Marketing Manager', salary: 68000 },
    { id: '9', name: 'Ivy', department: 'HR', designation: 'HR Specialist', salary: 60000 },
    { id: '10', name: 'Jack', department: 'Finance', designation: 'Financial Manager', salary: 78000 },
    { id: '11', name: 'Kate', department: 'Sales', designation: 'Sales Executive', salary: 60000 },
    { id: '12', name: 'Leo', department: 'Engineering', designation: 'Senior Software Engineer', salary: 85000 },
    { id: '13', name: 'Mia', department: 'Marketing', designation: 'Marketing Coordinator', salary: 55000 },
    { id: '14', name: 'Nick', department: 'HR', designation: 'HR Assistant', salary: 50000 },
    { id: '15', name: 'Olivia', department: 'Finance', designation: 'Financial Analyst', salary: 62000 },
];

function editSalary()
{

}

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
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Name</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Designation</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Department</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Salary</th>
        </tr>
      </thead>
      <tbody>
        {#each users as user (user.id)}
        <tr>
          <td><input type="checkbox" checked={selectedUsers.has(user.id)} class="rounded" on:click={() => {console.log(selectedUsers.has(user.id)); toggleSelection(user.id)}}></td>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.designation}</td>
          <td>{user.department}</td>
          <td>{user.salary}</td>
          <td class="flex items-center">
            <div class="mr-2">
              <img src={edit1} alt="Edit" class="h-6 w-6 cursor-pointer" onclick={() => editSalary(user.id)} />
            </div>
          </td>
        </tr>
      {/each}
      </tbody>
    </table>
  </div>
</div>