<script>
    import { read } from '@popperjs/core';
import { navigate } from 'svelte-routing';
export let color = "light"
    
      let request = {
          id: '',
          name: '',
          email: '',
          department: '',
          designation: '',
          dateFrom: '',
          dateTo: '',
          reason: '',
          timeStamp: '',
      };
      
    
      function handleSubmit() {
          // Handle form submission logic here
          console.log(request);
      }

      function goBack() {
          // Handle navigation logic here
          navigate('/admin/leaverequest');
          console.log("Navigate to Leave Request screen");
      }
    
    
    </script>
    
    <div class="relative min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}"
            >
            Leave Requests
            </h3>
        </div>
        <br>

        <!-- Filters Row 2 -->
        <div class="flex mb-4  ml-4 mr-4">

            <div class="relative mb-3">
            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="filterExperience">Department:</label>
            <select id="filterExperience" name="filterExperience" class="filter-input3" onchange="{() => applyFilters()}">
                <option value="">All</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
            </select>
            </div>
        
            <div  class="relative mb-3 ml-10">
            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="filterActive">Designation:</label>
            <select id="filterActive" name="filterActive" class="filter-input3" onchange="{() => applyFilters()}">
                <option value="">All</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            </div>
        </div>
    
            <!-- Filters Row 1 -->
            <div class="flex justify-between mb-4  ml-4 mr-4">

                <div class="relative mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="filterEmployeeID">
                    Employee ID:
                </label>
                <input type="text" id="filterEmployeeID" name="filterEmployeeID" class="filter-input3" placeholder="Employee ID" onchange="{() => applyFilters()}">
                </div>

                <div class="relative mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="filterName">Name:</label>
                <input type="text" id="filterName" name="filterName" class="filter-input3" placeholder="Name" bind:value="{request.name}">
                </div>

                <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="filterPosition">Email:</label>
                    <input type="text" id="filterPosition" name="filterPosition" class="filter-input3" placeholder="Email" bind:value="{request.email}">
                </div>

            </div>
            
            <!-- Filters Row 3 -->
            <div class="flex justify-between mb-4  ml-4 mr-4">
                <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                        From:
                    </label>
                    <input type="datetime-local" id="dateFrom" placeholder="Date & Time From" class="filter-input3" bind:value={request.dateFrom}>
                </div>

                <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
                        To:
                    </label>
                    <input type="datetime-local" id="dateTo" placeholder="Date & Time To" class="filter-input3" bind:value={request.dateTo}>
                </div>
                <div>

                <div class="relative mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="reason">
                        Reason:
                    </label>
                    <textarea id="reason" name="reason" class="filter-input3 resize-none" placeholder="Reason:" bind:value="{request.reason}"></textarea>
                </div>
            </div>

            </div>
    </div>
    
    <div class="flex justify-end mb-4">
      <button class=" bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={handleSubmit}>
        Submit
      </button>
      <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={goBack}>
        Cancel
      </button>
    </div>