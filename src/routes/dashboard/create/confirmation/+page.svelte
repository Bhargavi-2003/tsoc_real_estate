<script lang="ts">
  import {
    projectDetails,
    tokenParameters,
    confirmedDataList,
  } from "$lib/stores/projectstore";
  import { onDestroy } from "svelte";
  import { goto } from "$app/navigation";
  import axios from "axios";
  import { success, warning, failure } from "$lib/toast";

  // Define the types for the data
  interface ProjectData {
    projectName: string;
    projectDescription: string;
    projectLocation: string;
  }

  interface TokenData {
    tokenName: string;
    tokenSymbol: string;
    totalSupply: number; // Ensure this matches the expected type
    additionalFeatures: string;
  }

  type ConfirmedData = ProjectData & TokenData;

  let projectData: ProjectData = {
    projectName: "",
    projectDescription: "",
    projectLocation: "",
  };

  let tokenData: TokenData = {
    tokenName: "",
    tokenSymbol: "",
    totalSupply: 0, // Default value
    additionalFeatures: "",
  };

  // Subscribe to stores
  const unsubscribeProject = projectDetails.subscribe((value) => {
    projectData = value;
  });

  const unsubscribeToken = tokenParameters.subscribe((value) => {
    tokenData = value;
  });

  onDestroy(() => {
    unsubscribeProject();
    unsubscribeToken();
  });

  async function confirmTokenCreation() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/token/define",
        {
          builderId: 1, // Replace with actual builderId
          projectId: 1, // Replace with actual projectId
          tokenName: tokenData.tokenName,
          tokenSymbol: tokenData.tokenSymbol,
          totalSupply: tokenData.totalSupply, // Ensure this is a number
          additionalFeatures: tokenData.additionalFeatures,
        },
      );

      success("Token created successfully");

      confirmedDataList.update((list) => [
        ...list,
        { ...projectData, ...tokenData },
      ]);

      goto("/dashboard");
      // Optionally navigate or provide user feedback
    } catch (error) {
      console.error("Error creating token:", error);
      failure("Error creating token");
    }
  }
</script>

<div
  class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
>
  <div class="container">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-900">
      Confirm Token Creation
    </h1>
    <p class="mb-6 text-center text-gray-700">
      Review the details below before confirming.
    </p>
    <div class="details-card">
      <h2>Project Details</h2>
      <p><strong>Project Name:</strong> {projectData.projectName}</p>
      <p>
        <strong>Project Description:</strong>
        {projectData.projectDescription}
      </p>
      <p><strong>Project Location:</strong> {projectData.projectLocation}</p>
    </div>
    <div class="details-card">
      <h2>Token Parameters</h2>
      <p><strong>Token Name:</strong> {tokenData.tokenName}</p>
      <p><strong>Token Symbol:</strong> {tokenData.tokenSymbol}</p>
      <p><strong>Total Supply:</strong> {tokenData.totalSupply}</p>
      <p>
        <strong>Additional Features:</strong>
        {tokenData.additionalFeatures}
      </p>
    </div>
    <button on:click={confirmTokenCreation} class="confirm-button"
      >Create Token</button
    >
  </div>
</div>

<style>
  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow:
      0 14px 28px rgba(0, 0, 0, 0.25),
      0 10px 10px rgba(0, 0, 0, 0.22);
    width: 100%;
    max-width: 768px;
    padding: 20px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    color: #333;
  }

  .details-card {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .details-card h2 {
    margin-bottom: 12px;
    font-size: 20px;
    color: #333;
  }

  .details-card p {
    margin: 4px 0;
    color: #555;
  }

  .confirm-button {
    background: linear-gradient(to right, #1b3b65, #1c7293);
    border: none;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      transform 0.2s ease;
    display: block;
    margin: 0 auto;
  }

  .confirm-button:hover {
    background-color: #1b3b65;
  }
</style>
