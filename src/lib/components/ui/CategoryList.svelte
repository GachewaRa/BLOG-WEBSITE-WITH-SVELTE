<script>
  import { goto } from '$app/navigation';
  import { toggleSidebar } from '$lib/stores/appStore';

  export let categories = [];

  function goToCategory(slug, id) {
      goto(`/category/${slug}?id=${id}`);
      toggleSidebar();
  }
</script>

<nav>
  <ul class="space-y-2">
      {#each categories as category}
          <li>
              <button 
                  on:click={() => goToCategory(category.slug, category.id)}
                  class="flex items-center w-full py-2 px-3 text-amber-100 hover:bg-stone-800 hover:text-amber-300 rounded-md transition-colors"
              >
                  <span>{category.name}</span>
              </button>
          </li>
      {/each}
  </ul>
</nav>
