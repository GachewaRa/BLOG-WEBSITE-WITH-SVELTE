<script>
	import { onMount } from 'svelte';
	import { getRequest } from '$lib/utils/api';
	import { goto } from '$app/navigation';
	
	let projects = [];
	let loading = true;
	let error = null;
	
	// Function to truncate description
	function truncateDescription(text, wordLimit = 25) {
	  if (!text) return "";
	  const words = text.split(/\s+/);
	  if (words.length > wordLimit) {
		return words.slice(0, wordLimit).join(' ') + '...';
	  }
	  return text;
	}
	
	// Function to format tags as an array
	function formatTags(tagsString) {
	  if (!tagsString) return [];
	  return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
	}
	
	async function fetchProjects() {
	  loading = true;
	  error = null;
	  try {
		const response = await getRequest('/api/portfolio/projects/');
		if (response.data) {
		  projects = response.data.map(project => ({
			...project,
			shortDescription: truncateDescription(project.description),
			formattedTags: formatTags(project.tags)
		  }));
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
	
	function goToProject(slug) {
	  goto(`/projects/${slug}`);
	}
	
	onMount(fetchProjects);
  </script>
  
  <svelte:head>
	<title>My Projects</title>
  </svelte:head>
  
  <section class="container mx-auto py-8">
	<h1 class="text-3xl font-bold mb-6">My Projects</h1>
  
	{#if loading}
	  <div class="flex justify-center py-12">
		<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
	  </div>
	{:else if error}
	  <p class="text-red-500">Error: {error}</p>
	{:else if projects.length === 0}
	  <p>No projects found.</p>
	{:else}
	  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each projects as project}
		  <div class="rounded-lg shadow-md overflow-hidden bg-white dark:bg-stone-800 h-full flex flex-col">
			<a href="/projects/{project.slug}" class="block hover:opacity-90 transition-opacity flex-grow">
			  {#if project.image}
				<img src={project.image} alt={project.title} class="w-full h-56 object-cover" />
			  {:else}
				<div class="w-full h-32 bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
				  <span class="text-stone-500 dark:text-stone-400">No image</span>
				</div>
			  {/if}
			  <div class="p-4 flex flex-col flex-grow">
				<h2 class="text-xl font-semibold mb-2 text-stone-900 dark:text-amber-100">{project.title}</h2>
				<p class="mt-2 text-stone-700 dark:text-stone-300 flex-grow">
				  {project.shortDescription}
				</p>
				{#if project.formattedTags.length > 0}
				  <div class="mt-3 flex flex-wrap">
					{#each project.formattedTags as tag}
					  <span class="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 text-xs px-2 py-1 rounded mr-1 mb-1">{tag}</span>
					{/each}
				  </div>
				{/if}
			  </div>
			</a>
		  </div>
		{/each}
	  </div>
	{/if}
  </section>