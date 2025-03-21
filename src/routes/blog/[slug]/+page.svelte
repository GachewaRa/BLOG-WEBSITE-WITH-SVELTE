<script>
  import { onMount } from 'svelte';
  import { getRequest, postRequest } from '$lib/utils/api';
  import { page } from '$app/stores';
  import { user } from '$lib/stores/authStore';
  
  let post = null;
  let comments = [];
  let loading = true;
  let commentsLoading = false;
  let error = null;
  let commentError = null;
  let commentSuccess = false;
  
  // New comment form data
  let newComment = {
    content: '',
    post: null
  };
  
  // Get API base URL from environment (adjust as needed)
  const API_BASE_URL = import.meta.env.VITE_API_URL || '';
  
  // Helper to get full image URL
  function getFullImageUrl(imagePath) {
    if (!imagePath) return null;
    
    // If the image path already has the full URL, return it as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, prepend the backend URL
    return `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  }
  
  // Fix image URLs in HTML content
  function fixContentImageUrls(htmlContent) {
    if (!htmlContent) return '';
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Find all images and update their src attributes
    const images = tempDiv.querySelectorAll('img');
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http')) {
        // Prepend the base URL if needed
        img.setAttribute('src', getFullImageUrl(src));
      }
    });
    
    return tempDiv.innerHTML;
  }
  
  // Format date nicely
  function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
  
  async function fetchComments(postId) {
    commentsLoading = true;
    try {
      const response = await getRequest(`/api/blog/comments/?post=${postId}`);
      
      if (response.data && response.data.results) {
        comments = response.data.results.map(comment => ({
          ...comment,
          formattedDate: formatDate(comment.created_at)
        }));
      } else if (response.error) {
        commentError = response.error;
      }
    } catch (e) {
      commentError = "Failed to load comments.";
      console.error(e);
    } finally {
      commentsLoading = false;
    }
  }
  
  async function submitComment() {
    if (!$user) {
      commentError = "You must be logged in to comment.";
      return;
    }
    
    if (!newComment.content.trim()) {
      commentError = "Comment cannot be empty.";
      return;
    }
    
    commentError = null;
    commentSuccess = false;
    
    try {
      const commentData = {
        post: post.id,
        content: newComment.content
      };
      
      const response = await postRequest('/api/blog/comments/', commentData);
      
      if (response.data) {
        // Add the new comment to the list with formatted date
        const newCommentWithDate = {
          ...response.data,
          formattedDate: formatDate(response.data.created_at)
        };
        
        comments = [newCommentWithDate, ...comments];
        newComment.content = ''; // Clear the form
        commentSuccess = true;
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          commentSuccess = false;
        }, 3000);
      } else if (response.error) {
        commentError = response.error;
      }
    } catch (e) {
      commentError = "Failed to submit comment.";
      console.error(e);
    }
  }
  
  onMount(async () => {
    const slug = $page.params.slug;
  
    
    if (!slug) {
      error = "Post not found";
      loading = false;
      return;
    }
    
    try {
      const response = await getRequest(`/api/blog/posts/${slug}/`);
      
      if (response.data) {
        // Fix image URLs in the content
        const fixedContent = fixContentImageUrls(response.data.content);
        // console.log("RESPONSE DATA TAGS", response.data.tags);
        const tags = response.data.tags.map(tag => ({
          // id: tag.id,
          // slug: tag.slug,
          name: tag
        }));
        console.log("TAGS", tags);
        post = {
          ...response.data,
          content: fixedContent,
          formattedDate: formatDate(response.data.updated_at || response.data.created_at),
          tags: tags
        };
        
        // Fetch comments after the post is loaded
        await fetchComments(post.id);
      } else if (response.error) {
        error = response.error;
      }
    } catch (e) {
      error = "An unexpected error occurred.";
      console.error(e);
    } finally {
      loading = false;
    }
  });
  
</script>

<svelte:head>
  {#if post}
    <title>{post.title}</title>
  {:else}
    <title>Blog Post</title>
  {/if}
</svelte:head>

<section class="container mx-auto py-8 px-4">
  {#if loading}
    <div class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>
  {:else if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      Error: {error}
    </div>
  {:else if !post}
    <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
      Post not found
    </div>
  {:else}
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
      
      <div class="flex items-center mb-6 text-stone-600 dark:text-stone-400">
        <span class="mr-3">{post.formattedDate}</span>
        {#if post.category}
          <span class="bg-stone-200 dark:bg-stone-700 px-2 py-1 rounded mr-3">{post.category}</span>
        {/if}
        {#if post.author}
          <span>By {post.author}</span>
        {/if}
      </div>
      
      {#if post.image}
        <img src={getFullImageUrl(post.image)} alt={post.title} class="w-full h-auto mb-6 rounded" />
      {/if}
      
      <div class="prose prose-stone dark:prose-invert max-w-none mb-12">
        <!-- Use the @html directive to render HTML content -->
        {@html post.content}
      </div>
      
      {#if post.tags && post.tags.length > 0}
        <div class="mb-12">
          <h3 class="text-lg font-bold mb-2">Tags</h3>
          <div class="flex flex-wrap">
            {#each post.tags as tag}
              <a href="/tag/{tag.name}">
              <span class="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 px-2 py-1 rounded mr-2 mb-2">{tag.name}</span>
              </a>
              {/each}
          </div>
        </div>
      {/if}

      

      
      <!-- Comments Section -->
      <div class="mt-12 pt-6 border-t border-stone-200 dark:border-stone-700">
        <h2 class="text-2xl font-bold mb-6">Comments</h2>
        
        <!-- Comment Form -->
        <div class="bg-stone-50 dark:bg-stone-800 p-4 rounded-lg mb-8">
          <h3 class="text-lg font-bold mb-2">Leave a Comment</h3>
          
          {#if !$user}
            <div class="bg-blue-100 text-blue-800 p-3 rounded mb-4">
              Please <a href="/login" class="font-bold underline">log in</a> to leave a comment.
            </div>
          {/if}
          
          {#if commentError}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {commentError}
            </div>
          {/if}
          
          {#if commentSuccess}
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Comment submitted successfully!
            </div>
          {/if}
          
          <form on:submit|preventDefault={submitComment} class="space-y-4">
            <div>
              <label for="comment" class="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                Your Comment
              </label>
              <textarea
                id="comment"
                rows="4"
                bind:value={newComment.content}
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-stone-700 dark:border-stone-600"
                placeholder="Share your thoughts..."
                disabled={!$user}
              ></textarea>
            </div>
            <button
              type="submit"
              class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md disabled:bg-stone-400 disabled:cursor-not-allowed"
              disabled={!$user || !newComment.content.trim()}
            >
              Submit Comment
            </button>
          </form>
        </div>
        
        <!-- Comments List -->
        {#if commentsLoading}
          <div class="flex justify-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
          </div>
        {:else if commentError && !comments.length}
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {commentError}
          </div>
        {:else if comments.length === 0}
          <div class="bg-stone-100 dark:bg-stone-800 p-4 rounded text-center">
            No comments yet. Be the first to comment!
          </div>
        {:else}
          <div class="space-y-6">
            {#each comments as comment}
              <div class="bg-stone-50 dark:bg-stone-800 p-4 rounded-lg">
                <div class="flex justify-between items-start mb-2">
                  <div class="font-medium text-amber-700 dark:text-amber-400">{comment.user}</div>
                  <div class="text-xs text-stone-500 dark:text-stone-400">{comment.formattedDate}</div>
                </div>
                <p class="text-stone-700 dark:text-stone-300">{comment.content}</p>
              </div>
            {/each}
          </div>
        {/if}
      </div>
      
      <div class="mt-8 pt-4 border-t border-stone-200 dark:border-stone-700">
        <a href="/blog" class="text-amber-600 dark:text-amber-400 hover:underline">
          ← Back to all posts
        </a>
      </div>
    </div>
  {/if}
</section>