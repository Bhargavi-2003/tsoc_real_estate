<script>
  import { projectDetails, tokenParameters } from '$lib/stores/projectstore';
  import { onDestroy } from 'svelte';

  let projectData = {};
  let tokenData = {};

  const unsubscribeProject = projectDetails.subscribe(value => {
    projectData = value;
  });

  const unsubscribeToken = tokenParameters.subscribe(value => {
    tokenData = value;
  });

  onDestroy(() => {
    unsubscribeProject();
    unsubscribeToken();
  });

  function confirmTokenCreation() {
    // Handle confirmation, e.g., send data to backend or finalize creation
    console.log('Token Created', { ...projectData, ...tokenData });
  }
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-3xl w-full bg-white p-8 shadow-lg rounded-lg">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-900">Confirm Token Creation</h1>
    <p class="mb-6 text-center text-gray-700">Review the details below before confirming.</p>
    <div class="space-y-6">
      <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 class="text-xl font-semibold mb-4 text-gray-900">Project Details</h2>
        <p class="text-gray-800"><strong>Project Name:</strong> {projectData.projectName}</p>
        <p class="text-gray-800"><strong>Project Description:</strong> {projectData.projectDescription}</p>
        <p class="text-gray-800"><strong>Project Location:</strong> {projectData.projectLocation}</p>
      </div>
      <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 class="text-xl font-semibold mb-4 text-gray-900">Token Parameters</h2>
        <p class="text-gray-800"><strong>Token Name:</strong> {tokenData.tokenName}</p>
        <p class="text-gray-800"><strong>Token Symbol:</strong> {tokenData.tokenSymbol}</p>
        <p class="text-gray-800"><strong>Total Supply:</strong> {tokenData.totalSupply}</p>
        <p class="text-gray-800"><strong>Additional Features:</strong> {tokenData.additionalFeatures}</p>
      </div>
    </div>
    <button on:click={confirmTokenCreation} class="mt-8 w-full bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 transition duration-200">Create Token</button>
  </div>
</div>
