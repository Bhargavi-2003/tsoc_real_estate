<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import { success, warning, failure } from "$lib/toast"; // Import custom toast notifications

  interface ProjectData {
    id: number;
    name: string;
    description: string;
    location: string;
    builderId: number;
    status: string;
  }

  interface TokenData {
    tokenId: number;
    tokenName: string;
    tokenSymbol: string;
    totalSupply: number;
    details: string;
  }

  type ConfirmedData = ProjectData & TokenData;

  let confirmedTokens: ConfirmedData[] = [];
  let loading = true;
  let error: string | null = null;

  async function fetchProjectDetails(): Promise<ProjectData[]> {
    try {
      const response = await axios.get("https://tsoc-real-estate-backend.vercel.app/api/project", {
        withCredentials: true, // Ensure cookies are included in the request
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching project details:", err);
      if (axios.isAxiosError(err) && err.response) {
        failure(err.response.data.message || "Error fetching project details");
      } else {
        failure("Error fetching project details");
      }
      throw err;
    }
  }

  async function fetchTokenDetails(): Promise<TokenData[]> {
    try {
      const response = await axios.get("https://tsoc-real-estate-backend.vercel.app/api/token/manage", {
        withCredentials: true, // Ensure cookies are included in the request
      });
      return response.data.tokens;
    } catch (err) {
      console.error("Error fetching token details:", err);
      if (axios.isAxiosError(err) && err.response) {
        failure(err.response.data.message || "Error fetching token details");
      } else {
        failure("Error fetching token details");
      }
      throw err;
    }
  }

  onMount(async () => {
    loading = true;
    try {
      const [projectDetails, tokenDetails] = await Promise.all([
        fetchProjectDetails(),
        fetchTokenDetails(),
      ]);

      // Ensure that tokens array is of the same length as projectDetails
      confirmedTokens = projectDetails.map((project, index: number) => ({
        ...project,
        ...(tokenDetails[index] || {}),
      }));
    } catch (err) {
      error = "Failed to load data";
    } finally {
      loading = false;
    }
  });
</script>

<div class="dashboard-container">
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="sidebar-header">
      <h1 class="text-2xl font-semibold">Dashboard</h1>
    </div>
    <nav class="sidebar-nav">
      <a href="/dashboard" class="nav-item">Home</a>
      <a href="/dashboard/create/project-details" class="nav-item">Create Token</a>
      <a href="/dashboard/manage" class="nav-item">Manage Tokens</a>
    </nav>
  </aside>

  <!-- Main Content -->
  <main class="main-content">
    <h2 class="page-title">Welcome to Dashboard!</h2>
    {#if loading}
      <p class="loading-message">Loading data...</p>
    {:else if error}
      <p class="error-message">{error}</p>
    {:else}
      <table class="data-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Project Description</th>
            <th>Project Location</th>
            <th>Token Name</th>
            <th>Token Symbol</th>
            <th>Total Supply</th>
            <th>Additional Features</th>
          </tr>
        </thead>
        <tbody>
          {#each confirmedTokens as data, index (data.tokenId || index)}
            <tr>
              <td>{data.name}</td>
              <td>{data.description}</td>
              <td>{data.location}</td>
              <td>{data.tokenName}</td>
              <td>{data.tokenSymbol}</td>
              <td>{data.totalSupply}</td>
              <td>{data.details}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </main>
</div>

<style>
  .dashboard-container {
    display: flex;
    min-height: 100vh;
    background-color: #f4f7f9;
  }

  .sidebar {
    width: 250px;
    background-color: #ffffff;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }

  .sidebar-header {
    padding: 1rem;
    border-bottom: 1px solid #e4e7eb;
  }

  .sidebar-nav {
    flex-grow: 1;
  }

  .nav-item {
    display: block;
    padding: 0.75rem 1rem;
    color: #333;
    text-decoration: none;
    transition: background-color 0.3s;
  }

  .nav-item:hover {
    background-color: #f1f3f5;
  }

  .main-content {
    flex: 1;
    padding: 2rem;
  }

  .page-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #333;
  }

  .loading-message {
    color: #007bff;
  }

  .error-message {
    color: #dc3545;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .data-table thead {
    background-color: #f8f9fa;
    color: #495057;
    text-transform: uppercase;
  }

  .data-table th,
  .data-table td {
    padding: 0.75rem 1rem;
    text-align: left;
  }

  .data-table tbody tr {
    border-bottom: 1px solid #e4e7eb;
  }

  .data-table tbody tr:hover {
    background-color: #f1f3f5;
  }
</style>
