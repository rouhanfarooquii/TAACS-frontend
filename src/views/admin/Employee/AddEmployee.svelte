<script>
import { navigate } from 'svelte-routing';
let selectedEmployee = null;

let id = '';
let name = '';
let phoneNumber = '';
let location = '';
let department = '';
let designation = '';
let employeeType = '';
let gender = '';
let email = '';
let address = '';
let dateOfBirth = '';
let cardIdNumber = '';
let personalPassword = '';
let fingerIndex1 = '';
let fingerIndex2 = '';
let isFingerAdded = '';
let salary = '';

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

  async function handleSubmit() {
    if (!validateInputs()) {
        // If inputs are not valid, prevent form submission
        return;
    }

    try {
        const response = await fetch('your_backend_api_url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // Add any additional headers if needed
            },
            body: JSON.stringify(employee) // Assuming employee is your data object
        });

        if (!response.ok) {
            throw new Error('Failed to submit data to the server');
        }

        // Handle success response here, e.g., show success message, reset form, etc.
        console.log('Form submitted successfully');
    } catch (error) {
        // Handle errors, e.g., show error message to the user
        console.error('Error submitting form:', error.message);
    }
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

  // Add event listener to file input element when the component is mounted
  import { onMount } from 'svelte';

  onMount(() => {
    const fileInput = document.getElementById('profile-pic');
    fileInput.addEventListener('change', handleFileInputChange);

    // Cleanup function to remove the event listener when the component is destroyed
    return () => {
      fileInput.removeEventListener('change', handleFileInputChange);
    };
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

  function validateInputs() {
  let isValid = true;

  // ID
  if (!id) {
    document.getElementById('id-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('id-error').style.display = 'none';
  }

  // Name
  if (!name) {
    document.getElementById('name-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('name-error').style.display = 'none';
  }

  // Phone Number
  if (!phoneNumber) {
    document.getElementById('phone-number-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('phone-number-error').style.display = 'none';
  }
  // Phone Number Format
if (!/^\d{11}$/.test(phoneNumber)) {
  document.getElementById('phone-number-format-error').style.display = 'block';
  isValid = false;
} else {
  document.getElementById('phone-number-format-error').style.display = 'none';
}

  // Department
  if (!department) {
    document.getElementById('department-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('department-error').style.display = 'none';
  }

  // Designation
  if (!designation) {
    document.getElementById('designation-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('designation-error').style.display = 'none';
  }

  // Email
  if (!email) {
    document.getElementById('email-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('email-error').style.display = 'none';
  }
  // Email Format
if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
  document.getElementById('email-format-error').style.display = 'block';
  isValid = false;
} else {
  document.getElementById('email-format-error').style.display = 'none';
}

  // Gender
  if (!gender) {
    document.getElementById('gender-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('gender-error').style.display = 'none';
  }

  // Date of Birth
  if (!dateOfBirth) {
    document.getElementById('date-of-birth-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('date-of-birth-error').style.display = 'none';
  }

  // Address
  if (!address) {
    document.getElementById('address-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('address-error').style.display = 'none';
  }

  // Card ID
  if (!cardIdNumber) {
    document.getElementById('card-id-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('card-id-error').style.display = 'none';
  }

  // Personal Password
  if (!personalPassword) {
    document.getElementById('personal-password-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('personal-password-error').style.display = 'none';
  }

  // Salary
  if (!salary) {
    document.getElementById('salary-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('salary-error').style.display = 'none';
  }

  // Location
  if (!location) {
    document.getElementById('location-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('location-error').style.display = 'none';
  }

  // Employee Type
  if (!employeeType) {
    document.getElementById('employee-type-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('employee-type-error').style.display = 'none';
  }

  return isValid;
}
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
    <!-- Filter by EmployeeID -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="employeeId">
        Employee ID:
      </label>
      <input type="text" id="employeeId" placeholder="Employee ID" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={id}>
      <span id="id-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
    <!-- Filter by Name -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="name">
        Name:
      </label>
      <input type="text" id="name" placeholder="Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={name}>
      <span id="name-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
   <!-- Filter by Department -->
   <div class="relative mb-3">
    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="phone-number">
      Phone Number:
    </label>
    <input type="text" id="phone-number" placeholder="Phone Number" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={phoneNumber}>
    <span id="phone-number-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    <span id="phone-number-format-error" class="text-red-600 text-xs" style="display: none;">Enter correct number - 11 digits</span>
  </div>
  <div class="relative mb-3">
    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="department">
      Department:
    </label>
    <input type="text" id="department" placeholder="Department" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={department}>
    <span id="department-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
  </div>
  </div>

  <!-- Filters Row 2 -->
  <div class="flex justify-between mb-4">
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
        Designation:
      </label>
      <input type="text" id="designation" placeholder="Designation" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={designation}>
      <span id="designation-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
        Email:
      </label>
      <input type="text" id="email" placeholder="Email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={email}>
      <span id="email-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
      <span id="email-format-error" class="text-red-600 text-xs" style="display: none;">Email format incorrect</span>
    </div>
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
        Gender:
      </label>
      <input type="text" id="gender" placeholder="Gender" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={gender}>
      <span id="gender-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
        Date of birth:
      </label>
      <input type="date" id="date-of-birth" placeholder="Date of birth" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={dateOfBirth}>
      <span id="date-of-birth-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
  </div>

  <!-- Filters Row 3 -->
  <div class="flex justify-between mb-4">
    <div class="relative mb-3 w-9/12">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
        Address:
      </label>
      <textarea id="address" placeholder="Address" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={address}></textarea>
      <span id="address-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
        Card ID:
      </label>
      <input type="text" id="card-id" placeholder="Card ID" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={cardIdNumber}>
      <span id="card-id-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
  </div>
    
  <!-- Filters Row 4 -->
  <div class="flex justify-between mb-4">
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
        Personal Password:
      </label>
      <input type="text" id="personal-password" placeholder="Personal Password" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={personalPassword}>
      <span id="personal-password-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>                  
    </div>
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
        Finger Index 1:
      </label>
      <input type="number" id="finger-index-1" placeholder="Finger Index 1" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={fingerIndex1}>
    </div>
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
        Finger Index 2:
      </label>
      <input type="number" id="finger-index-2" placeholder="Finger Index 2" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={fingerIndex2}>
    </div>
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
        Finger Added:
      </label>
      <label class="switch">
        <input type="checkbox" id="status" class="hidden" bind:checked={isFingerAdded}>
        <span class="slider round"></span> 
      </label>
      <span id="finger-added-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
  </div>

<!-- Filters Row 6 -->
<div class="flex mb-4">
  <div class="relative mb-3">
    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="listType">List Type:</label>
    <select id="listType" class="border-0 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value="{listType}" on:change="{handleListTypeChange}">
      <option value="Permanent_List">Permanent_List</option>
      <option value="Temporary_List">Temporary_List</option>
      <option value="Temporary_List2">Temporary_List2</option>
      <option value="Temporary_List3">Temporary_List3</option>
    </select>
  </div>
  <div class="ml-14">
    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
      Salary:
    </label>
    <input type="number" id="salary" placeholder="Salary" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={salary}>
    <span id="salary-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
  </div>
</div>

{#if showValidDateTimeFields}
  <!-- Valid Begin and End DateTime Fields -->
  <div class="flex mb-4">
    <div>
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="validBeginDateTime">Valid Begin Date:</label>
      <input type="date" id="validBeginDateTime" name="validBeginDateTime" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
    </div>
    <div class = "ml-9">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="validEndDateTime">Valid End Date:</label>
      <input type="date" id="validEndDateTime" name="validEndDateTime" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
    </div>
  </div>
{/if}

{#if showValidDateAndTimeFields}
  <!-- Valid Begin Date and Time Fields -->
  <div class="flex justify-between mb-4">
    <div>
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="validBeginDate">Valid Begin Date:</label>
      <input type="date" id="validBeginDate" name="validBeginDate" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
    </div>
    <div>
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="validBeginTime">Valid Begin Time:</label>
      <input type="time" id="validBeginTime" name="validBeginTime" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
    </div>
    <!-- Valid End Date and Time Fields -->
    <div>
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="validEndDate">Valid End Date:</label>
      <input type="date" id="validEndDate" name="validEndDate" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
    </div>
    <div>
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="validEndTime">Valid End Time:</label>
      <input type="time" id="validEndTime" name="validEndTime" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
    </div>
  </div>
{/if}

{#if showEffectTimesField}
  <!-- Effect Times Field -->
  <div class="flex justify-between mb-4">
    <div>
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="effectTimes">Effect Times:</label>
      <input type="text" id="effectTimes" name="effectTimes" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
    </div>
  </div>
{/if}

<div class="flex justify-end mb-4">
  <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={navigateToEmployee}>
    Back
  </button>
  <button class=" bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={handleSubmit}>
    Submit
  </button>
</div>
</div>