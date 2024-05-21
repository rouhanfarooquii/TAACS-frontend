<script>
  import { navigate } from 'svelte-routing';
  import { onMount } from 'svelte';
  import Multiselect from 'components/Dropdowns/MultiSelect.svelte';

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
  let shiftTiming = '';
  let selectedLocations = [];
  let locations = ['Device 1', 'Device 2', 'Device 3', 'Device 4', 'Device 5'];

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
      salary: '',
      shiftTiming: '',
  };

  const image = "../assets/img/10.jpg";

  async function handleSubmit() {
    if (!validateInputs()) {
        return;
    }

    try {
        const response = await fetch('your_backend_api_url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });

        if (!response.ok) {
            throw new Error('Failed to submit data to the server');
        }

        console.log('Form submitted successfully');
    } catch (error) {
        console.error('Error submitting form:', error.message);
    }
  }

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

  onMount(() => {
    const fileInput = document.getElementById('profile-pic');
    fileInput.addEventListener('change', handleFileInputChange);

    return () => {
      fileInput.removeEventListener('change', handleFileInputChange);
    };
  });

  function navigateToEmployee() {
    navigate('/admin/employee');
  }

  function validateInputs() {
    let isValid = true;

    if (!id) {
      document.getElementById('id-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('id-error').style.display = 'none';
    }

    if (!name) {
      document.getElementById('name-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('name-error').style.display = 'none';
    }

    if (!phoneNumber) {
      document.getElementById('phone-number-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('phone-number-error').style.display = 'none';
    }

    if (!/^\d{11}$/.test(phoneNumber)) {
      document.getElementById('phone-number-format-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('phone-number-format-error').style.display = 'none';
    }

    if (!department) {
      document.getElementById('department-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('department-error').style.display = 'none';
    }

    if (!designation) {
      document.getElementById('designation-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('designation-error').style.display = 'none';
    }

    if (!email) {
      document.getElementById('email-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('email-error').style.display = 'none';
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      document.getElementById('email-format-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('email-format-error').style.display = 'none';
    }

    if (!gender) {
      document.getElementById('gender-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('gender-error').style.display = 'none';
    }

    if (!dateOfBirth) {
      document.getElementById('date-of-birth-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('date-of-birth-error').style.display = 'none';
    }

    if (!address) {
      document.getElementById('address-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('address-error').style.display = 'none';
    }

    if (!cardIdNumber) {
      document.getElementById('card-id-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('card-id-error').style.display = 'none';
    }

    if (!personalPassword) {
      document.getElementById('personal-password-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('personal-password-error').style.display = 'none';
    }

    if (!salary) {
      document.getElementById('salary-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('salary-error').style.display = 'none';
    }

    if (!location) {
      document.getElementById('location-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('location-error').style.display = 'none';
    }

    if (!employeeType) {
      document.getElementById('employee-type-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('employee-type-error').style.display = 'none';
    }

    if (!shiftTiming) {
      document.getElementById('shift-timing-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('shift-timing-error').style.display = 'none';
    }

    return isValid;
  }

  // Dummy data for departments and designations
  const departments = {
    "IT": ["Developer", "Tester", "Manager"],
    "HR": ["Recruiter", "HR Manager", "Coordinator"],
    "Finance": ["Accountant", "Financial Analyst", "Auditor"]
  };

  // Dummy data for shift timings
  const shiftTimings = ["Morning Shift", "Afternoon Shift", "Night Shift"];

  async function fetchShiftTimings() {
    try {
      const response = await fetch('your_backend_api_url_for_shift_timings');
      if (!response.ok) {
        throw new Error('Failed to fetch shift timings');
      }
      const data = await response.json();
      return data.shiftTimings;
    } catch (error) {
      console.error('Error fetching shift timings:', error.message);
      return shiftTimings; // Return dummy data in case of error
    }
  }

  let showPassword = false;

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

  $: availableDesignations = department ? departments[department] || [] : [];
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
    <!-- Filter by Phone Number -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="phone-number">
        Phone Number:
      </label>
      <input type="number" id="phone-number" placeholder="03xx-xxxxxxx" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={phoneNumber}>
      <span id="phone-number-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
      <span id="phone-number-format-error" class="text-red-600 text-xs" style="display: none;">Enter correct number - 11 digits</span>
    </div>
    <!-- Filter by Email -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="email">
        Email:
      </label>
      <input type="text" id="email" placeholder="Email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={email}>
      <span id="email-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
      <span id="email-format-error" class="text-red-600 text-xs" style="display: none;">Email format incorrect</span>
    </div>
  </div>

  <!-- Filters Row 2 -->
  <div class="flex justify-between mb-4">
    <!-- Filter by Department -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="department">
        Department:
      </label>
      <select id="department" class="border-0 px-8 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={department}>
        <option value="" disabled selected>Select Department</option>
        {#each Object.keys(departments) as dept}
          <option value={dept}>{dept}</option>
        {/each}
      </select>
      <span id="department-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
    <!-- Filter by Designation -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="designation">
        Designation:
      </label>
      <select id="designation" class="border-0 px-8 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={designation} disabled={!department}>
        <option value="" disabled selected>Select Designation</option>
        {#each availableDesignations as desig}
          <option value={desig}>{desig}</option>
        {/each}
      </select>
      <span id="designation-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
    <!-- Filter by Gender -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="filterActive">Gender:</label>
      <select id="filterActive" name="filterActive" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value="{gender}">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Prefer Not To Say</option>
      </select>
      <span id="gender-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
    <!-- Filter by Date of Birth -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="date-of-birth">
        Date of birth:
      </label>
      <input type="date" id="date-of-birth" placeholder="Date of birth" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={dateOfBirth}>
      <span id="date-of-birth-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
  </div>

  <!-- Filters Row 3 -->
  <div class="flex justify-between mb-4">
    <!-- Filter by Address -->
    <div class="relative mb-3 w-9/12">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="address">
        Address:
      </label>
      <textarea id="address" placeholder="Address" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={address}></textarea>
      <span id="address-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
  </div>
    
  <!-- Filters Row 4 -->
  <div class="flex justify-start mb-4">
    <!-- Filter by Card ID -->
    <div class="relative mb-3 mr-6">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="card-id">
        Card ID:
      </label>
      <input type="text" id="card-id" placeholder="Card ID" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={cardIdNumber}>
      <span id="card-id-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
    <!-- Filter by Personal Password -->
    <div class="relative mb-3 w-1/2">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="personal-password">
        Personal Password:
      </label>
      <div class="relative">
      <input type='password' id="personal-password" placeholder="Personal Password" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={personalPassword}>
      </div>
      <span id="personal-password-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
  </div>
    
  <!-- Filters Row 5 -->
  <div class="flex justify-between mb-4">
    <!-- Filter by Finger Index 1 -->
    <div class="relative mb-3 w-4/10">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="finger-index-1">
        Finger Index 1:
      </label>
      <input type="text" min="0" id="finger-index-1" placeholder="Finger Index 1" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={fingerIndex1}>
    </div>
    <!-- Filter by Finger Index 2 -->
    <div class="relative mb-3 w-4/10">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="finger-index-2">
        Finger Index 2:
      </label>
      <input type="text" min="0" id="finger-index-2" placeholder="Finger Index 2" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={fingerIndex2}>
    </div>
    <!-- Filter by Finger Added -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="status">
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
  <div class="flex justify-between mb-4">
    <!-- Filter by Shift Timing -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="shiftTiming">Shift Timing:</label>
      <select id="shiftTiming" class="border-0 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value="{shiftTiming}">
        <option value="" disabled selected>Select Shift Timing</option>
        {#each shiftTimings as shift}
          <option value={shift}>{shift}</option>
        {/each}
      </select>
      <span id="shift-timing-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
    <!-- Filter by Accessible Locations -->
    <div class="relative mb-3 w-1/2">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="accessibleDevices">Accessible locations</label>
      <Multiselect bind:selectedOptions={selectedLocations} options={locations} placeholder="Select Location" />
      <span id="location-error" class="text-red-600 text-xs" style="display: none;">* Please select a room</span>
    </div>
    <!-- Filter by Salary -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="salary">
        Salary:
      </label>
      <input type="number" min="0" id="salary" placeholder="Salary" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={salary}>
      <span id="salary-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
  </div>

  <div class="flex justify-end mb-4">
    <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={navigateToEmployee}>
      Back
    </button>
    <button class=" bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={handleSubmit}>
      Submit
    </button>
  </div>
</div>
