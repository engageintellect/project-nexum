import { writable } from 'svelte/store';

export const msgStore = writable('hello world');
export const feedSelect = writable(false);
