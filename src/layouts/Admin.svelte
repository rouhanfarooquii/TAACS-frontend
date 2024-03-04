<script>
  import { Router, Route } from "svelte-routing";

  // components for this layout
  import AdminNavbar from "components/Navbars/AdminNavbar.svelte";
  import Sidebar from "components/Sidebar/Sidebar.svelte";
  import HeaderStats from "components/Headers/HeaderStats.svelte";
  import FooterAdmin from "components/Footers/FooterAdmin.svelte";

  // pages for this layout
  import Dashboard from "views/admin/Dashboard.svelte";
  import AccessControl from "views/admin/AccessControl.svelte";
  import Payroll from "views/admin/Payroll.svelte";
  import RoomBooking from "views/admin/RoomBooking.svelte";
  import Employee from "views/admin/Employee.svelte";
  import LeaveRequest from "../views/admin/LeaveRequest.svelte";
  import ShiftTiming from "../views/admin/ShiftTiming.svelte";
  import Parking from "../views/admin/Parking.svelte";
  import Visitors from "../views/admin/Visitors.svelte";
  import Emergency from "../views/admin/Emergency.svelte";

  export let location;
  export let admin = "";
</script>

<div>
  <Sidebar location={location}/>
  <div class="relative md:ml-64 bg-blueGray-100">
    <AdminNavbar />
    <HeaderStats />
    <div class="px-4 md:px-10 mx-auto w-full -m-24">
      <Router url="admin">
        <Route path="dashboard" component="{Dashboard}" />
        <Route path="accesscontrol" component="{AccessControl}" />
        <Route path="payroll" component="{Payroll}" />
        <Route path="roombooking" component="{RoomBooking}" />
        <Route path="employee" component="{Employee}" />
        <Route path="leaverequest" component="{LeaveRequest}" />
        <Route path="shifttiming" component="{ShiftTiming}" />
        <Route path="parking" component="{Parking}" />
        <Route path="visitors" component="{Visitors}" />
        <Route path="emergency" component="{Emergency}" />
      </Router>
      <FooterAdmin />
    </div>
  </div>
</div>
