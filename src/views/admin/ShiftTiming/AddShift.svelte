<script>
    let shiftCode = '';
    let shiftDescription = '';
    let remarks = '';
    let selectedShiftType = null;
    let allowArrivalTime = '';
    let arrivalFinishTime = '';
    let startTime = '';
    let endTime = '';
    let lateTime = '';
    let totalWorkingHours = '';
    let earlyGoingMinHrs = '';
    let minHours = '';
    let earlyOverTime = '';
    let generalOverTime = '';
    let timeBaseShift = '';
    let hourBaseShift = '';
    let startTime1 = '';
    let maxHour = '';
    let endTime1 = '';
    let minHours1 = '';
    let startTime2 = '';
    let endTime2 = '';
    let deductable = '';
    let totalBreakTime = '';
    let maxShiftHours = '';
    let maxShiftOutTime = '';
    let maxOverTimeHours = '';
    let textileMaxOutTime = '';

    export let color = "light";

    function handleShiftSelection(event) {
        const selectedShift = event.target.value;
        
        if (selectedShift === selectedShiftType) {
            // If the same shift is clicked again, deselect it
            selectedShiftType = null;
        } else {
            // If a different shift is clicked, select it and deselect the previous one
            selectedShiftType = selectedShift;
        }
    }

    function saveShift() {
        const shiftData = {
            shiftCode,
            shiftDescription,
            remarks,
            selectedShiftType,
            allowArrivalTime,
            arrivalFinishTime,
            startTime,
            endTime,
            lateTime,
            totalWorkingHours,
            earlyGoingMinHrs,
            minHours,
            earlyOverTime,
            generalOverTime,
            timeBaseShift,
            hourBaseShift,
            startTime1,
            maxHour,
            endTime1,
            minHours1,
            startTime2,
            endTime2,
            deductable,
            totalBreakTime,
            maxShiftHours,
            maxShiftOutTime,
            maxOverTimeHours,
            textileMaxOutTime
        };
        console.log("Shift data:", shiftData);
        // Here you would typically send this data to a backend server
    }

    
    
</script>

<div class="relative min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10"> 
    <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
            General Information
          </h3>
        </div>
        <button
          class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:submit|preventDefault={saveShift}
          type="button"
        >
          Save Shift
        </button>
      </div>
    <div class="flex mb-4 mt-4">
    <!-- Shift Code -->
    <div>
        <label for="filtershiftCode">Shift Code:</label>
        <br/>
        <input type="text" id="filtershiftCode" name="filtershiftCode" class="filter-input" placeholder="Shift Code" bind:value={shiftCode} required>
    </div>
    <!-- Shift Description -->
    <div class="ml-6">
        <label for="filtershiftDescription">Shift Description:</label>
        <br/>
        <input type="text" id="filtershiftDescription" name="filtershiftDescription" class="filter-input" placeholder="Shift Description" bind:value={shiftDescription} required>
    </div>
    <!-- Remarks -->
    <div class="ml-6">
            <label for="filterremarks">Remarks:</label>
            <br/>
            <input type="text" id="filterremarks" name="filterremarks" class="filter-input" placeholder="Remarks" bind:value={remarks}>
    </div>   
    <div class="flex flex-wrap">
        <!-- Morning Shift and Night Shift -->
        <div class="ml-4 switch-label">
            <div class="switch">
                <input type="checkbox" id="morning" value="Morning Shift" on:change={handleShiftSelection} checked={selectedShiftType === "Morning Shift"}>
                <label class="slider" for="morning"></label>
            </div>
            <label for="morning" class="mt-2 text-sm">Morning Shift</label>
        </div>
        <div class="ml-4 switch-label">
            <div class="switch">
                <input type="checkbox" id="night" value="Night Shift" on:change={handleShiftSelection} checked={selectedShiftType === "Night Shift"}>
                <label class="slider" for="night"></label>
            </div>
            <label for="night" class="mt-2 text-sm">Night Shift</label>
        </div>
        <!-- Evening Shift and Half Day Shift -->
        <div class="ml-4 switch-label">
            <div class="switch">
                <input type="checkbox" id="evening" value="Evening Shift" on:change={handleShiftSelection} checked={selectedShiftType === "Evening Shift"}>
                <label class="slider" for="evening"></label>
            </div>
            <label for="evening" class="mt-2 text-sm">Half Day Shift</label>
        </div>
        <div class="ml-4 switch-label">
            <div class="switch">
                <input type="checkbox" id="halfDay" value="Half Day Shift" on:change={handleShiftSelection} checked={selectedShiftType === "Half Day Shift"}>
                <label class="slider" for="halfDay"></label>
            </div>
            <label for="halfDay" class="mt-2 text-sm">Evening Shift</label>
        </div>
    </div>
