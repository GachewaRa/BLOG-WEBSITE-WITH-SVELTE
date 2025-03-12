<!-- src/routes/+layout.svelte -->
<script>
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import '../app.css';
	
	import { onMount } from 'svelte';
	import { isDarkMode, isSidebarOpen, isLargeScreen, toggleSidebar, toggleDarkMode } from '$lib/stores/appStore';
	
	// Detect screen size and handle responsiveness
	onMount(() => {
	  // Initialize dark mode
	  if ($isDarkMode) {
		document.documentElement.classList.add('dark');
	  }
	  
	  const checkScreenSize = () => {
		const largeScreen = window.innerWidth >= 1024;
		isLargeScreen.set(largeScreen);
		
		// Auto-open sidebar on large screens, close on small screens
		if (largeScreen) {
		  isSidebarOpen.set(true);
		} else if (!largeScreen && $isSidebarOpen) {
		  isSidebarOpen.set(false);
		}
	  };
	  
	  window.addEventListener('resize', checkScreenSize);
	  checkScreenSize(); // Initial check
	  
	  return () => window.removeEventListener('resize', checkScreenSize);
	});
  </script>
	
  <div class="flex flex-col min-h-screen dark:bg-stone-900 dark:text-amber-50 transition-colors duration-300">
	<!-- Overlay for mobile sidebar -->
	{#if $isSidebarOpen && !$isLargeScreen}
	  <div 
		class="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
		on:click={toggleSidebar}
		aria-hidden="true"
	  ></div>
	{/if}
  
	<!-- Sidebar - fixed position, transforms based on screen size and open state -->
	<div 
	  class="fixed top-0 left-0 h-full z-40 transition-transform duration-300 shadow-lg" 
	  class:translate-x-0={$isLargeScreen || $isSidebarOpen}
	  class:-translate-x-full={!$isLargeScreen && !$isSidebarOpen}
	>
	  <Sidebar isLargeScreen={$isLargeScreen} />
	</div>
	
	<!-- Main content area with margin that adjusts based on sidebar visibility -->
	<div class="flex flex-col min-h-screen transition-all duration-300" class:lg:ml-64={$isLargeScreen}>
	  <!-- Header with toggle button for mobile -->
	  <Header 
		isLargeScreen={$isLargeScreen} 
		isSidebarOpen={$isSidebarOpen}
		{toggleSidebar}
		{toggleDarkMode}
	  />
	  
	  <!-- Main content -->
	  <main class="flex-grow pt-20 pb-32">
		<div class="container mx-auto px-4 py-8">
		  <slot />
		</div>
	  </main>
	  
	  <!-- Footer -->
	  <Footer isLargeScreen={$isLargeScreen} />
	</div>
  </div>