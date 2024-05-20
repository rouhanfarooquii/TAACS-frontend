<script>
    import { createPopper } from "@popperjs/core";
    import { onMount, onDestroy } from 'svelte';
    import { navigate } from 'svelte-routing';
  
    let shiftName = '';
    let startTime = '';
    let endTime = '';
    let dateFrom = '';
    let dateTo = '';
    let recurrence = '';
    let breaks = [];
    let location = '';
    let shiftType = '';
    let customShiftType = '';
    let notes = '';
    let errors = {};
  
    function handleShiftSelection(event) {
      shiftType = event.target.value;
    }
  
    function addBreak() {
      breaks = [...breaks, { start: '', end: '' }];
    }
  
    function removeBreak(index) {
      breaks = breaks.filter((_, i) => i !== index);
    }
  
    function validateFields() {
      errors = {};
      if (!shiftName) errors.shiftName = "Shift name is required.";
      if (!startTime) errors.startTime = "Start time is required.";
      if (!endTime) errors.endTime = "End time is required.";
      if (!dateFrom) errors.dateFrom = "Date from is required.";
      if (!dateTo) errors.dateTo = "Date to is required.";
      if (new Date(dateTo) < new Date(dateFrom)) errors.dateTo = "Date to cannot be before Date from.";
      if (!location) errors.location = "Location is required.";
      if (!shiftType) errors.shiftType = "Shift type is required.";
      if (shiftType === 'custom' && !customShiftType) errors.customShiftType = "Custom shift type is required.";
      return Object.keys(errors).length === 0;
    }
  
    function saveShift() {
      if (validateFields()) {
        const shiftData = {
          shiftName,
          startTime,
          endTime,
          dateFrom,
          dateTo,
          recurrence,
          breaks,
          location,
          shiftType,
          customShiftType,
          notes
        };
        console.log("Shift data:", shiftData);
        // Here you would typically send this data to a backend server
      }
    }
  
    function navigateToShift() {
      navigate('/admin/shifttiming');
    }
  </script>
  
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg bg-white">
    <div class="rounded-t mb-0 px-4 py-10 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg text-blueGray-700">
            Shift Creation
          </h3>
        </div>
        <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={navigateToShift}>
          Back
        </button>
        <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" on:click={saveShift}>
          Save Shift
        </button>
      </div>
      <div class="block w-full overflow-x-auto px-4 py-5 flex-auto">
        <div class="flex flex-wrap mb-4">
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="shiftName">
                Shift Name/Title
              </label>
              <input type="text" id="shiftName" placeholder="Shift Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={shiftName}>
              {#if errors.shiftName}
                <div class="text-red-500 text-xs mt-1">{errors.shiftName}</div>
              {/if}
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="recurrence">
                Recurrence
              </label>
              <select id="recurrence" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={recurrence}>
                <option value="">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>
    
        <div class="flex flex-wrap mb-4">
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="startTime">
                Start Time
              </label>
              <input type="time" id="startTime" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={startTime}>
              {#if errors.startTime}
                <div class="text-red-500 text-xs mt-1">{errors.startTime}</div>
              {/if}
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="endTime">
                End Time
              </label>
              <input type="time" id="endTime" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={endTime}>
              {#if errors.endTime}
                <div class="text-red-500 text-xs mt-1">{errors.endTime}</div>
              {/if}
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="dateFrom">
                Date From
              </label>
              <input type="date" id="dateFrom" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={dateFrom}>
              {#if errors.dateFrom}
                <div class="text-red-500 text-xs mt-1">{errors.dateFrom}</div>
              {/if}
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="dateTo">
                Date To
              </label>
              <input type="date" id="dateTo" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={dateTo}>
              {#if errors.dateTo}
                <div class="text-red-500 text-xs mt-1">{errors.dateTo}</div>
              {/if}
            </div>
          </div>
        </div>
    
        <div class="flex flex-wrap mb-4">
          <div class="w-full px-4">
            <div class="relative mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="breaks">
                Breaks
              </label>
              <button type="button" class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" on:click={addBreak}>Add Break</button>
              {#each breaks as breakTime, index}
                <div class="flex items-center mb-2 w-full">
                  <div class="w-full lg:w-4/12 px-4">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="breaks">
                      Start Time:
                    </label>
                    <input type="time" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Start Time" bind:value={breakTime.start}>
                  </div>
                  <div class="w-full lg:w-4/12 px-4">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="breaks">
                      End Time:
                    </label>
                    <input type="time" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="End Time" bind:value={breakTime.end}>
                  </div>
                  <button type="button" class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={() => removeBreak(index)}>Remove</button>
                </div>
              {/each}
            </div>
          </div>
        </div>

      <br>
    
        <div class="flex flex-wrap mb-4">
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="location">
                Location
              </label>
              <input type="text" id="location" placeholder="Location" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={location}>
              {#if errors.location}
                <div class="text-red-500 text-xs mt-1">{errors.location}</div>
              {/if}
            </div>
          </div>
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="shiftType">
                Shift Type
              </label>
              <select id="shiftType" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={shiftType} on:change={handleShiftSelection}>
                <option value="">Select Shift Type</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="night">Night</option>
                <option value="custom">Custom</option>
              </select>
              {#if errors.shiftType}
                <div class="text-red-500 text-xs mt-1">{errors.shiftType}</div>
              {/if}
              {#if shiftType === 'custom'}
                <div class="relative mb-3 mt-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="customShiftType">
                    Custom Shift Type
                  </label>
                  <input type="text" id="customShiftType" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={customShiftType}>
                  {#if errors.customShiftType}
                    <div class="text-red-500 text-xs mt-1">{errors.customShiftType}</div>
                  {/if}
                </div>
              {/if}
            </div>
          </div>
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="notes">
                Notes/Description
              </label>
              <textarea id="notes" name="notes" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Notes" bind:value={notes}></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  