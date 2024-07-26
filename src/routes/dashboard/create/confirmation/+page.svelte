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

<div class="max-w-2xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Confirm Token Creation</h1>
    <p class="mb-4">Review the details below before confirming.</p>
    <div class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold">Project Details</h2>
        <p><strong>Project Name:</strong> {projectData.projectName}</p>
        <p><strong>Project Description:</strong> {projectData.projectDescription}</p>
        <p><strong>Project Location:</strong> {projectData.projectLocation}</p>
      </div>
      <div>
        <h2 class="text-lg font-semibold">Token Parameters</h2>
        <p><strong>Token Name:</strong> {tokenData.tokenName}</p>
        <p><strong>Token Symbol:</strong> {tokenData.tokenSymbol}</p>
        <p><strong>Total Supply:</strong> {tokenData.totalSupply}</p>
        <p><strong>Additional Features:</strong> {tokenData.additionalFeatures}</p>
      </div>
    </div>
    <button on:click={confirmTokenCreation} class="mt-6 w-full bg-green-500 text-white py-2 px-4 rounded-md">Create Token</button>
</div>