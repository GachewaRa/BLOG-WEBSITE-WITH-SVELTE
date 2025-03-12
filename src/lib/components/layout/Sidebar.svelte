<script>
  import CategoryList from '$lib/components/ui/CategoryList.svelte';
  import logo from '$lib/images/SITE LOGO11.png';
  
  export let isLargeScreen = true;
  
  // Sample categories
  const categories = [
    "Ancient Wisdom",
    "Ubuntu Philosophy",
    "African Art",
    "Traditional Crafts",
    "Cultural Heritage",
    "Modern Africa",
    "Storytelling",
    "African Tech",
    "Diaspora Stories",
    "Egyptian History",
    "Nubian Culture",
    "Traditional Medicine",
    "African Cuisine"
  ];
</script>

<aside class="bg-stone-900 text-amber-100 h-full w-64 flex flex-col">
  <!-- Logo -->
  <div class="p-4 flex justify-center">
    <div class="w-52 h-24 rounded-md flex items-center justify-center"> 
      <img src={logo} alt="Site Logo" class="w-full h-full object-contain" /> 
    </div>
  </div>

  <!-- Categories Title (Fixed) -->
  <div class="px-3 bg-stone-900 sticky top-0 z-10">
    <h3 class="text-xl font-semibold text-center text-amber-300 border-b border-amber-700 py-3">
      Categories
    </h3>
  </div>

  <!-- Category List (Scrollable) -->
  <div class="flex-1 overflow-y-auto py-4 px-3">
    <CategoryList {categories} />
  </div>
</aside>
