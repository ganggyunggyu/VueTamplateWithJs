import { ref, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useLanguageStore } from './useLanguageStore';
import { CONTENT_EN, CONTENT_KO } from '@/assets/constants/content';

export const useContentStore = defineStore('content', () => {
  const languageStore = useLanguageStore();
  const { language } = storeToRefs(languageStore);
  const contentList = ref(language.value === 'ko' ? CONTENT_KO.dataList : CONTENT_EN.dataList);

  watch(
    () => language.value,
    (newLang) => {
      contentList.value = newLang === 'ko' ? CONTENT_KO.dataList : CONTENT_EN.dataList;
    },
  );

  return {
    contentList,
  };
});
