<script>
import { navigate } from 'svelte-routing';

  let employee = {
      id: '',
      name: '',
      phoneNumber: '',
      location: '',
      department: '',
      designation: '',
      employeeType: '',
      gender: '',
      email: '',
      address: '', 
      dateOfBirth: '',
      cardIdNumber: '',
      personalPassword: '',
      fingerIndex1: '',
      fingerIndex2: '',
      isFingerAdded: '',
      salary: ''
  };

  const image = "../assets/img/10.jpg";

  function handleSubmit() {
      // Handle form submission logic here
      console.log(employee);
  }

  
  function handleFileInputChange(event) {
    console.log("File input changed!"); // Check if this message appears in the console
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageSrc = e.target.result;
        document.getElementById('profile-image').src = newImageSrc;
      };
      reader.readAsDataURL(file);
    }
  }

  // Add event listener to file input element when the document is loaded
  document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById('profile-pic');
    fileInput.addEventListener('change', handleFileInputChange);
  });

  let listType = 'Permanent_List';
  let showValidDateTimeFields = false;
  let showValidDateAndTimeFields = false;
  let showEffectTimesField = false;

  function handleListTypeChange() {
    switch (listType) {
      case 'Temporary_List':
        showValidDateTimeFields = true;
        showValidDateAndTimeFields = false;
        showEffectTimesField = false;
        break;
      case 'Temporary_List2':
        showValidDateTimeFields = false;
        showValidDateAndTimeFields = true;
        showEffectTimesField = false;
        break;
      case 'Temporary_List3':
        showValidDateTimeFields = false;
        showValidDateAndTimeFields = false;
        showEffectTimesField = true;
        break;
      default:
        showValidDateTimeFields = false;
        showValidDateAndTimeFields = false;
        showEffectTimesField = false;
    }
  }

  // Invoke handleListTypeChange initially in case the default is not 'Permanent_List'
  handleListTypeChange();

  function navigateToEmployee() {
      // Handle navigation logic here
      navigate('/admin/employee');
      console.log("Navigate to add employee screen");
  }
  


</script>

<div class="relative min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">

  <div class="flex justify-start">
    <button class="bg-blueGray-800 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={navigateToEmployee}>
      Back
    </button>
  </div>

    <div class="left-section flex flex-col items-center"> <!-- Adjust this value according to your needs -->
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img id="profile-image" src="{image}" alt="Default Image" style="max-width: 200px; max-height: 200px;" />
      <input type="file" accept="image/*" id="profile-pic" style="display: none" />
      <label for="profile-pic" class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 mt-4 mb-8 cursor-pointer">Upload</label>
    </div>

    <div class="divider"></div>

   <!-- Filters Row 1 -->
  <div class="flex justify-between mb-4">
    <!-- Filter by EmployeeID -->
    <div>
      <label for="filterEmployeeID">Employee ID:</label>
      <br>
      <input type="text" id="filterEmployeeID" name="filterEmployeeID" class="filter-input" placeholder="Employee ID" onchange="{() => applyFilters()}">
    </div>
    <!-- Filter by Name -->
    <div>
      <label for="filterName">Name:</label>
      <br>
      <input type="text" id="filterName" name="filterName" class="filter-input" placeholder="Name" onchange="{() => applyFilters()}">
    </div>
   <!-- Filter by Department -->
   <div>
    <label for="filterDepartment">Mobile Number:</label>
    <br>
    <input type="text" id="filterDepartment" name="filterDepartment" class="filter-input" placeholder="Mobile Number" onchange="{() => applyFilters()}">
  </div>
  </div>

  <!-- Filters Row 2 -->
  <div class="flex justify-between mb-4">
    <!-- Filter by Experience -->
    <div>
      <label for="filterExperience">Department:</label>
      <br>
      <select id="filterExperience" name="filterExperience" class="filter-input" onchange="{() => applyFilters()}">
        <option value="">All</option>
        <option value="0-1">0-1 years</option>
        <option value="1-3">1-3 years</option>
        <option value="3-5">3-5 years</option>
        <option value="5+">5+ years</option>
      </select>
    </div>

    <div>
      <label for="filterActive">Designation:</label>
      <br>
      <select id="filterActive" name="filterActive" class="filter-input" onchange="{() => applyFilters()}">
        <option value="">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>

    <div>
      <label for="filterPosition">Email:</label>
      <br>
      <input type="text" id="filterPosition" name="filterPosition" class="filter-input" placeholder="Email" onchange="{() => applyFilters()}">
    </div>
  </div>

  <!-- Filters Row 3 -->
  <div class="flex justify-between mb-4">

    <div>
      <label for="filterActive">Gender:</label>
      <br>
      <select id="filterActive" name="filterActive" class="filter-input" onchange="{() => applyFilters()}">
        <option value="">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>

    <div>
      <label for="dateOfBirth">Date of Birth:</label>
      <br>
      <input type="date" id="dateOfBirth" name="dateOfBirth" class="filter-input" placeholder="Date of Birth" bind:value="{employee.dateOfBirth}">
    </div>

    <div>
      <label for="cardIdNumber">Card ID Number:</label>
      <br>
      <input type="text" id="cardIdNumber" name="cardIdNumber" class="filter-input" placeholder="Card ID Number" bind:value="{employee.cardIdNumber}">
    </div>
  </div>
    
  <!-- Filters Row 4 -->
  <div class="flex justify-between mb-4">
    <div class="w-9/12">
      <label for="address">Address:</label>
      <br>
      <textarea id="address" name="address" class="w-full resize-none" placeholder="Address" bind:value="{employee.address}"></textarea>
    </div>

    <div>
      <label for="personalPassword">Personal Password:</label>
      <br>
      <input type="password" id="personalPassword" name="personalPassword" class="filter-input" placeholder="Personal Password" bind:value="{employee.personalPassword}">
    </div>

  </div>

  <!-- Filters Row 5 -->
