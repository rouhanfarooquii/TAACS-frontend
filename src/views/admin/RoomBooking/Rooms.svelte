<script>
    import { createPopper } from "@popperjs/core";
    import { onMount } from 'svelte';
    import { onDestroy } from 'svelte';
    import Pagination from "../../../components/Pagination/Pagination.svelte";
    export let color = "light";

    let availability = '';
    let capacity = '';
    let roomName = '';
    let location = '';
    let features = '';
    let showModal = false;
    let editModal = false;
    let currentBooking = null;

    let roomList = [
    {
        status: "Available",
        roomName: "Room 101",
        capacity: 10,
        location: "East Wing",
        features: ["TV", "Projector", "Speaker"]
    },
    {
        status: "Unavailable",
        roomName: "Room 102",
        capacity: 6,
        location: "West Wing",
        features: ["TV", "Whiteboard"]
    },
    {
        status: "Available",
        roomName: "Room 103",
        capacity: 8,
        location: "North Wing",
        features: ["Projector", "Speaker"]
    },
    {
        status: "Available",
        roomName: "Room 104",
        capacity: 12,
        location: "South Wing",
        features: ["TV", "Projector", "Whiteboard", "Speaker"]
    },
    {
        status: "Unavailable",
        roomName: "Room 105",
        capacity: 4,
        location: "Basement",
        features: ["TV", "Projector"]
    },
    {
        status: "Available",
        roomName: "Room 106",
        capacity: 20,
        location: "Top Floor",
        features: ["TV", "Projector", "Speaker"]
    },
    {
        status: "Available",
        roomName: "Room 107",
        capacity: 15,
        location: "Executive Floor",
        features: ["TV", "Projector", "Whiteboard"]
    },
    {
        status: "Unavailable",
        roomName: "Room 108",
        capacity: 8,
        location: "Middle Floor",
        features: ["TV", "Speaker"]
    },
    {
        status: "Available",
        roomName: "Room 109",
        capacity: 10,
        location: "Lobby Area",
        features: ["TV", "Whiteboard"]
    },
    {
        status: "Available",
        roomName: "Room 110",
        capacity: 18,
        location: "Conference Center",
        features: ["TV", "Projector", "Speaker"]
    }
];
  
  async function addRoom() {
  if (roomName && location) {
    try {
      // Check if the device name is already present in the array
      const isDuplicate = roomList.some(room => roomList.roomName === roomName);
      
      if (isDuplicate) {
        alert('Room already exists.');
        return;
      }
  
  
      // Left
      const response = await fetch('/api/addRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({availability, capacity, roomName, location, features})
      });
  
      if (response.ok) {
        // Device added successfully, navigate to the appropriate page
        navigate('/admin/Rooms');
      } else {
        // Handle error response from the server
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
      alert('An error occurred while adding the room. Please try again.');
    }
  } else {
    alert('Please fill in all fields.');
  }
  }

  async function updateRoom() {
  if (roomName && location) {
    try {
      // Check if the room name is already present in the array (excluding the current room being edited)
      const isDuplicate = roomList.some(room => room.roomName === roomName && room !== currentBooking);
      
      if (isDuplicate) {
        alert('Room name already exists.');
        return;
      }
  
      // Assuming you have an API endpoint for updating a room, modify this accordingly
      const response = await fetch('/api/updateRoom', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({availability, capacity, roomName, location, features})
      });
  
      if (response.ok) {
        // Room updated successfully, close modal and optionally update UI
        closeModal();
        // You might want to refresh the roomList array or update the specific room data
      } else {
        // Handle error response from the server
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
      alert('An error occurred while updating the room. Please try again.');
    }
  } else {
    alert('Please fill in all fields.');
  }
}
  
  // Function to open the modal
  function openModal() {
      showModal = true;
    }
  
    function openEditModal(roomList) {
  currentBooking = roomList;
  availability = roomList.availability;
  roomName = roomList.roomName;
  capacity = roomList.capacity;
  location = roomList.location;
  features = roomList.features;
  editModal = true;
}

function closeModal() {
    showModal = false;
    editModal = false;
    // Reset input fields
    availability = '';
    capacity = '';
    roomName = '';
    location = '';
    features = '';
    currentBooking = null;
  }
  
    // Define pagination logic
    const roomsPerPage = 5; // Adjust as needed
    let currentPage = 1;
  
    // Reactive statements to ensure proper updates
    $: startIndex = (currentPage - 1) * roomsPerPage;
    $: endIndex = Math.min(startIndex + roomsPerPage, roomList.length);
    $: displayedData = roomList.slice(startIndex, endIndex);
    $: totalPages = Math.ceil(roomList.length / roomsPerPage);
  
    function handlePageChange(event) {
      console.log("Received page change:", event.detail.pageNumber);  // Confirm event reception
      currentPage = event.detail.pageNumber;
  }

  // Array to store dropdown visibility for each device row
let dropdownPopoverShow = new Array(roomList.length).fill(false); 

// Arrays to store references for dropdown buttons and popovers
let btnDropdownRef = new Array(roomList.length);
let popoverDropdownRef = new Array(roomList.length);

