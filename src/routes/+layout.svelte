<script>
    import Navbar from "$lib/Navbar.svelte";
    import Footer from "$lib/Footer.svelte";
    import "../app.css";
    import { SvelteToast } from "@zerodevx/svelte-toast";
</script>

<Navbar />
<SvelteToast />
<slot />

<Footer />
