<!-- src/routes/register.svelte -->
<script>
    let email = '';
    let password = '';
    let confirmPassword = '';
  
    async function register() {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
  
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        alert('Registration failed');
      }
    }
  </script>
  
  <main class="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h1 class="text-2xl font-bold text-center text-gray-900 dark:text-white">Create Your Account</h1>
      <form on:submit|preventDefault={register} class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
          <input type="email" id="email" bind:value={email} placeholder="Enter your email" required class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-400 dark:border-gray-600" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
          <input type="password" id="password" bind:value={password} placeholder="Create a password" required class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-400 dark:border-gray-600" />
        </div>
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Confirm Password</label>
          <input type="password" id="confirmPassword" bind:value={confirmPassword} placeholder="Confirm your password" required class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-400 dark:border-gray-600" />
        </div>
        <button type="submit" class="w-full px-3 py-2 border rounded-md shadow-sm text-white dark:placeholder-gray-400 dark:border-gray-600 bg-blue-600 hover:bg-red-500">Register</button>
      </form>
      <footer class="text-sm text-center text-gray-600 dark:text-gray-400">
        Already have an account? <a href="/login" class="text-primary-600 hover:underline dark:text-primary-400">Login here</a>
      </footer>
    </div>
  </main>
  