<script>
  import { navigate } from 'svelte-routing';
  import AuthNavbar from "components/Navbars/AuthNavbar.svelte";
  import Footer from "components/Footers/Footer.svelte";
  import Toast from '../../components/Confirmation/Toast.svelte';
  import { writable, get } from 'svelte/store';
  export let color = "light";
  import { addLeaveApi } from '../../services/api';

  const team2 = "/assets/img/10.jpg";
  let gradientBackground = `background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);`;

  let editModal = false;
  function openModal() { editModal = true; }
  function closeModal() { editModal = false; request.dateFrom = ''; request.dateTo = ''; request.reason = ''; request.timeStamp = ''; }
  let showToaster = false;
  let toasterMessage = '';
  let toasterType = '';
  function showToasterMessage(message, type) { toasterMessage = message; toasterType = type; showToaster = true; setTimeout(() => { showToaster = false; }, 3000); }
  
  let currentMonthDate = new Date();
  $: currentMonth = currentMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  
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

  $: { 
    const { presentCount, absentCount } = getAttendanceCounts(currentMonthDate);
    attendanceCount = presentCount;
    absenceCount = absentCount;
  }

  let attendanceCount = 0;
  let absenceCount = 0;

  function changeMonth(offset) {
    currentMonthDate.setMonth(currentMonthDate.getMonth() + offset);
    currentMonthDate = new Date(currentMonthDate);  // Ensure reactivity
  }

  function getAttendanceCounts(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    let presentCount = 0;
    let absentCount = 0;

    get(attendanceData).forEach((attendance) => {
      const attendanceDate = new Date(attendance.date);
      if (attendanceDate.getFullYear() === year && attendanceDate.getMonth() === month) {
        if (attendance.status === 'Present') {
          presentCount++;
        } else if (attendance.status === 'Absent') {
          absentCount++;
        }
      }
    });

    return { presentCount, absentCount };
  }

  function getDaysInMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const numDays = new Date(year, month + 1, 0).getDate();
    const days = [];

    const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ date: null, currentMonth: false });
    }

    for (let i = 1; i <= numDays; i++) {
      const currentDate = new Date(year, month, i);
      const attendance = get(attendanceData).find(
        (att) => new Date(att.date).toDateString() === currentDate.toDateString()
      );
      days.push({ date: currentDate, currentMonth: true, attendance: attendance });
    }

    const lastDayOfWeek = (new Date(year, month, numDays).getDay() + 6) % 7;
    for (let i = lastDayOfWeek + 1; i < 7; i++) {
      days.push({ date: null, currentMonth: false });
    }

    return days;
  }

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  function navigateToLeave() {
    navigate('/user/leaveform');
  }

  function navigateToVisitor() {
    navigate('/user/visitors');
  }

  let currentTime = new Date();

  let request = {
    id: '',
    name: '',
    email: '',
    dateFrom: '',
    dateTo: '',
    reason: '',
    timeStamp: ''
  };

  let fromDate, toDate;
  let errors = {
    id: '',
    name: '',
    email: '',
    dateFrom: '',
    dateTo: '',
    reason: ''
  };

  function validate() {
    fromDate = new Date(request.dateFrom);
    toDate = new Date(request.dateTo);

    errors.dateFrom = request.dateFrom === '' ? 'Start date is required.' : '';
    errors.dateTo = request.dateTo === '' ? 'End date is required.' : fromDate > toDate ? 'Date To is before Date From.' : '';
    errors.reason = request.reason === '' ? 'Reason is required.' : '';

    return !Object.values(errors).some(error => error !== '');
  }

  async function handleSubmit() {
    
    if (!validate()) {
      return;
    }

    const leaveObj = {
      employee: "66518d0e1a8a495f67367f88",
      status: "pending",
      reason: request.reason,
      fromDate: request.dateFrom,
      toDate: request.dateTo
    };

    console.log(leaveObj);

    try {
      const msg = await addLeaveApi(leaveObj, false);
      console.log(msg);
      showToasterMessage('Leave request submitted successfully!', 'success');
      closeModal();
    } catch (error) {
      console.error('Failed to submit leave request:', error);
      showToasterMessage('An error occurred while submitting leave request. Please try again.', 'error');
    }
  }

  function navigateToProfile() {
    navigate('/user/profile');
  }
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
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
          <div class="px-6">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                <div class="relative">
                  <img alt="..." src={team2} class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 max-w-150-px" style="left: 50%; transform: translateX(-50%);" />
                </div>
              </div>
              <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                <div class="py-6 px-3 mt-32 sm:mt-0">
                  <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={navigateToProfile}>
                    Back
                  </button>
                  <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" on:click={openModal}>
                    Request A Leave
                  </button>
                </div>
              </div>
              {#if editModal}
                <div class="modal">
                  <div class="modal-content">
                    <div class="rounded-t mb-0 px-4 py-10 border-0">
                      <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                          <h3 class="font-semibold text-lg text-blueGray-700">
                            Leave Requests
                          </h3>
                        </div>
                      </div>
                      <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                          <!-- <p>{selectedEmployee.employeeID}</p> -->
                        </div>
                      </div>
                      <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                          <!-- <p>{selectedEmployee.employeeID}</p> -->
                        </div>
                      </div>
                      <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                          <!-- <p>{selectedEmployee.employeeID}</p> -->
                        </div>
                      </div>
                    </div>
                    <div class="block w-full overflow-x-auto">
                      <div class="px-4 py-5 flex-auto">
                        <div class="flex flex-wrap">
                          <div class="w-full lg:w-6/12 px-4">
                            <div class="relative mb-3">
                              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 {errors.dateFrom ? 'label-required' : ''}" for="dateFrom">
                                  From:
                              </label>
                              <input type="date" id="dateFrom" placeholder="Date & Time From" class="custom-filter-input {errors.dateFrom ? 'input-error' : ''}" bind:value={request.dateFrom}>
                              {#if errors.dateFrom}<p class="text-red-500 text-xs italic">{errors.dateFrom}</p>{/if}
                          </div>
                          <div class="relative mb-3">
                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 {errors.dateTo ? 'label-required' : ''}" for="dateTo">
                                To:
                            </label> <!-- Make sure this tag is properly closed -->
                            <input type="date" id="dateTo" placeholder="Date & Time To" class="custom-filter-input {errors.dateTo ? 'input-error' : ''}" bind:value={request.dateTo}>
                            {#if errors.dateTo}<p class="text-red-500 text-xs italic">{errors.dateTo}</p>{/if}
                        </div> 
                          </div>
                          <div class="w-full lg:w-6/12 px-4">
                            <div class="relative mb-3">
                              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 {errors.reason ? 'label-required' : ''}" for="reason">
                                  Reason:
                              </label>
                              <textarea id="reason" name="reason" class="custom-filter-input resize-none {errors.reason ? 'input-error' : ''}" placeholder="Reason:" bind:value={request.reason}></textarea>
                              {#if errors.reason}<p class="text-red-500 text-xs italic">{errors.reason}</p>{/if}
                          </div>
                          </div>
                        </div>
                        <div class="flex justify-end mb-4">
                          <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={handleSubmit}>
                              Submit
                          </button>
                          <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={closeModal}>
                              Cancel
                          </button>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              {/if}
              <div class="w-full lg:w-4/12 px-4 lg:order-1">
                <div class="flex justify-center py-4 lg:pt-4 pt-8">
                  <div class="mr-4 p-3 text-center">
                    <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {attendanceCount}
                    </span>
                    <span class="text-sm text-blueGray-400">Attendance</span>
                  </div>
                  <div class="mr-4 p-3 text-center">
                    <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {absenceCount}
                    </span>
                    <span class="text-sm text-blueGray-400">Absences</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div class="flex flex-wrap justify-center">
                <div class="w-full lg:w-9/12 px-4">
                  <h3 class="text-2xl font-semibold leading-normal mb-2 text-blueGray-700">View Attendance</h3>
                  <div class="flex justify-between mb-4">
                    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={() => changeMonth(-1)}>
                      Previous
                    </button>
                    <span class="text-lg font-semibold leading-normal mb-2 text-blueGray-700">{currentMonth}</span>
                    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={() => changeMonth(1)}>
                      Next
                    </button>
                  </div>
                  <div class="attendance-calendar">
                    {#each daysOfWeek as day}
                      <div class="attendance-header">{day}</div>
                    {/each}
                    {#each getDaysInMonth(currentMonthDate) as { date, currentMonth, attendance }}
                      {#if date}
                        <div class="attendance-day rounded {date.getDay() === 6 || date.getDay() === 0 ? 'weekend' : ''} {currentMonth ? '' : 'not-current-month'} {attendance ? attendance.status.toLowerCase() : ''}">
                          {date.getDate()}
                        </div>
                      {:else}
                        <div class="attendance-day empty"></div>
                      {/if}
                    {/each}
                  </div>
                  <div class="attendance-legend mt-4">
                    <span class="attendance-legend-item present"></span> Present
                    <span class="attendance-legend-item absent"></span> Absent
                    <span class="attendance-legend-item weekend"></span> Weekend
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>