function toggleDropdown(event, rowIndex) {
  event.stopPropagation(); // Stop click event from propagating to window
  dropdownPopoverShow[rowIndex] = !dropdownPopoverShow[rowIndex];

  // Close all other dropdowns
  dropdownPopoverShow.forEach((open, index) => {
    if (index !== rowIndex) dropdownPopoverShow[index] = false;
  });

  if (dropdownPopoverShow[rowIndex]) {
    createPopper(btnDropdownRef[rowIndex], popoverDropdownRef[rowIndex], {
      placement: "bottom-start",
    });
  }
  }

onDestroy(() => {
  window.removeEventListener('click', handleClickOutside, true);
});

// Reactive statement to manage click outside logic
$: {
  if (dropdownPopoverShow.includes(true)) {
    window.addEventListener('click', handleClickOutside, true);
  } else {
    window.removeEventListener('click', handleClickOutside, true);
  }
}

function handleClickOutside(event) {
  for (let i = 0; i < btnDropdownRef.length; i++) {
    const button = btnDropdownRef[i];
    const popover = popoverDropdownRef[i];

    if (button && !button.contains(event.target) && popover && !popover.contains(event.target)) {
      dropdownPopoverShow[i] = false;
    }
  }
}

  // Add event listener for clicks on window
  onMount(() => {
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  });

  
  </script>
    
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}">
      <div class="rounded-t mb-0 px-4 py-10 border-0">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
              Room List
            </h3>
          </div>
          <button
            class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button" on:click={openModal}
          >
            Add Room
          </button>
          {#if showModal || editModal}
          <div class="modal">
            <div class="modal-content">
                <div class="rounded-t mb-0 px-4 py-10 border-0">
                    <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 class="font-semibold text-lg text-blueGray-700">
                              {editModal ? 'Edit Room' : 'Add Room'}
                            </h3>
                        </div>
                    </div>
                </div>
                <div class="block w-full overflow-x-auto">
                    <div class="px-4 py-5 flex-auto">
                        <div class="flex flex-wrap">
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                                        Room Name
                                    </label>
                                    <input type="text" id="room-name" placeholder="Room Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={roomName}>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                                        Capacity
                                    </label>
                                    <input type="number" id="capacity" placeholder="Capacity" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={capacity}>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                                        Location
                                    </label>
                                    <input type="text" id="location" placeholder="Location" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={location}>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="availability">
                                        Availability
                                    </label>
                                    <label class="switch">
                                        <input type="checkbox" id="availability" class="hidden" bind:checked={availability}>
                                        <span class="slider round"></span> 
                                    </label> Available
                                </div> 
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                                        Features
                                    </label>
                                    <select id="features" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={features}>
                                        <option value="TV">TV</option>
                                        <option value="Projector">Projector</option>
                                        <option value="Speakers">Speakers</option>
                                        <option value="Speakers">Whiteboard</option>
                                        <!-- Add more options as needed -->
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={editModal ? updateRoom : addRoom}>
                              {editModal ? 'Update' : 'Add'}
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
        </div>
      </div>
      <div class="block w-full overflow-x-auto">
        <table class="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
                <th
                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
              >
                Availability
              </th>
              <th
                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
              >
                Room Name
              </th>
              <th
                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
              >
                Capacity
              </th>
              <th
                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
              >
                Location
              </th>
              <th
                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
              >
                Features
              </th>
            </tr>
          </thead>
          <tbody>
            {#each displayedData as roomList, rowIndex}
                      <tr>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center">
                            {#if roomList.status.toLowerCase() === 'available'}
                                <i class="fas fa-circle text-green-500 mr-2"></i>
                            {:else}
                                <i class="fas fa-circle text-red-500 mr-2"></i>
                            {/if}
                        </td>
                          <td class="table-data font-bold text-blueGray-600" title={roomList.roomName}>{roomList.roomName}</td>
                          <td class="table-data" title={roomList.capacity}>{roomList.capacity}</td>
                          <td class="table-data"title={roomList.location}>{roomList.location}</td>
                          <td class="table-data" title={roomList.features}>{roomList.features.join(', ')}</td>
                          <td class="table-data">
                              <div>
                                  <a
                                      class="text-blueGray-500 py-1 px-3"
                                      href="#pablo"
                                      bind:this="{btnDropdownRef[rowIndex]}"
                                      on:click="{(event) => toggleDropdown(event, rowIndex)}"
                                  >
                                      <i class="fas fa-ellipsis-v"></i>
                                  </a>
                                  <div
                                  bind:this="{popoverDropdownRef[rowIndex]}"
                                  class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 {dropdownPopoverShow[rowIndex] ? 'block':'hidden'}"
                                  >
                                      <a
                                          href="#pablo" on:click={(e) => { e.preventDefault(); openEditModal(roomList); }}
                                          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                      >
                                          Edit
                                      </a>
                                      <a
                                          href="#pablo" on:click={(e) => e.preventDefault()}
                                          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                      >
                                          Delete
                                      </a>
                                  </div>
                              </div>
                          </td>
                      </tr>
                  {/each}
              </tbody>
          </table>
          <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
      </div>
  </div>