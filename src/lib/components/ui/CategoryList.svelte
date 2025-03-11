<script>
    export let categories = [];
    // import { page } from '$app/stores';
    
    // Track active category
    let activeCategory = null;
    
    function setActiveCategory(category) {
      activeCategory = category;
      // This would typically navigate or filter content
      // For now just updating UI state
    }
  </script>
  
  <ul class="space-y-2">
    {#each categories as category}
      <li>
        <button 
          class="w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center"
          class:bg-amber-800={activeCategory === category}
          class:text-amber-100={activeCategory === category}
          class:hover:bg-amber-700={activeCategory !== category}
          class:hover:text-amber-200={activeCategory !== category}
          class:text-amber-300={activeCategory !== category}
          on:click={() => setActiveCategory(category)}
        >
          <!-- Small decorative element - suggests African pattern -->
          <span class="w-2 h-2 bg-current rounded-full mr-2 opacity-70"></span>
          {category}
        </button>
      </li>
    {/each}
  </ul>