import { ref, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useLanguageStore } from './useLanguageStore';
import { CONTENT_EN, CONTENT_KO } from '@/assets/constants/test2';

export const useContentStore = defineStore('content', () => {
  const languageStore = useLanguageStore();
  const { language } = storeToRefs(languageStore);
  const contentListRef = ref(
    language.value === 'ko' ? CONTENT_KO.dataList : CONTENT_EN.dataList,
  );
  const selectedKeywordList = ref(
    JSON.parse(localStorage.getItem('selectedKeywordList')) || [],
  );

  const keywordsContentList = ref([]);
  const keywordContentList = ref([]);

  const floorContentList = ref([]);

  const setKeywordsContentList = ({ keywordIdList }) => {
    if (!keywordIdList.value) return null;
    for (const content of contentListRef.value) {
      const contentKeywordList = content.keywordIds;
      for (const contentKeyword of contentKeywordList) {
        const isMatchContent = keywordIdList.value.includes(contentKeyword);
        if (isMatchContent) {
          keywordsContentList.value = [...keywordsContentList.value, content];
          break;
        }
      }
    }
  };

  const setKeywordContentList = ({ keywordId }) => {
    const contentList = [];
    console.log(contentListRef.value);
    for (const content of contentListRef.value) {
      const { keywordIds: contentKeywordIdList } = content;
      const isContentMatch = contentKeywordIdList.includes(keywordId);
      if (isContentMatch) {
        contentList.push(content);
      }
    }
    keywordContentList.value = [...contentList];
    return keywordContentList.value;
  };

  const setFloorContentList = ({ floor }) => {
    const selectedContent = contentListRef.value.filter(
      (content) => content.floorLevel === floor,
    );
    console.log(floor, selectedContent);
    return selectedContent;
  };

  watch(
    () => language.value,
    (newLang) => {
      contentListRef.value =
        newLang === 'ko' ? CONTENT_KO.dataList : CONTENT_EN.dataList;
    },
  );

  setKeywordsContentList({ keywordIdList: selectedKeywordList });

  return {
    contentListRef,
    keywordsContentList,
    setKeywordContentList,
    setFloorContentList,
    keywordContentList,
  };
});
