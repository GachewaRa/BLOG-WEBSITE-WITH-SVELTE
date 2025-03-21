<script>
  import AfricanPattern from '$lib/components/ui/AfricanPattern.svelte';
  import Button from '../ui/Button.svelte';
  import { isDarkMode } from '$lib/stores/appStore';

  export let isLargeScreen = true;
</script>

<footer class="fixed bottom-0 left-0 right-0 h-32 z-30 transition-all duration-300" style={isLargeScreen ? 'left: 16rem;' : ''}>
  <div class="relative w-full h-full overflow-hidden">
    <!-- African pattern background -->
    <div class="absolute inset-0">
      <AfricanPattern fadeDirection="top" />
    </div>
    
    <!-- Footer content -->
    <div class="relative h-full flex flex-col">
      <!-- Navigation buttons -->
      <div class="flex justify-center md:justify-between items-center px-4 md:px-8 py-4">
        <Button href="/contact" variant={$isDarkMode ? "outline" : "primary"}>Contact/Newsletter</Button>
        <Button href="/about" variant={$isDarkMode ? "outline" : "primary"}>About Me</Button>
      </div>
      
      <!-- Quote -->
      <div class="text-center py-3 border-t border-amber-800/30 mt-auto">
        <p class="text-amber-100 italic font-medium">"I am Because We Are"</p>
      </div>
    </div>
  </div>
</footer>