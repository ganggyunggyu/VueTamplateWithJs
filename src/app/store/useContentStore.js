import { ref, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useLanguageStore } from './useLanguageStore';
import { CONTENT_EN, CONTENT_KO } from '@/assets/constants/test2';

export const useContentStore = defineStore('content', () => {
  const languageStore = useLanguageStore();
  const { language } = storeToRefs(languageStore);
  const contentList = ref(
    language.value === 'ko' ? CONTENT_KO.dataList : CONTENT_EN.dataList,
  );
  const selectedKeywordList = ref(
    JSON.parse(localStorage.getItem('selectedKeywords')) || [],
  );
  const keywordContentList = ref([]);

  const setKeywordContentList = () => {
    if (!selectedKeywordList.value) return null;
    for (const content of contentList.value) {
      const contentKeywordList = content.keywordIds;
      for (const contentKeyword of contentKeywordList) {
        const isMatchContent =
          selectedKeywordList.value.includes(contentKeyword);
        if (isMatchContent) {
          keywordContentList.value = [...keywordContentList.value, content];
          break;
        }
      }
      console.log(keywordContentList.value.length, '개의 키워드 콘텐츠');
    }
  };

  watch(
    () => language.value,
    (newLang) => {
      contentList.value =
        newLang === 'ko' ? CONTENT_KO.dataList : CONTENT_EN.dataList;
    },
  );

  // Initialize the filtered content list on store creation
  setKeywordContentList();

  return {
    contentList,
    keywordContentList,
  };
});
