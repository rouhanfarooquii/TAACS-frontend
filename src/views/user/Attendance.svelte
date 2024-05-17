<script>
  // Core components
  import { navigate } from 'svelte-routing';
  import AuthNavbar from "components/Navbars/AuthNavbar.svelte";
  import Footer from "components/Footers/Footer.svelte";
  import { writable } from 'svelte/store';

  const team2 = "/assets/img/10.jpg";

  let gradientBackground = `
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  `;

  let attendanceCount = 82;
  let absenceCount = 10;
  let lateArrivalCount = 4;

  let currentMonthDate = new Date();
  $: currentMonth = currentMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  let attendanceData = writable([
    { date: '2024-05-01', status: 'Present' },
    { date: '2024-05-02', status: 'Late' },
    { date: '2024-05-03', status: 'Absent' },
    // Add more attendance data as needed
  ]);

  function changeMonth(offset) {
    currentMonthDate.setMonth(currentMonthDate.getMonth() + offset);
    currentMonthDate = new Date(currentMonthDate);  // Ensure reactivity
  }

  function getDaysInMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const numDays = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Adjusting the first day of the week to start from Monday
    const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;

    // Adding empty slots for days before the first day of the current month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ date: null, currentMonth: false });
    }

    // Adding days of the current month
    for (let i = 1; i <= numDays; i++) {
      days.push({ date: new Date(year, month, i), currentMonth: true });
    }

    // Adding empty slots for days after the last day of the current month
    const lastDayOfWeek = (new Date(year, month, numDays).getDay() + 6) % 7;
    for (let i = lastDayOfWeek + 1; i < 7; i++) {
      days.push({ date: null, currentMonth: false });
    }

    return days;
  }

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
              <div class="w-full lg:w-4/12 px-4 lg:order-1">
                <div class="flex justify-center py-4 lg:pt-4 pt-8">
                  <div class="mr-4 p-3 text-center">
                    <span
                      class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                    >
                      {attendanceCount}
                    </span>
                    <span class="text-sm text-blueGray-400">Attendance</span>
                  </div>
                  <div class="mr-4 p-3 text-center">
                    <span
                      class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                    >
                      {absenceCount}
                    </span>
                    <span class="text-sm text-blueGray-400">Absences</span>
                  </div>
                  <div class="lg:mr-4 p-3 text-center">
                    <span
                      class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                    >
                      {lateArrivalCount}
                    </span>
                    <span class="text-sm text-blueGray-400">Late Arrivals</span>
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
                  <div class="calendar">
                    {#each daysOfWeek as day}
                      <div class="header">{day}</div>
                    {/each}
                    {#each getDaysInMonth(currentMonthDate) as { date, currentMonth }}
                      {#if date}
                        <div class="calendar-day rounded {date.getDay() === 6 || date.getDay() === 0 ? 'weekend' : ''} {currentMonth ? '' : 'not-current-month'}">
                          {date.getDate()}
                        </div>
                      {:else}
                        <div class="calendar-day empty"></div>
                      {/if}
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</div>

