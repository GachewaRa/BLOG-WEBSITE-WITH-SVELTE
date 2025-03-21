<script>
  import { onMount } from 'svelte';
  import UserIcon from '$lib/components/icons/UserIcon.svelte';

  
  export let user = null; // Pass user object if authenticated
  
  let menuOpen = false;
  
  // Handle click outside to close menu
  let menuRef;
  
  function toggleMenu() {
    menuOpen = !menuOpen;
  }
  
  function handleClickOutside(event) {
    if (menuRef && !menuRef.contains(event.target)) {
      menuOpen = false;
    }
  }
  
  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="relative" bind:this={menuRef}>
  <button 
    class="flex items-center text-amber-100 hover:text-white transition-colors p-1 rounded-full hover:bg-stone-700/30"
    on:click={toggleMenu}
    aria-label="User menu"
    aria-expanded={menuOpen}
  >
    <UserIcon className="w-6 h-6" />
  </button>
  
  {#if menuOpen}
    <div class="absolute right-0 mt-2 w-48 bg-stone-800 dark:bg-stone-700 border border-amber-800/30 rounded-lg shadow-lg z-50 py-1 overflow-hidden">
      {#if user}
        <!-- Logged in state -->
        <div class="px-4 py-2 border-b border-amber-800/30">
          <p class="text-amber-200 font-medium truncate">{user.name}</p>
          <p class="text-amber-400/70 text-sm truncate">{user.email}</p>
        </div>
        <a href="/profile" class="block px-4 py-2 text-amber-100 hover:bg-amber-800 transition-colors">
          My Profile
        </a>
        <a href="/settings" class="block px-4 py-2 text-amber-100 hover:bg-amber-800 transition-colors">
          Settings
        </a>
        <button class="w-full text-left px-4 py-2 text-amber-100 hover:bg-amber-800 transition-colors">
          Sign Out
        </button>
      {:else}
        <!-- Logged out state -->
        <a href="/auth/login" class="block px-4 py-2 text-amber-100 hover:bg-amber-800 transition-colors">
          Sign In
        </a>
        <a href="/auth/register" class="block px-4 py-2 text-amber-100 hover:bg-amber-800 transition-colors">
          Register
        </a>
      {/if}
    </div>
  {/if}
</div>