<script>
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import '../app.css';
	
	import { onMount } from 'svelte';
	
	let isLargeScreen = true;
	let sidebarOpen = false;
	
	// Detect screen size and handle responsiveness
	onMount(() => {
	  const checkScreenSize = () => {
		isLargeScreen = window.innerWidth >= 1024;
		if (isLargeScreen) sidebarOpen = true;
	  };
	  
	  window.addEventListener('resize', checkScreenSize);
	  checkScreenSize(); // Initial check
	  
	  return () => window.removeEventListener('resize', checkScreenSize);
	});
	
	function toggleSidebar() {
	  sidebarOpen = !sidebarOpen;
	}
  </script>
  
  <div class="flex flex-col min-h-screen">
	<!-- Sidebar - fixed position, transforms based on screen size and open state -->
	<div 
	  class="fixed top-0 left-0 h-full z-40 transition-transform duration-300" 
	  class:translate-x-0={isLargeScreen || sidebarOpen}
	  class:-translate-x-full={!isLargeScreen && !sidebarOpen}
	>
	  <Sidebar {isLargeScreen} />
	</div>
	
	<!-- Main content area with margin that adjusts based on sidebar visibility -->
	<div class="flex flex-col min-h-screen" class:lg:ml-64={isLargeScreen}>
	  <!-- Header with toggle button for mobile -->
	  <Header {isLargeScreen} {toggleSidebar} />
	  
	  <!-- Main content -->
	  <main class="flex-grow pt-20 pb-32">
		<div class="container mx-auto px-4 py-8">
		  <slot />
		</div>
	  </main>
	  
	  <!-- Footer -->
	  <Footer {isLargeScreen} />
	</div>
  </div>