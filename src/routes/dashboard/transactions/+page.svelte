<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";

    interface Transaction {
        id: number;
        date: string;
        amount: number;
        senderAddress: string;
        recipientAddress: string;
        status: string;
    }

    let transactions: Transaction[] = [];
    let error: string | null = null;
    let tokenId: number | null = null;

    // Fetch transactions based on tokenId
    async function fetchTransactions(builderId: number, tokenId: number) {
        try {
            const response = await axios.get(
                "https://tsoc-real-estate-backend.vercel.app/api/token/transactions",
                {
                    params: { builderId, tokenId },
                },
            );
            transactions = response.data.transactions;
        } catch (err) {
            error = "Failed to load transactions";
        }
    }

    onMount(() => {
        const query = new URLSearchParams(window.location.search);
        tokenId = parseInt(query.get("tokenId") || "0", 10);
        const builderId = 1; // Adjust this as needed

        if (tokenId) {
            fetchTransactions(builderId, tokenId);
        } else {
            error = "No tokenId provided";
        }
    });
</script>

<div class="p-8">
    <h1 class="text-2xl font-semibold mb-4">Token Transactions</h1>

    {#if error}
        <p class="text-red-600">{error}</p>
    {/if}

    {#if transactions.length === 0 && !error}
        <p class="text-gray-600">No transactions found.</p>
    {/if}

    {#if transactions.length > 0}
        <table class="min-w-full divide-y divide-gray-200">
            <thead>
                <tr>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Transaction ID</th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Date</th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Amount</th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Sender Address</th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Recipient Address</th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Status</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                {#each transactions as transaction}
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap">{transaction.id}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{transaction.amount}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{transaction.senderAddress}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{transaction.recipientAddress}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{transaction.status}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
</div>
