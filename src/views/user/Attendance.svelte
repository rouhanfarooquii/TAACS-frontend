<script>
  // core components
  import { navigate } from 'svelte-routing';
  import AuthNavbar from "components/Navbars/AuthNavbar.svelte";
  import Footer from "components/Footers/Footer.svelte";

  const team2 = "/assets/img/10.jpg";
  export let location;

  let employee= [    
    { id: 12, name: 'Lisa Nguyen', phoneNumber: '777-222-3333', location: 'Phoenix', department: 'Operations', designation: 'Supervisor', employeeType: 'Full-time', gender: 'Female', email: 'lisa@example.com', address: '901 Maple St, Phoenix', dateOfBirth: '1986-09-10', cardIdNumber: 'L789012', personalPassword: 'mypassword5678', fingerIndex1: '', fingerIndex2: '', isFingerAdded: false, salary: 60000, active: false },
  ]

  let gradientBackground = `
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  `;

  function navigatetoLeave() {
    navigate('/admin/leaveform');
  }  
  function navigatetoAttendance() {
    navigate('/user/attendance');
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
                    src="{team2}"
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
                      82
                    </span>
                    <span class="text-sm text-blueGray-400">Attendance</span>
                  </div>
                  <div class="mr-4 p-3 text-center">
                    <span
                      class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                    >
                      10
                    </span>
                    <span class="text-sm text-blueGray-400">Absences</span>
                  </div>
                  <div class="lg:mr-4 p-3 text-center">
                    <span
                      class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                    >
                      4
                    </span>
                    <span class="text-sm text-blueGray-400">Late Arrivals</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-12">
              <h3
                class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
              >
                Jenna Stones
              </h3>
              <div
                class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
              >
                <i class="fas fa-id-card mr-2 text-lg text-blueGray-400"></i>
                Los Angeles, California
              </div>
              <div class="mb-2 text-blueGray-600 mt-10">
                <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                Solution Manager - Creative Tim Officer
              </div>
              <div class="mb-2 text-blueGray-600">
                <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                University of Computer Science
              </div>
            </div>
            <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div class="flex flex-wrap justify-center">
                <div class="w-full lg:w-9/12 px-4">
                  <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                    An artist of considerable range, Jenna the name taken by
                    Melbourne-raised, Brooklyn-based Nick Murphy writes,
                    performs and records all of his own music, giving it a warm,
                    intimate feel with a solid groove structure. An artist of
                    considerable range.
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
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</div>
