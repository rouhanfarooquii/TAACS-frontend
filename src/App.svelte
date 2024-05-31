<!-- App.svelte -->
<script>
  import { Router, Route } from "svelte-routing";

  // Admin Layout
  import Admin from "./layouts/Admin.svelte";
  // Auth Layout
  import Auth from "./layouts/Auth.svelte";
  import User from "./layouts/User.svelte";

  // No Layout Pages
  import Index from "./views/Index.svelte";
  import Landing from "./views/Landing.svelte";
  import Attendance from "./views/user/Attendance.svelte";

  export let url = "auth/login";
</script>

<Router url="{url}">
  <!-- admin layout -->
  <Route path="admin/*admin" component="{Admin}" />
  <!-- auth layout -->
  <Route path="auth/*auth" component="{Auth}" />
  <!-- user layout -->
  <Route path="user/*user" component="{User}" />
  <!-- no layout pages -->
  <Route path="landing" component="{Landing}" />
  <Route path="attendance" component="{Attendance}" />
  <!-- <Route path="/" component="{Index}" /> -->
  <Route path="/" component="{Admin}" />
</Router>