</div> 
</div>

<div class="flex justify-between">
    <div class="relative min-w-0 break-words bg-white mb-6 shadow-xl rounded-lg px-7 py-10">
        <!-- Content for the first column -->
        <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
                Date Time Parameters
              </h3>
            </div>
        </div>
        <div class="flex mb-4 mt-4">
            <div>
                <label for="filterallowArrivalTime">Allow Arrival Time:</label>
                <br/>
                <input type="time" id="filterallowArrivalTime" name="filterallowArrivalTime" class="filter-input" placeholder="Allow Arrival Time" bind:value={allowArrivalTime}>
            </div>
            <div class="ml-6">
                <label for="filterarrivalFinishTime">Arrival Finish Time:</label>
                <br/>
                <input type="time" id="filterarrivalFinishTime" name="filterarrivalFinishTime" class="filter-input" placeholder="Arrival Finish Time" bind:value={arrivalFinishTime}>
            </div>
        </div>
        <div class="flex mb-4 mt-4">
            <div>
                <label for="filterstartTime">Start Time:</label>
                <br/>
                <input type="time" id="filterstartTime" name="filterstartTime" class="filter-input" placeholder="Start Time" bind:value={startTime}>
            </div>
            <div class="ml-6">
                <label for="filterendTime">End Time:</label>
                <br/>
                <input type="time" id="filterendTime" name="filterendTime" class="filter-input" placeholder="End Time" bind:value={endTime}>
            </div>
        </div>
        <div class="flex mb-4 mt-4">
            <div>
                <label for="filterlateTime">Late Time:</label>
                <br/>
                <input type="time" id="filterlateTime" name="filterlateTime" class="filter-input" placeholder="Late Time" bind:value={lateTime}>
            </div>
            <div class="ml-6">
                <label for="filtertotalWorkingHours">Total Working Hours:</label>
                <br/>
                <input type="time" id="filtertotalWorkingHours" name="filtertotalWorkingHours" class="filter-input" placeholder="Total Working Hours" bind:value={totalWorkingHours}>
            </div>
        </div>
        <div class="flex">
            <div class="mt-8 ml-4">
                <input type="checkbox" id="filterearlyGoingMinHrs" name="filterearlyGoingMinHrs" placeholder="Early Going Min/Hrs" bind:value={earlyGoingMinHrs}>
                <label for="filterearlyGoingMinHrs">Early Going Min/Hrs</label>
            </div>
            <div class="ml-10">
                <label for="filterminHours">Min Hours:</label>
                <br/>
                <input type="time" id="filterminHours" name="filterminHours" class="filter-input" placeholder="Min Hours" bind:value={minHours}>
            </div>
        </div>
    </div>
    <div class="relative min-w-0 break-words bg-white mb-10 shadow-xl rounded-lg px-7 py-10">
        <!-- Content for the second column -->
        <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
                Advance Option Parameters
              </h3>
            </div>
        </div>
        <div class="flex mb-4 mt-4">
            <div>
                <label for="filtermaxShiftHours">Max Shift Hours:</label>
                <br/>
                <input type="time" id="filtermaxShiftHours" name="filtermaxShiftHours" class="filter-input" placeholder="Max Shift Hours" bind:value={maxShiftHours}>
            </div>
            <div class="ml-6">
                <label for="filtermaxShiftOutTime">Max Shift Out Time:</label>
                <br/>
                <input type="time" id="filtermaxShiftOutTime" name="filtermaxShiftOutTime" class="filter-input" placeholder="Max Shift Out Time" bind:value={maxShiftOutTime}>
            </div>
        </div>
        <div class="flex">
            <div>
                <label for="filtermaxOverTimeHours">Max Over Time Hours:</label>
                <br/>
                <input type="time" id="filtermaxOverTimeHours" name="filtermaxOverTimeHours" class="filter-input" placeholder="Max Over Time Hours" bind:value={maxOverTimeHours}>
            </div>
            <div class="ml-6">
                <label for="filtertextileMaxOutTime">Textile Max Out Time:</label>
                <br/>
                <input type="time" id="filtertextileMaxOutTime" name="filtertextileMaxOutTime" class="filter-input" placeholder="Textile Max Out Time" bind:value={textileMaxOutTime}>
            </div>
        </div>
    </div>
