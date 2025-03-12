// src/lib/stores/appStore.js
import { writable } from 'svelte/store';

// Create stores for app state
export const isDarkMode = writable(false);
export const isSidebarOpen = writable(false);
export const isLargeScreen = writable(false);

// Initialize dark mode from localStorage if we're in a browser context
if (typeof window !== 'undefined') {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode !== null) {
    isDarkMode.set(savedMode === 'true');
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.set(true);
  }
}

// Helper functions
export function toggleDarkMode() {
  isDarkMode.update(value => {
    const newValue = !value;
    
    // Update document class for dark mode if we're in a browser context
    if (typeof document !== 'undefined') {
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    // Save preference to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('darkMode', newValue ? 'true' : 'false');
    }
    
    return newValue;
  });
}

export function toggleSidebar() {
  isSidebarOpen.update(value => !value);
}