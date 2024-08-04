<script lang="ts">
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { goto } from '$app/navigation'; // Import the goto function for navigation

    interface TokenData {
        tokenId: number;
        tokenName: string;
        tokenSymbol: string;
        totalSupply: number;
        details: string;
    }

    let tokens: TokenData[] = [];
    let selectedTokenId: number | null = null;
    let recipientAddress = '';
    let amount = 0;
    let senderAddress = ''; // New field
    let status = 'Completed'; // Default status
    let error: string | null = null;
    let successMessage: string | null = null;
    let isDistributing = false;

    async function fetchTokens() {
        try {
            const response = await axios.get('http://localhost:3000/api/token/manage', {
                params: { builderId: 1 }, // Adjust as needed
            });
            tokens = response.data.tokens;
        } catch (err) {
            error = 'Failed to load tokens';
        }
    }

    async function distributeToken() {
        if (selectedTokenId === null) {
            error = 'Please select a token';
            return;
        }

        if (!recipientAddress || amount <= 0) {
            error = 'Please provide recipient address and amount';
            return;
        }

        isDistributing = true;
        try {
            const response = await axios.post('http://localhost:3000/api/token/distribute', {
                tokenId: selectedTokenId,
                recipientAddress,
                amount,
                senderAddress: senderAddress || 'System', // Use default value if not provided
                status: status || 'Completed', // Use default status if not provided
            });
            successMessage = 'Tokens distributed successfully!';
            recipientAddress = '';
            amount = 0;
            senderAddress = '';
        } catch (err) {
            console.error('Error:', err);
            error = 'Failed to distribute tokens';
        } finally {
            isDistributing = false;
        }
    }

    function viewTransactions() {
        if (selectedTokenId) {
            goto(`/dashboard/transactions?tokenId=${selectedTokenId}`);
        } else {
            alert('Please select a token first.');
        }
    }

    onMount(fetchTokens);
</script>

<div class="p-8">
    <h1 class="text-2xl font-semibold mb-4">Manage Tokens</h1>

    {#if error}
        <p class="text-red-600">{error}</p>
    {/if}

    {#if successMessage}
        <p class="text-green-600">{successMessage}</p>
    {/if}

    <div class="mb-4">
        <label for="tokenSelect" class="block text-lg font-medium mb-2">Select Token</label>
        <select id="tokenSelect" bind:value={selectedTokenId} class="border border-gray-300 p-2 rounded-md">
            <option value="">Select a token</option>
            {#each tokens as token}
                <option value={token.tokenId}>
                    {token.tokenName} ({token.tokenSymbol}) - {token.totalSupply} available
                </option>
            {/each}
        </select>
    </div>

    <div class="mb-4">
        <label for="recipientAddress" class="block text-lg font-medium mb-2">Recipient Address</label>
        <input
            id="recipientAddress"
            type="text"
            bind:value={recipientAddress}
            placeholder="Enter recipient address"
            class="border border-gray-300 p-2 rounded-md w-full"
        />
    </div>

    <div class="mb-4">
        <label for="amount" class="block text-lg font-medium mb-2">Amount</label>
        <input
            id="amount"
            type="number"
            min="1"
            bind:value={amount}
            placeholder="Enter amount"
            class="border border-gray-300 p-2 rounded-md w-full"
        />
    </div>

    <div class="mb-4">
        <label for="senderAddress" class="block text-lg font-medium mb-2">Sender Address</label>
        <input
            id="senderAddress"
            type="text"
            bind:value={senderAddress}
            placeholder="Enter sender address"
            class="border border-gray-300 p-2 rounded-md w-full"
        />
    </div>

    <button
        on:click={distributeToken}
        class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        disabled={isDistributing}
    >
        {#if isDistributing} Distributing... {/if}
        {#if !isDistributing} Distribute Tokens {/if}
    </button>

    <button
        on:click={viewTransactions}
        class="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mt-4"
    >
        View Transactions
    </button>
</div>
