<script>
  import { onMount } from 'svelte';
  import { getRequest, postRequest } from '$lib/utils/api';
  import { user } from '$lib/stores/authStore';
  
  let quotes = [];
  let loading = true;
  let error = null;
  let currentQuoteIndex = 0;
  let expandedCommentSections = new Set();
  
  
  let comments = {};
  let commentsLoading = {};
  let commentError = null;
  let commentSuccess = false;
  let newComment = { content: '' };
  let activeQuoteId = null;
  
  // Format date nicely
  function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }
  
  async function fetchQuotes() {
    loading = true;
    error = null;
    try {
      const response = await getRequest('/api/blog/quotes/');
      
      if (response.data) {
        quotes = response.data;
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
  
  function toggleCommentSection(quoteId) {
  let newExpandedCommentSections = new Set(expandedCommentSections); // Create a new Set

  if (newExpandedCommentSections.has(quoteId)) {
      newExpandedCommentSections.delete(quoteId);
  } else {
      newExpandedCommentSections.add(quoteId);
      if (!comments[quoteId]) {
          fetchComments(quoteId);
      }
  }
  expandedCommentSections = newExpandedCommentSections; // Reassign to trigger reactivity
}
  
  async function fetchComments(quoteId) {
    commentsLoading[quoteId] = true;
    try {
      const response = await getRequest(`/api/blog/comments/?quote=${quoteId}`);
      if (response.data && response.data.results) {
        comments[quoteId] = response.data.results.map(comment => ({
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
      commentsLoading[quoteId] = false;
    }
  }
  
  async function submitComment(quoteId) {
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
        quote: quoteId,
        content: newComment.content
      };
      const response = await postRequest('/api/blog/comments/', commentData);
      if (response.data) {
        // Add the new comment to the list with formatted date
        const newCommentWithDate = {
          ...response.data,
          formattedDate: formatDate(response.data.created_at)
        };
        
        if (!comments[quoteId]) {
          comments[quoteId] = [];
        }
        
        comments[quoteId] = [newCommentWithDate, ...comments[quoteId]];
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
  
  function prevQuote() {
    if (currentQuoteIndex > 0) {
      currentQuoteIndex--;
    } else {
      currentQuoteIndex = quotes.length - 1; // Loop back to the end
    }
  }
  
  function nextQuote() {
    if (currentQuoteIndex < quotes.length - 1) {
      currentQuoteIndex++;
    } else {
      currentQuoteIndex = 0; // Loop back to the beginning
    }
  }
  
  onMount(fetchQuotes);
</script>

<svelte:head>
  <title>Quotes</title>
</svelte:head>

<section class="container mx-auto py-8">
  <h1 class="text-3xl font-bold mb-6 text-center">Quotes</h1>

  {#if loading}
    <div class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>
  {:else if error}
    <p class="text-red-500">Error: {error}</p>
  {:else if quotes.length === 0}
    <p class="text-xl text-center text-stone-600 dark:text-stone-300">No quotes found.</p>
  {:else}
    <div class="flex flex-col items-center">
      <!-- Navigation Controls -->
      <div class="flex justify-between w-full max-w-3xl mb-6">
        <button 
          class="bg-stone-800 text-amber-100 px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
          on:click={prevQuote}
        >
          Previous
        </button>
        <span class="text-lg">{currentQuoteIndex + 1} of {quotes.length}</span>
        <button 
          class="bg-stone-800 text-amber-100 px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
          on:click={nextQuote}
        >
          Next
        </button>
      </div>

      {#if quotes[currentQuoteIndex]}
        {@const quote = quotes[currentQuoteIndex]}
        <div class="w-full max-w-3xl mb-8">
          <div class="relative overflow-hidden rounded-lg shadow-lg">
            <!-- Quote Card with B&W Image -->
            <div class="relative bg-stone-900">
              {#if quote.owner_image}
                <div class="w-full aspect-[3/2]">
                  <img 
                    src={quote.owner_image} 
                    alt={quote.owner} 
                    class="w-full h-full object-cover filter grayscale opacity-40"
                  />
                </div>
              {:else}
                <div class="w-full aspect-[3/2] bg-stone-800"></div>
              {/if}
              
              <!-- Quote Text Overlay -->
              <div class="absolute inset-0 flex flex-col justify-center items-center p-8 text-center">
                <blockquote class="text-xl md:text-2xl font-medium text-amber-100 mb-4">
                  "{quote.content}"
                </blockquote>
                <cite class="text-lg text-amber-500 font-bold">— {quote.owner}</cite>
              </div>
              
              <!-- Site Watermark -->
              <div class="absolute bottom-2 right-4">
                <!-- <span class="text-amber-100 opacity-70 text-sm">wordofra.com</span> -->
                <span class="custom-text">wordofra.com</span>
              </div>
            </div>
            
            <!-- Comments Section -->
            <div class="mt-2">
              <button 
                class="flex items-center justify-between w-full px-4 py-3 bg-stone-800 hover:bg-stone-700 text-amber-100 rounded-md transition-colors"
                on:click={() => toggleCommentSection(quote.id)}
              >
                <span class="font-medium">Comments</span>
                <span>
                  {expandedCommentSections.has(quote.id) ? '▲' : '▼'}
                </span>
              </button>
              
              {#if expandedCommentSections.has(quote.id)}
                <div class="bg-stone-100 dark:bg-stone-800 p-4 rounded-b-lg">
                  <!-- Comment Form -->
                  {#if $user}
                    <div class="mb-4">
                      <textarea 
                        bind:value={newComment.content}
                        placeholder="Add your comment..."
                        class="w-full p-3 rounded-md bg-white dark:bg-stone-700 text-stone-800 dark:text-amber-100 border border-stone-300 dark:border-stone-600"
                        rows="3"
                      ></textarea>
                      
                      {#if commentError}
                        <p class="text-red-500 text-sm mt-1">{commentError}</p>
                      {/if}
                      
                      {#if commentSuccess}
                        <p class="text-green-500 text-sm mt-1">Comment added successfully!</p>
                      {/if}
                      
                      <button 
                        on:click={() => submitComment(quote.id)}
                        class="mt-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
                      >
                        Post Comment
                      </button>
                    </div>
                  {:else}
                    <p class="mb-4 text-center text-stone-600 dark:text-stone-300">
                      Please <a href="/login" class="text-amber-600 hover:underline">login</a> to comment.
                    </p>
                  {/if}
                  
                  <!-- Comments List -->
                  {#if commentsLoading[quote.id]}
                    <div class="flex justify-center py-6">
                      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                    </div>
                  {:else if comments[quote.id] && comments[quote.id].length > 0}
                    <div class="space-y-4">
                      {#each comments[quote.id] as comment}
                        <div class="p-3 bg-white dark:bg-stone-700 rounded-md shadow">
                          <div class="flex justify-between mb-2">
                            <span class="font-medium text-stone-900 dark:text-amber-100">{comment.user_name}</span>
                            <span class="text-sm text-stone-500 dark:text-stone-400">{comment.formattedDate}</span>
                          </div>
                          <p class="text-stone-700 dark:text-stone-300">{comment.content}</p>
                        </div>
                      {/each}
                    </div>
                  {:else}
                    <p class="text-center text-stone-600 dark:text-stone-300">No comments yet. Be the first to comment!</p>
                  {/if}
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</section>