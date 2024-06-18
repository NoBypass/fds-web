import { writable } from 'svelte/store';

export const tabStore = writable("Home");

export const playerNameLoadedStore = writable(false);