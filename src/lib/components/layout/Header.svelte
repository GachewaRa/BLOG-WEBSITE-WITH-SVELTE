<script>
  import HutIcon from '$lib/components/icons/HutIcon.svelte';
  import AfricanPattern from '$lib/components/ui/AfricanPattern.svelte';
  import UserIcon from '$lib/components/icons/UserIcon.svelte';
  import { page } from '$app/stores';
  import UserMenu from '../ui/UserMenu.svelte';
  
  export let isLargeScreen = true;
  export let toggleSidebar;
  
  const navItems = [
    { name: 'Blog', path: '/blog' },
    { name: 'My Services', path: '/services' },
    { name: 'Home', path: '/' },
    { name: 'My Skills', path: '/skills' },
    { name: 'My Projects', path: '/projects' }
  ];
</script>

<header class="fixed top-0 right-0 left-0 z-30 h-20" style={isLargeScreen ? 'left: 16rem;' : ''}>
  <div class="relative w-full h-full overflow-hidden">
    <!-- African pattern background -->
    <div class="absolute inset-0">
      <AfricanPattern fadeDirection="bottom" />
    </div>
    
    <!-- Navigation overlay -->
    <div class="relative h-full flex items-center justify-between px-6">
      <!-- Sidebar toggle for mobile -->
      {#if !isLargeScreen}
        <button 
          class="lg:hidden text-amber-100 hover:text-white" 
          on:click={toggleSidebar}
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      {/if}
      
      <!-- Navigation links -->
      <nav class="flex-1 flex justify-center space-x-8">
        {#each navItems as item}
          <a 
            href={item.path} 
            class="relative inline-flex items-center px-2 py-1 text-amber-100 hover:text-white transition-colors group"
            class:active={$page.url.pathname === item.path}
          >
            {#if item.name === 'Home'}
              <HutIcon className="mr-1 w-5 h-5" />
            {/if}
            <span class="text-lg font-semibold">{item.name}</span>
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 transition-all duration-300 group-hover:w-full" />
          </a>
        {/each}
      </nav>
      
      <!-- User menu -->
      <!-- Replace the simple UserIcon with UserMenu -->
    <div class="flex items-center">
      <UserMenu user={null} /> <!-- Pass user object when auth is implemented -->
    </div>
    </div>
  </div>
</header>

<style>
  .active {
    color: white;
  }
  
  .active span:last-child {
    width: 100%;
  }
</style>