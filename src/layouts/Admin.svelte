<script>
  import { Router, Route } from "svelte-routing";

  // components for this layout
  import AdminNavbar from "components/Navbars/AdminNavbar.svelte";
  import Sidebar from "components/Sidebar/Sidebar.svelte";
  import HeaderStats from "components/Headers/HeaderStats.svelte";
  import FooterAdmin from "components/Footers/FooterAdmin.svelte";

  // pages for this layout
  import Dashboard from "views/admin/Dashboard/Dashboard.svelte";
  import AccessControl from "views/admin//AccessControl/AccessControl.svelte";
  import Payroll from "views/admin/Payroll/Payroll.svelte";
  import RoomBooking from "views/admin/RoomBooking/RoomBooking.svelte";
  import Rooms from "../views/admin/RoomBooking/Rooms.svelte";
  import Employee from "views/admin/Employee/Employee.svelte";
  import LeaveRequest from "../views/admin/LeaveRequest/LeaveRequest.svelte";
  import ShiftTiming from "../views/admin/ShiftTiming/ShiftTiming.svelte";
  import Parking from "../views/admin/Parking/Parking.svelte";
  import Visitors from "../views/admin/Visitors/Visitors.svelte";
  import Emergency from "../views/admin/Emergency/Emergency.svelte";
  import DeviceManagement from "../views/admin/DeviceManagement/DeviceManagement.svelte";
  import AddEmployee from "../views/admin/Employee/AddEmployee.svelte";
  import AddShift from "../views/admin/ShiftTiming/AddShift.svelte";
  import VisitorsList from "../views/admin/Visitors/VisitorsList.svelte";
  import Bonus from "../views/admin/Payroll/Bonus.svelte";
  import ManageCars from "../views/admin/Parking/ManageCars.svelte";
  import LeaveForm from "../views/admin/LeaveRequest/LeaveForm.svelte";

  import { component } from "svelte-routing/src/Route.svelte";

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
        <Route path="devicemanagement" component="{DeviceManagement}" />
        <Route path="parking" component="{Parking}"/>
        <Route path="visitors" component="{Visitors}" />
        <Route path="emergency" component="{Emergency}" />
        <Route path="addemployee" component="{AddEmployee}" />
        <Route path="addshift" component="{AddShift}"/>
        <Route path="visitorslist" component="{VisitorsList}"/>
        <Route path="bonus" component="{Bonus}"/>
        <Route path="managecars" component="{ManageCars}"/>
        <Route path="rooms" component="{Rooms}"/>
        <Route path="leaveform" component="{LeaveForm}"/>
      </Router>
      <FooterAdmin />
    </div>
  </div>
</div>
