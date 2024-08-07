<script>
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { goto } from '$app/navigation';

  let isLoggedIn = false;

  async function checkAuthStatus() {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/check-auth', {
        withCredentials: true,
      });
      isLoggedIn = response.status === 200;
    } catch (err) {
      isLoggedIn = false;
    }
  }

  async function logout() {
    try {
      await axios.post('http://localhost:3000/api/user/logout', {}, { withCredentials: true });
      isLoggedIn = false; // Ensure state is updated
      goto('/login'); // Redirect to the login page
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }

  // Check authentication status on component mount
  onMount(checkAuthStatus);
</script>

<nav class="bg-white border-gray-200">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://tsoc.dev/TSoC_Favicon.svg" class="h-8" alt="TSoC Logo" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap">TSoC MVP for Token Creation</span>
    </a>

    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
        <li>
          <a href="/" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Home</a>
        </li>
        {#if isLoggedIn}
          <li>
            <button on:click={logout} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Logout</button>
          </li>
        {:else}
          <li>
            <a href="/login" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Login</a>
          </li>
        {/if}
        <li>
          <a href="/dashboard" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Dashboard</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
