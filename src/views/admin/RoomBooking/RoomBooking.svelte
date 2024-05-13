<script>
  import { createPopper } from "@popperjs/core";
  import { onMount } from 'svelte';
  import { onDestroy } from 'svelte';
  import Pagination from "../../../components/Pagination/Pagination.svelte";
  export let color = "light";
  
  let employeeName = '';
  let roomName = '';
  let designation = '';
  let noOfPeople = '';
  let dateTimeFrom = '';
  let dateTimeTo = '';
  let showModal = false;
  let editModal = false;
  let currentBooking = null;

  let bookingList = [
    {
        employeeName: "John Doe",
        designation: "Manager",
        roomName: "Room 101",
        dateTimeFrom: "2024-05-12 10:00 AM",
        dateTimeTo: "2024-05-12 11:00 AM",
        noOfPeople: 8
    },
    {
        employeeName: "Jane Smith",
        designation: "Team Lead",
        roomName: "Room 102",
        dateTimeFrom: "2024-05-13 09:00 AM",
        dateTimeTo: "2024-05-13 10:30 AM",
        noOfPeople: 6
    },
    {
        employeeName: "Alice Johnson",
        designation: "Developer",
        roomName: "Room 103",
        dateTimeFrom: "2024-05-14 11:30 AM",
        dateTimeTo: "2024-05-14 01:00 PM",
        noOfPeople: 4
    },
    {
        employeeName: "Bob Brown",
        designation: "Designer",
        roomName: "Room 104",
        dateTimeFrom: "2024-05-15 02:00 PM",
        dateTimeTo: "2024-05-15 03:30 PM",
        noOfPeople: 10
    },
    {
        employeeName: "Eve White",
        designation: "Analyst",
        roomName: "Room 105",
        dateTimeFrom: "2024-05-16 10:00 AM",
        dateTimeTo: "2024-05-16 11:30 AM",
        noOfPeople: 5
    }
];

async function bookRoom() {
if (employeeName && roomName && dateTimeFrom) {
  try {
    // Check if the device name is already present in the array
    const isDuplicate = bookingList.some(room => bookingList.roomName === roomName);
    
    if (isDuplicate) {
      alert('Booking already exists.');
      return;
    }
    const response = await fetch('/api/bookRoom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({employeeName, room, designation, noOfPeople, dateTimeFrom, dateTimeTo})
    });

    if (response.ok) {
      // Booked successfully, navigate to the appropriate page
      navigate('/admin/RoomBooking');
    } else {
      // Handle error response from the server
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.error('Error:', error);
    alert('An error occurred while adding the booking. Please try again.');
  }
  } else {
    alert('Please fill in all fields.');
  }
}

async function updateBooking() {
    if (currentDevice) {
        try {
            const response = await fetch('/api/updateRoomBooking/${currentBooking.id}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: currentDevice.status })
            });

            if (response.ok) {
                closeModal(); // Close modal on success
                // Refresh the device list or mutate the state as needed
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updating the device status. Please try again.');
      }
    }
}

// Function to open the modal
function openModal() {
    showModal = true;
}

function openEditModal(bookingList) {
  currentBooking = bookingList;
  employeeName = bookingList.employeeName;
  roomName = bookingList.roomName;
  designation = bookingList.designation;
  noOfPeople = bookingList.noOfPeople;
  dateTimeFrom = formatDateTime(bookingList.dateTimeFrom); // Format dateTimeFrom
    dateTimeTo = formatDateTime(bookingList.dateTimeTo); // Format dateTimeTo
  editModal = true;
}

function closeModal() {
    showModal = false;
    editModal = false;
    // Reset input fields
    employeeName = '';
    roomName = '';
    designation = '';
    noOfPeople = '';
    dateTimeFrom = '';
    dateTimeTo = '';
    currentBooking = null;
  }

  // Define pagination logic
  const roomsPerPage = 5; // Adjust as needed
  let currentPage = 1;

  // Reactive statements to ensure proper updates
  $: startIndex = (currentPage - 1) * roomsPerPage;
  $: endIndex = Math.min(startIndex + roomsPerPage, bookingList.length);
  $: displayedData = bookingList.slice(startIndex, endIndex);
  $: totalPages = Math.ceil(bookingList.length / roomsPerPage);

  function handlePageChange(event) {
    console.log("Received page change:", event.detail.pageNumber);  // Confirm event reception
    currentPage = event.detail.pageNumber;
}

