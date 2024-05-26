<script>
  import { createPopper } from "@popperjs/core";
  import { onMount, onDestroy } from 'svelte';
  import Pagination from "../../../components/Pagination/Pagination.svelte";
  import { addRoomBookingApi, updateRoomBookingApi, getAllRoomBookingsApi, getAllBookableLocationsApi, getAllEmployeesApi, deleteRoomBookingApi } from '../../../services/api';
  import ConfirmationModal from '../../../components/Confirmation/ConfirmationModal.svelte';
  import Toast from '../../../components/Confirmation/Toast.svelte';

  export let color = "light";

  let showModal = false;
  let editModal = false;
  let confirmationModal = false;
  let bookingToDelete = null;

  let showToaster = false;
  let toasterMessage = '';
  let toasterType = '';

  let roombooking = {
    employee: null,
    numOfPeople: null,
    dateTimeFrom: null,
    dateTimeTo: null,
    location: null,
  };

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
      console.error("Error fetching bookable locations:", error);
      locationsList = [];
    }
  }

  function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} (${hours}:${minutes})`;
  }

  async function bookRoom() {
    if (!await validateInputs()) return;

    try {
      await addRoomBookingApi(roombooking);
      await fetchRoomBookings();
      showToasterMessage('Room Booking added successfully!', 'success');
      closeModal();
    } catch (error) {
      console.error('Error adding room booking:', error);
      showToasterMessage('An error occurred while adding room booking. Please try again.', 'error');
    }
  }

  async function updateBooking() {
    if (!await validateInputs()) return;

    delete roombooking.__v;
    try {
      await updateRoomBookingApi(roombooking);
      await fetchRoomBookings();
      showToasterMessage('Room Booking updated successfully!', 'success');
      closeModal();
    } catch (error) {
      console.error('Error updating room booking:', error);
      showToasterMessage('An error occurred while updating room booking. Please try again.', 'error');
    }
  }

  function showDeleteConfirmation(booking) {
    bookingToDelete = booking;
    confirmationModal = true;
  }

  async function confirmDeleteBooking() {
    try {
      await deleteRoomBookingApi(bookingToDelete._id.toString());
      showToasterMessage('Room booking deleted successfully!', 'success');
      closeConfirmationModal();
      await fetchRoomBookings();
    } catch (error) {
      console.error('Failed to delete booking:', error);
      showToasterMessage('An error occurred while deleting room booking. Please try again.', 'error');
    }
  }

  function closeConfirmationModal() {
    confirmationModal = false;
    bookingToDelete = null;
  }

  function showToasterMessage(message, type) {
    toasterMessage = message;
    toasterType = type;
    showToaster = true;
    setTimeout(() => {
      showToaster = false;
    }, 3000); // Show toast for 3 seconds
  }

  async function validateInputs() {
  let isValid = true;
  let errorMessage = '';

  const now = new Date();

  if (!roombooking.employee) {
    errorMessage = 'Employee is required';
    isValid = false;
  } else if (!roombooking.location) {
    errorMessage = 'Room is required';
    isValid = false;
  } else if (!roombooking.numOfPeople || isNaN(roombooking.numOfPeople) || roombooking.numOfPeople <= 0) {
    errorMessage = 'Number of people is required and must be a positive number';
    isValid = false;
  } else {
    const selectedRoom = locationsList.find(room => room._id === roombooking.location._id);
    if (selectedRoom && roombooking.numOfPeople > selectedRoom.capacity) {
      errorMessage = 'Number of people exceeds room capacity';
      isValid = false;
    }
  }

  if (!roombooking.dateTimeFrom) {
    errorMessage = 'Date & Time From is required';
    isValid = false;
  } else if (!roombooking.dateTimeTo) {
    errorMessage = 'Date & Time To is required';
    isValid = false;
  } else if (roombooking.dateTimeFrom && roombooking.dateTimeTo) {
    const dateTimeFrom = new Date(roombooking.dateTimeFrom);
    const dateTimeTo = new Date(roombooking.dateTimeTo);
    
    if (dateTimeTo < dateTimeFrom) {
      errorMessage = 'Date & Time To cannot be before Date & Time From';
      isValid = false;
    } else if (dateTimeFrom < now) {
      errorMessage = '"From" date/time must be in the future';
      isValid = false;
    } else if (dateTimeTo < now) {
      errorMessage = '"To" date/time must be in the future';
      isValid = false;
    }
  }

  if (isValid) {
    // Check for time conflicts
    const conflictingBookings = roomBookingsList.filter(booking => 
      booking.location._id === roombooking.location._id &&
      booking._id !== roombooking._id && // Ignore the booking being edited
      ((new Date(roombooking.dateTimeFrom) >= new Date(booking.dateTimeFrom) && new Date(roombooking.dateTimeFrom) < new Date(booking.dateTimeTo)) ||
      (new Date(roombooking.dateTimeTo) > new Date(booking.dateTimeFrom) && new Date(roombooking.dateTimeTo) <= new Date(booking.dateTimeTo)) ||
      (new Date(roombooking.dateTimeFrom) <= new Date(booking.dateTimeFrom) && new Date(roombooking.dateTimeTo) >= new Date(booking.dateTimeTo)))
    );

    if (conflictingBookings.length > 0) {
      errorMessage = 'The selected room is already booked within the chosen time slot';
      isValid = false;
    }
  }

  if (!isValid) {
    showToasterMessage(errorMessage, 'error');
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

    console.log(roombooking);

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

  searchQuery = ''; // Reset the search query field

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

  function toggleDropdownVisibility() {
  dropdownVisible = true;
  filteredOptions = employeesList.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.employeeID.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

function handleEmployeeSelect(option) {
  roombooking.employee = option;
  searchQuery = `${option.name} (${option.employeeID})`;
  dropdownVisible = false;
}
</script>

<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}">
  {#if showToaster}
    <Toast message={toasterMessage} type={toasterType} />
  {/if}
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
        <div class="modal-content1">
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
                    <input id="empName" type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={searchQuery} on:input={toggleDropdownVisibility} placeholder="Search Employee" />
                    {#if dropdownVisible}
                      <ul class="dropdown max-h-40 overflow-y-auto">
                        {#each filteredOptions as employee}
                          <li class="cursor-pointer" on:click={() => handleEmployeeSelect(employee)}>
                            {employee.name} ({employee.employeeID})
                          </li>
                        {/each}
                      </ul>
                    {/if}
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
            <td class="table-data">{formatDateTime(booking.dateTimeFrom)}</td>
            <td class="table-data">{formatDateTime(booking.dateTimeTo)}</td>
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
