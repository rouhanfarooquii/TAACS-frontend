<script>
    // Define variables and functions needed for batch update
    let departments = ['Sales', 'Engineering', 'Marketing', 'HR', 'Finance'];
    let designations = ['Sales Manager', 'Software Engineer', 'Marketing Specialist', 'HR Manager', 'Financial Analyst'];
    let valueTypes = ['Percentage', 'Absolute', 'Change'];
    let selectedDepartment = '';
    let selectedDesignation = '';
    let selectedValueType = '';
    let value = '';
  
    function update() {
      // Logic to handle batch update
      console.log("Batch update performed");
      // You can add logic to perform batch update here
      // Reset fields after update
      selectedDepartment = '';
      selectedDesignation = '';
      selectedValueType = '';
      value = '';
      // Close the modal
      closeModal();
    }
  
    function closeModal() {
    // Emit a custom event to indicate that the modal should be closed
    console.log("Closing modal");
    const closeEvent = new CustomEvent('closeModal');
    dispatchEvent(closeEvent);
  }
  </script>
  
  <!-- Modal structure -->
  <div class="modal">
    <div class="modal-content">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span class="close" on:click={closeModal}>&times;</span>
      <h2>Batch Update</h2>
      <br/>
      <label>Department:</label>
      <select bind:value={selectedDepartment}>
        {#each departments as department}
          <option value={department}>{department}</option>
        {/each}
      </select>
      <label>Designation:</label>
      <select bind:value={selectedDesignation}>
        {#each designations as designation}
          <option value={designation}>{designation}</option>
        {/each}
      </select>
      <label>Value Type:</label>
      <select bind:value={selectedValueType}>
        {#each valueTypes as type}
          <option value={type}>{type}</option>
        {/each}
      </select>
      <label>Enter Value/Percentage:</label>
      <input type="text" bind:value={value}>
      <br/>
      <br/>
      <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={update}>Update</button>
    </div>
  </div>
  
  <style>
    /* Style for modal */
  </style>
  