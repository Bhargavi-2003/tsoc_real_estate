<script>
    import { goto } from '$app/navigation';
    import { projectDetails } from '$lib/stores/projectstore';

    let projectName = '';
    let projectDescription = '';
    let projectLocation = '';

    function submitProjectDetails() {
      projectDetails.set({ projectName, projectDescription, projectLocation });
      goto('/dashboard/create/token-parameters');
    }
</script>
  
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-2xl w-full bg-white p-8 shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-6 text-center">Enter Project Details</h1>
      <form on:submit|preventDefault={submitProjectDetails} class="space-y-6">
        <div>
          <label for="projectName" class="block text-sm font-medium text-gray-700">Project Name</label>
          <input id="projectName" type="text" bind:value={projectName} class="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Project Name" />
        </div>
        <div>
          <label for="projectDescription" class="block text-sm font-medium text-gray-700">Project Description</label>
          <textarea id="projectDescription" bind:value={projectDescription} class="mt-1 block w-full h-32 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Project Description"></textarea>
        </div>
        <div>
          <label for="projectLocation" class="block text-sm font-medium text-gray-700">Project Location</label>
          <input id="projectLocation" type="text" bind:value={projectLocation} class="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Project Location" />
        </div>
        <div>
          <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Next</button>
        </div>
      </form>
    </div>
  </div>
  