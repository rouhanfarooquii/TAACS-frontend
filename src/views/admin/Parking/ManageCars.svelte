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
    import AddCarModal from './AddCarModal.svelte';
    import Pagination from '../../../components/Pagination/Pagination.svelte';
    const edit1 = "../assets/img/icons8-edit-24.png"
    const edit2 = "../assets/img/icons8-tick-24.png"
    const delete1 = "../assets/img/icons8-delete-24.png"
    export let color = "light";
  
    let cars = [
    { id: '1', carId: 'BJW-097', empId: 2928928, carMake: 'Honda Civic', carModel: 2022, type: 'Sedan' },
    { id: '2', carId: 'KLX-123', empId: 2928929, carMake: 'Toyota Corolla', carModel: 2023, type: 'Sedan' },
    { id: '3', carId: 'PQR-456', empId: 2928930, carMake: 'Ford Mustang', carModel: 2022, type: 'Sports Car' },
    { id: '4', carId: 'XYZ-789', empId: 2928931, carMake: 'Chevrolet Tahoe', carModel: 2023, type: 'SUV' },
    { id: '5', carId: 'ABC-321', empId: 2928932, carMake: 'BMW 3 Series', carModel: 2024, type: 'Sedan' },
    { id: '6', carId: 'DEF-654', empId: 2928933, carMake: 'Audi Q5', carModel: 2023, type: 'SUV' },
    { id: '7', carId: 'GHI-987', empId: 2928934, carMake: 'Mercedes-Benz C-Class', carModel: 2023, type: 'Sedan' },
    { id: '8', carId: 'JKL-246', empId: 2928935, carMake: 'Lexus RX', carModel: 2024, type: 'SUV' },
    { id: '9', carId: 'MNO-135', empId: 2928936, carMake: 'Tesla Model 3', carModel: 2024, type: 'Electric' },
    { id: '10', carId: 'PST-642', empId: 2928937, carMake: 'Hyundai Tucson', carModel: 2024, type: 'SUV' },
    { id: '11', carId: 'VWX-753', empId: 2928938, carMake: 'Kia Sportage', carModel: 2024, type: 'SUV' },
    { id: '12', carId: 'YZA-864', empId: 2928939, carMake: 'Nissan Altima', carModel: 2023, type: 'Sedan' },
    { id: '13', carId: 'BCD-975', empId: 2928940, carMake: 'Subaru Outback', carModel: 2024, type: 'SUV' },
    { id: '14', carId: 'EFG-386', empId: 2928941, carMake: 'Volvo XC60', carModel: 2023, type: 'SUV' },
    { id: '15', carId: 'HIJ-597', empId: 2928942, carMake: 'Jeep Wrangler', carModel: 2023, type: 'SUV' },
    { id: '16', carId: 'KLM-708', empId: 2928943, carMake: 'Mazda CX-5', carModel: 2023, type: 'SUV' },
    { id: '17', carId: 'NOP-819', empId: 2928944, carMake: 'Ram 1500', carModel: 2024, type: 'Truck' },
    { id: '18', carId: 'QRS-920', empId: 2928945, carMake: 'GMC Sierra', carModel: 2023, type: 'Truck' },
    { id: '19', carId: 'TUV-231', empId: 2928946, carMake: 'Honda Accord', carModel: 2024, type: 'Sedan' },
    { id: '20', carId: 'WXYZ-542', empId: 2928947, carMake: 'Ford F-150', carModel: 2023, type: 'Truck' }
];
  
  // State variable to track editing mode for each user
  let editingModes = {};
  
  function toggleEditingMode(carId) {
    editingModes[carId] = !editingModes[carId];
  }
  
  function saveSalaryChanges(car) {
    // Logic to save the changes made to the salary
    console.log("Saved changes for car:", car);
    // Assuming you have backend logic here to update the salary
  }
  
  function editSalary(car) {
    toggleEditingMode(car.id);
    // You can perform additional actions here if needed
  }
  
    let selectedCars = new Set();
  
    function toggleSelection(carId) {
      if (selectedCars.has(carId)) {
        selectedCars.delete(carId);
      } else {
        selectedCars.add(carId);
      }
      selectedCars = new Set(selectedCars); // Force rerender
    }
  
    function toggleSelectAll() {
      if (selectedCars.size === cars.length) {
        selectedCars.clear();
      } else {
        cars.forEach(car => selectedCars.add(car.id));
      }
      selectedCars = new Set(selectedCars); // Force rerender
    }
  
    let showModal = false;
  
    function openModal() {
      showModal = true;
    }

    
  // Define pagination logic
  const carsPerPage = 5; // Adjust as needed
  let currentPage = 1;

 // Reactive statements to ensure proper updates
