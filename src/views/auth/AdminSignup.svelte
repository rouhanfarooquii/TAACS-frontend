<script>
    import { onMount } from "svelte";
    import { signUpAdminApi } from "../../services/api.js"; // Adjust the path as necessary
  
    let email = "";
    let password = "";
    let confirmPassword = "";
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";
    let errorMessage = "";
    let successMessage = "";
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const validatePassword = (password) => {
      const hasUppercase = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      return password.length >= 8 && hasUppercase && hasNumber;
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
        passwordError = "Password must be at least 8 characters, contain 1 uppercase letter and 1 number";
      } else {
        passwordError = "";
      }
    };
  
    const handleConfirmPasswordBlur = () => {
      if (password !== confirmPassword) {
        confirmPasswordError = "Passwords do not match";
      } else {
        confirmPasswordError = "";
      }
    };

    const handleSubmit = async () => {
    handleEmailBlur();
    handlePasswordBlur();
    handleConfirmPasswordBlur();

    if (!emailError && !passwordError && !confirmPasswordError) {
      try {
        console.log('Submitting signup form with email:', email);
        const response = await signUpAdminApi({ email, password });
        console.log('Signup successful. Response:', response);
        successMessage = "Account created successfully!";
        errorMessage = "";
        // Optionally, redirect the user or clear the form fields
      } catch (error) {
        console.log('Signup failed:', error.message);
        errorMessage = `An error occurred while creating the account: ${error.message}`;
        successMessage = "";
      }
    } else {
      console.log('Validation errors. Email error:', emailError, 'Password error:', passwordError, 'Confirm password error:', confirmPasswordError);
      errorMessage = "Please fix the errors above";
      successMessage = "";
    }
  };
  
    onMount(() => {
      // Reset error message on mount
      errorMessage = "";
      successMessage = "";
    });
  </script>
  
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-6/12 px-4">
        <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-blueGray-500 text-sm font-bold">
                Create admin account 
              </h6>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form on:submit|preventDefault={handleSubmit}>
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
  
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-confirm-password"
                >
                  Confirm Password
                </label>
                <input
                  id="grid-confirm-password"
                  type="password"
                  bind:value={confirmPassword}
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Confirm Password"
                  on:blur={handleConfirmPasswordBlur}
                  aria-describedby="confirm-password-error"
                  aria-invalid={confirmPasswordError ? "true" : "false"}
                />
                {#if confirmPasswordError}
                  <div id="confirm-password-error" class="text-red-500 text-xs mt-1">{confirmPasswordError}</div>
                {/if}
              </div>
  
              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
  
              {#if successMessage}
                <div class="text-green-500 text-xs mt-4">{successMessage}</div>
              {/if}
              {#if errorMessage}
                <div class="text-red-500 text-xs mt-4">{errorMessage}</div>
              {/if}
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>