<script lang="ts">
  import CyberpunkCard from "$lib/components/CyberpunkCard.svelte";
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-4xl font-bold text-center mb-12">Legal Information</h1>
  <div class="grid md:grid-cols-2 gap-8">
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
  </div>
  <div class="flex justify-center mt-8">
    <a href="/" class="text-sm text-neutral-400 hover:text-neutral-200 transition-colors duration-300">
      Back to Home
    </a>
  </div>
</div>
