<script>
  import { navigate } from 'svelte-routing';
  import { onMount } from 'svelte';
  import Multiselect from '../../../components/Dropdowns/MultiSelect.svelte';
  import { getAllDepartmentsApi, getAllLocationsApi, getAllShiftTimingsApi, addEmployeeApi } from '../../../services/api';

  let employeeID = '';
  let name = '';
  let mobileNumber = '';
  let department = '';
  let designation = '';
  let gender = '';
  let email = '';
  let address = '';
  let dateOfBirth = '';
  let cardIdNumber = '';
  let personalPassword = '';
  let fingerIndex1 = '';
  let fingerIndex2 = '';
  let isFingerAdded = false;
  let active = true;
  let salary = '';
  let shiftTiming = '';
  let locations = [];

  let trueLocations = [];
  let trueDepartments = [];
  let trueShiftTimings = [];

  let file = null;
  let imageUploadLabel = 'Upload';

  let locationsList = [];
  let departments = [];
  let designations = [];
  let shiftTimings = [];

  const image = "../assets/img/10.jpg";

  onMount(async () => {
    const fileInput = document.getElementById('profile-pic');
    fileInput.addEventListener('change', handleFileInputChange);

    await fetchDepartments();
    await fetchLocations();
    await fetchShiftTimings();

    return () => {
      fileInput.removeEventListener('change', handleFileInputChange);
    };
  });

  async function fetchDepartments() {
    try {
      trueDepartments = await getAllDepartmentsApi();
      departments = trueDepartments;
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  }

  async function fetchLocations() {
    try {
      trueLocations = await getAllLocationsApi();
      locationsList = trueLocations.map(loc => loc.title);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }

  async function fetchShiftTimings() {
    try {
      trueShiftTimings = await getAllShiftTimingsApi();
      shiftTimings = trueShiftTimings.map(shift => shift.shiftName);
    } catch (error) {
      console.error('Error fetching shift timings:', error);
    }
  }

  function setDesignation(event) {
    const selectedDepartmentTitle = event.target.value;
    if (selectedDepartmentTitle) {
      const selectedDept = departments.find(d => d.title === selectedDepartmentTitle);
      designations = selectedDept ? selectedDept.designations : [];
    } else {
      designations = [];
    }
  }

  function restrictInput(event) {
    const input = event.target;
    const value = input.value;
    input.value = value.replace(/[^0-9]/g, '');
  }

  function restrictAlphabetInput(event) {
    const input = event.target;
    const value = input.value;
    input.value = value.replace(/[^a-zA-Z\s]/g, '');
  }

  function validateEmailFormat(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhoneFormat(phone) {
    const re = /^03\d{9}$/;
    return re.test(phone);
  }

  function validateInputs() {
    let isValid = true;

    if (!employeeID) {
      document.getElementById('id-error').innerText = '* Field Required';
      document.getElementById('id-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('id-error').style.display = 'none';
    }

    if (!name) {
      document.getElementById('name-error').innerText = '* Field Required';
      document.getElementById('name-error').style.display = 'block';
      isValid = false;
    } else if (/\d/.test(name)) {
      document.getElementById('name-error').innerText = '* Wrong Format';
      document.getElementById('name-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('name-error').style.display = 'none';
    }

    if (!mobileNumber) {
      document.getElementById('phone-number-error').innerText = '* Field Required';
      document.getElementById('phone-number-error').style.display = 'block';
      isValid = false;
    } else if (!validatePhoneFormat(mobileNumber)) {
      document.getElementById('phone-number-error').innerText = '* Number must follow the format 03xxxxxxxxx';
      document.getElementById('phone-number-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('phone-number-error').style.display = 'none';
    }

    if (!email) {
      document.getElementById('email-error').innerText = '* Field Required';
      document.getElementById('email-error').style.display = 'block';
      isValid = false;
    } else if (!validateEmailFormat(email)) {
      document.getElementById('email-error').innerText = '* Invalid Email Format';
      document.getElementById('email-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('email-error').style.display = 'none';
    }

    if (!department) {
      document.getElementById('department-error').innerText = '* Field Required';
      document.getElementById('department-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('department-error').style.display = 'none';
    }
    
    if (!designation) {
      document.getElementById('designation-error').innerText = '* Field Required';
      document.getElementById('designation-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('designation-error').style.display = 'none';
    }

    if (!gender) {
      document.getElementById('gender-error').innerText = '* Field Required';
      document.getElementById('gender-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('gender-error').style.display = 'none';
    }

    if (!dateOfBirth) {
      document.getElementById('date-of-birth-error').innerText = '* Field Required';
      document.getElementById('date-of-birth-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('date-of-birth-error').style.display = 'none';
    }

    if (!address) {
      document.getElementById('address-error').innerText = '* Field Required';
      document.getElementById('address-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('address-error').style.display = 'none';
    }

    if (!cardIdNumber) {
      document.getElementById('card-id-error').innerText = '* Field Required';
      document.getElementById('card-id-error').style.display = 'block';
      isValid = false;
    } else if (cardIdNumber.length !== 10) {
      document.getElementById('card-id-error').innerText = '* card ID must contain 10 digits';
      document.getElementById('card-id-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('card-id-error').style.display = 'none';
    }

    if (!personalPassword) {
      document.getElementById('personal-password-error').innerText = '* Field Required';
      document.getElementById('personal-password-error').style.display = 'block';
      isValid = false;
    } else if (personalPassword.length !== 6) {
      document.getElementById('personal-password-error').innerText = '* Password must contain 6 digits';
      document.getElementById('personal-password-error').style.display = 'block';
      isValid = false;
    } else if (!/^\d{6}$/.test(personalPassword)) {
      document.getElementById('personal-password-error').innerText = '* Password must contain only numbers';
      document.getElementById('personal-password-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('personal-password-error').style.display = 'none';
    }

    if (!shiftTiming) {
      document.getElementById('shift-timing-error').innerText = '* Field Required';
      document.getElementById('shift-timing-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('shift-timing-error').style.display = 'none';
    }

    if (!salary) {
      document.getElementById('salary-error').innerText = '* Field Required';
      document.getElementById('salary-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('salary-error').style.display = 'none';
    }

    if (locations.length === 0) {
      document.getElementById('locations-error').innerText = '* Please select at least one location';
      document.getElementById('locations-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('locations-error').style.display = 'none';
    }

    return isValid;
  }

  function handleBlur(event) {
    validateInputs();
  }

  async function handleSubmit() {
    if (!validateInputs()) {
      return;
    }

    let loc = [];
    for (let index = 0; index < locations.length; index++) {
      loc.push(trueLocations.find(o => o.title == locations[index])._id);
    }
    let dep = trueDepartments.find(o => o.title == department);
    let des = dep.designations.find(o => o.title == designation)._id;
    dep = dep._id;
    let sif = trueShiftTimings.find(o => o.shiftName == shiftTiming)._id;

    const formData = new FormData();
    formData.append('employeeID', employeeID);
    formData.append('name', name);
    formData.append('mobileNumber', mobileNumber);
    formData.append('locations', loc);
    formData.append('department', dep);
    formData.append('designation', des);
    formData.append('gender', gender);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('cardIdNumber', cardIdNumber);
    formData.append('personalPassword', personalPassword);
    formData.append('fingerIndex1', fingerIndex1);
    formData.append('fingerIndex2', fingerIndex2);
    formData.append('isFingerAdded', isFingerAdded);
    formData.append('active', active);
    formData.append('salary', salary);
    formData.append('shiftTiming', sif);
    formData.append('file', file);

    try {
      await addEmployeeApi(formData);
      navigateToEmployee();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  }

  function handleFileInputChange(event) {
    file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageSrc = e.target.result;
        document.getElementById('profile-image').src = newImageSrc;
        imageUploadLabel = 'Edit';
      };
      reader.readAsDataURL(file);
    }
  }

  function navigateToEmployee() {
    navigate('/admin/employee');
  }

  $: availableDesignations = department ? departments.find(d => d.title === department)?.designations || [] : [];
</script>

<div class="relative min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <div class="left-section flex flex-col items-center">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img id="profile-image" src="{image}" alt="Default Image" style="max-width: 200px; max-height: 200px;" />
    <input type="file" accept="image/*" id="profile-pic" style="display: none" />
    <label for="profile-pic" class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 mt-4 mb-8 cursor-pointer">{imageUploadLabel}</label>
  </div>

  <div class="divider"></div>

  <!-- Filters Row 1 -->
  <div class="flex justify-between mb-4">
    <!-- Filter by EmployeeID -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="employeeID">
        Employee ID:
      </label>
      <input type="text" id="employeeID" maxlength="20" placeholder="Employee" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={employeeID} on:input="{restrictInput}" on:blur="{handleBlur}">
      <span id="id-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>
    <!-- Filter by Name -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="name">
        Name:
      </label>
      <input type="text" id="name" placeholder="Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={name} on:input="{restrictAlphabetInput}" on:blur="{handleBlur}">
      <span id="name-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>
    <!-- Filter by Phone Number -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="phone-number">
        Phone Number:
      </label>
      <input type="text" id="phone-number" maxlength="11" placeholder="03xx-xxxxxxx" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={mobileNumber} on:input="{restrictInput}" on:blur="{handleBlur}">
      <span id="phone-number-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>
    <!-- Filter by Email -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="email">
        Email:
      </label>
      <input type="text" id="email" placeholder="Email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={email} on:blur="{handleBlur}">
      <span id="email-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>
  </div>

  <!-- Filters Row 2 -->
  <div class="flex justify-between mb-4">
    <!-- Filter by Department -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="department">
        Department:
      </label>
      <select id="department" class="border-0 px-8 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={department} on:change={setDesignation} on:blur="{handleBlur}">
        <option value="" disabled selected>Select Department</option>
        {#each departments as dept}
          <option value={dept.title}>{dept.title}</option>
        {/each}
      </select>
      <span id="department-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>
    <!-- Filter by Designation -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="designation">
        Designation:
      </label>
      <select id="designation" class="border-0 px-8 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={designation} disabled={!department} on:blur="{handleBlur}">
        <option value="" disabled selected>Select Designation</option>
        {#each availableDesignations as desig}
          <option value={desig.title}>{desig.title}</option>
        {/each}
      </select>
      <span id="designation-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>
    <!-- Filter by Gender -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="filterActive">Gender:</label>
      <select id="gender" class="border-0 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value="{gender}" on:blur="{handleBlur}">
        <option value="" disabled selected>Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <span id="gender-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>
    <!-- Filter by Date of Birth -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="date-of-birth">
        Date of birth:
      </label>
      <input type="date" id="date-of-birth" placeholder="Date of birth" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={dateOfBirth} on:blur="{handleBlur}">
      <span id="date-of-birth-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>
  </div>

  <!-- Filters Row 3 -->
  <div class="flex justify-between mb-4">
    <!-- Filter by Address -->
    <div class="relative mb-3 w-9/12">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="address">
        Address:
      </label>
      <textarea id="address" placeholder="Address" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={address} on:blur="{handleBlur}"></textarea>
      <span id="address-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>
  </div>
    
  <!-- Filters Row 4 -->
  <div class="flex justify-start mb-4">
    <!-- Filter by Card ID -->
    <div class="relative mb-3 mr-6">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="card-id">
        Card ID:
      </label>
      <input type="text" id="card-id" maxlength="10" placeholder="Card ID" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={cardIdNumber} on:input="{restrictInput}" on:blur="{handleBlur}">
      <span id="card-id-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
    <!-- Filter by Personal Password -->
    <div class="relative mb-3 w-1/2">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="personal-password">
        Personal Password:
      </label>
      <input type="text" id="personal-password" maxlength="6" placeholder="Personal Password" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={personalPassword} on:input="{restrictInput}" on:blur="{handleBlur}">
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
      <input type="number" min="0" id="finger-index-1" placeholder="Finger Index 1" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={fingerIndex1} on:blur="{handleBlur}">
    </div>
    <!-- Filter by Finger Index 2 -->
    <div class="relative mb-3 w-4/10">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="finger-index-2">
        Finger Index 2:
      </label>
      <input type="number" min="0" id="finger-index-2" placeholder="Finger Index 2" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={fingerIndex2} on:blur="{handleBlur}">
    </div>
    <!-- Filter by Finger Added -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="status">
        Finger Added:
      </label>
      <label class="switch">
        <input type="checkbox" id="finger-added" class="hidden" bind:checked={isFingerAdded} on:blur="{handleBlur}">
        <span class="slider round"></span> 
      </label>
      <span id="finger-added-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="status">
        Active:
      </label>
      <label class="switch">
        <input type="checkbox" id="active" class="hidden" bind:checked={active} on:blur="{handleBlur}">
        <span class="slider round"></span> 
      </label>
      <span id="active-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>
  </div>

  <!-- Filters Row 6 -->
  <div class="flex justify-between mb-4">
    <!-- Filter by Shift Timing -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="shiftTiming">Shift Timing:</label>
      <select id="shiftTiming" class="border-0 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={shiftTiming} on:blur="{handleBlur}">
        <option value="" disabled selected>Select Shift Timing</option>
        {#each shiftTimings as shift}
          <option value={shift}>{shift}</option>
        {/each}
      </select>
      <span id="shift-timing-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>
    <!-- Filter by Accessible Locations -->
    <div class="relative mb-3 w-1/2">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="accessibleLocations">Accessible locations</label>
      <Multiselect bind:selectedOptions={locations} options={locationsList} id="locations" placeholder="Select Location" on:blur="{handleBlur}" />
      <span id="locations-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>
    <!-- Filter by Salary -->
    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="salary">
        Salary:
      </label>
      <input type="text" id="salary" placeholder="Salary" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={salary} on:input="{restrictInput}" on:blur="{handleBlur}">
      <span id="salary-error" class="text-red-600 text-xs" style="display: none;"></span>
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
