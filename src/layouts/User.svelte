<script>
    import { Router, Route } from "svelte-routing";
  
    // components for this layout
    import AdminNavbar from "components/Navbars/AdminNavbar.svelte";
    import Sidebar from "components/Sidebar/Sidebar.svelte";
    import HeaderStats from "components/Headers/HeaderStats.svelte";
    import FooterAdmin from "components/Footers/FooterAdmin.svelte";
  
    // pages for this layout
    import Profile from "../views/user/Profile.svelte";
    import Attendance from "../views/user/Attendance.svelte";
    import LeaveForm from "../views/user/LeaveForm.svelte";
    import VisitorReq from "../views/user/VisitorReq.svelte";
  
    import { component } from "svelte-routing/src/Route.svelte";
    export let location;
    export let user = "";
  </script>

        <Router url="user">
          <Route path="profile" component="{Profile}" />
          <Route path="attendance" component="{Attendance}" />
        </Router>

  <div>
      <AdminNavbar />
        <Router url="user">
          <Route path="leaveform" component="{LeaveForm}" />
          <Route path="visitors" component="{VisitorReq}" />
        </Router>
  </div>
  