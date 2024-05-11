<!-- <script>
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
  
  let showModal = true;
  
    function closeModal() {
      showModal = false;
    }
  </script>
  
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
    </div> -->