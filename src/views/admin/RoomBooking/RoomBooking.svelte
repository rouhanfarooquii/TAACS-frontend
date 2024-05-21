<script>
  import { createPopper } from "@popperjs/core";
  import { onMount, onDestroy } from 'svelte';
  import Pagination from "../../../components/Pagination/Pagination.svelte";
  import { getAllRoomBookingsApi, getAllBookableLocationsApi} from '../../../services/api'; // Import the API function
  import ConfirmationModal from '../../../components/Confirmation/ConfirmationModal.svelte';

  export let color = "light";

  let employeeName = '';
  let roomName = '';
  let noOfPeople = '';
  let dateTimeFrom = '';
  let dateTimeTo = '';
  let showModal = false;
  let editModal = false;
  let confirmationModal = false;
  let bookingToDelete = null;
  let currentBooking = null;

  let roomList = [
    { roomName: "Room 101", capacity: 10 },
    { roomName: "Room 102", capacity: 6 },
    { roomName: "Room 103", capacity: 8 },
    { roomName: "Room 104", capacity: 12 },
    { roomName: "Room 105", capacity: 4 },
    { roomName: "Room 106", capacity: 20 },
    { roomName: "Room 107", capacity: 15 },
    { roomName: "Room 108", capacity: 8 },
    { roomName: "Room 109", capacity: 10 },
    { roomName: "Room 110", capacity: 18 }
  ];

  let bookingList = [
    {
      employeeName: "John Doe",
      designation: "Manager",
      roomName: "Room 101",
      dateTimeFrom: "2024-05-12T10:00",
      dateTimeTo: "2024-05-12T11:00",
      noOfPeople: 8
    },
    // ... other bookings ...
  ];

  onMount(async () => {
    try {
      const roomBookings = await getAllRoomBookingsApi();
      console.log('Room bookings:', JSON.stringify(roomBookings, null, 2)); // Log the API response to the console
      
      // Map the API response to bookingList
      bookingList = roomBookings.map(booking => ({
        employeeName: booking.employee.name,
        designation: booking.employee.designation.title,
        roomName: "Room 101", // Assuming roomName is not available in API response, hardcoding for now
        dateTimeFrom: booking.dateTimeFrom,
        dateTimeTo: booking.dateTimeTo,
        noOfPeople: booking.numOfPeople
      }));

      // Fetch and set the bookable locations
      const bookableLocations = await getAllBookableLocationsApi();
      console.log('Bookable locations:', JSON.stringify(bookableLocations, null, 2)); // Log the API response to the console
      roomList = bookableLocations.map(location => ({
        roomName: location.title,
        capacity: location.capacity
      }));

    } catch (error) {
      console.error('Error fetching room bookings:', error);
    }
  });

  async function bookRoom() {
    if (!validateInputs()) {
      return;
    }

    try {
      const isDuplicate = bookingList.some(
        booking =>
          booking.roomName === roomName &&
          booking.dateTimeFrom === dateTimeFrom
      );

      if (isDuplicate) {
        alert('Booking already exists.');
        return;
      }

      const response = await fetch('/api/bookRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ employeeName, roomName, noOfPeople, dateTimeFrom, dateTimeTo })
      });

      if (response.ok) {
        navigate('/admin/RoomBooking');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the booking. Please try again.');
    }
  }

  async function updateBooking() {
    if (!validateInputs()) {
      return;
    }

    if (currentBooking) {
      try {
        const response = await fetch(`/api/updateRoomBooking/${currentBooking.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ employeeName, roomName, noOfPeople, dateTimeFrom, dateTimeTo })
        });

        if (response.ok) {
          closeModal();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the booking. Please try again.');
      }
    }
  }

  function showDeleteConfirmation(booking) {
    bookingToDelete = booking;
    confirmationModal = true;
  }

  async function confirmDeleteBooking() {
    try {
      bookingList = bookingList.filter(b => b !== bookingToDelete);
      closeConfirmationModal();
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  }

  function closeConfirmationModal() {
    confirmationModal = false;
    bookingToDelete = null;
  }

  function validateInputs() {
    let isValid = true;

    if (!employeeName) {
      document.getElementById('employee-name-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('employee-name-error').style.display = 'none';
    }

    if (!roomName) {
      document.getElementById('room-name-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('room-name-error').style.display = 'none';
    }

    if (!noOfPeople || isNaN(noOfPeople) || noOfPeople <= 0) {
      document.getElementById('no-of-people-error').style.display = 'block';
      isValid = false;
    } else {
      const selectedRoom = roomList.find(room => room.roomName === roomName);
      if (selectedRoom && noOfPeople > selectedRoom.capacity) {
        document.getElementById('no-of-people-error').innerText = '* Number of people exceeds room capacity';
        document.getElementById('no-of-people-error').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('no-of-people-error').innerText = '* Field Required';
        document.getElementById('no-of-people-error').style.display = 'none';
      }
    }

    if (!dateTimeFrom) {
      document.getElementById('dateTime-from-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('dateTime-from-error').style.display = 'none';
    }

    if (!dateTimeTo) {
      document.getElementById('dateTime-to-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('dateTime-to-error').style.display = 'none';
    }

    if (dateTimeFrom && dateTimeTo && new Date(dateTimeTo) < new Date(dateTimeFrom)) {
      document.getElementById('dateTime-to-error').innerText = '* Date & Time To cannot be before Date & Time From';
      document.getElementById('dateTime-to-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('dateTime-to-error').innerText = '* Field Required';
      document.getElementById('dateTime-to-error').style.display = 'none';
    }

    return isValid;
  }

  function openModal() {
    showModal = true;
  }

  function openEditModal(booking) {
    currentBooking = booking;
    employeeName = booking.employeeName;
    roomName = booking.roomName;
    noOfPeople = booking.noOfPeople;
    dateTimeFrom = booking.dateTimeFrom;
    dateTimeTo = booking.dateTimeTo;
    editModal = true;
  }

  function closeModal() {
    showModal = false;
    editModal = false;
    // Reset input fields
    employeeName = '';
    roomName = '';
    noOfPeople = '';
    dateTimeFrom = '';
    dateTimeTo = '';
    currentBooking = null;

    document.getElementById('employee-name-error').style.display = 'none';
    document.getElementById('room-name-error').style.display = 'none';
    document.getElementById('no-of-people-error').style.display = 'none';
    document.getElementById('dateTime-from-error').style.display = 'none';
    document.getElementById('dateTime-to-error').style.display = 'none';
  }

  const bookingsPerPage = 5;
  let currentPage = 1;

  $: startIndex = (currentPage - 1) * bookingsPerPage;
  $: endIndex = Math.min(startIndex + bookingsPerPage, bookingList.length);
  $: displayedData = bookingList.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(bookingList.length / bookingsPerPage);

  function handlePageChange(event) {
    currentPage = event.detail.pageNumber;
  }

  let dropdownPopoverShow = new Array(bookingList.length).fill(false);
  let btnDropdownRef = new Array(bookingList.length);
  let popoverDropdownRef = new Array(bookingList.length);

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
          Room Bookings
        </h3>
      </div>
      <button
        class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        type="button" on:click={openModal}
      >
        Book Room
      </button>
      {#if showModal || editModal}
      <div class="modal">
        <div class="modal-content">
          <div class="rounded-t mb-0 px-4 py-10 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-lg text-blueGray-700">
                  {editModal ? 'Edit Booking' : 'Book Room'}
                </h3>
              </div>
            </div>
          </div>
          <div class="block w-full overflow-x-auto">
            <div class="px-4 py-5 flex-auto">
              <div class="flex flex-wrap">
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="employee-name">
                      Employee Name
                    </label>
                    <input type="text" id="employee-name" placeholder="Employee Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={employeeName}>
                    <span id="employee-name-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="rooms">
                      Rooms
                    </label>
                    <select id="rooms" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={roomName}>
                      <option value="" disabled selected>Select a room</option>
                      {#each roomList as room}
                        <option value={room.roomName}>{room.roomName}</option>
                      {/each}
                    </select>
                    <span id="room-name-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="no-of-people">
                      # of People
                    </label>
                    <input type="number" min="0" id="no-of-people" placeholder="# of People" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={noOfPeople}>
                    <span id="no-of-people-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="dateTime-from">
                      Date & Time From
                    </label>
                    <input type="datetime-local" id="dateTime-from" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={dateTimeFrom}>
                    <span id="dateTime-from-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="dateTime-to">
                      Date & Time To
                    </label>
                    <input type="datetime-local" id="dateTime-to" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={dateTimeTo}>
                    <span id="dateTime-to-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                </div>
              </div>
              <div class="flex justify-end">
                <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={editModal ? updateBooking : bookRoom}>
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
            Employee Name
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Designation
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Room Booked
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Date & Time From
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            Date & Time To
          </th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">
            # of People
          </th>
        </tr>
      </thead>
      <tbody>
        {#each displayedData as booking, rowIndex}
          <tr>
            <td class="table-data font-bold text-blueGray-600" title={booking.employeeName}>{booking.employeeName}</td>
            <td class="table-data" title={booking.designation}>{booking.designation}</td>
            <td class="table-data" title={booking.roomName}>{booking.roomName}</td>
            <td class="table-data" title={booking.dateTimeFrom}>{booking.dateTimeFrom}</td>
            <td class="table-data" title={booking.dateTimeTo}>{booking.dateTimeTo}</td>
            <td class="table-data" title={booking.noOfPeople}>{booking.noOfPeople}</td>
            <td class="text-xs">
              <div class="flex items-center">
                <i class="fas fa-edit mr-2 text-sm cursor-pointer" on:click={() => openEditModal(booking)}></i>
                <i class="fas fa-trash-alt text-sm cursor-pointer" on:click={() => showDeleteConfirmation(booking)}></i>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    {#if confirmationModal}
      <ConfirmationModal
        message="Are you sure you want to delete this booking?"
        onConfirm={confirmDeleteBooking}
        onCancel={closeConfirmationModal}
      />
    {/if}
    <Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
  </div>
</div>
