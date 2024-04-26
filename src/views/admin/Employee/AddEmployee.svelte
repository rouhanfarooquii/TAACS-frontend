<!-- <script>
  // core components
  import CardSettings from "components/Cards/CardSettings.svelte";
  import CardProfile from "components/Cards/CardProfile.svelte";
  export let location;
</script> -->

<!-- <div class="flex flex-wrap">
  <div class="w-full lg:w-8/12 px-4">
    <CardSettings />
  </div>
  <div class="w-full lg:w-4/12 px-4">
    <CardProfile />
  </div>
</div> -->

<script>
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
      address: '' // Add the address field
  };

  const image = "../assets/img/10.jpg";

  function handleSubmit() {
      // Handle form submission logic here
      console.log(employee);
  }

  function navigateToAddEmployee() {
      // Handle navigation logic here
      console.log("Navigate to add employee screen");
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
</script>

<div class="relative min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
    <div class="left-section flex flex-col items-center"> <!-- Adjust this value according to your needs -->
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img id="profile-image" src="{image}" alt="Default Image" style="max-width: 200px; max-height: 200px;" />
      <input type="file" accept="image/*" id="profile-pic" style="display: none" />
      <label for="profile-pic" class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 mt-4 cursor-pointer">Upload</label>
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
    <!-- Filter by Position -->
    <div>
      <label for="filterPosition">Location:</label>
      <br>
      <input type="text" id="filterPosition" name="filterPosition" class="filter-input" placeholder="Location" onchange="{() => applyFilters()}">
    </div>
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
    <!-- Filter by Active -->
    <div>
      <label for="filterActive">Designation:</label>
      <br>
      <select id="filterActive" name="filterActive" class="filter-input" onchange="{() => applyFilters()}">
        <option value="">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
  </div>

    <!-- Filters Row 3 -->
    <div class="flex justify-between mb-4">
      <!-- Filter by Position -->
      <div>
        <label for="filterPosition">Email:</label>
        <br>
        <input type="text" id="filterPosition" name="filterPosition" class="filter-input" placeholder="Email" onchange="{() => applyFilters()}">
      </div>
      <!-- Filter by Experience -->
      <div>
        <label for="filterExperience">Employee Types:</label>
        <br>
        <select id="filterExperience" name="filterExperience" class="filter-input" onchange="{() => applyFilters()}">
          <option value="">All</option>
          <option value="0-1">0-1 years</option>
          <option value="1-3">1-3 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5+">5+ years</option>
        </select>
      </div>
      <!-- Filter by Active -->
      <div>
        <label for="filterActive">Gender:</label>
        <br>
        <select id="filterActive" name="filterActive" class="filter-input" onchange="{() => applyFilters()}">
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    </div>
    
    <!-- Additional field for address -->
    <div class="mb-4">
      <label for="address">Address:</label>
      <br>
      <input type="text" id="address" name="address" class="filter-input" placeholder="Address" bind:value="{employee.address}" onchange="{() => applyFilters()}">
    </div>
</div>