<script>
  import { createPopper } from "@popperjs/core";
  import { onMount, onDestroy } from 'svelte';
  import Pagination from "../../../components/Pagination/Pagination.svelte";
  import { addRoomBookingApi, updateRoomBookingApi, getAllRoomBookingsApi, getAllBookableLocationsApi, getAllEmployeesApi, deleteRoomBookingApi } from '../../../services/api';
  import ConfirmationModal from '../../../components/Confirmation/ConfirmationModal.svelte';

  export let color = "light";

  let showModal = false;
  let editModal = false;
  let confirmationModal = false;
  let bookingToDelete = null;

  let roombooking = {
    employee: null,
    numOfPeople: null,
    dateTimeFrom: null,
    dateTimeTo: null,
    location: null,
  }

  let locationsList = [];
  let roomBookingsList = [];
  let employeesList = [];

  let searchQuery = '';
  let filteredOptions = [];
  let dropdownVisible = false;

  onMount(async () => {
    await fetchEmployees();
    await fetchRoomBookings();
    await fetchBookableLocations();
  });

  async function fetchEmployees() {
    try {
      employeesList = await getAllEmployeesApi();
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }

  async function fetchRoomBookings() {
    try {
      roomBookingsList = await getAllRoomBookingsApi();
    } catch (error) {
      console.error("Error fetching room bookings:", error);
    }
  }

  async function fetchBookableLocations() {
    try {
      locationsList = await getAllBookableLocationsApi();
    } catch (error) {
      console.error("Error fetching room bookings:", error);
      locationsList = [];
    }
  }

  async function bookRoom() {
    try {
      await addRoomBookingApi(roombooking);
      await fetchRoomBookings();
      closeModal();
    } catch (error) {
      console.error('Error adding room booking:', error);
    }
  }

  async function updateBooking() {
    // if (!validateInputs()) return;
    delete roombooking.__v
    try {
      await updateRoomBookingApi(roombooking);
      await fetchRoomBookings();
      closeModal();
    } catch (error) {
      console.error('Error updating room booking:', error);
    }
  }

  function showDeleteConfirmation(booking) {
    bookingToDelete = booking;
    confirmationModal = true;
  }

  async function confirmDeleteBooking() {
    try {
      await deleteRoomBookingApi(bookingToDelete._id.toString())
      closeConfirmationModal();
      await fetchRoomBookings()
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

    if (!roombooking.employee) {
      document.getElementById('empName-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('empName-error').style.display = 'none';
    }

    if (!roombooking.location) {
      document.getElementById('room-name-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('room-name-error').style.display = 'none';
    }

    if (!roombooking.numOfPeople || isNaN(roombooking.numOfPeople) || roombooking.numOfPeople <= 0) {
      document.getElementById('no-of-people-error').style.display = 'block';
      isValid = false;
    } else {
      const selectedRoom = locationsList.find(room => room._id === roombooking.location);
      if (selectedRoom && roombooking.numOfPeople > selectedRoom.capacity) {
        document.getElementById('no-of-people-error').innerText = '* Number of people exceeds room capacity';
        document.getElementById('no-of-people-error').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('no-of-people-error').innerText = '* Field Required';
        document.getElementById('no-of-people-error').style.display = 'none';
      }
    }

    if (!roombooking.dateTimeFrom) {
      document.getElementById('dateTime-from-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('dateTime-from-error').style.display = 'none';
    }

    if (!roombooking.dateTimeTo) {
      document.getElementById('dateTime-to-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('dateTime-to-error').style.display = 'none';
    }

    if (roombooking.dateTimeFrom && roombooking.dateTimeTo && new Date(roombooking.dateTimeTo) < new Date(roombooking.dateTimeFrom)) {
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
    roombooking = {
      ...booking,
      dateTimeFrom: new Date(booking.dateTimeFrom).toISOString().slice(0, 16),
      dateTimeTo: new Date(booking.dateTimeTo).toISOString().slice(0, 16),
      employee: employeesList.find(emp => emp._id == booking.employee._id),
      location: locationsList.find(loc => loc._id == booking.location._id),
    };

    console.log(roombooking)

    editModal = true;
  }

  function closeModal() {
    showModal = false;
    editModal = false;
    roombooking = {
      employee: null,
      numOfPeople: null,
      dateTimeFrom: null,
      dateTimeTo: null,
      location: null,
    };

    document.getElementById('empName-error').style.display = 'none';
    document.getElementById('room-name-error').style.display = 'none';
    document.getElementById('no-of-people-error').style.display = 'none';
    document.getElementById('dateTime-from-error').style.display = 'none';
    document.getElementById('dateTime-to-error').style.display = 'none';
  }

  const bookingsPerPage = 5;
  let currentPage = 1;

  $: startIndex = (currentPage - 1) * bookingsPerPage;
  $: endIndex = Math.min(startIndex + bookingsPerPage, roomBookingsList.length);
  $: displayedData = roomBookingsList.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(roomBookingsList.length / bookingsPerPage);

  function handlePageChange(event) {
    currentPage = event.detail.pageNumber;
  }

  let dropdownPopoverShow = new Array(roomBookingsList.length).fill(false);
  let btnDropdownRef = new Array(roomBookingsList.length);
  let popoverDropdownRef = new Array(roomBookingsList.length);

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
    if (!event.target.closest('.dropdown')) {
      dropdownVisible = false;
    }
  }

  onMount(() => {
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  });

  function handleEmployeeSelect(option) {
    roombooking.employee = option;
    searchQuery = option.displayText;
    dropdownVisible = false;
  }

  function toggleDropdownVisibility() {
    dropdownVisible = !dropdownVisible;
    if (dropdownVisible) {
      filteredOptions = employeesList.filter(option =>
        option.displayText.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }
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
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="empName">
                      Employee Name
                    </label>
                    <select id="empName" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={roombooking.employee}>
                      <option value={null}>Select Employee</option>
                      {#each employeesList as employee}
                        <option value={employee}>{employee.name} ({employee.employeeID})</option>
                      {/each}
                    </select>
                    <span id="empName-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="dateTime-from">
                      Date & Time From
                    </label>
                    <input type="datetime-local" id="dateTime-from" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={roombooking.dateTimeFrom}>
                    <span id="dateTime-from-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="rooms">
                      Room (Capacity)
                    </label>
                    <select id="rooms" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={roombooking.location}>
                      <option value={null} disabled selected>Select a room</option>
                      {#each locationsList as location}
                        <option value={location}>{location.title} ({location.capacity})</option>
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
                    <input type="number" min="0" id="no-of-people" placeholder="# of People" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={roombooking.numOfPeople}>
                    <span id="no-of-people-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                  </div>
                  
                  <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="dateTime-to">
                      Date & Time To
                    </label>
                    <input type="datetime-local" id="dateTime-to" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={roombooking.dateTimeTo}>
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
        {#each displayedData as booking}
          <tr>
            <td class="table-data font-bold text-blueGray-600">{booking.employee.name}</td>
            <td class="table-data">{booking.location.title}</td>
            <td class="table-data">{booking.dateTimeFrom}</td>
            <td class="table-data">{booking.dateTimeTo}</td>
            <td class="table-data">{booking.numOfPeople}</td>
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
