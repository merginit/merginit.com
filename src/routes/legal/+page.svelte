<script lang="ts">
  import CyberpunkCard from "$lib/components/CyberpunkCard.svelte";
</script>

<svelte:head>
  <title>Legal Information - MerginIT e.U.</title>
  <meta 
    name="description" 
    content="Legal information for MerginIT e.U. including imprint details and privacy policy. View our company's compliance and legal documentation."
  />
  <meta property="og:title" content="Legal Information - MerginIT e.U." />
  <meta property="og:description" content="Legal information for MerginIT e.U. including imprint details and privacy policy. View our company's compliance and legal documentation." />
</svelte:head>

<div class="container mx-auto px-4 py-8 min-h-screen">
  <h1 class="text-4xl font-bold text-center mb-12">Legal Information</h1>
  <div class="grid w-xl max-w-full mx-auto gap-4">
    <CyberpunkCard 
      href="/legal/imprint" 
      title="Imprint"
      desc="View our company's imprint information."
    />
    <CyberpunkCard 
      href="/legal/privacy-policy" 
      title="Privacy Policy"
      desc="Read our commitment to your privacy."
    />
    <CyberpunkCard 
      href="/legal/cookie-policy" 
      title="Cookie Policy"
      desc="Learn about our cookie usage and management."
    />
    <CyberpunkCard 
      href="/data-request" 
      title="Data Request"
      desc="Request your personal data or account deletion."
    />
  </div>
  <div class="flex justify-center mt-8">
    <a href="/" class="text-sm text-neutral-400 hover:text-neutral-200 transition-colors duration-300">
      Back to Home
    </a>
  </div>
</div>
