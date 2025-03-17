// $lib/stores/authStore.js
import { writable } from 'svelte/store';

let initialUser = null;

if (typeof window !== 'undefined') {
  // Only run this code in the browser
  const storedUser = localStorage.getItem('user');
  initialUser = storedUser ? JSON.parse(storedUser) : null;
}

export const user = writable(initialUser);

user.subscribe(value => {
  if (typeof window !== 'undefined') {
    if (value) {
      localStorage.setItem('user', JSON.stringify(value));
    } else {
      localStorage.removeItem('user');
    }
  }
});

export function setUser(userData) {
  user.set(userData);
}

export function clearUser() {
  user.set(null);
}