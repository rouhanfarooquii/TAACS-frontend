<!-- <script>
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
  
  function cancel() {
    // Hide or remove the modal from the DOM
    const modal = document.querySelector('.modal');
    modal.classList.toggle('hidden'); // Or remove the modal from the DOM: modal.remove();
  }
  </script>
  
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
          <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
    </div> -->