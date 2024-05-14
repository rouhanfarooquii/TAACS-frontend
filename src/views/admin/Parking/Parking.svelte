<!-- <script>
    // core components
    import CardLineChart from "components/Cards/CardLineChart.svelte";
    import CardBarChart from "components/Cards/CardBarChart.svelte";
    import CardPageVisits from "components/Cards/CardPageVisits.svelte";
    import CardSocialTraffic from "components/Cards/CardSocialTraffic.svelte";
    export let location;
  </script>
  
  <div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <CardLineChart />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <CardBarChart />
      </div>
    </div>
  </div>
   -->

   <script>
    import { reactive } from 'svelte';
    import AssignNewSpaceModal from './AssignNewSpaceModal.svelte';
    import Pagination from '../../../components/Pagination/Pagination.svelte';
    import QrCode from './QRCode.svelte';
    const edit1 = "../assets/img/icons8-edit-24.png"
    const edit2 = "../assets/img/icons8-tick-24.png"
    const delete1 = "../assets/img/icons8-delete-24.png"
    export let color = "light";
  
    let spaces = [
    { id: '1', parkingSlot: 'FF-28', location: 'Aman Parking', carId: 'BJW-097', empName: 'Arsalan', carMake: 'Honda Civic', cardRfidNo: 829291829182 },
    { id: '2', parkingSlot: 'FF-29', location: 'Aman Parking', carId: 'JNW-134', empName: 'Emily', carMake: 'Toyota Corolla', cardRfidNo: 928347293874 },
    { id: '3', parkingSlot: 'FF-30', location: 'Aman Parking', carId: 'XJR-509', empName: 'Michael', carMake: 'Ford Fusion', cardRfidNo: 732894723489 },
    { id: '4', parkingSlot: 'FF-31', location: 'Aman Parking', carId: 'KLO-221', empName: 'Sophia', carMake: 'Chevrolet Malibu', cardRfidNo: 483920948322 },
    { id: '5', parkingSlot: 'FF-32', location: 'Aman Parking', carId: 'PLM-777', empName: 'Daniel', carMake: 'Volkswagen Jetta', cardRfidNo: 273849273847 },
    { id: '6', parkingSlot: 'FF-33', location: 'Aman Parking', carId: 'BGT-402', empName: 'Isabella', carMake: 'Nissan Altima', cardRfidNo: 587493728374 },
    { id: '7', parkingSlot: 'FF-34', location: 'Aman Parking', carId: 'QAZ-602', empName: 'William', carMake: 'Hyundai Elantra', cardRfidNo: 493827498237 },
    { id: '8', parkingSlot: 'FF-35', location: 'Aman Parking', carId: 'LKO-813', empName: 'Olivia', carMake: 'Mazda 3', cardRfidNo: 239847239874 },
    { id: '9', parkingSlot: 'FF-36', location: 'Aman Parking', carId: 'POI-911', empName: 'James', carMake: 'Subaru Impreza', cardRfidNo: 574839574839 },
    { id: '10', parkingSlot: 'FF-37', location: 'Aman Parking', carId: 'MNB-624', empName: 'Charlotte', carMake: 'Kia Optima', cardRfidNo: 192837192837 },
    { id: '11', parkingSlot: 'FF-38', location: 'Aman Parking', carId: 'VFR-301', empName: 'Alexander', carMake: 'Audi A4', cardRfidNo: 384920384920 },
    { id: '12', parkingSlot: 'FF-39', location: 'Aman Parking', carId: 'WAS-725', empName: 'Amelia', carMake: 'BMW 3 Series', cardRfidNo: 273847238472 },
    { id: '13', parkingSlot: 'FF-40', location: 'Aman Parking', carId: 'BHU-521', empName: 'Benjamin', carMake: 'Mercedes-Benz C-Class', cardRfidNo: 273489237498 },
    { id: '14', parkingSlot: 'FF-41', location: 'Aman Parking', carId: 'TYU-835', empName: 'Mia', carMake: 'Lexus ES', cardRfidNo: 392874982739 },
    { id: '15', parkingSlot: 'FF-42', location: 'Aman Parking', carId: 'OPQ-204', empName: 'Ethan', carMake: 'Volvo S60', cardRfidNo: 487239487239 },
    { id: '16', parkingSlot: 'FF-43', location: 'Aman Parking', carId: 'NHY-927', empName: 'Emma', carMake: 'Tesla Model 3', cardRfidNo: 394823984723 },
    { id: '17', parkingSlot: 'FF-44', location: 'Aman Parking', carId: 'DFG-318', empName: 'Noah', carMake: 'Porsche 911', cardRfidNo: 749823749823 },
    { id: '18', parkingSlot: 'FF-45', location: 'Aman Parking', carId: 'PLK-637', empName: 'Ava', carMake: 'Jeep Grand Cherokee', cardRfidNo: 574938472384 },
    { id: '19', parkingSlot: 'FF-46', location: 'Aman Parking', carId: 'GYH-874', empName: 'Liam', carMake: 'Infiniti Q50', cardRfidNo: 328947239847 },
    { id: '20', parkingSlot: 'FF-47', location: 'Aman Parking', carId: 'HJK-203', empName: 'Charlotte', carMake: 'Lamborghini Huracan', cardRfidNo: 478329473284 }
];
  
  // State variable to track editing mode for each user
  let editingModes = {};
  
  function toggleEditingMode(spaceId) {
    editingModes[spaceId] = !editingModes[spaceId];
  }
  
  function saveSalaryChanges(space) {
    // Logic to save the changes made to the salary
    console.log("Saved changes for space:", space);
    // Assuming you have backend logic here to update the salary
  }
  
  function editSalary(space) {
    toggleEditingMode(space.id);
    // You can perform additional actions here if needed
  }
  
    let selectedSpaces = new Set();
  
    function toggleSelection(spaceId) {
      if (selectedSpaces.has(spaceId)) {
        selectedSpaces.delete(spaceId);
      } else {
        selectedSpaces.add(spaceId);
      }
      selectedSpaces = new Set(selectedSpaces); // Force rerender
    }
  
    function toggleSelectAll() {
      if (selectedSpaces.size === spaces.length) {
        selectedSpaces.clear();
      } else {
        spaces.forEach(space => selectedSpaces.add(space.id));
      }
      selectedSpaces = new Set(selectedSpaces); // Force rerender
    }
  
    let showModal = false;
  
    function openModal() {
      showModal = true;
    }

    
  // Define pagination logic
  const spacesPerPage = 5; // Adjust as needed
  let currentPage = 1;

 // Reactive statements to ensure proper updates
