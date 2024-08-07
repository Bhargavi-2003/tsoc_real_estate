<script lang="ts">
  import { onMount } from "svelte";
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import "./style.css";
  import { success, failure } from "$lib/toast"; // Import toast functions

  let email = "";
  let password = "";
  let isSignUpActive = false;

  const handleSignUpClick = () => {
    isSignUpActive = true;
  };

  const handleSignInClick = () => {
    isSignUpActive = false;
  };

  async function login() {
    try {
      const res = await fetch("https://tsoc-real-estate-backend.vercel.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Important for sending and receiving cookies
      });

      if (res.ok) {
        success("Login successful");
        // Redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        const error = await res.json();
        failure(`Login failed: ${error.message}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      failure("Login failed: An unexpected error occurred.");
    }
  }

  async function signup() {
    try {
      const res = await fetch("https://tsoc-real-estate-backend.vercel.app/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password}),
        credentials: 'include', // Important for sending and receiving cookies
      });

      if (res.ok) {
        success("Signup successful");
        // Redirect to login
        window.location.href = "/login";
      } else {
        const error = await res.json();
        failure(`Signup failed: ${error.message}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      failure("Signup failed: An unexpected error occurred.");
    }
  }
</script>

<main class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:bg-gray-900">
  <div class={`container ${isSignUpActive ? "right-panel-active" : ""}`} id="container">
    <div class="form-container sign-up-container">
      <form on:submit|preventDefault={signup} class="space-y-6 form-auth">
        <h1 class="h-auth">Create Account</h1>
        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
          <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <span class="span-auth">or use your email for registration</span>
        <input class="input-auth" type="email" bind:value={email} placeholder="Email" required />
        <input class="input-auth" type="password" bind:value={password} placeholder="Password" required />
        <br />
        <button type="submit" class="sign-btn b-auth">Sign Up</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form on:submit|preventDefault={login} class="space-y-6 form-auth">
        <h1 class="h-auth">Sign in</h1>
        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
          <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <span class="span-auth">or use your account</span>
        <input class="input-auth" type="email" bind:value={email} placeholder="Email" required />
        <input class="input-auth" type="password" bind:value={password} placeholder="Password" required />
        <a href="#">Forgot your password?</a>
        <button type="submit" class="sign-btn b-auth">Sign In</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1 class="h-auth">Welcome Back!</h1>
          <p class="p-auth">To keep connected with us please login with your personal info</p>
          <button class="ghost b-auth" on:click={handleSignInClick}>Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1 class="h-auth">Hello, Friend!</h1>
          <p class="p-auth">Enter your personal details and start journey with us</p>
          <button class="ghost b-auth" on:click={handleSignUpClick}>Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  /* Styles go here */
</style>
