<script>
  import { link } from "svelte-routing";

  // core components
  import NotificationDropdown from "components/Dropdowns/NotificationDropdown.svelte";
  import UserDropdown from "components/Dropdowns/UserDropdown.svelte";

  let collapseShow = "hidden";

  function toggleCollapseShow(classes) {
    collapseShow = classes;
  }

  let showNestedMenuAccessControl = false;
  let showNestedMenuRoomBooking = false;
  let showNestedMenuPayroll = false;
  let showNestedMenuEmployee = false;
  let showNestedMenuLeaveRequest = false;
  let showNestedMenuShiftTiming  = false;
  let showNestedMenuParking  = false;
  let showNestedMenuVisitors  = false;
  let showNestedMenuEmergency  = false;
  let showNestedDeviceManagement = false;
  let showNestedHierarchy = false;

  function toggleNestedMenu(menuItem) {
    if (menuItem === 'accesscontrol') {
        showNestedMenuAccessControl = !showNestedMenuAccessControl;
    } else if (menuItem === 'roombooking') {
        showNestedMenuRoomBooking = !showNestedMenuRoomBooking;
      } else if (menuItem === 'payroll') {
        showNestedMenuPayroll = !showNestedMenuPayroll;
      } else if (menuItem === 'employee') {
        showNestedMenuEmployee = !showNestedMenuEmployee;
      } else if (menuItem === 'leaverequest') {
        showNestedMenuLeaveRequest = !showNestedMenuLeaveRequest;
      } else if (menuItem === 'shifttiming') {
        showNestedMenuShiftTiming = !showNestedMenuShiftTiming;
      } else if (menuItem === 'devicemanagement') {
        showNestedDeviceManagement = !showNestedDeviceManagement;
      } else if (menuItem === 'parking') {
        showNestedMenuParking = !showNestedMenuParking;
      } else if (menuItem === 'hierarchy') {
        showNestedHierarchy = !showNestedHierarchy;
      } else if (menuItem === 'visitors') {
        showNestedMenuVisitors = !showNestedMenuVisitors;
      } else if (menuItem === 'emergency') {
        showNestedMenuEmergency = !showNestedMenuEmergency;
    }
  }

  export let location;
</script>

<nav
  class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
>
  <div
    class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
  >
    <!-- Toggler -->
    <button
      class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
      type="button"
      on:click={() => toggleCollapseShow('bg-white m-2 py-3 px-6')}
    >
      <i class="fas fa-bars"></i>
    </button>
    <!-- Brand -->
    <a
  use:link
  class="md:block text-center md:pb-2 text-blueGray-800 mr-0 inline-block whitespace-nowrap text-5xl uppercase font-bold p-4 px-0"
  href="/admin/dashboard"
>
  TAACS
