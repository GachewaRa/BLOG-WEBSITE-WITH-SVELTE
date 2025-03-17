<script>
    import { page } from '$app/stores';
    import CategoryPosts from '$lib/components/CategoryPosts.svelte';
    
    // Get the category slug from the URL params
    $: categorySlug = $page.params.slug;
  </script>
  
  <CategoryPosts {categorySlug} />