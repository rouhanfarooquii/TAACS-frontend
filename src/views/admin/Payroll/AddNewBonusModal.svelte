<!-- <script>
  // Define variables and functions needed for batch update
  let bonusName = '';
  let activationDate = '';
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
            Add New Bonus
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
                Department:
              </label>
              <select class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedDepartment}>
                {#each departments as department}
                  <option value={department}>{department}</option>
                {/each}
              </select>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                Designation:
              </label>
              <select class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedDesignation}>
                {#each designations as designation}
                  <option value={designation}>{designation}</option>
                {/each}
              </select>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                Value Type:
              </label>
              <select class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedValueType}>
                {#each valueTypes as type}
                  <option value={type}>{type}</option>
                {/each}
              </select>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                Enter Value/Percentage:
              </label>
              <input type="text" id="Enter Value/Percentage" placeholder="Enter Value/Percentage" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={value}>
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={update}>Update</button>
          <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>      
  </div>
</div> -->
