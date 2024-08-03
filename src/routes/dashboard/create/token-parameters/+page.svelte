<script lang="ts">
  import { goto } from "$app/navigation";
  import axios from "axios";

  let tokenName = "";
  let tokenSymbol = "";
  let totalSupply = ""; // This is initially a string
  let additionalFeatures = "";

  async function submitTokenParameters() {
    try {
      // Convert totalSupply to a number
      const totalSupplyNumber = parseInt(totalSupply, 10);

      // Ensure totalSupply is a number, fallback to 0 if parsing fails
      if (isNaN(totalSupplyNumber)) {
        console.error("Total Supply must be a number");
        return;
      }

      // Send data to the backend
      const response = await axios.post(
        "http://localhost:3000/api/token/define",
        {
          builderId: 1, // Replace with actual builderId if needed
          projectId: 1, // Replace with actual projectId if needed
          tokenName,
          tokenSymbol,
          totalSupply: totalSupplyNumber, // Pass as number
          additionalFeatures,
        },
      );

      console.log("Token parameters defined successfully:", response.data);
      goto("/dashboard/create/confirmation");
    } catch (error) {
      console.error("Error defining token parameters:", error);
    }
  }
</script>

<div
  class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
>
  <div class="container">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-900">
      Define Token Parameters
    </h1>
    <form on:submit|preventDefault={submitTokenParameters} class="space-y-6">
      <div>
        <label for="tokenName" class="label">Token Name</label>
        <input
          id="tokenName"
          type="text"
          bind:value={tokenName}
          class="input-field h-12"
          placeholder="Token Name"
        />
      </div>
      <div>
        <label for="tokenSymbol" class="label">Token Symbol</label>
        <input
          id="tokenSymbol"
          type="text"
          bind:value={tokenSymbol}
          class="input-field h-12"
          placeholder="Token Symbol"
        />
      </div>
      <div>
        <label for="totalSupply" class="label">Total Supply</label>
        <input
          id="totalSupply"
          type="number"
          bind:value={totalSupply}
          class="input-field h-12"
          placeholder="Total Supply"
        />
      </div>
      <div>
        <label for="additionalFeatures" class="label"
          >Additional Features (Optional)</label
        >
        <textarea
          id="additionalFeatures"
          bind:value={additionalFeatures}
          class="textarea-field h-24"
          placeholder="Additional Features (Optional)"
        ></textarea>
      </div>
      <div>
        <button type="submit" class="button w-full">Next</button>
      </div>
    </form>
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

  .button {
    background: linear-gradient(to right, #1b3b65, #1c7293);
    border: none;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    padding: 12px 45px;
    border-radius: 20px;
    cursor: pointer;
    transition:
      transform 80ms ease-in,
      background-color 0.3s ease;
  }

  .button:hover {
    background-color: #1b3b65;
  }

  .input-field,
  .textarea-field {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    border-radius: 5px;
  }

  .input-field:focus,
  .textarea-field:focus {
    outline: none;
    border-color: #1c7293;
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
