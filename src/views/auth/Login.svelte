<script>
  import { onMount } from "svelte";
  import { loginEmployeeApi } from "../../services/api.js";

  let email = "";
  let password = "";
  let emailError = "";
  let passwordError = "";
  let errorMessage = "";

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      emailError = "Invalid email format";
    } else {
      emailError = "";
    }
  };

  const handlePasswordBlur = () => {
    if (!validatePassword(password)) {
      passwordError = "Password must be at least 8 characters";
    } else {
      passwordError = "";
    }
  };

  const handleSubmit = async () => {
    handleEmailBlur();
    handlePasswordBlur();

    if (!emailError && !passwordError) {
      try {
        const response = await loginEmployeeApi({ email, password });
        // console.log('', response.token);

        // Store the token in a cookie
        // document.cookie = `token=${response.token}; path=/;`;


        errorMessage = "";
        // Optionally, redirect the user or show a success message
        // window.location.href = '/dashboard'; // Redirect to dashboard
      } catch (error) {
        console.log('Login failed:', error.message);
        errorMessage = `An error occurred while logging in: ${error.message}`;
      }
    } else {
      console.log('Validation errors. Email error:', emailError, 'Password error:', passwordError);
      errorMessage = "Please fix the errors above";
    }
  };

  onMount(() => {
    // Reset error message on mount
    errorMessage = "";
  });
</script>

<div class="container mx-auto px-4 h-full">
  <div class="flex content-center items-center justify-center h-full">
    <div class="w-full lg:w-6/12 px-4">
      <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
        <div class="rounded-t mb-0 px-6 py-6">
          <div class="text-center mb-3">
            <h6 class="text-blueGray-500 text-sm font-bold">
              Log In
            </h6>
          </div>
          <hr class="mt-6 border-b-1 border-blueGray-300" />
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form on:submit|preventDefault={handleSubmit} novalidate>
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-email"
              >
                Email
              </label>
              <input
                id="grid-email"
                type="email"
                bind:value={email}
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Email"
                on:blur={handleEmailBlur}
                aria-describedby="email-error"
                aria-invalid={emailError ? "true" : "false"}
              />
              {#if emailError}
                <div id="email-error" class="text-red-500 text-xs mt-1">{emailError}</div>
              {/if}
            </div>

            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-password"
              >
                Password
              </label>
              <input
                id="grid-password"
                type="password"
                bind:value={password}
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Password"
                on:blur={handlePasswordBlur}
                aria-describedby="password-error"
                aria-invalid={passwordError ? "true" : "false"}
              />
              {#if passwordError}
                <div id="password-error" class="text-red-500 text-xs mt-1">{passwordError}</div>
              {/if}
            </div>

            <div class="text-center mt-6">
              <button
                class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                type="submit"
              >
                Login
              </button>
              {#if errorMessage}
                <div class="text-red-500 text-xs mt-4">{errorMessage}</div>
              {/if}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
