import { writable } from 'svelte/store';

export const githubURL = writable('https://github.com/engageintellect/project-nexum.git');

export const msgStore = writable('hello world');
export const feedSelect = writable(false);

export const userPageCount = writable(0);
