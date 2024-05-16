<script>
  import { createPopper } from "@popperjs/core";
  import { onMount, onDestroy } from 'svelte';
  import Pagination from "../../../components/Pagination/Pagination.svelte";
  export let color = "light";

  let availability = false;
  let capacity = '';
  let roomName = '';
  let location = '';
  let features = [];
  let showModal = false;
  let editModal = false;
  let currentBooking = null;

  let roomList = [
    { status: "Available", roomName: "Room 101", capacity: 10, location: "East Wing", features: ["TV", "Projector", "Speaker"] },
    { status: "Unavailable", roomName: "Room 102", capacity: 6, location: "West Wing", features: ["TV", "Whiteboard"] },
    { status: "Available", roomName: "Room 103", capacity: 8, location: "North Wing", features: ["Projector", "Speaker"] },
    { status: "Available", roomName: "Room 104", capacity: 12, location: "South Wing", features: ["TV", "Projector", "Whiteboard", "Speaker"] },
    { status: "Unavailable", roomName: "Room 105", capacity: 4, location: "Basement", features: ["TV", "Projector"] },
    { status: "Available", roomName: "Room 106", capacity: 20, location: "Top Floor", features: ["TV", "Projector", "Speaker"] },
    { status: "Available", roomName: "Room 107", capacity: 15, location: "Executive Floor", features: ["TV", "Projector", "Whiteboard"] },
    { status: "Unavailable", roomName: "Room 108", capacity: 8, location: "Middle Floor", features: ["TV", "Speaker"] },
    { status: "Available", roomName: "Room 109", capacity: 10, location: "Lobby Area", features: ["TV", "Whiteboard"] },
    { status: "Available", roomName: "Room 110", capacity: 18, location: "Conference Center", features: ["TV", "Projector", "Speaker"] }
  ];

  const allFeatures = ["TV", "Projector", "Speaker", "Whiteboard"];

  async function addRoom() {
    if (roomName && capacity && location && features.length > 0) {
      try {
        // Check if the room name is already present in the array
        const isDuplicate = roomList.some(room => room.roomName === roomName);
        
        if (isDuplicate) {
          alert('Room already exists.');
          return;
        }
  
        const response = await fetch('/api/addRoom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ availability, capacity, roomName, location, features })
        });
  
        if (response.ok) {
          navigate('/admin/Rooms');
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the room. Please try again.');
      }
    } else {
      displayValidationErrors();
    }
  }

  async function updateRoom() {
    if (roomName && capacity && location && features.length > 0) {
      try {
        const isDuplicate = roomList.some(room => room.roomName === roomName && room !== currentBooking);
        
        if (isDuplicate) {
          alert('Room name already exists.');
          return;
        }
  
        const response = await fetch('/api/updateRoom', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ availability, capacity, roomName, location, features })
        });
  
        if (response.ok) {
          closeModal();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the room. Please try again.');
      }
    } else {
      displayValidationErrors();
    }
  }
  
  function displayValidationErrors() {
    if (!roomName) {
      document.getElementById('room-name-error').style.display = 'block';
    } else {
      document.getElementById('room-name-error').style.display = 'none';
    }

    if (!capacity) {
      document.getElementById('capacity-error').style.display = 'block';
    } else {
      document.getElementById('capacity-error').style.display = 'none';
    }

    if (!location) {
      document.getElementById('location-error').style.display = 'block';
    } else {
      document.getElementById('location-error').style.display = 'none';
    }

    if (features.length === 0) {
      document.getElementById('features-error').style.display = 'block';
    } else {
      document.getElementById('features-error').style.display = 'none';
    }
  }

  function openModal() {
    showModal = true;
  }

  function openEditModal(room) {
    currentBooking = room;
    availability = room.availability;
    roomName = room.roomName;
    capacity = room.capacity;
    location = room.location;
    features = room.features;
    editModal = true;
  }

  function deleteRoom(room) {
    roomList = roomList.filter(r => r !== room);
  }

  function closeModal() {
    showModal = false;
    editModal = false;
    // Reset input fields
    availability = false;
    capacity = '';
    roomName = '';
    location = '';
    features = [];
    currentBooking = null;
    document.getElementById('room-name-error').style.display = 'none';
    document.getElementById('capacity-error').style.display = 'none';
    document.getElementById('location-error').style.display = 'none';
    document.getElementById('features-error').style.display = 'none';
  }
  
  const roomsPerPage = 5;
  let currentPage = 1;
  
  $: startIndex = (currentPage - 1) * roomsPerPage;
  $: endIndex = Math.min(startIndex + roomsPerPage, roomList.length);
  $: displayedData = roomList.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(roomList.length / roomsPerPage);
  
  function handlePageChange(event) {
    currentPage = event.detail.pageNumber;
  }

  let dropdownPopoverShow = new Array(roomList.length).fill(false);
  let btnDropdownRef = new Array(roomList.length);
  let popoverDropdownRef = new Array(roomList.length);

  function toggleDropdown(event, rowIndex) {
    event.stopPropagation();
    dropdownPopoverShow[rowIndex] = !dropdownPopoverShow[rowIndex];

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
                <div class="w-full lg:w-8/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="room-name">
                      Room Name
                    </label>
                    <input type="text" id="room-name" placeholder="Room Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={roomName}>
                    <span id="room-name-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="capacity">
                      Capacity
                    </label>
                    <input type="number" id="capacity" placeholder="Capacity" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={capacity}>
                    <span id="capacity-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="location">
                      Location
                    </label>
                    <input type="text" id="location" placeholder="Location" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={location}>
                    <span id="location-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="availability">
                      Availability
                    </label>
                    <label class="switch">
                      <input type="checkbox" id="availability" class="hidden" bind:checked={availability}>
                      <span class="slider round"></span>
                    </label> Available
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="features">
                      Features
                    </label>
                    <div id="features">
                      {#each allFeatures as feature}
                        <div class="flex items-center">
                          <input type="checkbox" value={feature} bind:group={features} />
                          <label class="ml-2 text-sm text-blueGray-600">{feature}</label>
                        </div>
                      {/each}
                    </div>
                    <span id="features-error" class="text-red-600 text-xs" style="display: none;">* Please select at least one feature</span>
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
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Availability
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Room Name
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Capacity
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Location
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Features
          </th>
        </tr>
      </thead>
      <tbody>
        {#each displayedData as room, rowIndex}
        <tr>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center">
            {#if room.status.toLowerCase() === 'available'}
              <i class="fas fa-circle text-green-500 mr-2"></i>
            {:else}
              <i class="fas fa-circle text-red-500 mr-2"></i>
            {/if}
          </td>
          <td class="table-data font-bold text-blueGray-600" title={room.roomName}>{room.roomName}</td>
          <td class="table-data" title={room.capacity}>{room.capacity}</td>
          <td class="table-data" title={room.location}>{room.location}</td>
          <td class="table-data" title={room.features.join(', ')}>{room.features.join(', ')}</td>
          <td class="table-data">
            <div>
              <a class="text-blueGray-500 py-1 px-3" href="#pablo" bind:this="{btnDropdownRef[rowIndex]}" on:click={(event) => toggleDropdown(event, rowIndex)}>
                <i class="fas fa-ellipsis-v"></i>
              </a>
              <div bind:this="{popoverDropdownRef[rowIndex]}" class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 {dropdownPopoverShow[rowIndex] ? 'block':'hidden'}">
                <a href="#pablo" on:click={(e) => { e.preventDefault(); openEditModal(room); }} class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                  Edit
                </a>
                <a href="#pablo" on:click={(e) => { e.preventDefault(); deleteRoom(room); }} class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
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