$: startIndex = (currentPage - 1) * carsPerPage;
$: endIndex = Math.min(startIndex + carsPerPage, cars.length);
$: displayedCars = cars.slice(startIndex, endIndex);
$: totalPages = Math.ceil(cars.length / carsPerPage);

  function handlePageChange(event) {
    console.log("Received page change:", event.detail.pageNumber);  // Confirm event reception
    currentPage = event.detail.pageNumber;
}

let carId = '';
    let empId = '';
    let carMake = '';
    let carModel = '';
    let type = '';
  
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
  
    async function addCar() {
  // Perform validation if needed
  // For simplicity, I'm assuming all fields are required
  if (carId && empId && carMake && carModel && type) {
    try {
      // Check if the device name is already present in the devices array
      const isDuplicate = cars.some(car => car.carId === carId);
      
      if (isDuplicate) {
        alert('Car ID must be unique.');
        return;
      }
  
      // Assuming you have an API endpoint to add a device
      const response = await fetch('/api/addCar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ carId, empId, carMake, carModel, type })
      });
  
      if (response.ok) {
        // Device added successfully, navigate to the appropriate page
        navigate('/admin/managecars');
      } else {
        // Handle error response from the server
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
      alert('An error occurred while adding the car. Please try again.');
    }
  } else {
    alert('Please fill in all fields.');
  }
  }

  function closeModal() {
    showModal = false;
    carId = '';
    empId = '';
    carMake = '';
    carModel = '';
    type = '';
  }
  </script>
  
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
      <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}"
      >
      Car Information
      </h3>
      <br/>
    </div>
    <div class="access-control">
      <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={openModal}>Add Car</button>
      {#if showModal}
      <div class="modal">
        <div class="modal-content">
        <div class="rounded-t mb-0 px-4 py-10 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-blueGray-700">
                Add Car
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
                    Car ID
                  </label>
                  <input type="text" id="carId" placeholder="Car ID" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={carId}>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                    Emp ID
                  </label>
                  <input type="text" id="empId" placeholder="Employee ID" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={empId}>
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
                    Car Model
                  </label>
                  <input type="text" id="carModel" placeholder="Car Model" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={carModel}>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                    Type
                  </label>
                  <input type="text" id="type" placeholder="Type" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={type}>
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={addCar}>
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
            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Car ID</th>
            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Emp ID</th>
            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Car Make</th>
            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Car Model</th>
            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Type</th>
          </tr>
        </thead>
        <tbody>
          {#each displayedCars as car (car.id)}
          <tr>
            <td class="table-data font-bold text-blueGray-600" title={car.carId}>
              <!-- Name -->
              <div class="flex items-center">
                {#if editingModes[car.id]}
                  <input type="text" bind:value={car.carId}>
                {:else}
                  <span>{car.carId}</span>
                {/if}
              </div>
            </td>
            <td class="table-data" title={car.empId}>
              <!-- Designatiom -->
              <div class="flex items-center">
                {#if editingModes[car.id]}
                  <input type="text" bind:value={car.empId}>
                {:else}
                  <span>{car.empId}</span>
                {/if}
              </div>
            </td>
            <td class="table-data" title={car.carMake}>
              <!-- Department -->
              <div class="flex items-center">
                {#if editingModes[car.id]}
                  <input type="text" bind:value={car.carMake}>
                {:else}
                  <span>{car.carMake}</span>
                {/if}
              </div>
            </td>
            <td class="table-data" title={car.carModel}>
              <!-- Percentage -->
              <div class="flex items-center">
                {#if editingModes[car.id]}
                  <input type="number" class="w-16" bind:value={car.carModel}>
                {:else}
                  <span>{car.carModel}</span>
                {/if}
              </div>
            </td>
            <td class="table-data" title={car.type}>
              <!-- Active From -->
              <div class="flex items-center">
                {#if editingModes[car.id]}
                  <input type="text" bind:value={car.type}>
                {:else}
                  <span>{car.type}</span>
                {/if}
              </div>
            </td>
            <td>
              <!-- Edit button -->
              <div class="flex items-center">
                {#if editingModes[car.id]}
                  <!-- Save button -->
                  <img src={edit2} alt="Save" class="icon-button cursor-pointer" on:click={() => {saveSalaryChanges(car); toggleEditingMode(car.id);}}>
                {:else}
                  <!-- Edit button -->
                  <img src={edit1} alt="Edit" class="icon-button cursor-pointer" on:click={() => editSalary(car)} />
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