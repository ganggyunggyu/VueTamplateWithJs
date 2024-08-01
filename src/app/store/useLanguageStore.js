import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('language', () => {
  const language = ref(localStorage.getItem('language') || 'ko');

  const setLanguage = () => {
    language.value = language.value === 'ko' ? 'en' : 'ko';
    localStorage.setItem('language', language.value);
  };

  return {
    language,
    setLanguage,
  };
});
