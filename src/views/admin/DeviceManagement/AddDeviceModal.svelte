<!-- <script>
    export let isOpen = false;
  
    const closeModal = () => {
      isOpen = false;
    };
  
    const submitForm = (event) => {
      event.preventDefault();
      // Handle form submission logic here (e.g., add device to devices array)
      closeModal();
    };
  </script>
  
  <div class="modal fade fixed inset-0 z-50 overflow-y-auto" {isOpen ? 'class=""' : 'class="hidden"'} aria-labelledby="addDeviceModal" aria-hidden="true">
      <div class="modal-dialog rounded-lg shadow-lg bg-white">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-lg font-medium leading-normal" id="addDeviceModal">
              Add Device
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" on:click={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form on:submit={submitForm}>
              <div class="mb-3">
                <label for="deviceName" class="form-label">Device Name</label>
                <input type="text" class="form-control" id="deviceName" placeholder="Enter Device Name" required />
              </div>
              <div class="mb-3">
                <label for="deviceId" class="form-label">Device ID</label>
                <input type="number" class="form-control" id="deviceId" placeholder="Enter Device ID" required />
              </div>
              <div class="mb-3">
                <label for="deviceIp" class="form-label">Device IP</label>
                <input type="text" class="form-control" id="deviceIp" placeholder="Enter Device IP" required />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" on:click={closeModal}>Close</button>
            <button type="submit" class="btn btn-primary" form="addDeviceForm">Save Device</button>
          </div>
        </div>
      </div>
    </div>
  </div> -->