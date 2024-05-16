<script>
import { read } from '@popperjs/core';
import { navigate } from 'svelte-routing';
    import { bind } from 'svelte/internal';
export let color = "light"
let currentTime = new Date();

    
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

let departmentDesignations = {
    "Marketing": ["Marketing Manager", "Marketing Coordinator", "Brand Manager", "Digital Marketing Specialist"],
    "Finance": ["Chief Financial Officer (CFO)", "Financial Analyst", "Accountant", "Finance Manager"],
    "Human Resources": ["Human Resources Manager", "Recruitment Specialist", "Training Coordinator", "HR Assistant"],
    "Information Technology": ["Chief Information Officer (CIO)", "IT Manager", "Systems Administrator", "Software Developer"],
    "Sales": ["Sales Manager", "Sales Representative", "Account Executive", "Business Development Manager"],
    "Operations": ["Operations Manager", "Operations Coordinator", "Supply Chain Manager", "Logistics Specialist"],
    "Customer Service": ["Customer Service Manager", "Customer Support Representative", "Client Relations Specialist"],
    "Legal": ["General Counsel", "Legal Assistant", "Paralegal", "Legal Counsel"],
    "Administration": ["Office Manager", "Executive Assistant", "Administrative Assistant", "Office Coordinator"]
};

      
function handleSubmit() {
request.timeStamp = currentTime;
console.log(request);
}

function goBack() {
// Handle navigation logic here
navigate('/admin/leaverequest');
console.log("Navigate to Leave Request screen");
}

$: fromDate = new Date(request.dateFrom);
$: toDate = new Date(request.dateTo);
$: isDateValid = fromDate < toDate;
    
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
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="department">Department:</label>
                <select id="department" name="department" class="filter-input1" bind:value="{request.department}">
                    <option value="">Select Department</option>
                    {#each Object.keys(departmentDesignations) as department}
                        <option value={department}>{department}</option>
                    {/each}
                </select>
            </div>

            <div class="relative mb-3 ml-6">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="designation">Designation:</label>
                <select id="designation" name="designation" class="filter-input1" bind:value="{request.designation}">
                    <option value="">Select Designation</option>
                    {#if request.department && departmentDesignations[request.department]}
                        {#each departmentDesignations[request.department] as designation}
                            <option value={designation}>{designation}</option>
                        {/each}
                    {:else}
                        <option value="" disabled>No Designations</option>
                    {/if}
                </select>
            </div>
        </div>
    
            <!-- Filters Row 1 -->
            <div class="flex justify-between mb-4  ml-4 mr-4">

                <div class="relative mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="filterEmployeeID">
                    Employee ID:
                </label>
                <input type="text" id="filterEmployeeID" name="filterEmployeeID" class="filter-input3" placeholder="Employee ID" bind:value={request.id}>
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