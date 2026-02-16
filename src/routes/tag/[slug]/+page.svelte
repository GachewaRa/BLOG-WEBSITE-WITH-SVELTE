<script>
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { getRequest } from '$lib/utils/api';
  import { goto } from '$app/navigation';
  
  // First, declare all variables
  let tagSlug = '';
  let tagName = '';
  let posts = [];
  let loading = true;
  let error = null;
  let currentPage = 1;
  let postsPerPage = 6;
  let totalPosts = 0;
  let unsubscribe;
  let tagId = null;
  
  // Format date nicely
  function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }
  

  async function fetchTagInfo() {
        try {
            const response = await getRequest(`/api/blog/tags/${tagId}/`);
            if (response.data) {
                tagName = response.data.name;
            } else {
                tagName = '';
            }
        } catch (e) {
            console.error("Error fetching tag info:", e);
            tagName = '';
        }
    }

  async function fetchPosts() {
    loading = true;
    error = null;
    try {
      const response = await getRequest(
        `/api/blog/posts/?tag=${tagSlug}&page=${currentPage}&page_size=${postsPerPage}`
      );
      console.log("TAG SLUG", tagSlug);
      tagName = tagSlug;

      if (response.data) {
        posts = response.data.results.map((post) => ({
            ...post,
            formattedDate: formatDate(post.updated_at || post.created_at),
        }));
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
        let unsubscribe = page.subscribe(($page) => {
            if ($page.params.slug) {
                tagSlug = $page.params.slug;
                tagId = $page.url.searchParams.get('id'); // Get ID from query params
                Promise.all([fetchTagInfo(), fetchPosts()]);
            }
        });

        return () => {
            unsubscribe();
        };
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
  <title>{tagName ? `${tagName} Posts` : 'Tag Posts'}</title>
</svelte:head>

<section class="container mx-auto py-8 px-8">
  <h1 class="text-3xl font-bold mb-4">
    {#if tagName}
      Posts for {tagName} tag
    {:else}
      Tag Posts
    {/if}
  </h1>

  {#if loading}
    <div class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>
  {:else if error}
    <p class="text-red-500">Error: {error}</p>
  {:else if posts.length === 0}
    <p class="text-xl text-stone-600 dark:text-stone-300">No posts found for this tag.</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each posts as post}
        <div class="rounded-lg shadow-md overflow-hidden bg-white dark:bg-stone-800 h-full flex flex-col">
          <a href="/blog/{post.slug}" class="block hover:opacity-90 transition-opacity flex-grow">
            {#if post.image}
              <img src={post.image} alt={post.title} class="w-full h-56 object-cover" />
            {:else if post.first_image_url}
              <img src={post.first_image_url} alt={post.title} class="w-full h-56 object-cover" />
            {:else}
              <div class="w-full h-32 bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
                <span class="text-stone-500 dark:text-stone-400">No image</span>
              </div>
            {/if}
            <div class="p-4 flex flex-col flex-grow">
              <h2 class="text-xl font-semibold mb-2 text-stone-900 dark:text-amber-100">{post.title}</h2>
              <div class="flex items-center mb-2 text-sm text-stone-500 dark:text-stone-400">
                <span class="mr-2">{post.formattedDate}</span>
                {#if post.tag}
                  <span class="bg-stone-200 dark:bg-stone-700 px-2 py-1 rounded text-xs">{post.tag}</span>
                {/if}
              </div>
              <p class="mt-2 text-stone-700 dark:text-stone-300 flex-grow">
                {post.excerpt}
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