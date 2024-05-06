<script>
  import { writable } from 'svelte';

  // Replace with your backend API base URL
  const API_URL = 'your_backend_api_url';

  let employee = {
      name: '',
      phoneNumber: '',
      location: '',
      // employeeType: '',
      gender: '',
      email: '',
      address: '', 
      dateOfBirth: '',
      cardIdNumber: '',
      reasonForVisiting: '',
      fingerIndex1: '',
      fingerIndex2: '',
      isFingerAdded: ''
  };

  const image = "../assets/img/10.jpg";

  // async function handleSubmit() {
  //   try {
  //     const response = await fetch(`${API_URL}/visitors`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify($employee), // Use spread operator to access writable value
  //     });
  //     if (!response.ok) {
  //       throw new Error(`Request failed with status ${response.status}`);
  //     }
  //     const data = await response.json();
  //     console.log('Visitor submitted successfully:', data);
  //     // Handle successful submission (e.g., clear form, show success message)
  //   } catch (error) {
  //     console.error('Error submitting visitor:', error);
  //     // Handle errors appropriately (e.g., display error message to user)
  //   }
  // }

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
      <label for="profile-pic" class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 mt-4 mb-8 cursor-pointer">Upload</label>
    </div>

    <div class="divider"></div>

   <!-- Filters Row 1 -->
  <div class="flex justify-between mb-4">
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
  <!-- Filter by Position -->
  <div>
    <label for="filterPosition">Location:</label>
    <br>
    <input type="text" id="filterPosition" name="filterPosition" class="filter-input" placeholder="Location" onchange="{() => applyFilters()}">
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
    <div>
      <label for="dateOfBirth">Date of Birth:</label>
      <br>
      <input type="date" id="dateOfBirth" name="dateOfBirth" class="filter-input" placeholder="Date of Birth" bind:value="{employee.dateOfBirth}">
    </div>
    <!-- Filter by Experience -->
    <!-- <div>
      <label for="filterExperience">Employee Types:</label>
      <br>
      <select id="filterExperience" name="filterExperience" class="filter-input" onchange="{() => applyFilters()}">
        <option value="">All</option>
        <option value="0-1">0-1 years</option>
        <option value="1-3">1-3 years</option>
        <option value="3-5">3-5 years</option>
        <option value="5+">5+ years</option>
      </select>
    </div> -->
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
    
  <!-- Filters Row 4 -->
  <div class="flex justify-between mb-4">
    <div class="w-full">
      <label for="address">Address:</label>
      <br>
      <input type="text" id="address" name="address" class="w-full" placeholder="Address" bind:value="{employee.address}">
    </div>
  </div>

  <!-- Filters Row 5 -->
<div class="flex mb-4">
  <!-- Filter by Card ID Number -->
  <div>
    <label for="cardIdNumber">Card ID Number:</label>
    <br>
    <input type="text" id="cardIdNumber" name="cardIdNumber" class="filter-input" placeholder="Card ID Number" bind:value="{employee.cardIdNumber}">
  </div>
  <div class="ml-12">
    <label for="filterreasonForVisiting">Reason for visiting:</label>
    <br>
    <textarea id="filterreasonForVisiting" name="filterreasonForVisiting" class="filter-input" placeholder="Reason for visiting" onchange="{() => applyFilters()}"></textarea>
  </div>
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
<div class="flex justify-end mb-4">
  <button class=" bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={handleSubmit}>
    Submit
  </button>
</div>

</div>