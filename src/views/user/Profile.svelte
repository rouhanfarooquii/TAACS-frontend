<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import AuthNavbar from "components/Navbars/AuthNavbar.svelte";
  import QrCode from 'components/QR/QRCode.svelte';
  import Footer from "components/Footers/Footer.svelte";
  import { writable } from 'svelte/store';
  import { getOneEmployeeApi, getOneAttendance } from '../../services/api';
  import moment from 'moment';

  const team2 = "/assets/img/10.jpg";
  export let location;

  let employee = writable(null);
  let attendanceData = writable([]);
  let totalAttendance = 0;
  let totalAbsences = 0;
  let totalLate = 0;
  let showSalary = false;
  let carId = '';

  let processedImagePath = '';

  let gradientBackground = `
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  `;

  function toggleSalaryVisibility() {
    showSalary = !showSalary;
  }

  function navigateToVisitor() {
    navigate('/user/visitors');
  }

  function navigateToAttendance() {
    navigate('/user/attendance');
  }

  async function fetchEmployeeData() {
    try {
      const fetchedEmployee = await getOneEmployeeApi();
      employee.set(fetchedEmployee);
      console.log('Fetched employee data:', fetchedEmployee);
      processImagePath(fetchedEmployee.imagePath);
      carId = fetchedEmployee._id;
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  }

  async function fetchAttendanceData() {
    const start = moment().startOf('month').format('YYYY-MM-DD');
    const end = moment().format('YYYY-MM-DD');
    try {
      const attendances = await getOneAttendance(start, end);
      attendanceData.set(attendances);
      console.log('Fetched attendance data:', attendances);

      totalAttendance = attendances.filter(record => record.attendance === 'Present').length;
      totalAbsences = attendances.filter(record => record.attendance === 'Absent').length;
      totalLate = attendances.filter(record => record.attendance === 'Late').length;
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  }

  // Function to process the image path
  function processImagePath(imagePath) {
    if (imagePath) {
      processedImagePath = imagePath.replace(/\\/g, '/');
      processedImagePath = "http://localhost:3000/" + processedImagePath
    } else {
      processedImagePath = team2;
    }
  }

  // Fetch data on component mount
  onMount(() => {
    fetchEmployeeData();
    fetchAttendanceData();
  });


</script>


<div>
  <main class="profile-page">
    <section class="relative block h-500-px">
      <div
        class="absolute top-0 w-full h-full bg-center bg-cover"
        style={gradientBackground}
      >
        <span
          id="blackOverlay"
          class="w-full h-full absolute opacity-50 bg-black"
        ></span>
      </div>
    </section>

    <div class="container mx-auto px-4">
      <div class="relative flex flex-col min-w-0 break-words bg-white mb-6 shadow-xl rounded-lg -mt-64 mx-auto" style="width: 60%;"> 
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <!-- Picture Section -->
            {#if $employee}
            <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
              <div class="relative">
                <img
                  alt="..."
                  src={processedImagePath}
                  class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
            <!-- Divider -->
            <div class="w-0 lg:w-1/12 px-4 lg:order-1 flex justify-center items-center">
              <div class="h-32 border-r border-blueGray-200"></div>
            </div>
            <!-- Attendance, Absences, and Late Section -->
            <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center flex flex-col justify-between">
              <div class="flex justify-center mt-12">
                <div class="absolute top-0 right-0 mt-33 mr-4">
                  <div class="flex justify-end space-x-4">
                    <button
                      class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                      type="button" on:click={navigateToVisitor}>
                      File Visitor Request
                    </button>
                    <button
                      class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                      type="button" on:click={navigateToAttendance}>
                      View Attendance
                    </button>
                  </div>
                  <div class="flex justify-end space-x-4 mt-4">
                    <div class="box p-3 text-center bg-white shadow rounded" style="width: 110px;">
                      <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {totalAttendance}
                      </span>
                      <span class="text-sm text-blueGray-400">Attendance</span>
                    </div>
                    <div class="box p-3 text-center bg-white shadow rounded" style="width: 110px;">
                      <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {totalAbsences}
                      </span>
                      <span class="text-sm text-blueGray-400">Absences</span>
                    </div>
                    <div class="box p-3 text-center bg-white shadow rounded" style="width: 110px;">
                      <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {totalLate}
                      </span>
                      <span class="text-sm text-blueGray-400">Late</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Details Section -->
            <div class="w-full lg:w-4/12 px-4 lg:order-1">
              <div class="mt-12">
                <h3 class="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {$employee.name}
                </h3>
                <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold lowercase">
                  <i class="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                  {$employee.email}
                </div>
                <div class="mb-2 text-blueGray-600 mt-10">
                  <i class="fas fa-id-card mr-2 text-lg text-blueGray-400"></i>
                  {$employee.employeeID}
                </div>
                <div class="mb-2 text-blueGray-600">
                  <i class="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                  {$employee.designation.title} - {$employee.department.title}
                </div>
                <div class="mb-2 text-blueGray-600">
                  <i class="fas fa-money-bill-wave mr-2 text-lg text-blueGray-400"></i>
                  {showSalary ? `PKR ${$employee.salary}` : '••••••'}
                </div>
                <div class="mb-2 text-blueGray-600">
                  <i class="fas fa-fingerprint mr-2 text-lg text-blueGray-400"></i>
                  {showSalary ? $employee.cardIdNumber : '••••••'}
                  <i
                    class="ml-2 text-blueGray-600 cursor-pointer"
                    on:click={toggleSalaryVisibility}
                  >
                    {#if showSalary}
                      <i class="fas fa-eye-slash"></i>
                    {:else}
                      <i class="fas fa-eye"></i>
                    {/if}
                  </i>
                </div>
                <div class="mb-2 text-blueGray-600">
                  <i class="fas fa-lock mr-2 text-lg text-blueGray-400"></i>
                  {showSalary ? $employee.personalPassword : '••••••'}
                </div>
                <div class="mb-2 text-blueGray-600">
                  <i class="fas fa-clock mr-2 text-lg text-blueGray-400"></i>
                  {$employee.shiftTiming.shiftName} <br/>
                  ({$employee.shiftTiming.startTime} - {$employee.shiftTiming.endTime})
                </div>
                <div class="mb-2 text-blueGray-600">
                  <i class="fas fa-location-arrow mr-2 text-lg text-blueGray-400"></i>
                  {#if $employee.locations.length > 0} Accessible Locations:
                    {#each $employee.locations as location, index}
                      {location.title}{#if index < $employee.locations.length - 1}, {/if}
                    {/each}
                  {:else}
                    No Locations
                  {/if}
                </div>
              </div>
            </div>
            {/if}
          </div>
          <!-- Description and QR Code Section -->
          <div class="mt-4 py-4 border-blueGray-200 text-center">
            <div class="flex flex-wrap justify-between items-center">
              <!-- QR Code Section -->
              <div class="absolute bottom-0 right-0 p-4">
                <h4 class="text-sm leading-normal mt-0 text-blueGray-400 font-bold uppercase">Parking QR</h4>
                <QrCode data={carId} class="w-64 h-64" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
      
  </main>
</div>
