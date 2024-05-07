<!-- <script>
    let deviceName = '';
    let deviceId = '';
    let deviceIp = '';
    let deviceStatus = 'Active'; 

    
  
    async function addDevice() {
      // Perform validation if needed
      // For simplicity, I'm assuming all fields are required
      if (deviceName && deviceId && deviceIp) {
        try {
          // Check if the device name is already present in the devices array
          const isDuplicate = devices.some(device => device.name === deviceName);
          
          if (isDuplicate) {
            alert('Device Name must be unique.');
            return;
          }
  
          // Assuming you have an API endpoint to add a device
          const response = await fetch('/api/addDevice', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ deviceName, deviceId, deviceIp, deviceStatus })
          });
  
          if (response.ok) {
            // Device added successfully, navigate to the appropriate page
            navigate('/admin/devicemanagement');
          } else {
            // Handle error response from the server
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
          }
        } catch (error) {
          // Handle network errors or other exceptions
          console.error('Error:', error);
          alert('An error occurred while adding the device. Please try again.');
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
              Add Device
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
                  Device Name
                </label>
                <input type="text" id="device-name" placeholder="Device Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={deviceName}>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                  Device ID
                </label>
                <input type="text" id="device-id" placeholder="Device ID" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={deviceId}>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                  Device IP
                </label>
                <input type="text" id="device-ip" placeholder="Device IP" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={deviceIp}>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                  Status
                </label>
                <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="form-checkbox h-5 w-5 text-blueGray-600" bind:checked={deviceStatus} value="Active">
                  <span class="ml-2 text-sm font-semibold text-blueGray-600">Active</span>
                </label>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={addDevice}>
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