$: startIndex = (currentPage - 1) * spacesPerPage;
$: endIndex = Math.min(startIndex + spacesPerPage, spaces.length);
$: displayedSpaces = spaces.slice(startIndex, endIndex);
$: totalPages = Math.ceil(spaces.length / spacesPerPage);

  function handlePageChange(event) {
    console.log("Received page change:", event.detail.pageNumber);  // Confirm event reception
    currentPage = event.detail.pageNumber;
}

let parkingSlot = '';
    let location = '';
    let carId = '';
    let empName = '';
    let carMake = '';
    let cardRfidNo = '';
  
    // function addDevice() {
    //   // Perform validation if needed
    //   // For simplicity, I'm assuming all fields are required
    //   if (deviceName && deviceId && deviceIp) {
    //     // Add the new device to your data source or perform any necessary action
    //     navigate('/admin/devicemanagement');
    //   } else {
    //     alert('Please fill in all fields.');
    //   }
    // }
  
    async function addSpace() {
  // Perform validation if needed
  // For simplicity, I'm assuming all fields are required
  if (parkingSlot && location && carId && empName && carMake && cardRfidNo) {
    try {
      // Check if the device name is already present in the devices array
      const isDuplicate = spaces.some(space => space.parkingSlot === parkingSlot);
      
      if (isDuplicate) {
        alert('Parking slot must be unique.');
        return;
      }
  
      // Assuming you have an API endpoint to add a device
      const response = await fetch('/api/addSpace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ parkingSlot, location, carId, empName, carMake, cardRfidNo })
      });
  
      if (response.ok) {
        // Device added successfully, navigate to the appropriate page
        navigate('/admin/parking');
      } else {
        // Handle error response from the server
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
      alert('An error occurred while adding the space. Please try again.');
    }
  } else {
    alert('Please fill in all fields.');
  }
  }
  
    function closeModal() {
      showModal = false;
      parkingSlot = '';
    location = '';
    carId = '';
    empName = '';
    carMake = '';
    cardRfidNo = '';
    }
  </script>
  
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
      <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}"
      >
      Parking Information
      </h3>
      <br/>
    </div>
    <div class="access-control">
      <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={openModal}>Assign New Space</button>
      {#if showModal}
      <div class="modal">
        <div class="modal-content">
        <div class="rounded-t mb-0 px-4 py-10 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-blueGray-700">
                Assign New Space
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
                    Parking Slot
                  </label>
                  <input type="text" id="parkingSlot" placeholder="Parking Slot" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={parkingSlot}>
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
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                    Car ID
                  </label>
                  <input type="text" id="carId" placeholder="Car ID" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={carId}>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                    Employee Name
                  </label>
                  <input type="text" id="empName" placeholder="Employee Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={empName}>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                    Car Make
                  </label>
                  <input type="text" id="carMake" placeholder="Car Make" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={carMake}>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                    Card RFID No
                  </label>
                  <input type="text" id="cardRfidNo" placeholder="Card RFID No" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={cardRfidNo}>
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={addSpace}>
                Add
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
      <input type="search" class="mb-4 bg-gray-800 text-white rounded-lg px-4 py-2" placeholder="Search...">
      <table>
        <thead>
          <tr>
            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Parking Slot</th>
            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Location</th>
            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Car ID</th>
            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Employee Name</th>
            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Car Make</th>
            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">QR Code</th>
          </tr>
        </thead>
        <tbody>
          {#each displayedSpaces as space (space.id)}
          <tr>
            <td class="table-data font-bold text-blueGray-600" title={space.parkingSlot}>
              <!-- Name -->
              <div class="flex items-center">
                {#if editingModes[space.id]}
                  <input type="text" class="salary-input" bind:value={space.parkingSlot}>
                {:else}
                  <span>{space.parkingSlot}</span>
                {/if}
              </div>
            </td>
            <td class="table-data" title={space.location}>
              <!-- Designatiom -->
              <div class="flex items-center">
                {#if editingModes[space.id]}
                  <input type="text" class="salary-input1" bind:value={space.location}>
                {:else}
                  <span>{space.location}</span>
                {/if}
              </div>
            </td>
            <td class="table-data" title={space.carId}>
              <!-- Department -->
              <div class="flex items-center">
                {#if editingModes[space.id]}
                  <input type="text" class="salary-input" bind:value={space.carId}>
                {:else}
                  <span>{space.carId}</span>
                {/if}
              </div>
            </td>
            <td class="table-data" title={space.empName}>
              <!-- Percentage -->
              <div class="flex items-center">
                {#if editingModes[space.id]}
                  <input type="text"  class="salary-input1" bind:value={space.empName}>
                {:else}
                  <span>{space.empName}</span>
                {/if}
              </div>
            </td>
            <td class="table-data" title={space.carMake}>
              <!-- Active From -->
              <div class="flex items-center">
                {#if editingModes[space.id]}
                  <input type="text" class="salary-input1" bind:value={space.carMake}>
                {:else}
                  <span>{space.carMake}</span>
                {/if}
              </div>
            </td>
            <!-- <td class="table-data" title={space.cardRfidNo}>
                <div class="flex items-center">
                  {#if editingModes[space.id]}
                    <input type="Number" bind:value={space.cardRfidNo}>
                  {:else}
                    <span>{space.cardRfidNo}</span>
                  {/if}
                </div>
              </td> -->
                <td>
                  <QrCode data={space.carId.toString()} />
                </td>
            <td>
              <!-- Edit button -->
              <div class="flex items-center">
                {#if editingModes[space.id]}
                  <!-- Save button -->
                  <img src={edit2} alt="Save" class="icon-button cursor-pointer" on:click={() => {saveSalaryChanges(space); toggleEditingMode(space.id);}}>
                {:else}
                  <!-- Edit button -->
                  <img src={edit1} alt="Edit" class="icon-button cursor-pointer" on:click={() => editSalary(space)} />
                {/if}
                <div class="ml-4">
                  <img src={delete1} alt="Delete" class="icon-button cursor-pointer">
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