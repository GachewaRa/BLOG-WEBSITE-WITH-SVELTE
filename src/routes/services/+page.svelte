<script>
	import { onMount } from 'svelte';
	import { getRequest } from '$lib/utils/api';
	
	let services = [];
	let loading = true;
	let error = null;
	
	async function fetchServices() {
	  loading = true;
	  error = null;
	  try {
		const response = await getRequest('/api/portfolio/services/');
		if (response.data) {
		  services = response.data;
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
	
	function prepareInquiry(serviceName) {
	  const subject = `Inquiry about ${serviceName}`;
	  const body = `Hello,\n\nI'm interested in your "${serviceName}" service. Could you please provide more information?\n\nThank you.`;
	  
	  return {
		emailLink: `mailto:gachewaadrian@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
		whatsappLink: `https://wa.me/254717990230?text=${encodeURIComponent(subject + "\n\n" + body)}`
	  };
	}
	
	// Format description text to handle line breaks
	function formatDescription(description) {
	  if (!description) return '';
	  return description.replace(/\r\n/g, '<br>');
	}
	
	onMount(fetchServices);
  </script>
  
  <svelte:head>
	<title>My Services</title>
  </svelte:head>
  
  <section class="container mx-auto py-8">
	<h1 class="text-3xl font-bold mb-6">My Services</h1>
  
	{#if loading}
	  <div class="flex justify-center py-12">
		<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
	  </div>
	{:else if error}
	  <p class="text-red-500">Error: {error}</p>
	{:else if services.length === 0}
	  <p>No services found.</p>
	{:else}
	  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
		{#each services as service}
		  {@const inquiryLinks = prepareInquiry(service.name)}
		  <div class="rounded-lg shadow-md overflow-hidden bg-white dark:bg-stone-800 h-full flex flex-col">
			<div class="p-6 flex flex-col h-full">
			  <div class="flex items-center mb-4">
				{#if service.icon}
				  <img src={service.icon} alt={service.name} class="w-16 h-16 object-cover rounded-md mr-4" />
				{:else}
				  <div class="w-16 h-16 bg-stone-200 dark:bg-stone-700 rounded-md flex items-center justify-center mr-4">
					<span class="text-stone-500 dark:text-stone-400">No icon</span>
				  </div>
				{/if}
				<h2 class="text-xl font-semibold text-stone-900 dark:text-amber-100">{service.name}</h2>
			  </div>
			  
			  <div class="mt-2 mb-6 flex-grow text-stone-700 dark:text-stone-300">
				{@html formatDescription(service.description)}
			  </div>
			  
			  <div class="mt-auto">
				<p class="text-sm text-stone-500 dark:text-stone-400 mb-3">Interested? Get in touch:</p>
				<div class="flex space-x-3">
				  <a href={inquiryLinks.emailLink} class="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded text-center transition-colors">
					Email Inquiry
				  </a>
				  <a href={inquiryLinks.whatsappLink} class="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-center transition-colors">
					WhatsApp
				  </a>
				</div>
			  </div>
			</div>
		  </div>
		{/each}
	  </div>
	{/if}
  </section>