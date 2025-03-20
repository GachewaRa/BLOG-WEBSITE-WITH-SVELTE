<script>
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { getRequest } from '$lib/utils/api';
  import { goto } from '$app/navigation';
  
  // First, declare all variables
  let categorySlug = '';
  let categoryName = '';
  let posts = [];
  let loading = true;
  let error = null;
  let currentPage = 1;
  let postsPerPage = 6;
  let totalPosts = 0;
  let unsubscribe;
  
  // Function to create a plain text preview from HTML content
  function createContentPreview(htmlContent, maxLength = 150) {
    if (typeof document === 'undefined') return ''; // SSR check
    
    // Create a temporary div to hold the HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Get the text content (strips all HTML tags)
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    // Trim and limit the length
    const trimmedContent = textContent.trim();
    if (trimmedContent.length <= maxLength) {
      return trimmedContent;
    }
    
    return trimmedContent.substring(0, maxLength) + '...';
  }
  
  // Function to extract the first image from HTML content
  function extractFirstImage(htmlContent) {
    if (typeof document === 'undefined') return null; // SSR check
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    const imgElement = tempDiv.querySelector('img');
    return imgElement ? imgElement.getAttribute('src') : null;
  }
  
  // Format date nicely
  function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }
  
  async function fetchCategoryInfo() {
    try {
      const response = await getRequest(`/api/blog/categories/?slug=${categorySlug}`);
      if (response.data && response.data.length > 0) {
        categoryName = response.data[0].name;
      } else {
        categoryName = '';
      }
    } catch (e) {
      console.error("Error fetching category info:", e);
      categoryName = '';
    }
  }

  async function fetchPosts() {
    loading = true;
    error = null;
    try {
      const response = await getRequest(
        `/api/blog/posts/?category=${categorySlug}&page=${currentPage}&page_size=${postsPerPage}`
      );

      if (response.data) {
        posts = response.data.results.map((post) => {
          const contentImage = !post.image ? extractFirstImage(post.content) : null;
          return {
            ...post,
            formattedDate: formatDate(post.updated_at || post.created_at),
            contentPreview: createContentPreview(post.content),
            contentImage: contentImage,
          };
        });
        totalPosts = response.data.count;
      } else if (response.error) {
        error = response.error;
      }
    } catch (e) {
      error = "An unexpected error occurred.";
      console.error(e);
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    // Single subscription to the page store
    unsubscribe = page.subscribe(($page) => {
      if ($page.params.slug) {
        categorySlug = $page.params.slug;
        console.log("Category slug from URL:", categorySlug); // Debug log
        fetchCategoryInfo();
        fetchPosts();
      }
    });
  });
  
  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  function goToPost(slug) {
    goto(`/blog/${slug}`);
  }
  
  function changePage(pageNumber) {
    currentPage = pageNumber;
    fetchPosts();
    window.scrollTo(0, 0);
  }
  
  function getPageNumbers() {
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
</script>

<svelte:head>
  <title>{categoryName ? `${categoryName} Posts` : 'Category Posts'}</title>
</svelte:head>

<section class="container mx-auto py-8 px-8">
  <h1 class="text-3xl font-bold mb-4">
    {#if categoryName}
      Posts for {categoryName} Category
    {:else}
      Category Posts
    {/if}
  </h1>

  {#if loading}
    <div class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>
  {:else if error}
    <p class="text-red-500">Error: {error}</p>
  {:else if posts.length === 0}
    <p class="text-xl text-stone-600 dark:text-stone-300">No posts found for this category.</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each posts as post}
        <div class="rounded-lg shadow-md overflow-hidden bg-white dark:bg-stone-800 h-full flex flex-col">
          <a href="/blog/{post.slug}" class="block hover:opacity-90 transition-opacity flex-grow">
            {#if post.image}
              <img src={post.image} alt={post.title} class="w-full h-56 object-cover" />
            {:else if post.contentImage}
              <img src={post.contentImage} alt={post.title} class="w-full h-56 object-cover" />
            {:else}
              <div class="w-full h-32 bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
                <span class="text-stone-500 dark:text-stone-400">No image</span>
              </div>
            {/if}
            <div class="p-4 flex flex-col flex-grow">
              <h2 class="text-xl font-semibold mb-2 text-stone-900 dark:text-amber-100">{post.title}</h2>
              <div class="flex items-center mb-2 text-sm text-stone-500 dark:text-stone-400">
                <span class="mr-2">{post.formattedDate}</span>
                {#if post.category}
                  <span class="bg-stone-200 dark:bg-stone-700 px-2 py-1 rounded text-xs">{post.category}</span>
                {/if}
              </div>
              <p class="mt-2 text-stone-700 dark:text-stone-300 flex-grow">
                {post.contentPreview}
              </p>
              <div class="mt-3 flex flex-wrap">
                {#if post.tags && post.tags.length > 0}
                  {#each post.tags as tag}
                    <span class="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 text-xs px-2 py-1 rounded mr-1 mb-1">{tag}</span>
                  {/each}
                {/if}
              </div>
            </div>
          </a>
        </div>
      {/each}
    </div>

    {#if totalPosts > postsPerPage}
      <div class="flex justify-center mt-8">
        {#each getPageNumbers() as pageNumber}
          <button
            class="px-4 py-2 mx-1 rounded-md bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-700 {currentPage === pageNumber ? 'bg-amber-300 dark:bg-amber-600' : ''}"
            on:click={() => changePage(pageNumber)}
          >
            {pageNumber}
          </button>
        {/each}
      </div>
    {/if}
  {/if}
</section>