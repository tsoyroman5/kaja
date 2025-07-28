import { writable } from 'svelte/store';
import { LANGUAGES } from '$lib/constants/languages';
import { languageTag, setLanguageTag, onSetLanguageTag } from '../paraglide/runtime';
import { browser } from '$app/environment';

export const currentLanguage = writable(LANGUAGES[languageTag()]);

// Update the store and Paraglide when language changes
export function changeLanguage(tag: 'en' | 'ru' | 'kr') {
  setLanguageTag(tag);
  currentLanguage.set(LANGUAGES[tag]);
}

// Set up callback to sync store when setLanguageTag is called elsewhere
if (browser) {
  onSetLanguageTag((tag) => {
    currentLanguage.set(LANGUAGES[tag as keyof typeof LANGUAGES]);
  });
}