<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { addVisitorApi, getAllLocationsApi, getAllShiftTimingsApi} from '../../services/api.js';
  import MultiSelect from '../../components/Dropdowns/MultiSelect.svelte';
  import { navigate } from 'svelte-routing';
  import Toast from '../../components/Confirmation/Toast.svelte';


  export let color = "light";
  
  let file = null;

  let visitor = {
    visitorID: '',
    name: '',
    mobileNumber: '',
    locations: [],
    shiftTimings: '',
    gender: '',
    email: '',
    address: '', 
    dateOfBirth: '',
    cardIdNumber: '',
    reasonOfVisiting: '',
    fingerIndex1: '',
    fingerIndex2: '',
    isFingerAdded: false,
    file: null // Add file to the visitor object
  };

  const image = "../assets/img/10.jpg";

  let showToaster = false;
  let toasterMessage = '';
  let toasterType = '';

  function showToasterMessage(message, type) {
    toasterMessage = message;
    toasterType = type;
    showToaster = true;
    setTimeout(() => {
      showToaster = false;
    }, 3000); // Show toast for 3 seconds
  }

  function navigateToProfile() {
    navigate('/user/profile');
  }

  function generateRandomNumber() {
    const now = new Date();
        const dateTimeString = now.toISOString(); // Example: '2024-05-26T15:00:00.000Z'
        const numericString = dateTimeString.replace(/\D/g, ''); // Example: '20240526150000000'
        console.log(numericString);
      visitor.visitorID = numericString;
}

  function handleFileInputChange(event) {
    file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageSrc = e.target.result;
        document.getElementById('profile-image').src = newImageSrc;
      };
      reader.readAsDataURL(file);
      visitor.file = file; // Add the file to the visitor object
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

  function appendFormData(formData, data, parentKey = '') {
    if (data && typeof data === 'object' && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        appendFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      formData.append(parentKey, data);
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

  function handleBlur(event) {
    validateInputs();
  }

  function validateInputs() {
    let isValid = true;

    if (!visitor.name) {
      document.getElementById('name-error').innerText = '* Field Required';
      document.getElementById('name-error').style.display = 'block';
      isValid = false;
    } else if (/\d/.test(visitor.name)) {
      document.getElementById('name-error').innerText = '* Wrong Format';
      document.getElementById('name-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('name-error').style.display = 'none';
    }

    if (!visitor.mobileNumber) {
      document.getElementById('phone-number-error').innerText = '* Field Required';
      document.getElementById('phone-number-error').style.display = 'block';
      isValid = false;
    } else if (!validatePhoneFormat(visitor.mobileNumber)) {
      document.getElementById('phone-number-error').innerText = '* Number must follow the format 03xxxxxxxxx';
      document.getElementById('phone-number-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('phone-number-error').style.display = 'none';
    }

    if (!visitor.email) {
      document.getElementById('email-error').innerText = '* Field Required';
      document.getElementById('email-error').style.display = 'block';
      isValid = false;
    } else if (!validateEmailFormat(visitor.email)) {
      document.getElementById('email-error').innerText = '* Invalid Email Format';
      document.getElementById('email-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('email-error').style.display = 'none';
    }

    if (!visitor.gender) {
      document.getElementById('gender-error').innerText = '* Field Required';
      document.getElementById('gender-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('gender-error').style.display = 'none';
    }
    
    const today = new Date();
    const dob = new Date(visitor.dateOfBirth);
    
    if (!visitor.dateOfBirth) {
      document.getElementById('date-of-birth-error').innerText = '* Field Required';
      document.getElementById('date-of-birth-error').style.display = 'block';
      isValid = false;
    } else if (dob > today) {
      document.getElementById('date-of-birth-error').innerText = '* Date of birth cannot be in the future';
      document.getElementById('date-of-birth-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('date-of-birth-error').style.display = 'none';
    }

    if (!visitor.address) {
      document.getElementById('address-error').innerText = '* Field Required';
      document.getElementById('address-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('address-error').style.display = 'none';
    }

    if (!visitor.reasonOfVisiting) {
      document.getElementById('reason-error').innerText = '* Field Required';
      document.getElementById('reason-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('reason-error').style.display = 'none';
    }

    if (!visitor.fingerIndex1) {
      document.getElementById('finger-index-1-error').innerText = '* Field Required';
      document.getElementById('finger-index-1-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('finger-index-1-error').style.display = 'none';
    }

    if (!visitor.fingerIndex2) {
      document.getElementById('finger-index-2-error').innerText = '* Field Required';
      document.getElementById('finger-index-2-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('finger-index-2-error').style.display = 'none';
    }

    if (!visitor.isFingerAdded) {
      document.getElementById('finger-added-error').innerText = '* Field Required';
      document.getElementById('finger-added-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('finger-added-error').style.display = 'none';
    }

    if (!visitor.cardIdNumber) {
      document.getElementById('card-id-error').innerText = '* Field Required';
      document.getElementById('card-id-error').style.display = 'block';
      isValid = false;
    } else if (visitor.cardIdNumber.length !== 10) {
      document.getElementById('card-id-error').innerText = '* card ID must contain 10 digits';
      document.getElementById('card-id-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('card-id-error').style.display = 'none';
    }

    if (!visitor.shiftTiming) {
      document.getElementById('shift-timing-error').innerText = '* Field Required';
      document.getElementById('shift-timing-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('shift-timing-error').style.display = 'none';
    }

    if (visitor.locations.length === 0) {
      document.getElementById('location-error').innerText = '* Please select at least one location';
      document.getElementById('location-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('location-error').style.display = 'none';
    }

    return isValid;
  }

  async function handleSubmit() {
    if (!validateInputs()) {
      return;
    }
    await generateRandomNumber();
    visitor.requestor = "User";
    visitor.status = "pending";
    let tempdtosend = [];

    for (let i = 0; i < visitor.locations.length; i++) {
      tempdtosend.push(trueAccessibleRooms.find(loc => loc.title === visitor.locations[i])._id);
    }

    visitor.locations = tempdtosend;

    const formData = new FormData();
    appendFormData(formData, visitor);

    console.log(visitor);
    try {
      const response = await addVisitorApi(formData);
      console.log('Visitor added successfully', response);
      showToasterMessage('Visitor added successfully!', 'success');
        // alert('Visitor added successfully!');
    } catch (error) {
      console.error('Error adding visitor:', error);
      showToasterMessage('An error occurred while adding the visitor. Please try again.', 'error');
        // alert('An error occurred while adding the visitor. Please try again.');
    }
  }

  
  let trueShiftTimings = [];
  let shiftTimings = [];
  let trueAccessibleRooms = [];
  let accessibleRooms = [];

  onMount(async () => {
    const fileInput = document.getElementById('profile-pic');
    fileInput.addEventListener('change', handleFileInputChange);

    await fetchLocations();
    await fetchShiftTimings();

    return () => {
      fileInput.removeEventListener('change', handleFileInputChange);
    };
  });

  async function fetchLocations() {
    try {
      const locations = await getAllLocationsApi();
      trueAccessibleRooms = locations;
      accessibleRooms = trueAccessibleRooms.map(loc => loc.title);
      console.log(accessibleRooms);
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



</script>

<div class="relative min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
{#if showToaster}
  <Toast message={toasterMessage} type={toasterType} />
{/if}
  <div class="relative w-full px-4 max-w-full flex-grow flex-1">
    <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
      Visitor Request
    </h3>
  </div>

  <div class="left-section flex flex-col items-center">
    <img id="profile-image" src="{image}"  alt="Your Profile Picture" style="max-width: 200px; max-height: 200px;" />
    <input type="file" accept="image/*" id="profile-pic" style="display: none" />
    <label for="profile-pic" class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 mt-4 mb-8 cursor-pointer">Upload</label>
  </div>

  <div class="divider"></div>

   <div class="flex justify-between mb-4">

    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="name">
        Name:
      </label>
      <input type="text" id="name" placeholder="Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={visitor.name} on:input="{restrictAlphabetInput}" on:blur="{handleBlur}">
      <span id="name-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>

    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="phone-number">
        Phone Number:
      </label>
      <input type="text" id="phone-number" maxlength="11" placeholder="03xx-xxxxxxx" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={visitor.mobileNumber} on:input="{restrictInput}" on:blur="{handleBlur}">
      <span id="phone-number-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>

    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="email">
        Email:
      </label>
      <input type="text" id="email" placeholder="Email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={visitor.email} on:blur="{handleBlur}">
      <span id="email-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>

    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="date-of-birth">
        Date of birth:
      </label>
      <input type="date" id="date-of-birth" placeholder="Date of birth" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={visitor.dateOfBirth} on:blur="{handleBlur}">
      <span id="date-of-birth-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>
  </div>


  <div class="flex justify-between mb-4">

    <div class="relative mb-3 w-10/12 mr-auto">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="address">
        Address:
      </label>
      <textarea id="address" placeholder="Address" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={visitor.address} on:blur="{handleBlur}"></textarea>
      <span id="address-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>

    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="filterActive">Gender:</label>
      <select id="gender" class="border-0 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value="{visitor.gender}" on:blur="{handleBlur}">
        <option value="" disabled selected>Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <span id="gender-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>

  </div>

  <div class="flex justify-between mb-4">

    <div class="relative mb-3 mr-6">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="card-id">
        Card ID:
      </label>
      <input type="text" id="card-id" maxlength="10" placeholder="Card ID" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={visitor.cardIdNumber} on:input="{restrictInput}" on:blur="{handleBlur}">
      <span id="card-id-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>

    <div class="relative mb-3 w-10/12">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="address">
        Reason for visiting:        
      </label>
      <input type="text" id="reason" placeholder="Reason for visiting" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={visitor.reasonOfVisiting} on:blur="{handleBlur}">
      <span id="reason-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>

  </div>

  <div class="flex justify-between mb-4">

    <div class="relative mb-3 w-4/10">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="finger-index-1">
        Finger Index 1:
      </label>
      <input type="number" min="0" id="finger-index-1" placeholder="Finger Index 1" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={visitor.fingerIndex1} on:blur="{handleBlur}">
      <span id="finger-index-1-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>

    <div class="relative mb-3 w-4/10">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="finger-index-2">
        Finger Index 2:
      </label>
      <input type="number" min="0" id="finger-index-2" placeholder="Finger Index 2" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={visitor.fingerIndex2} on:blur="{handleBlur}">
      <span id="finger-index-2-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>

    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="status">
        Finger Added:
      </label>
      <label class="switch">
        <input type="checkbox" id="finger-added" class="hidden" bind:checked={visitor.isFingerAdded} on:blur="{handleBlur}">
        <span class="slider round"></span> 
      </label>
      <span id="finger-added-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>
  </div>

  <div class="flex justify-start mb-4">

    <div class="relative mb-3 w-4/10 mr-6">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="accessibleLocations">Accessible locations</label>
      <MultiSelect bind:selectedOptions="{visitor.locations}" options="{accessibleRooms}" placeholder="Select Location" on:blur="{handleBlur}" />
      <span id="location-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>

    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="shiftTiming">Shift Timing:</label>
      <select id="shiftTiming" class="border-0 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={visitor.shiftTiming} on:blur="{handleBlur}">
        <option value="" disabled selected>Select Shift Timing</option>
        {#each shiftTimings as shift}
          <option value={shift}>{shift}</option>
        {/each}
      </select>
      <span id="shift-timing-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>

  </div>

</div>

<div class="flex justify-end mb-4">
  <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={handleSubmit}>
      Submit
  </button>
  <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={navigateToProfile}>
      Cancel
  </button>
</div>
