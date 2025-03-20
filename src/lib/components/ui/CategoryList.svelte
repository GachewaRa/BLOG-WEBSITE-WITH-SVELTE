<script>
  import { goto } from '$app/navigation';
  
  export let categories = [];
  
  function goToCategory(slug) {
    goto(`/category/${slug}`);
  }
</script>

<nav>
  <ul class="space-y-2">
    {#each categories as category}
      <li>
        <button 
          on:click={() => goToCategory(category.slug, category.name)}
          class="flex items-center w-full py-2 px-3 text-amber-100 hover:bg-stone-800 hover:text-amber-300 rounded-md transition-colors"
        >
          <span>{category.name}</span>
        </button>
      </li>
    {/each}
  </ul>
</nav>