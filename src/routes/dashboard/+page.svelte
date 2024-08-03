<script lang="ts">
  import {confirmedDataList} from '$lib/stores/projectstore.js';
  import {onDestroy} from 'svelte';
  import {onMount} from 'svelte';
    //export let data;
    // let confirmedData =[];
    interface ProjectData {
    projectName: string;
    projectDescription: string;
    projectLocation: string;
  }

  interface TokenData {
    tokenName: string;
    tokenSymbol: string;
    totalSupply: number;
    additionalFeatures: string;
  }

  type ConfirmedData = ProjectData & TokenData;

  let confirmedTokens: ConfirmedData[] = [];

  // Subscribe to the store to get the confirmed tokens
  confirmedDataList.subscribe((tokens) => {
    confirmedTokens = tokens;
  });

  // const unsubscribe = confirmedDataList.subscribe(value => {
  //   confirmedData = value;
  // });

  // onDestroy(() =>{
  //   unsubscribe();
  // })

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
      <h2 class="text-3xl font-semibold mb-4">Welcome to Dashboard!</h2>
      <!-- {#if confirmedData.length > 0} -->
      <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th class="py-3 px-6 text-left">Project Name</th>
            <th class="py-3 px-6 text-left">Project Description</th>
            <th class="py-3 px-6 text-left">Project Location</th>
            <th class="py-3 px-6 text-left">Token Name</th>
            <th class="py-3 px-6 text-left">Token Symbol</th>
            <th class="py-3 px-6 text-left">Total Supply</th>
            <th class="py-3 px-6 text-left">Additional Features</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          {#each confirmedTokens as data (data.tokenName)}
            <tr class="border-b border-gray-200 hover:bg-gray-100">
              <td class="py-3 px-6 text-left">{data.projectName}</td>
              <td class="py-3 px-6 text-left">{data.projectDescription}</td>
              <td class="py-3 px-6 text-left">{data.projectLocation}</td>
              <td class="py-3 px-6 text-left">{data.tokenName}</td>
              <td class="py-3 px-6 text-left">{data.tokenSymbol}</td>
              <td class="py-3 px-6 text-left">{data.totalSupply}</td>
              <td class="py-3 px-6 text-left">{data.additionalFeatures}</td>
            </tr>
          {/each}
        </tbody>
      </table>
  </div>
  </div>
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
  