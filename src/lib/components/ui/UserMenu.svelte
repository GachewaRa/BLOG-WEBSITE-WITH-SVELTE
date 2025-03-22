<script>
  import { onMount } from 'svelte';
  import { user, clearUser } from '$lib/stores/authStore';
  import { goto } from '$app/navigation';
  import UserIcon from '$lib/components/icons/UserIcon.svelte';
  
  let menuOpen = false;
  let menuRef;
  
  function toggleMenu() {
    menuOpen = !menuOpen;
  }
  
  function handleClickOutside(event) {
    if (menuRef && !menuRef.contains(event.target)) {
      menuOpen = false;
    }
  }
  
  function handleLogout() {
    // With JWT, we only need to clear the local user data
    clearUser();
    menuOpen = false;
    
    // Also clear the token from localStorage for backward compatibility
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    
    goto('/');
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
      {#if $user}
        <!-- Logged in state -->
        <div class="px-4 py-2 border-b border-amber-800/30">
          <p class="text-amber-200 font-medium truncate">{$user.email}</p>
        </div>
        <a href="/profile" class="block px-4 py-2 text-amber-100 hover:bg-amber-800 transition-colors">
          My Profile
        </a>
        <button 
          class="w-full text-left px-4 py-2 text-amber-100 hover:bg-amber-800 transition-colors"
          on:click={handleLogout}
        >
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