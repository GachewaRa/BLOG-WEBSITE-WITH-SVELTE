<!-- src/lib/components/layout/Header.svelte -->
<script>
  import HutIcon from '$lib/components/icons/HutIcon.svelte';
  import AfricanPattern from '$lib/components/ui/AfricanPattern.svelte';
  import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
  import { page } from '$app/stores';
  import UserMenu from '../ui/UserMenu.svelte';
  import { isDarkMode } from '$lib/stores/appStore';

  import scroll from '$lib/images/SCROLL copy2.png';
  import myprojects from '$lib/images/PROJECTS copy.png';
  import myskills from '$lib/images/SKILLS copy.png';
  import myservices from '$lib/images/OFFERINGS copy.png';
  
  export let isLargeScreen = true;
  export let isSidebarOpen = false;
  export let toggleSidebar;
  export let toggleDarkMode;
  
  const navItems = [
    { name: 'Blog', path: '/blog',  icon: scroll},
    { name: 'My Services', path: '/services', icon: myservices },
    { name: 'Home', path: '/' },
    { name: 'My Skills', path: '/skills', icon : myskills },
    { name: 'My Projects', path: '/projects', icon : myprojects }
  ];

  let mobileMenuOpen = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>



<header class="fixed top-0 right-0 left-0 z-30 h-20 transition-all duration-300"
  style={isLargeScreen ? 'left: 16rem;' : ''}>
  <div class="relative w-full h-full overflow-hidden">
    <!-- African pattern background -->
    <div class="absolute inset-0">
      <AfricanPattern fadeDirection="bottom" />
    </div>
    
    <!-- Navigation overlay -->
    <div class="relative h-full flex items-center justify-between px-4 md:px-6">
      <!-- Sidebar toggle for mobile -->
      {#if !isLargeScreen}
        <button 
          class="text-amber-100 hover:text-white" 
          on:click={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      {/if}
      
      <!-- Desktop Navigation links - Hidden on mobile -->
      <nav class="hidden md:flex flex-1 justify-center space-x-4 lg:space-x-8">
        {#each navItems as item}
          <a
            href={item.path}
            class="relative inline-flex items-center px-2 py-1 text-amber-100 hover:text-white transition-colors group"
            class:active={$page.url.pathname === item.path}
          >
            {#if item.name === 'Home'}
              <HutIcon className="mr-1 w-5 h-5" />
              <span class="text-lg font-semibold">{item.name}</span>
            {:else if item.icon}
              <img src={item.icon} alt={item.name} class="mr-1 w-5 h-5" />
              <span class="text-lg font-semibold">{item.name}</span>
            {:else}
              <span class="text-lg font-semibold">{item.name}</span>
            {/if}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 transition-all duration-300 group-hover:w-full" />
          </a>
        {/each}
      </nav>

      <!-- Mobile navigation toggle button - Only visible on mobile -->
      <div class="md:hidden flex-1 flex justify-center">
        <button 
          class="text-amber-100 hover:text-white"
          on:click={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span class="text-lg font-semibold">Menu</span>
          <svg class="w-5 h-5 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M19 9l-7 7-7-7"}></path>
          </svg>
        </button>
      </div>
      
      <!-- Right side controls -->
      <div class="flex items-center space-x-4">
        <!-- Theme toggle -->
        <!-- <ThemeToggle {toggleDarkMode} isDark={$isDarkMode} /> -->
        
        <!-- User menu -->
        <UserMenu user={null} /> <!-- Pass user object when auth is implemented -->
      </div>
    </div>
  </div>

 

  <!-- Mobile Navigation Menu - Slides down when open -->
  {#if mobileMenuOpen}
    <div class="absolute top-full left-0 right-0 bg-stone-800 shadow-lg transition-all duration-300 z-30 border-t border-amber-800/30 max-h-screen overflow-y-auto">
      <nav class="flex flex-col py-2">
        {#each navItems as item}
          <a 
            href={item.path} 
            class="px-6 py-3 text-amber-100 hover:bg-amber-800/20 transition-colors flex items-center"
            class:active={$page.url.pathname === item.path}
            on:click={() => mobileMenuOpen = false}
          >
            {#if item.name === 'Home'}
              <HutIcon className="mr-2 w-5 h-5" />
            {/if}
            <span class="text-lg font-semibold">{item.name}</span>
          </a>
        {/each}
      </nav>
    </div>
  {/if}
</header>

<style>
  .active {
    color: white;
  }
  
  .active span:last-child {
    width: 100%;
  }
</style>