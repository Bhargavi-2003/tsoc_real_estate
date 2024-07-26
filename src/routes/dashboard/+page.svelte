<script>
    export let data;
  </script>
  
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-md">
      <div class="p-4">
        <h1 class="text-2xl font-semibold">Dashboard</h1>
      </div>
      <nav class="mt-4">
        <a href="/dashboard" class="block px-4 py-2 text-gray-700 hover:bg-gray-200">Home</a>
        <a href="/dashboard/create/project-details" class="block px-4 py-2 text-gray-700 hover:bg-gray-200">Create Token</a>
        <a href="/dashboard/manage" class="block px-4 py-2 text-gray-700 hover:bg-gray-200">Manage Tokens</a>
      </nav>
    </div>
  
    <!-- Main Content -->
    <div class="flex-1 p-8">
      <h2 class="text-3xl font-semibold mb-4">Welcome to the Dashboard</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Dashboard Widgets -->
        <div class="bg-white p-4 shadow rounded-lg">
          <h3 class="text-xl font-semibold mb-2">Widget 1</h3>
          <p>Details about Widget 1</p>
        </div>
        <div class="bg-white p-4 shadow rounded-lg">
          <h3 class="text-xl font-semibold mb-2">Widget 2</h3>
          <p>Details about Widget 2</p>
        </div>
        <div class="bg-white p-4 shadow rounded-lg">
          <h3 class="text-xl font-semibold mb-2">Widget 3</h3>
          <p>Details about Widget 3</p>
        </div>
      </div>
    </div>
  </div>
  