<div class="flex justify-between mb-4">
  
</div>

<!-- Filters Row 6 -->
<div class="flex justify-between mb-4">
  <div>
    <label for="fingerIndex1">Finger Index 1:</label>
    <br>
    <input type="text" id="fingerIndex1" name="fingerIndex1" class="filter-input1" placeholder="Finger Index 1" bind:value="{employee.fingerIndex1}">
  </div>
  <!-- Filter by Card ID Number -->
  <div class="w-1/3 px-3">
    <label for="fingerIndex2">Finger Index 2:</label>
    <br>
    <input type="text" id="fingerIndex2" name="fingerIndex2" class="filter-input1" placeholder="Finger Index 2" bind:value="{employee.fingerIndex2}">
  </div>
  <div class="w-1/3 pr-15 pt-6">
    <input type="checkbox" id="isFingerAdded" name="isFingerAdded" class="filter-checkbox">
    <label for="isFingerAdded">Is Finger Added</label>
  </div>
</div>

<!-- List Type Row -->
<div class="flex justify-start mb-4">
  <div>
    <label for="listType">List Type:</label>
    <br>
    <select id="listType" class="filter-input" bind:value="{listType}" on:change="{handleListTypeChange}">
      <option value="Permanent_List">Permanent_List</option>
      <option value="Temporary_List">Temporary_List</option>
      <option value="Temporary_List2">Temporary_List2</option>
      <option value="Temporary_List3">Temporary_List3</option>
    </select>
  </div>
    <div class = "ml-12">
      <label for="salary">Salary</label>
      <br>
      <input type="number" id="salary" name="salary" class="filter-input" placeholder="Salary" bind:value="{employee.salary}">
    </div>
</div>


{#if showValidDateTimeFields}
  <!-- Valid Begin and End DateTime Fields -->
  <div class="flex mb-4">
    <div>
      <label for="validBeginDateTime">Valid Begin Date:</label>
      <br>
      <input type="date" id="validBeginDateTime" name="validBeginDateTime" class="filter-input">
    </div>
    <div class = "ml-9">
      <label for="validEndDateTime">Valid End Date:</label>
      <br>
      <input type="date" id="validEndDateTime" name="validEndDateTime" class="filter-input">
    </div>
  </div>
{/if}

{#if showValidDateAndTimeFields}
  <!-- Valid Begin Date and Time Fields -->
  <div class="flex justify-between mb-4">
    <div>
      <label for="validBeginDate">Valid Begin Date:</label>
      <br>
      <input type="date" id="validBeginDate" name="validBeginDate" class="filter-input">
    </div>
    <div>
      <label for="validBeginTime">Valid Begin Time:</label>
      <br>
      <input type="time" id="validBeginTime" name="validBeginTime" class="filter-input">
    </div>
    <!-- Valid End Date and Time Fields -->
    <div>
      <label for="validEndDate">Valid End Date:</label>
      <br>
      <input type="date" id="validEndDate" name="validEndDate" class="filter-input">
    </div>
    <div>
      <label for="validEndTime">Valid End Time:</label>
      <br>
      <input type="time" id="validEndTime" name="validEndTime" class="filter-input">
    </div>
  </div>
{/if}

{#if showEffectTimesField}
  <!-- Effect Times Field -->
  <div class="flex justify-between mb-4">
    <div>
      <label for="effectTimes">Effect Times:</label>
      <br>
      <input type="text" id="effectTimes" name="effectTimes" class="filter-input">
    </div>
  </div>
{/if}

<div class="flex justify-end mb-4">
  <button class=" bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={handleSubmit}>
    Submit
  </button>
</div>

</div>