</a>

    <!-- User -->
    <ul class="md:hidden items-center flex flex-wrap list-none">
      <li class="inline-block relative">
        <NotificationDropdown />
      </li>
      <li class="inline-block relative">
        <UserDropdown />
      </li>
    </ul>
    <!-- Collapse -->
    <div
      class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded {collapseShow}"
    >
      <!-- Collapse header -->
      <div
        class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200"
      >
        <div class="flex flex-wrap">
          <div class="w-6/12">
            <a
              use:link
              class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
              href="/"
            >
              TAACS
            </a>
          </div>
          <div class="w-6/12 flex justify-end">
            <button
              type="button"
              class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
              on:click={() => toggleCollapseShow('hidden')}
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
      <!-- Form -->
      <form class="mt-6 mb-4 md:hidden">
        <div class="mb-3 pt-0">
          <input
            type="text"
            placeholder="Search"
            class="border-0 px-3 py-2 h-12 border border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
          />
        </div>
      </form>

      <!-- Divider -->
      <hr class="my-4 md:min-w-full" />
      
      <!-- Navigation -->

      <ul class="md:flex-col md:min-w-full flex flex-col list-none">

        <li class="items-center">
          <a
            use:link
            href="/admin/accesscontrol"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/admin/accesscontrol') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
            >
            <i
              class="fas fa-lock-open mr-2 text-sm {location.href.indexOf('/admin/accesscontrol') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
            ></i>
            Access Control
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            href="#"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/admin/roombooking') !== -1 || location.href.indexOf('/admin/rooms') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
            on:click|preventDefault={() => toggleNestedMenu('roombooking')}
            >
            <i
              class="fas fa-calendar-alt mr-2 text-sm {location.href.indexOf('/admin/roombooking') !== -1 || location.href.indexOf('/admin/rooms') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
            ></i>
            Room Booking
            <i class="fas fa-angle-down ml-2 text-xs"></i>
          </a>
          {#if showNestedMenuRoomBooking}
            <ul class="mt-1 ml-4 border-t border-blueGray-200">
              <li>
                <a
                use:link
                  href="/admin/roombooking"
                  class="text-xs uppercase py-2 font-semibold block {location.href.indexOf('/admin/roombooking') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
                >
                  Bookings
                </a>
              </li>
              <li>
                <a
                use:link
                  href="/admin/rooms"
                  class="text-xs uppercase py-2 font-semibold block {location.href.indexOf('/admin/rooms') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
                >
                  Rooms
                </a>
              </li>
            </ul>
          {/if}
        </li>

        <li class="items-center">
          <a
            use:link
            href="/admin/employee"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/admin/employee') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
            on:click|preventDefault={() => toggleNestedMenu('employee')}
            >
            <i
              class="fas fa-users mr-2 text-sm {location.href.indexOf('/admin/employee') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
            ></i>
            Employee
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            href="#"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/admin/payroll') !== -1 || location.href.indexOf('/admin/bonus') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
            on:click|preventDefault={() => toggleNestedMenu('payroll')}
            >
            <i
              class="fas fa-money-bill-alt mr-2 text-sm {location.href.indexOf('/admin/payroll') !== -1 || location.href.indexOf('/admin/bonus') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
            ></i>
            Payroll
            <i class="fas fa-angle-down ml-2 text-xs"></i>
          </a>
          {#if showNestedMenuPayroll}
            <ul class="mt-1 ml-4 border-t border-blueGray-200">
              <li>
                <a
                use:link
                  href="/admin/payroll"
                  class="text-xs uppercase py-2 font-semibold block {location.href.indexOf('/admin/payroll') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
                >
                  Salary
                </a>
              </li>
              <li>
                <a
                use:link
                  href="/admin/bonus"
                  class="text-xs uppercase py-2 font-semibold block {location.href.indexOf('/admin/bonus') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
                >
                  Bonus
                </a>
              </li>
            </ul>
          {/if}
        </li>

        <li class="items-center">
          <a
            use:link
            href="/admin/leaverequest"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/admin/leaverequest') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
            on:click|preventDefault={() => toggleNestedMenu('leaverequest')}
            >
            <i
              class="fas fa-table mr-2 text-sm {location.href.indexOf('/admin/leaverequest') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
            ></i>
            Leave Requests
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            href="/admin/shifttiming"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/admin/shifttiming') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
            on:click|preventDefault={() => toggleNestedMenu('shifttiming')}
            >
            <i
              class="fas fa-clock mr-2 text-sm {location.href.indexOf('/admin/shifttiming') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
            ></i>
            Shift Timings
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            href="/admin/devicemanagement"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/admin/devicemanagement') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
            on:click|preventDefault={() => toggleNestedMenu('devicemanagement')}
            >
            <i
              class="fas fa-tools mr-2 text-sm {location.href.indexOf('/admin/devicemanagement') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
            ></i>
            Device Management
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            href="/admin/location"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/admin/location') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
            on:click|preventDefault={() => toggleNestedMenu('location')}
            >
            <i
              class="fas fa-map-pin mr-2 text-sm {location.href.indexOf('/admin/location') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
            ></i>
            Location
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            href="/admin/parking"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/admin/parking') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
            on:click|preventDefault={() => toggleNestedMenu('parking')}
            >
            <i
              class="fas fa-parking mr-2 text-sm {location.href.indexOf('/admin/parking') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
            ></i>
            Parking
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            href="/admin/hierarchy"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/admin/hierarchy') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
            on:click|preventDefault={() => toggleNestedMenu('hierarchy')}
            >
            <i
              class="fas fa-sitemap mr-2 text-sm {location.href.indexOf('/admin/hierarchy') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
            ></i>
            Organization Hierarchy
          </a>
        </li>
        
        <li class="items-center">
          <a
            use:link
            href="#"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/admin/visitors') !== -1 || location.href.indexOf('/admin/visitorslist') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
            on:click|preventDefault={() => toggleNestedMenu('visitors')}
            >
            <i
              class="fas fa-user-alt mr-2 text-sm {location.href.indexOf('/admin/visitors') !== -1 || location.href.indexOf('/admin/visitorslist') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
            ></i>
            Visitor
            <i class="fas fa-angle-down ml-2 text-xs"></i>
          </a>
          {#if showNestedMenuVisitors}
            <ul class="mt-1 ml-4 border-t border-blueGray-200">
              <li>
                <a
                use:link
                  href="/admin/visitors"
                  class="text-xs uppercase py-2 font-semibold block {location.href.indexOf('/admin/visitors') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
                >
                Visitor Request
                </a>
              </li>
              <li>
                <a
                use:link
                  href="/admin/visitorslist"
                  class="text-xs uppercase py-2 font-semibold block {location.href.indexOf('/admin/visitorslist') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
                >
                Visitor List                  
                </a>
              </li>
            </ul>
          {/if}
        </li>

        <li class="items-center">
          <a
            use:link
            href="/admin/emergency"
            class="text-xs uppercase py-3 font-bold block {location.href.indexOf('/admin/emergency') !== -1 ? 'custom-text hover:custom-text':'text-blueGray-700 hover:text-blueGray-500'}"
            on:click|preventDefault={() => toggleNestedMenu('emergency')}
            >
            <i
              class="fas fa-ambulance mr-2 text-sm {location.href.indexOf('/admin/emergency') !== -1 ? 'opacity-75' : 'text-blueGray-300'}"
            ></i>
            Emergency
          </a>
        </li>
      </ul>

      <!-- Divider -->
      <hr class="my-4 md:min-w-full" />
      <!-- Heading -->
      <h6
        class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
      >
        Auth Layout Pages
      </h6>
      <!-- Navigation -->

      <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
        <li class="items-center">
          <a
            use:link
            class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
            href="/auth/login"
          >
            <i class="fas fa-fingerprint text-blueGray-300 mr-2 text-sm"></i>
            Login
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
            href="/auth/adminlogin"
          >
            <i class="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>
            Admin Login
          </a>
        </li>
      </ul>

      <!-- Divider -->
      <hr class="my-4 md:min-w-full" />
      <!-- Heading -->
      <h6
        class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
      >
        User Pages
      </h6>
      <!-- Navigation -->

      <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
        <li class="items-center">
          <a
            use:link
            class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
            href="/landing"
          >
            <i class="fas fa-newspaper text-blueGray-300 mr-2 text-sm"></i>
            Landing Page
          </a>
        </li>

        <li class="items-center">
          <a
            use:link
            class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
            href="/profile"
          >
            <i class="fas fa-user-circle text-blueGray-300 mr-2 text-sm"></i>
            Profile Page
          </a>
        </li>
      </ul>

      <!-- <hr class="my-4 md:min-w-full" />
      <h6
        class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
      >
        Documentation
      </h6>
      <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
        <li class="inline-flex">
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/svelte/colors/notus"
            target="_blank"
            class="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
          >
            <i class="fas fa-paint-brush mr-2 text-blueGray-300 text-base"></i>
            Styles
          </a>
        </li>

        <li class="inline-flex">
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/svelte/alerts/notus"
            target="_blank"
            class="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
          >
            <i class="fab fa-css3-alt mr-2 text-blueGray-300 text-base"></i>
            CSS Components
          </a>
        </li>

        <li class="inline-flex">
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/angular/overview/notus"
            target="_blank"
            class="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
          >
            <i class="fab fa-angular mr-2 text-blueGray-300 text-base"></i>
            Angular
          </a>
        </li>

        <li class="inline-flex">
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/js/overview/notus"
            target="_blank"
            class="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
          >
            <i class="fab fa-js-square mr-2 text-blueGray-300 text-base"></i>
            Javascript
          </a>
        </li>

        <li class="inline-flex">
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus"
            target="_blank"
            class="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
          >
            <i class="fab fa-react mr-2 text-blueGray-300 text-base"></i>
            NextJS
          </a>
        </li>

        <li class="inline-flex">
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus"
            target="_blank"
            class="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
          >
            <i class="fab fa-react mr-2 text-blueGray-300 text-base"></i>
            React
          </a>
        </li>

        <li class="inline-flex">
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/svelte/overview/notus"
            target="_blank"
            class="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
          >
            <i class="fas fa-link mr-2 text-blueGray-300 text-base"></i>
            Svelte
          </a>
        </li>

        <li class="inline-flex">
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/vue/overview/notus"
            target="_blank"
            class="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
          >
            <i class="fab fa-vuejs mr-2 text-blueGray-300 text-base"></i>
            VueJS
          </a>
        </li>

      </ul> -->
    </div>
  </div>
</nav>