function formatDateTime(dateTimeString) {
    console.log("Input dateTimeString:", dateTimeString);

    // Split the date and time
    const [date, time] = dateTimeString.split(' ');

    console.log("Split date:", date);
    console.log("Split time:", time);

    // Format the date part to YYYY-MM-DD
    const formattedDate = date;

    // Extract hours, minutes, and AM/PM from the time part
    const [timeWithoutAmPm, ampm] = time.split(' ');
    const [hours, minutes] = timeWithoutAmPm.split(':');

    console.log("Extracted hours:", hours);
    console.log("Extracted minutes:", minutes);
    console.log("Extracted AM/PM:", ampm);

    // Convert hours to 24-hour format if it's PM
    let formattedHours = parseInt(hours, 10);
    if (ampm === 'PM' && formattedHours !== 12) {
        formattedHours += 12;
    } else if (ampm === 'AM' && formattedHours === 12) {
        formattedHours = 0; // 12 AM should be 0 in 24-hour format
    }

    console.log("Formatted hours:", formattedHours);

    // Format the time part to HH:MM
    const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes}`;

    console.log("Formatted time:", formattedTime);

    // Combine date and time in the format YYYY-MM-DDTHH:MM
    return `${formattedDate}T${formattedTime}`;
}

// Array to store dropdown visibility for each device row
let dropdownPopoverShow = new Array(bookingList.length).fill(false); 

// Arrays to store references for dropdown buttons and popovers
let btnDropdownRef = new Array(bookingList.length);
let popoverDropdownRef = new Array(bookingList.length);

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
                                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                                      Employee Name
                                  </label>
                                  <input type="text" id="employee-name" placeholder="Employee Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={employeeName}>
                              </div>
                          </div>
                          <div class="w-full lg:w-6/12 px-4">
                              <div class="relative mb-3">
                                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                                      Rooms
                                  </label>
                                  <select id="rooms" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={roomName}>
                                      <option value="Room 101">Room 101</option>
                                      <option value="Room 102">Room 102</option>
                                      <option value="Room 103">Room 103</option>
                                      <!-- Add more options as needed -->
                                  </select>
                              </div>
                          </div>
                          <div class="w-full lg:w-6/12 px-4">
                              <div class="relative mb-3">
                                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                                      Designation
                                  </label>
                                  <input type="text" id="designation" placeholder="Designation" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={designation}>
                              </div>
                          </div>
                          <div class="w-full lg:w-6/12 px-4">
                              <div class="relative mb-3">
                                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                                      # of People
                                  </label>
                                  <input type="text" id="no-of-people" placeholder="# of People" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={noOfPeople}>
                              </div>
                          </div>
                          <div class="w-full lg:w-6/12 px-4">
                              <div class="relative mb-3">
                                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                                      Date & Time From
                                  </label>
                                  <input type="datetime-local" id="dateTime-From" placeholder="Date & Time From" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={dateTimeFrom}>
                              </div>
                          </div>
                          <div class="w-full lg:w-6/12 px-4">
                              <div class="relative mb-3">
                                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                                      Date & Time To
                                  </label>
                                  <input type="datetime-local" id="dateTime-To" placeholder="Date & Time To" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={dateTimeTo}>
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
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Employee Name
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Designation
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Room Booked
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Date & Time From
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              Date & Time To
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}"
            >
              # of People
            </th>
          </tr>
        </thead>
        <tbody>
          {#each displayedData as bookingList, rowIndex}
                    <tr>
                        <td class="table-data font-bold text-blueGray-600" title={bookingList.employeeName}>{bookingList.employeeName}</td>
                        <td class="table-data" title={bookingList.designation}>{bookingList.designation}</td>
                        <td class="table-data"title={bookingList.roomName}>{bookingList.roomName}</td>
                        <td class="table-data"title={bookingList.dateTimeFrom}>{bookingList.dateTimeFrom}</td>
                        <td class="table-data"title={bookingList.dateTimeTo}>{bookingList.dateTimeTo}</td>
                        <td class="table-data"title={bookingList.noOfPeople}>{bookingList.noOfPeople}</td>
                        <td class="text-xs">
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
                                        href="#pablo" on:click={(e) => { e.preventDefault(); openEditModal(bookingList); }}
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