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

<svelte:head>
  <title>Word of Ra</title>
  <meta property="og:title" content="Word of Ra" />
  <meta property="og:description" content="Code & Conversations." />
  <meta property="og:image" content="https://www.wordofra.com/SITELOGO11.png" /> <meta property="og:url" content="https://www.wordofra.com" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Word of Ra" />
</svelte:head>
    
  <div class="flex flex-col min-h-screen bg-black dark:bg-stone-900 dark:text-amber-50 transition-colors duration-300">
    {#if $isSidebarOpen && !$isLargeScreen}
      <div 
        class="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
        on:click={toggleSidebar}
        aria-hidden="true"
      ></div>
    {/if}
  
    <div 
      class="fixed top-0 left-0 h-full z-40 transition-transform duration-300 shadow-lg" 
      class:translate-x-0={$isLargeScreen || $isSidebarOpen}
      class:-translate-x-full={!$isLargeScreen && !$isSidebarOpen}
    >
      <Sidebar isLargeScreen={$isLargeScreen} />
    </div>
    
    <div class="flex flex-col min-h-screen transition-all duration-300" class:lg:ml-64={$isLargeScreen}>
      <Header 
        isLargeScreen={$isLargeScreen} 
        isSidebarOpen={$isSidebarOpen}
        {toggleSidebar}
        {toggleDarkMode}
      />
      
      <main class="flex-grow pt-20 pb-32">
        <div class="container mx-auto px-4 py-8">
          <slot />
        </div>
      </main>
      
      <Footer isLargeScreen={$isLargeScreen} />
    </div>
  </div>