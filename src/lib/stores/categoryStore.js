// stores/categoryStore.js
import { writable } from 'svelte/store';

export const selectedCategory = writable({
  id: null,
  slug: '',
  name: ''
});