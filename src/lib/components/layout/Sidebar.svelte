<script>
  import { onMount } from 'svelte';
  import CategoryList from '$lib/components/ui/CategoryList.svelte';
  import logo from '$lib/images/SITE LOGO11.png';
  import { getRequest } from '$lib/utils/api';
  import { toggleSidebar } from '$lib/stores/appStore';
  
  export let isLargeScreen = true;
  
  let categories = [];
  let loading = true;
  let error = null;
  
  async function fetchCategories() {
    loading = true;
    error = null;
    try {
      const response = await getRequest('/api/blog/categories/');
      
      if (response.data) {
        categories = response.data.map(category => ({
                    id: category.id, // Store the ID
                    slug: category.slug,
                    name: category.name
                }));
      } else if (response.error) {
        error = response.error;
      }
    } catch (e) {
      error = "Failed to load categories.";
      console.error(e);
    } finally {
      loading = false;
    }
  }
  
  onMount(fetchCategories);
</script>

<aside class="bg-black text-amber-100 h-full w-64 flex flex-col">
  <!-- Logo -->
  <div class="p-4 flex justify-center">
    <div class="w-52 h-24 rounded-md flex items-center justify-center"> 
      <img src={logo} alt="Site Logo" class="w-full h-full object-contain" /> 
    </div>
  </div>

  <!-- Categories Title (Fixed) -->
  <div class="px-3 bg-black sticky top-0 z-10">
    <h3 class="text-xl font-semibold text-center text-amber-300 border-b border-amber-700 py-3">
      Categories
    </h3>
  </div>

  <!-- Category List (Scrollable) -->
  <div class="flex-1 overflow-y-auto py-4 px-3">
    {#if loading}
      <div class="flex justify-center py-4">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500"></div>
      </div>
    {:else if error}
      <p class="text-red-500 text-sm">{error}</p>
    {:else}
      <CategoryList {categories} />
    {/if}
  </div>
  
  <!-- Quotes Button (Fixed at bottom) -->
  <div class="px-3 py-4 bg-black border-t border-amber-700">
    <a href="/quotes" class="block w-full py-3 px-4 bg-black hover:bg-white text-amber-800 rounded-md text-center font-bold transition-colors" on:click={toggleSidebar}>
      Quotes
    </a>
  </div>
</aside>