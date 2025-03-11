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
  <div class="p-4 flex justify-center">
    <div class="w-48 h-20 rounded-md flex items-center justify-center"> 
      <img src={logo} alt="Site Logo" class="w-full h-full object-contain" /> 
    </div>
  </div>
  
  <div class="flex-1 overflow-y-auto py-4 px-3">
    <h3 class="text-xl font-semibold mb-4 text-amber-300 border-b border-amber-700 pb-2">Categories</h3>
    <CategoryList {categories} />
  </div>
</aside>
