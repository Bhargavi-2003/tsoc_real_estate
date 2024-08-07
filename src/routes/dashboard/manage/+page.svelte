<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import { goto } from "$app/navigation"; // Import the goto function for navigation
    import { success, warning, failure } from "$lib/toast"; // Import custom toast notifications

    interface TokenData {
        tokenId: number;
        tokenName: string;
        tokenSymbol: string;
        totalSupply: number;
        details: string;
    }

    let tokens: TokenData[] = [];
    let selectedTokenId: number | null = null;
    let recipientAddress = "";
    let amount = 0;
    let senderAddress = ""; // New field
    let status = "Completed"; // Default status
    let error: string | null = null;
    let successMessage: string | null = null;
    let isDistributing = false;

    async function fetchTokens() {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/token/manage",
                {
                    withCredentials: true, // Include credentials for cookie-based authentication
                },
            );
            tokens = response.data.tokens;
        } catch (err) {
            error = "Failed to load tokens";
            failure(error); // Show failure toast
        }
    }

    async function distributeToken() {
        if (selectedTokenId === null) {
            error = "Please select a token";
            failure(error); // Show failure toast
            return;
        }

        if (!recipientAddress || amount <= 0) {
            error = "Please provide recipient address and amount";
            failure(error); // Show failure toast
            return;
        }

        isDistributing = true;
        try {
            const response = await axios.post(
                "http://localhost:3000/api/token/distribute",
                {
                    tokenId: selectedTokenId,
                    recipientAddress,
                    amount,
                    senderAddress: senderAddress || "System", // Use default value if not provided
                    status: status || "Completed", // Use default status if not provided
                },
                {
                    withCredentials: true, // Include credentials for cookie-based authentication
                },
            );
            successMessage = "Tokens distributed successfully!";
            success(successMessage); // Show success toast
            recipientAddress = "";
            amount = 0;
            senderAddress = "";
        } catch (err) {
            console.error("Error:", err);
            error = "Failed to distribute tokens";
            failure(error); // Show failure toast
        } finally {
            isDistributing = false;
        }
    }

    function viewTransactions() {
        if (selectedTokenId) {
            goto(`/dashboard/transactions?tokenId=${selectedTokenId}`);
        } else {
            warning("Please select a token first."); // Show warning toast
        }
    }

    onMount(fetchTokens);
</script>

<div class="flex justify-center items-center min-h-screen bg-gray-100 p-8">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 class="text-2xl font-semibold mb-6 text-center">Manage Tokens</h1>

        {#if error}
            <p class="text-red-600 mb-4">{error}</p>
        {/if}

        {#if successMessage}
            <p class="text-green-600 mb-4">{successMessage}</p>
        {/if}

        <div class="flex flex-col space-y-4">
            <div>
                <label for="tokenSelect" class="block text-lg font-medium mb-2">
                    Select Token
                </label>
                <select
                    id="tokenSelect"
                    bind:value={selectedTokenId}
                    class="border border-gray-300 p-3 rounded-md w-full"
                >
                    <option value="">Select a token</option>
                    {#each tokens as token}
                        <option value={token.tokenId}>
                            {token.tokenName} ({token.tokenSymbol}) - {token.totalSupply}
                            available
                        </option>
                    {/each}
                </select>
            </div>

            <div>
                <label for="recipientAddress" class="block text-lg font-medium mb-2">
                    Recipient Address
                </label>
                <input
                    id="recipientAddress"
                    type="text"
                    bind:value={recipientAddress}
                    placeholder="Enter recipient address"
                    class="border border-gray-300 p-3 rounded-md w-full"
                />
            </div>

            <div>
                <label for="amount" class="block text-lg font-medium mb-2">
                    Amount
                </label>
                <input
                    id="amount"
                    type="number"
                    min="1"
                    bind:value={amount}
                    placeholder="Enter amount"
                    class="border border-gray-300 p-3 rounded-md w-full"
                />
            </div>

            <div>
                <label for="senderAddress" class="block text-lg font-medium mb-2">
                    Sender Address
                </label>
                <input
                    id="senderAddress"
                    type="text"
                    bind:value={senderAddress}
                    placeholder="Enter sender address"
                    class="border border-gray-300 p-3 rounded-md w-full"
                />
            </div>
        </div>

        <div class="mt-6">
            <button
                on:click={distributeToken}
                class="bg-blue-500 text-white p-3 rounded-md w-full hover:bg-blue-600"
                disabled={isDistributing}
            >
                {#if isDistributing}
                    Distributing...
                {/if}
                {#if !isDistributing}
                    Distribute Tokens
                {/if}
            </button>

            <button
                on:click={viewTransactions}
                class="bg-green-500 text-white p-3 rounded-md w-full hover:bg-green-600 mt-4"
            >
                View Transactions
            </button>
        </div>
    </div>
</div>
