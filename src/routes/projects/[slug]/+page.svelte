<script>
    import { onMount } from 'svelte';
    import { getRequest } from '$lib/utils/api';
    import { page } from '$app/stores';
    
    let project = null;
    let loading = true;
    let error = null;
    let slug = $page.params.slug;
    
    // Function to format tags as an array
    function formatTags(tagsString) {
      if (!tagsString) return [];
      return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    }
    
    // Format description text to handle line breaks
    function formatDescription(description) {
      if (!description) return '';
      return description.replace(/\r\n/g, '<br>');
    }
    
    async function fetchProject() {
      loading = true;
      error = null;
      try {
        const response = await getRequest(`/api/portfolio/projects/${slug}/`);
        if (response.data) {
          project = {
            ...response.data,
            formattedTags: formatTags(response.data.tags),
            formattedDescription: formatDescription(response.data.description)
          };
        } else if (response.error) {
          error = response.error;
        }
      } catch (e) {
        error = 'An unexpected error occurred.';
        console.error(e);
      } finally {
        loading = false;
      }
    }
    
    onMount(fetchProject);
  </script>
  
  <svelte:head>
    <title>{project ? project.title : 'Project Detail'}</title>
  </svelte:head>
  
  <section class="container mx-auto py-8">
    <a href="/projects" class="text-amber-600 dark:text-amber-400 hover:underline mb-4 inline-block">
      &larr; Back to Projects
    </a>
  
    {#if loading}
      <div class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    {:else if error}
      <p class="text-red-500">Error: {error}</p>
    {:else if !project}
      <p>Project not found.</p>
    {:else}
      <div class="bg-white dark:bg-stone-800 rounded-lg shadow-md overflow-hidden">
        {#if project.image}
          <div class="w-full h-64 md:h-80 lg:h-96 overflow-hidden">
            <img src={project.image} alt={project.title} class="w-full h-full object-cover" />
          </div>
        {/if}
        
        <div class="p-6">
          <h1 class="text-3xl font-bold mb-4 text-stone-900 dark:text-amber-100">{project.title}</h1>
          
          {#if project.formattedTags.length > 0}
            <div class="mb-6 flex flex-wrap">
              {#each project.formattedTags as tag}
                <span class="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 text-sm px-3 py-1 rounded-full mr-2 mb-2">{tag}</span>
              {/each}
            </div>
          {/if}
          
          <div class="prose prose-stone dark:prose-invert max-w-none mb-6">
            {@html project.formattedDescription}
          </div>
          
          {#if project.link}
            <div class="mt-8">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                class="inline-block bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md transition-colors"
              >
                View Live Project
              </a>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </section>