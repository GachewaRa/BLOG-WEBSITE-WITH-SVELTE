<script>
  import AfricanPattern from '$lib/components/ui/AfricanPattern.svelte';
  import Button from '../ui/Button.svelte';

  export let isLargeScreen = true;
</script>

<footer class="fixed bottom-0 left-0 right-0 h-32 z-30" style="left: var(--sidebar-width, 0);">
  <div class="relative w-full h-full overflow-hidden">
    <!-- African pattern background -->
    <div class="absolute inset-0">
      <AfricanPattern fadeDirection="top" />
    </div>
    
    <!-- Footer content -->
    <div class="relative h-full flex flex-col">
      <!-- Navigation buttons -->
      <div class="flex justify-between items-center px-8 py-4">
        <!-- <a href="/about" class="bg-amber-800 hover:bg-amber-700 text-amber-100 px-4 py-2 rounded-full shadow-lg transition-colors">
          About Me
        </a>
        
        <a href="/contact" class="bg-amber-800 hover:bg-amber-700 text-amber-100 px-4 py-2 rounded-full shadow-lg transition-colors">
          Contact Me
        </a> -->


        <!-- Replace the anchor tags with Button components -->
        <Button href="/about" variant="primary">About Me</Button>
        <Button href="/contact" variant="primary">Contact Me</Button>
      </div>
      
      <!-- Quote -->
      <div class="text-center py-3 border-t border-amber-800/30 mt-auto">
        <p class="text-amber-100 italic font-medium">"I am Because We Are"</p>
      </div>
    </div>
  </div>
</footer>

<style>
  /* Set sidebar width variable for proper footer positioning */
  @media (min-width: 1024px) {
    footer {
      --sidebar-width: 16rem;
    }
  }
</style>