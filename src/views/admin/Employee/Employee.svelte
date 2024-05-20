<script>
    import { navigate } from 'svelte-routing';
    const edit1 = "../assets/img/icons8-edit-24.png"
      const view1 = "../assets/img/icons8-eye-24.png"
      let selectedEmployee = null;
      let showModal = false;
      let editModal = false;
      export let color = "light";
      
      let employees = [
      { id: 1, name: 'John Doe', phoneNumber: '123-456-7890', location: 'New York', department: 'HR', designation: 'Manager', employeeType: 'Full-time', gender: 'Male', email: 'john@example.com', address: '123 Main St, New York', dateOfBirth: '1980-05-15', cardIdNumber: 'A123456', personalPassword: 'password123', fingerIndex1: '123456', fingerIndex2: '654321', isFingerAdded: true, salary: 70000, active: true },
      { id: 2, name: 'Jane Smith', phoneNumber: '987-654-3210', location: 'Los Angeles', department: 'Marketing', designation: 'Executive', employeeType: 'Full-time', gender: 'Female', email: 'jane@example.com', address: '456 Elm St, Los Angeles', dateOfBirth: '1985-08-20', cardIdNumber: 'B654321', personalPassword: 'pass123word', fingerIndex1: '654321', fingerIndex2: '123456', isFingerAdded: true, salary: 60000, active: false },
      { id: 3, name: 'Bob Johnson', phoneNumber: '555-123-4567', location: 'Chicago', department: 'Sales', designation: 'Representative', employeeType: 'Full-time', gender: 'Male', email: 'bob@example.com', address: '789 Oak St, Chicago', dateOfBirth: '1975-10-10', cardIdNumber: 'C789012', personalPassword: 'secret123', fingerIndex1: '789012', fingerIndex2: '', isFingerAdded: false, salary: 55000, active: true },
      { id: 4, name: 'Alice Brown', phoneNumber: '333-555-9999', location: 'San Francisco', department: 'IT', designation: 'Developer', employeeType: 'Full-time', gender: 'Female', email: 'alice@example.com', address: '321 Pine St, San Francisco', dateOfBirth: '1990-12-25', cardIdNumber: 'D345678', personalPassword: 'securepwd', fingerIndex1: '', fingerIndex2: '', isFingerAdded: false, salary: 75000, active: true },
      { id: 5, name: 'Mike Davis', phoneNumber: '444-777-2222', location: 'Seattle', department: 'Finance', designation: 'Analyst', employeeType: 'Full-time', gender: 'Male', email: 'mike@example.com', address: '567 Cedar St, Seattle', dateOfBirth: '1988-03-05', cardIdNumber: 'E901234', personalPassword: 'mysecretpass', fingerIndex1: '', fingerIndex2: '', isFingerAdded: false, salary: 65000, active: false },
     ];
  
    let filters = {
      search: '',
      active: ''
    };
  
    let filteredEmployees = employees;
  
    function applyFilters() {
      filteredEmployees = employees.filter(employee => {
        const matchesSearch = filters.search === '' || 
          employee.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          employee.department.toLowerCase().includes(filters.search.toLowerCase()) ||
          employee.designation.toLowerCase().includes(filters.search.toLowerCase());
  
        const matchesActive = filters.active === '' || 
          (filters.active === 'true' && employee.active) ||
          (filters.active === 'false' && !employee.active);
  
        return matchesSearch && matchesActive;
      });
    }
  
    function clearFilters() {
      filters.search = '';
      filters.active = '';
      filteredEmployees = employees;
    }

  
    function navigateToAddEmployee() {
      navigate('/admin/addemployee');
    }
  
    async function editEmployee()
      {
        if (validateInputs()) {
        if (selectedEmployee) {
          try {
            const response = await fetch(`/api/updateEmployee/${selectedEmployee.id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ active: active ? 'Yes' : 'No' })
            });
  
            if (response.ok) {
              closeModal();
            } else {
              const errorData = await response.json();
              alert(`Error: ${errorData.message}`);
            }
          } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updating the employee. Please try again.');
          }
        }
      }
      }
  
      function viewEmployee(employeeId) {
      selectedEmployee = employees.find(employee => employee.id === employeeId);
      showModal = true;
  }
  
  function openEditModal(employeeId) {
    selectedEmployee = employees.find(employee => employee.id === employeeId);
    editModal = true
    }
  
  function closeModal()
  {
    showModal = false;
    editModal = false;
  }
  
  function validateInputs() {
    let isValid = true;
  
    // Name
    if (!selectedEmployee.name) {
      document.getElementById('name-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('name-error').style.display = 'none';
    }
  
    // Phone Number
    if (!selectedEmployee.phoneNumber) {
      document.getElementById('phone-number-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('phone-number-error').style.display = 'none';
    }
    // Phone Number Format
  if (!/^\d{11}$/.test(selectedEmployee.phoneNumber)) {
    document.getElementById('phone-number-format-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('phone-number-format-error').style.display = 'none';
  }
  
    // Location
    if (!selectedEmployee.location) {
      document.getElementById('location-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('location-error').style.display = 'none';
    }
  
    // Department
    if (!selectedEmployee.department) {
      document.getElementById('department-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('department-error').style.display = 'none';
    }
  
    // Designation
    if (!selectedEmployee.designation) {
      document.getElementById('designation-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('designation-error').style.display = 'none';
    }
  
    // Gender
    if (!selectedEmployee.gender) {
      document.getElementById('gender-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('gender-error').style.display = 'none';
    }
  
    // Email
    if (!selectedEmployee.email) {
      document.getElementById('email-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('email-error').style.display = 'none';
    }
  
    // Email Format
  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(selectedEmployee.email)) {
    document.getElementById('email-format-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('email-format-error').style.display = 'none';
  }
  
    // Address
    if (!selectedEmployee.address) {
      document.getElementById('address-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('address-error').style.display = 'none';
    }
  
    // Date of Birth
    if (!selectedEmployee.dateOfBirth) {
      document.getElementById('date-of-birth-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('date-of-birth-error').style.display = 'none';
    }
  
    // Card ID
    if (!selectedEmployee.cardIdNumber) {
      document.getElementById('card-id-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('card-id-error').style.display = 'none';
    }
  
    // Personal Password
    if (!selectedEmployee.personalPassword) {
      document.getElementById('personal-password-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('personal-password-error').style.display = 'none';
    }
  
    // Salary
    if (!selectedEmployee.salary) {
      document.getElementById('salary-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('salary-error').style.display = 'none';
    }
  
    // Active
    if (!selectedEmployee.active) {
      document.getElementById('active-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('active-error').style.display = 'none';
    }
  
    // Employee Type
    if (!selectedEmployee.employeeType) {
      document.getElementById('employee-type-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('employee-type-error').style.display = 'none';
    }
  
    return isValid;
  }
  </script>
  
  
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
    <!-- Add Employee Button -->
    <div class="flex justify-end mb-4">
      <div class="relative w-full px-4 max-w-full flex-grow flex-1">
        <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
          Employee Information
        </h3>
      </div>
      <button class=" bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={navigateToAddEmployee}>
        Add Employee
      </button>
  </div>
  
    <!-- Search Bar -->
    <div class="flex justify-between mb-4">
      <div class="relative mb-3 w-full mr-6">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="searchBar">Search:</label>
        <input type="text" id="searchBar" name="searchBar" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Search by ID, Name, Department, Designation" bind:value={filters.search} />
      </div>
      <div class="relative mb-3 w-full">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"  for="filterActive">Active:</label>
        <select id="filterActive" name="filterActive" class="border-0 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={filters.active}>
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    </div>
  
    <!-- Buttons -->
    <div class="flex justify-end mb-1">
      <button on:click={applyFilters} class="bg-green-600 active:bg-green-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mr-2">Apply</button>
      <button on:click={clearFilters} class="bg-red-600 text-white active:bg-red-800 uppercase font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">Clear</button>
    </div>
  
    <!-- Divider -->
    <hr class="my-2">
  
    <!-- Table -->
    <table class="min-w-full">
      <thead>
        <tr>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">#</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Employee</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Department</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Designation</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Active</th>
          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 custom-text border-red-600'}">Action</th>
        </tr>
      </thead>
      <tbody>
        {#each filteredEmployees as employee, index}
          <tr>
            <td class="table-data ">{index + 1}</td>
            <td class="table-data font-bold text-blueGray-600">{employee.name}</td>
            <td class="table-data">{employee.department}</td>
            <td class="table-data">{employee.designation}</td>
            <td class="table-data">{employee.active ? 'Yes' : 'No'}</td>
            <td class='table-data'>
              <div class="flex">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <i class="fas fa-edit mr-2 text-sm cursor-pointer" on:click={openEditModal(employee.id)}></i>
                <i class="fas fa-eye mr-2 text-sm cursor-pointer" on:click={viewEmployee(employee.id)}></i>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  
    {#if showModal}
        <div class="modal">
          <div class="modal-content">
            <div class="rounded-t mb-0 px-4 py-10 border-0">
              <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 class="font-semibold text-lg text-blueGray-700">
                    Employee Details
                  </h3>
                </div>
              </div>
            </div>
            <div class="block w-full overflow-x-auto">
              <div class="px-4 py-5 flex-auto">
                <div class="flex">
                  <div class="w-full lg:w-6/12 px-4 mb-6">
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-name">
                        Name:
                      </label>
                      <p>{selectedEmployee.name}</p>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Phone Number:
                      </label>
                      <p>{selectedEmployee.phoneNumber}</p>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Location:
                      </label>
                      <p>{selectedEmployee.location}</p>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-id">
                        Department:
                      </label>
                      <p>{selectedEmployee.department}</p>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Designation:
                      </label>
                      <p>{selectedEmployee.designation}</p>
                    </div>
                  </div>
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Gender:
                      </label>
                      <p>{selectedEmployee.gender}</p>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Email:
                      </label>
                      <p>{selectedEmployee.email}</p>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Address:
                      </label>
                      <p>{selectedEmployee.address}</p>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Date of birth:
                      </label>
                      <p>{selectedEmployee.dateOfBirth}</p>
                    </div>
                  </div>
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Card ID:
                      </label>
                      <p>{selectedEmployee.cardIdNumber}</p>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Personal Password:
                      </label>
                      <p>{selectedEmployee.personalPassword}</p>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Finger Index 1:
                      </label>
                      <p>{selectedEmployee.fingerIndex1}</p>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Finger Index 2:
                      </label>
                      <p>{selectedEmployee.fingerIndex2}</p>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Finger Added:
                      </label>
                      <p>{selectedEmployee.isFingerAdded ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Salary:
                      </label>
                      <p>{selectedEmployee.salary}</p>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Active:
                      </label>
                      <p>{selectedEmployee.active ? 'Yes' : 'No'}</p>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Employee Type:
                      </label>
                      <p>{selectedEmployee.employeeType}</p>
                    </div>
                  </div>
                </div>
                <div class="flex justify-end">
                  <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={closeModal}>
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/if}
  
        {#if editModal}
        <div class="modal">
          <div class="modal-content">
            <div class="rounded-t mb-0 px-4 py-10 border-0">
              <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 class="font-semibold text-lg text-blueGray-700">
                    Edit Employee
                  </h3>
                </div>
              </div>
            </div>
            <div class="block w-full overflow-x-auto">
              <div class="px-4 py-5 flex-auto">
                <div class="flex">
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-name">
                        Name:
                      </label>
                      <input type="text" id="name" placeholder="Name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.name}>
                      <span id="name-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Phone Number:
                      </label>
                      <input type="number" id="phone-number" placeholder="03xx-xxxxxxx" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.phoneNumber}>
                      <span id="phone-number-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                      <span id="phone-number-format-error" class="text-red-600 text-xs" style="display: none;">Enter correct number - 11 digits</span>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Location:
                      </label>
                      <input type="text" id="location" placeholder="Location" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.location}>
                      <span id="location-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-id">
                        Department:
                      </label>
                      <input type="text" id="department" placeholder="Department" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.department}>
                      <span id="department-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Designation:
                      </label>
                      <input type="text" id="designation" placeholder="Designation" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.designation}>
                      <span id="designation-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                    </div>
                  </div>
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Gender:
                      </label>
                      <input type="text" id="gender" placeholder="Gender" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.gender}>
                      <span id="gender-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Email:
                      </label>
                      <input type="text" id="email" placeholder="Email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.email}>
                      <span id="email-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                      <span id="email-format-error" class="text-red-600 text-xs" style="display: none;">Email format incorrect</span>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Address:
                      </label>
                      <input type="text" id="address" placeholder="Address" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.address}>
                      <span id="address-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Date of birth:
                      </label>
                      <input type="date" id="date-of-birth" placeholder="Date of birth" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.dateOfBirth}>
                      <span id="date-of-birth-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                    </div>
                  </div>
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Card ID:
                      </label>
                      <input type="text" id="card-id" placeholder="Card ID" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.cardIdNumber}>
                      <span id="card-id-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Personal Password:
                      </label>
                      <input type="text" id="personal-password" placeholder="Personal Password" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.personalPassword}>
                      <span id="personal-password-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>                  
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Finger Index 1:
                      </label>
                      <input type="number" id="finger-index-1" placeholder="Finger Index 1" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.fingerIndex1}>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Finger Index 2:
                      </label>
                      <input type="number" id="finger-index-2" placeholder="Finger Index 2" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.fingerIndex2}>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Finger Added:
                      </label>
                      <label class="switch">
                        <input type="checkbox" id="status" class="hidden" bind:checked={selectedEmployee.isFingerAdded}>
                        <span class="slider round"></span> 
                      </label>
                      <span id="finger-added-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                    </div>
                  </div>
                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Salary:
                      </label>
                      <input type="number" id="salary" placeholder="Salary" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.salary}>
                      <span id="salary-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Active:
                      </label>
                      <input type="text" id="active" placeholder="Active" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.active}>
                      <span id="active-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                    </div>
                    <div class="relative mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="device-ip">
                        Employee Type:
                      </label>
                      <input type="text" id="employee-type" placeholder="Employee Type" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={selectedEmployee.employeeType}>
                      <span id="employee-type-error" class="text-red-600 text-xs" style="display: none;">* Field Required</span>
                    </div>
                  </div>
                </div>
                <div class="flex justify-end">
                  <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"  on:click={editEmployee}>
                    Update
                  </button>
                  <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={closeModal}>
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/if}
  </div>