<script>
  import { Router, Route } from "svelte-routing";

  // components for this layout
  import AuthNavbar from "components/Navbars/AuthNavbar.svelte";
  import FooterSmall from "components/Footers/FooterSmall.svelte";

  // pages for this layout
  import Login from "views/auth/Login.svelte";
  import Signup from "../views/auth/Signup.svelte";

  const registerBg2 = "../assets/img/register_bg_2.png";
  export let location;
  export let auth = "";

  let gradientBackground = `
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  `;

</script>

<div>
  <main>
    <section class="relative w-full h-full py-40 min-h-screen">
      <div
        class="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
        style={gradientBackground}
      ></div>
      <Router url="auth">
        <Route path="login" component="{Login}" />
        <Route path="signup" component="{Signup}" />
      </Router>
      <FooterSmall absolute="true" />
    </section>
  </main>
</div>
