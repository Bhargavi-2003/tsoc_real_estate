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

<style>
  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
                0 10px 10px rgba(0,0,0,0.22);
    width: 100%;
    max-width: 768px;
    padding: 20px;
    margin: 0 auto;
  }
  
  .button {
    background: linear-gradient(to right, #1B3B65, #1C7293);
    border: none;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    padding: 12px 45px;
    border-radius: 20px;
    cursor: pointer;
    transition: transform 80ms ease-in, background-color 0.3s ease;
  }
  
  .button:hover {
    background-color: #1B3B65;
  }

  .input-field, .textarea-field {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    border-radius: 5px;
  }
  
  .input-field:focus, .textarea-field:focus {
    outline: none;
    border-color: #1C7293;
    box-shadow: 0 0 0 2px rgba(28, 114, 155, 0.3);
  }

  .label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
    color: #333;
  }
</style>

<div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="container">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-900">Enter Project Details</h1>
    <form on:submit|preventDefault={submitProjectDetails} class="space-y-6">
      <div>
        <label for="projectName" class="label">Project Name</label>
        <input id="projectName" type="text" bind:value={projectName} class="input-field" placeholder="Project Name" />
      </div>
      <div>
        <label for="projectDescription" class="label">Project Description</label>
        <textarea id="projectDescription" bind:value={projectDescription} class="textarea-field" placeholder="Project Description"></textarea>
      </div>
      <div>
        <label for="projectLocation" class="label">Project Location</label>
        <input id="projectLocation" type="text" bind:value={projectLocation} class="input-field" placeholder="Project Location" />
      </div>
      <div>
        <button type="submit" class="button">Next</button>
      </div>
    </form>
  </div>
</div>
