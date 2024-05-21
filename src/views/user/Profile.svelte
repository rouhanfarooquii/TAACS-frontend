<script>
  import { navigate } from 'svelte-routing';
  import AuthNavbar from "components/Navbars/AuthNavbar.svelte";
  import QrCode from 'components/QR/QRCode.svelte';
  import Footer from "components/Footers/Footer.svelte";
  import { writable } from 'svelte/store';

  const team2 = "/assets/img/10.jpg";
  const qrCode = "/assets/img/sample-qr.png";
  export let location;

  let employee = {    
    id: 12,
    name: 'Lisa Nguyen',
    phoneNumber: '777-222-3333',
    location: 'Phoenix',
    department: 'Operations',
    designation: 'Supervisor',
    employeeType: 'Full-time',
    gender: 'Female',
    email: 'lisa@example.com',
    address: '901 Maple St, Phoenix',
    dateOfBirth: '1986-09-10',
    cardIdNumber: 'L789012',
    personalPassword: 'mypassword5678',
    fingerIndex1: '',
    fingerIndex2: '',
    isFingerAdded: false,
    salary: 60000,
    active: false
  };

  let attendanceData = writable([
    { date: '2024-05-01', status: 'Present' },
    { date: '2024-05-02', status: 'Present' },
    { date: '2024-05-03', status: 'Absent' },
    { date: '2024-05-06', status: 'Present' },
    { date: '2024-05-07', status: 'Present' },
    { date: '2024-05-08', status: 'Absent' },
    { date: '2024-05-09', status: 'Present' },
    { date: '2024-05-10', status: 'Present' },
    { date: '2024-05-13', status: 'Absent' },
    { date: '2024-05-14', status: 'Present' },
    { date: '2024-05-15', status: 'Present' },
    { date: '2024-05-16', status: 'Absent' },
    { date: '2024-05-17', status: 'Present' },
    { date: '2024-05-20', status: 'Present' },
    { date: '2024-05-21', status: 'Absent' },
    { date: '2024-05-22', status: 'Present' },
    { date: '2024-05-23', status: 'Present' },
    { date: '2024-05-24', status: 'Absent' },
    { date: '2024-05-27', status: 'Present' },
    { date: '2024-05-28', status: 'Present' },
    { date: '2024-05-29', status: 'Absent' },
    { date: '2024-05-30', status: 'Present' },
    { date: '2024-05-31', status: 'Absent' }
  ]);

  let showSalary = false;

  let gradientBackground = `
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  `;

  function toggleSalaryVisibility() {
    showSalary = !showSalary;
  }

  function navigateToLeave() {
    navigate('/user/leaveform');
  }

  function navigateToAttendance() {
    navigate('/user/attendance');
  }

  // Calculate attendance and absence counts
  let totalAttendance = 0;
  let totalAbsences = 0;

  $: {
    totalAttendance = $attendanceData.filter(record => record.status === 'Present').length;
    totalAbsences = $attendanceData.filter(record => record.status === 'Absent').length;
  }
</script>

<div>
  <AuthNavbar />
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
      <div
        class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
        style="transform: translateZ(0);"
      >
        <svg
          class="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            class="text-blueGray-200 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </section>
    <section class="relative py-16 bg-blueGray-200">
      <div class="container mx-auto px-4">
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
        >
          <div class="px-6">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                <div class="relative">
                  <img
                    alt="..."
                    src={team2}
                    class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                  />
                </div>
              </div>
              <div
                class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"
              >
                <div class="py-6 px-3 mt-32 sm:mt-0">
                  <button
                    class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button" on:click={navigateToAttendance}>
                    View Attendance
                  </button>
                  <button
                    class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button" on:click={navigateToLeave}>
                    Request A Leave
                  </button>
                </div>
              </div>
              <div class="w-full lg:w-4/12 px-4 lg:order-1">
                <div class="flex justify-center py-4 lg:pt-4 pt-8">
                  <div class="mr-4 p-3 text-center">
                    <span
                      class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                    >
                      {totalAttendance}
                    </span>
                    <span class="text-sm text-blueGray-400">Attendance</span>
                  </div>
                  <div class="mr-4 p-3 text-center">
                    <span
                      class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                    >
                      {totalAbsences}
                    </span>
                    <span class="text-sm text-blueGray-400">Absences</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-12">
              <h3
                class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
              >
                {employee.name}
              </h3>
              <div
                class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
              >
                <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                {employee.location}
              </div>
              <div class="mb-2 text-blueGray-600 mt-10">
                <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                {employee.designation} - {employee.department}
              </div>
              <div class="mb-2 text-blueGray-600">
                <i class="fas fa-user-tag mr-2 text-lg text-blueGray-400"></i>
                {employee.employeeType}
              </div>
              <div class="mb-2 text-blueGray-600">
                <i class="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                {employee.email}
              </div>
              <div class="mb-2 text-blueGray-600">
                <i class="fas fa-money-bill-wave mr-2 text-lg text-blueGray-400"></i>
                {showSalary ? `$${employee.salary}` : '******'}
                <button class="ml-2 text-blueGray-600 transparent-button" on:click={toggleSalaryVisibility}>
                  {#if showSalary}
                    <i class="fas fa-eye-slash"></i>
                  {:else}
                    <i class="fas fa-eye"></i>
                  {/if}
                </button>
              </div>
            </div>
            <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div class="flex flex-wrap justify-center">
                <div class="w-full lg:w-9/12 px-4">
                  <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur a nulla id ultricies. 
                    Pellentesque ut turpis dui. Proin ac nisl hendrerit, imperdiet nulla at, volutpat velit. 
                    Sed iaculis justo eu nulla aliquet scelerisque. Quisque a lorem eu orci molestie lobortis. 
                    Mauris vel nulla pharetra, fringilla ante non, ultricies nulla. Nunc consequat euismod nunc, quis scelerisque risus venenatis id. 
                    Vivamus egestas, odio a dictum auctor, dui nisi mattis risus, ut pharetra neque erat quis arcu. 
                    Suspendisse posuere eget sapien sit amet lobortis. Curabitur dapibus facilisis nisi, 
                    molestie ullamcorper tortor eleifend pharetra. Nam quis porttitor diam.
                  </p>
                  <a
                    href="#pablo"
                    on:click={(e) => e.preventDefault()}
                    class="font-normal custom-text"
                  >
                    Show more
                  </a>
                </div>
              </div>
              <div class="flex justify-center mt-6">
                <td>
                  <QrCode data={employee.name.toString()} />
                </td>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</div>
