<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { addVisitorApi, getAllLocationsApi } from '../../services/api';
  import { navigate } from 'svelte-routing';
  import MultiSelect from '../../components/Dropdowns/MultiSelect.svelte';
  import Toast from '../../components/Confirmation/Toast.svelte';
    import { end } from '@popperjs/core';

  export let color = "light";
  
  let file = null;
  let vistorTosend = null;

  let visitor = {
    visitorID: '',
    name: '',
    mobileNumber: '',
    locations: [],
    startTime: '',
    endTime: '',
    gender: '',
    email: '',
    address: '', 
    DateOfVisit: '',
    reasonOfVisiting: '',
    fingerIndex1: '',
    fingerIndex2: '',
    isFingerAdded: false,
    cardIdNumber: '',
    personalPassword: '',
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
    const dov = new Date(visitor.DateOfVisit);
    
    if (!visitor.DateOfVisit) {
      document.getElementById('date-of-visit-error').innerText = '* Field Required';
      document.getElementById('date-of-visit-error').style.display = 'block';
      isValid = false;
    } else if (dov < today) {
      document.getElementById('date-of-visit-error').innerText = '* Please enter a correct date';
      document.getElementById('date-of-visit-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('date-of-visit-error').style.display = 'none';
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

    if (!visitor.visitorID) {
      document.getElementById('card-id-error').innerText = '* Field Required';
      document.getElementById('card-id-error').style.display = 'block';
      isValid = false;
    } else if (visitor.visitorID.length !== 13) {
      document.getElementById('card-id-error').innerText = '* card ID must contain 14 digits';
      document.getElementById('card-id-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('card-id-error').style.display = 'none';
    }

    if (!visitor.startTime) {
      document.getElementById('start-time-error').innerText = '* Field Required';
      document.getElementById('start-time-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('start-time-error').style.display = 'none';
    }

    if (!visitor.endTime) {
      document.getElementById('end-time-error').innerText = '* Field Required';
      document.getElementById('end-time-error').style.display = 'block';
      isValid = false;
    } else if(visitor.startTime > visitor.endTime) {
      document.getElementById('end-time-error').innerText = '* End time must come after start time';
      document.getElementById('end-time-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('end-time-error').style.display = 'none';
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
    
    visitor.requestor = "User";
    visitor.status = "pending";
    let tempdtosend = [];

    for (let i = 0; i < visitor.locations.length; i++) {
      tempdtosend.push(trueAccessibleRooms.find(loc => loc.title === visitor.locations[i])._id);
    }

    visitor.locations = tempdtosend;

    vistorTosend = {
      visitorID: visitor.visitorID,
      name: visitor.name,
      mobileNumber: visitor.mobileNumber,
      locations: visitor.locations,
      startTime: visitor.startTime,
      endTime: visitor.endTime,
      requestor: visitor.requestor,
      status: visitor.status,
      DateOfVisit: visitor.DateOfVisit,
      reasonOfVisiting: visitor.reasonOfVisiting,
      fingerIndex1: visitor.fingerIndex1,
      fingerIndex2: visitor.fingerIndex2,
      cardIdNumber: visitor.cardIdNumber,
      personalPassword: visitor.personalPassword,
      email: visitor.email,
      address: visitor.address,
      gender: visitor.gender,
      status: visitor.status,
      file: visitor.file
    };

    const formData = new FormData();
    appendFormData(formData, vistorTosend);

    console.log(vistorTosend);
    try {
      const response = await addVisitorApi(formData);
      navigateToProfile();
      console.log('Visitor added successfully', response);
      showToasterMessage('Visitor added successfully!', 'success');
        // alert('Visitor added successfully!');
    } catch (error) {
      console.error('Error adding visitor:', error);
      navigateToProfile();
      showToasterMessage('An error occurred while adding the visitor. Please try again.', 'error');
        // alert('An error occurred while adding the visitor. Please try again.');
    }
  }

  
  let trueAccessibleRooms = [];
  let accessibleRooms = [];

  onMount(async () => {
    const fileInput = document.getElementById('profile-pic');
    fileInput.addEventListener('change', handleFileInputChange);

    await fetchLocations();

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
      <input type="text" id="phone-number" maxlength="11" placeholder="03XX XXXXXXX" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={visitor.mobileNumber} on:input="{restrictInput}" on:blur="{handleBlur}">
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
        Date of Visit:
      </label>
      <input type="date" id="date-of-visit" placeholder="Date of visit" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={visitor.DateOfVisit} on:blur="{handleBlur}">
      <span id="date-of-visit-error" class="text-red-600 text-xs" style="display: none;"></span>
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
        CNIC #:
      </label>
      <input type="text" id="card-id" maxlength="13" placeholder="XXXXX XXXXXXX X" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={visitor.visitorID} on:input="{restrictInput}" on:blur="{handleBlur}">
      <span id="card-id-error" class="text-red-600 text-xs" style="display: none;"></span>
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

    <div class="relative mb-3 mr-4">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="date-of-birth">
        Visit start time:
      </label>
      <input type="time" id="start-time" placeholder="Start time" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={visitor.startTime} on:blur="{handleBlur}">
      <span id="start-time-error" class="text-red-600 text-xs" style="display: none;"></span>
    </div>

    <div class="relative mb-3">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="date-of-birth">
        Visit start time:
      </label>
      <input type="time" id="end-time" placeholder="End time" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={visitor.endTime} on:blur="{handleBlur}">
      <span id="end-time-error" class="text-red-600 text-xs" style="display: none;"></span>
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