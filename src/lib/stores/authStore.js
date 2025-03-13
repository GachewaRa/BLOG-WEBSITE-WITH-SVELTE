// $lib/stores/authStore.js
import { writable } from 'svelte/store';

// Initialize user from localStorage if available
const storedUser = localStorage.getItem('user');
const initialUser = storedUser ? JSON.parse(storedUser) : null;

// Create the user store
export const user = writable(initialUser);

// Subscribe to changes and update localStorage
user.subscribe(value => {
  if (value) {
    localStorage.setItem('user', JSON.stringify(value));
  } else {
    localStorage.removeItem('user');
  }
});

// Function to set user after login
export function setUser(userData) {
  user.set(userData);
}

// Function to clear user data on logout
export function clearUser() {
  user.set(null);
}