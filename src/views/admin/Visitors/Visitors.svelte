<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { addVisitorApi, getAllLocationsApi } from '../../../services/api';
  import MultiSelect from '../../../components/Dropdowns/MultiSelect.svelte';
  import Toast from '../../../components/Confirmation/Toast.svelte';

  export let color = "light";
  
  let file = null;

  let visitor = {
    name: '',
    mobileNumber: '',
    locations: [],
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

  async function handleSubmit() {
    let valid = true;
    if (!visitor.name) {
      document.getElementById('name-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('name-error').style.display = 'none';
    }
    if (!visitor.mobileNumber || visitor.mobileNumber.length !== 11) {
      document.getElementById('phone-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('phone-error').style.display = 'none';
    }
    if (!visitor.locations.length) {
      document.getElementById('location-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('location-error').style.display = 'none';
    }
    if (!visitor.address) {
      document.getElementById('address-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('address-error').style.display = 'none';
    }
    if (!visitor.cardIdNumber) {
      document.getElementById('cardIdNumber-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('cardIdNumber-error').style.display = 'none';
    }
    if (!visitor.reasonOfVisiting) {
      document.getElementById('reasonOfVisiting-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('reasonOfVisiting-error').style.display = 'none';
    }
    if (!validateEmail(visitor.email)) {
      document.getElementById('email-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('email-error').style.display = 'none';
    }

    if (valid) {
      visitor.requestor = "Admin";
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
        // navigatetoVisitor();
        // alert('Visitor added successfully!');
      } catch (error) {
        console.error('Error adding visitor:', error);
        showToasterMessage('An error occurred while adding the visitor. Please try again.', 'error');
        // alert('An error occurred while adding the visitor. Please try again.');
      }
    }
  }

  function navigatetoVisitor() {
      navigate('/admin/visitorslist');
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
    <img id="profile-image" src="{image}" alt="Default Image" style="max-width: 200px; max-height: 200px;" />
    <input type="file" accept="image/*" id="profile-pic" style="display: none" />
    <label for="profile-pic" class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 mt-4 mb-8 cursor-pointer">Upload</label>
  </div>

  <div class="divider"></div>

  <div class="flex justify-between mb-4">
    <div>
      <label for="filterName">Name:</label>
      <br>
      <input type="text" id="filterName" name="filterName" class="filter-input" placeholder="Name" bind:value="{visitor.name}">
      <span id="name-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
    <div>
      <label for="filterDepartment">Mobile Number:</label>
      <br>
      <input type="text" id="filterDepartment" name="filterDepartment" class="filter-input" placeholder="Mobile Number" bind:value="{visitor.mobileNumber}">
      <span id="phone-error" class="text-red-600 text-xs" style="display: none;">* Mobile Number must be 11 digits</span>
    </div>
    <div>
      <label for="filterPosition">Location:</label>
      <br>
      <MultiSelect bind:selectedOptions="{visitor.locations}" options="{accessibleRooms}" placeholder="Select Locations" />
      <span id="location-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
  </div>

  <div class="flex justify-between mb-4">
    <div>
      <label for="filterPosition">Email:</label>
      <br>
      <input type="text" id="filterPosition" name="filterPosition" class="filter-input" placeholder="Email" bind:value="{visitor.email}">
      <span id="email-error" class="text-red-600 text-xs" style="display: none;">* Invalid Email Format</span>
    </div>
    <div>
      <label for="dateOfBirth">Date of Birth:</label>
      <br>
      <input type="date" id="dateOfBirth" name="dateOfBirth" class="filter-input" placeholder="Date of Birth" bind:value="{visitor.dateOfBirth}">
    </div>
    <div>
      <label for="filterActive">Gender:</label>
      <br>
      <select id="filterActive" name="filterActive" class="filter-input" bind:value="{visitor.gender}">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Prefer Not To Say</option>
      </select>
    </div>
  </div>

  <div class="flex justify-between mb-4">
    <div class="w-full">
      <label for="address">Address:</label>
      <br>
      <input type="text" id="address" name="address" class="w-full" placeholder="Address" bind:value="{visitor.address}">
      <span id="address-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
  </div>

  <div class="flex justify-start mb-4">
    <div>
      <label for="cardIdNumber">Card ID Number:</label>
      <br>
      <input type="text" id="cardIdNumber" name="cardIdNumber" class="filter-input" placeholder="Card ID Number" bind:value="{visitor.cardIdNumber}">
      <span id="cardIdNumber-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
    <div class="ml-12">
      <label for="filterreasonForVisiting">Reason for visiting:</label>
      <br>
      <textarea id="filterreasonForVisiting" name="filterreasonForVisiting" class="filter-input" placeholder="Reason for visiting" bind:value="{visitor.reasonOfVisiting}"></textarea>
      <span id="reasonOfVisiting-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
    </div>
  </div>

  <div class="flex justify-between mb-4">
    <div>
      <label for="fingerIndex1">Finger Index 1:</label>
      <br>
      <input type="text" id="fingerIndex1" name="fingerIndex1" class="filter-input1" placeholder="Finger Index 1" bind:value="{visitor.fingerIndex1}">
    </div>
    <div class="w-1/3 px-3">
      <label for="fingerIndex2">Finger Index 2:</label>
      <br>
      <input type="text" id="fingerIndex2" name="fingerIndex2" class="filter-input1" placeholder="Finger Index 2" bind:value="{visitor.fingerIndex2}">
    </div>
    <div class="w-1/3 pr-15 pt-6">
      <input type="checkbox" id="isFingerAdded" name="isFingerAdded" class="filter-checkbox" bind:checked="{visitor.isFingerAdded}">
      <label for="isFingerAdded">Is Finger Added</label>
    </div>
  </div>
  <div class="flex justify-end mb-4">
    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={handleSubmit}>
      Submit
    </button>
  </div>
</div>
