<script>
    import { goto } from '$app/navigation';
    import { tokenParameters } from '$lib/stores/projectstore';

    let tokenName = '';
    let tokenSymbol = '';
    let totalSupply = '';
    let additionalFeatures = '';

    function submitTokenParameters() {
      tokenParameters.set({ tokenName, tokenSymbol, totalSupply, additionalFeatures });
      goto('/dashboard/create/confirmation');
    }
</script>
  
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-2xl w-full bg-white p-8 shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-6 text-center">Define Token Parameters</h1>
      <form on:submit|preventDefault={submitTokenParameters} class="space-y-6">
        <div>
          <label for="tokenName" class="block text-sm font-medium text-gray-700">Token Name</label>
          <input id="tokenName" type="text" bind:value={tokenName} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-12" placeholder="Token Name" />
        </div>
        <div>
          <label for="tokenSymbol" class="block text-sm font-medium text-gray-700">Token Symbol</label>
          <input id="tokenSymbol" type="text" bind:value={tokenSymbol} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-12" placeholder="Token Symbol" />
        </div>
        <div>
          <label for="totalSupply" class="block text-sm font-medium text-gray-700">Total Supply</label>
          <input id="totalSupply" type="number" bind:value={totalSupply} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-12" placeholder="Total Supply" />
        </div>
        <div>
          <label for="additionalFeatures" class="block text-sm font-medium text-gray-700">Additional Features (Optional)</label>
          <textarea id="additionalFeatures" bind:value={additionalFeatures} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-24" placeholder="Additional Features (Optional)"></textarea>
        </div>
        <div>
          <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Next</button>
        </div>
      </form>
    </div>
  </div>
  
  