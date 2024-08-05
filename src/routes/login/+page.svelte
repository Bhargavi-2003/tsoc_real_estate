<script>
  import { onMount } from 'svelte';
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import "./style.css"

  let email = "";
  let password = "";
  let name = "";
  let isSignUpActive = false;

  const handleSignUpClick = () => {
    isSignUpActive = true;
  };

  const handleSignInClick = () => {
    isSignUpActive = false;
  };

  async function login() {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } else {
      alert("Login failed");
    }
  }

  async function signup() {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } else {
      alert("Signup failed");
    }
  }
</script>


<main class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:bg-gray-900 ">
  <div class={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
    <div class="form-container sign-up-container">
      <form on:submit|preventDefault={signup} class="space-y-6 form-auth">
        <h1 class="h-auth">Create Account</h1>
        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
          <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <span class="span-auth">or use your email for registration</span>
        <input class="input-auth" type="text" bind:value={name} placeholder="Name" required />
        <input class="input-auth" type="email" bind:value={email} placeholder="Email" required />
        <input class="input-auth" type="password" bind:value={password} placeholder="Password" required />
        <br>
        <button type="submit" class='sign-btn b-auth'>Sign Up</button>
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
        <button type="submit" class='sign-btn b-auth'>Sign In</button>
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
