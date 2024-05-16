<script>
  import { writable } from 'svelte';

  // Replace with your backend API base URL
  const API_URL = 'your_backend_api_url';
  export let color = "light";

  let employee = {
    name: '',
    phoneNumber: '',
    location: '',
    gender: '',
    email: '',
    address: '', 
    dateOfBirth: '',
    cardIdNumber: '',
    reasonForVisiting: '',
    fingerIndex1: '',
    fingerIndex2: '',
    isFingerAdded: false
  };

  const image = "../assets/img/10.jpg";

  function handleFileInputChange(event) {
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

  document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById('profile-pic');
    fileInput.addEventListener('change', handleFileInputChange);
  });

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  function handleSubmit() {
    // Check required fields
    let valid = true;
    if (!employee.name) {
      document.getElementById('name-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('name-error').style.display = 'none';
    }
    if (!employee.phoneNumber || employee.phoneNumber.length !== 11) {
      document.getElementById('phone-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('phone-error').style.display = 'none';
    }
    if (!employee.location) {
      document.getElementById('location-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('location-error').style.display = 'none';
    }
    if (!employee.address) {
      document.getElementById('address-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('address-error').style.display = 'none';
    }
    if (!employee.cardIdNumber) {
      document.getElementById('cardIdNumber-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('cardIdNumber-error').style.display = 'none';
    }
    if (!employee.reasonForVisiting) {
      document.getElementById('reasonForVisiting-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('reasonForVisiting-error').style.display = 'none';
    }
    if (!validateEmail(employee.email)) {
      document.getElementById('email-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('email-error').style.display = 'none';
    }

    if (valid) {
      // Submit the form
      console.log('Form is valid, submitting...');
      // Implement the API call here
    }
  }
</script>

<div class="relative min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <div class="relative w-full px-4 max-w-full flex-grow flex-1">
    <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
      Visitor Request
    </h3>
  </div>
  <div class="left-section flex flex-col items-center">
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
      <input type="text" id="filterName" name="filterName" class="filter-input" placeholder="Name" bind:value="{employee.name}">
      <span id="name-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
    <!-- Filter by Department -->
    <div>
      <label for="filterDepartment">Mobile Number:</label>
      <br>
      <input type="text" id="filterDepartment" name="filterDepartment" class="filter-input" placeholder="Mobile Number" bind:value="{employee.phoneNumber}">
      <span id="phone-error" class="text-red-600 text-xs" style="display: none;">* Mobile Number must be 11 digits</span>
    </div>
    <!-- Filter by Position -->
    <div>
      <label for="filterPosition">Location:</label>
      <br>
      <input type="text" id="filterPosition" name="filterPosition" class="filter-input" placeholder="Location" bind:value="{employee.location}">
      <span id="location-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
  </div>

  <!-- Filters Row 3 -->
  <div class="flex justify-between mb-4">
    <!-- Filter by Position -->
    <div>
      <label for="filterPosition">Email:</label>
      <br>
      <input type="text" id="filterPosition" name="filterPosition" class="filter-input" placeholder="Email" bind:value="{employee.email}">
      <span id="email-error" class="text-red-600 text-xs" style="display: none;">* Invalid Email Format</span>
    </div>
    <div>
      <label for="dateOfBirth">Date of Birth:</label>
      <br>
      <input type="date" id="dateOfBirth" name="dateOfBirth" class="filter-input" placeholder="Date of Birth" bind:value="{employee.dateOfBirth}">
    </div>
    <div>
      <label for="filterActive">Gender:</label>
      <br>
      <select id="filterActive" name="filterActive" class="filter-input" bind:value="{employee.gender}">
        <option value="">All</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>
  </div>

  <!-- Filters Row 4 -->
  <div class="flex justify-between mb-4">
    <div class="w-full">
      <label for="address">Address:</label>
      <br>
      <input type="text" id="address" name="address" class="w-full" placeholder="Address" bind:value="{employee.address}">
      <span id="address-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
  </div>

  <!-- Filters Row 5 -->
  <div class="flex justify-start mb-4">
    <div>
      <label for="cardIdNumber">Card ID Number:</label>
      <br>
      <input type="text" id="cardIdNumber" name="cardIdNumber" class="filter-input" placeholder="Card ID Number" bind:value="{employee.cardIdNumber}">
      <span id="cardIdNumber-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
    <div class="ml-12">
      <label for="filterreasonForVisiting">Reason for visiting:</label>
      <br>
      <textarea id="filterreasonForVisiting" name="filterreasonForVisiting" class="filter-input" placeholder="Reason for visiting" bind:value="{employee.reasonForVisiting}"></textarea>
      <span id="reasonForVisiting-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
  </div>

  <!-- Filters Row 6 -->
  <div class="flex justify-between mb-4">
    <div>
      <label for="fingerIndex1">Finger Index 1:</label>
      <br>
      <input type="text" id="fingerIndex1" name="fingerIndex1" class="filter-input1" placeholder="Finger Index 1" bind:value="{employee.fingerIndex1}">
    </div>
    <div class="w-1/3 px-3">
      <label for="fingerIndex2">Finger Index 2:</label>
      <br>
      <input type="text" id="fingerIndex2" name="fingerIndex2" class="filter-input1" placeholder="Finger Index 2" bind:value="{employee.fingerIndex2}">
    </div>
    <div class="w-1/3 pr-15 pt-6">
      <input type="checkbox" id="isFingerAdded" name="isFingerAdded" class="filter-checkbox" bind:checked="{employee.isFingerAdded}">
      <label for="isFingerAdded">Is Finger Added</label>
    </div>
  </div>
  <div class="flex justify-end mb-4">
    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={handleSubmit}>
      Submit
    </button>
  </div>
</div>