<script>
    import { onMount } from 'svelte';
    import { user, setUser, clearUser } from '$lib/stores/authStore';
    import { goto } from '$app/navigation';
    import { getRequest, patchRequest, postRequest, deleteRequest } from "$lib/utils/api";
    
    let userData = {
      email: '',
      username: '',
      is_subscribed_to_newsletter: false
    };
    
    let originalUserData = {};
    let isLoading = true;
    let errorMessage = '';
    let successMessage = '';
    let hasChanges = false;
    let confirmDelete = false;
    
    onMount(async () => {
      if (!$user || !$user.access) {
        goto('/auth/login');
        return;
      }
      
      await fetchUserData();
    });
    
    async function fetchUserData() {
      isLoading = true;
      try {
        const response = await getRequest('/auth/users/me/');
        
        if (response.data) {
          userData = {
            email: response.data.email || '',
            username: response.data.username || '',
            is_subscribed_to_newsletter: response.data.is_subscribed_to_newsletter || false
          };
          
          // Store a copy of the original data to detect changes
          originalUserData = {...userData};
        } else {
          errorMessage = response.error || 'Failed to load user data';
        }
      } catch (error) {
        errorMessage = 'Error loading user data';
        console.error("User data fetch error:", error);
      } finally {
        isLoading = false;
      }
    }
    
    function checkForChanges() {
      hasChanges = JSON.stringify(userData) !== JSON.stringify(originalUserData);
    }
    
    async function saveUserData() {
      errorMessage = '';
      successMessage = '';
      isLoading = true;
      
      try {
        const updateData = {
          email: userData.email,
          username: userData.username
        };
        
        // Update basic user data
        const userResponse = await patchRequest('/auth/users/me/', updateData);
        
        if (userResponse.error) {
          errorMessage = userResponse.error || 'Failed to update user data';
          return;
        }
        
        // Handle newsletter subscription separately
        const newsletterEndpoint = userData.is_subscribed_to_newsletter 
          ? '/accounts/newsletter/subscribe/' 
          : '/accounts/user/newsletter/unsubscribe/';
        
        const newsletterResponse = await postRequest(newsletterEndpoint, { email: userData.email });
        
        if (newsletterResponse.error) {
          errorMessage = newsletterResponse.error || 'Failed to update newsletter preferences';
          return;
        }
        
        // Update the original data to match current data
        originalUserData = {...userData};
        hasChanges = false;
        
        // Update user store with the new email if it changed
        if ($user.email !== userData.email) {
          setUser({
            ...$user,
            email: userData.email
          });
        }
        
        successMessage = 'Profile updated successfully';
      } catch (error) {
        errorMessage = 'Error updating profile';
        console.error("Profile update error:", error);
      } finally {
        isLoading = false;
      }
    }
    
    async function deleteAccount() {
      errorMessage = '';
      isLoading = true;
      
      try {
        const response = await deleteRequest('/auth/users/me/');
        
        if (!response.error) {
          // Clear user data and redirect to home
          clearUser();
          
          // Also clear token from localStorage for backward compatibility
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
          }
          
          goto('/');
        } else {
          errorMessage = response.error || 'Failed to delete account';
          confirmDelete = false;
        }
      } catch (error) {
        errorMessage = 'Error deleting account';
        console.error("Account deletion error:", error);
      } finally {
        isLoading = false;
      }
    }
  </script>
  
  <div class="max-w-2xl mx-auto p-6 bg-stone-800 rounded-lg shadow-lg mt-8">
    <h1 class="text-2xl font-bold text-amber-200 mb-6">My Profile</h1>
    
    {#if isLoading}
      <div class="text-center py-8">
        <p class="text-amber-100">Loading...</p>
      </div>
    {:else}
      {#if errorMessage}
        <div class="bg-red-900/30 border border-red-800 text-red-200 p-4 rounded-md mb-4">
          {errorMessage}
        </div>
      {/if}
      
      {#if successMessage}
        <div class="bg-green-900/30 border border-green-800 text-green-200 p-4 rounded-md mb-4">
          {successMessage}
        </div>
      {/if}
      
      <form on:submit|preventDefault={saveUserData} class="space-y-4">
        <div>
          <label for="email" class="block text-amber-100 mb-1">Email</label>
          <input 
            type="email" 
            id="email" 
            bind:value={userData.email} 
            on:input={checkForChanges}
            class="w-full bg-stone-700 text-amber-100 border border-amber-800/30 rounded p-2"
            required
          />
        </div>
        
        <div>
          <label for="username" class="block text-amber-100 mb-1">Username</label>
          <input 
            type="text" 
            id="username" 
            bind:value={userData.username} 
            on:input={checkForChanges}
            class="w-full bg-stone-700 text-amber-100 border border-amber-800/30 rounded p-2"
          />
        </div>
        
        <div class="flex items-center space-x-3">
          <input 
            type="checkbox" 
            id="newsletter" 
            bind:checked={userData.is_subscribed_to_newsletter}
            on:change={checkForChanges}
            class="bg-stone-700 text-amber-500 border-amber-800/30 rounded"
          />
          <label for="newsletter" class="text-amber-100">Subscribed to Newsletter</label>
        </div>
        
        <div class="pt-4 flex flex-wrap gap-4">
          <button 
            type="submit" 
            class="px-4 py-2 bg-amber-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!hasChanges || isLoading}
          >
            Save Changes
          </button>
          
          <a 
            href="/profile/change-password" 
            class="px-4 py-2 bg-stone-700 text-amber-100 rounded inline-block"
          >
            Change Password
          </a>
        </div>
      </form>
      
      <div class="mt-12 pt-6 border-t border-amber-800/30">
        <h2 class="text-xl font-bold text-amber-200 mb-4">Danger Zone</h2>
        
        {#if !confirmDelete}
          <button 
            on:click={() => confirmDelete = true} 
            class="px-4 py-2 bg-red-700 text-white rounded"
          >
            Delete Account
          </button>
        {:else}
          <div class="bg-red-900/30 border border-red-800 p-4 rounded-md">
            <p class="text-red-200 mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div class="flex space-x-4">
              <button 
                on:click={deleteAccount} 
                class="px-4 py-2 bg-red-700 text-white rounded"
                disabled={isLoading}
              >
                Yes, Delete My Account
              </button>
              <button 
                on:click={() => confirmDelete = false} 
                class="px-4 py-2 bg-stone-700 text-amber-100 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>