</div>

<!-- Container below the first column -->
<div class="flex justify-between">
    <div class="relative min-w-0 break-words bg-white mb-10 shadow-xl rounded-lg px-7 py-10">
        <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
                Half Day Parameters
              </h3>
            </div>
        </div>
        <div class="flex mb-4 mt-4">
            <div class="ml-6">
                <input type="checkbox" id="filtertimeBaseShift" name="filtertimeBaseShift" placeholder="Time Base Shift" bind:value={timeBaseShift}>
                <label for="filtertimeBaseShift">Time Base Shift</label>
            </div>
            <div class="ml-11">
                <input type="checkbox" id="filterhourBaseShift" name="filtermaxhourBaseShift" placeholder="Hour Base Shift" bind:value={hourBaseShift}>
                <label for="filterhourBaseShift">Hour Base Shift</label>
            </div>
        </div>
        <div class="flex mb-4 mt-4">
            <div>
                <label for="filterstartTime1">Start Time:</label>
                <br/>
                <input type="time" id="filterstartTime1" name="filterstartTime1" class="filter-input" placeholder="Start Time" bind:value={startTime1}>
            </div>
            <div class="ml-6">
                <label for="filtermaxHour">Max Hour:</label>
                <br/>
                <input type="time" id="filtermaxHour" name="filtermaxHour" class="filter-input" placeholder="Max Hour" bind:value={maxHour}>
            </div>
        </div>
        <div class="flex">
            <div>
                <label for="filterendTime1">End Time:</label>
                <br/>
                <input type="time" id="filterendTime1" name="filterendTime1" class="filter-input" placeholder="End Time" bind:value={endTime1}>
            </div>
            <div class="ml-6">
                <label for="filterminHours1">Min Hours:</label>
                <br/>
                <input type="time" id="filterminHours1" name="filterminHours1" class="filter-input" placeholder="Min Hours" bind:value={minHours1}>
            </div>
        </div>
    </div>
    <div class="relative min-w-0 break-words bg-white mb-11 shadow-xl rounded-lg px-7 py-10">
        <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
                Break Parameters
              </h3>
            </div>
        </div>
        <div class="flex mb-4 mt-4">
            <div>
                <label for="filterstartTime2">Start Time:</label>
                <br/>
                <input type="time" id="filterstartTime2" name="filterstartTime2" class="filter-input" placeholder="Start Time" bind:value={startTime2}>
            </div>
            <div class="ml-6">
                <label for="filterendTime2">End Time:</label>
                <br/>
                <input type="time" id="filterendTime2" name="filterendTime2" class="filter-input" placeholder="End Time" bind:value={endTime2}>
            </div>
        </div>
        <div class="flex">
            <div class="mt-8 ml-5">
                <input type="checkbox" id="filterdeductable" name="filterdeductable" placeholder="Deductable" bind:value={deductable}>
                <label for="filterdeductable">Deductable</label>
            </div>
            <div class="ml-111">
                <label for="filtertotalBreakTime">Total Break Time:</label>
                <br/>
                <input type="time" id="filtertotalBreakTime" name="filtertotalBreakTime" class="filter-input" placeholder="Total Break Time" bind:value={totalBreakTime}>
            </div>
        </div>
    </div>
</div>

<div class="flex">
    <div class="relative min-w-0 break-words bg-white mb-6 shadow-xl rounded-lg px-7 py-10">
        <!-- Content for the second column -->
        <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
                Over Time Parameters
              </h3>
            </div>
        </div>
        <div class="flex mb-4 mt-4">
            <div>
                <label for="filterearlyOverTime">Early Over Time:</label>
                <br/>
                <input type="time" id="filterearlyOverTime" name="filterearlyOverTime" class="filter-input" placeholder="Early Over Time" bind:value={earlyOverTime}>
            </div>
            <div class="ml-6">
                <label for="filtergeneralOverTime">General Over Time:</label>
                <br/>
                <input type="time" id="filtergeneralOverTime" name="filtergeneralOverTime" class="filter-input" placeholder="General Over Time" bind:value={generalOverTime}>
            </div>
        </div>
        </div>
</div>


