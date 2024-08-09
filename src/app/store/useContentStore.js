import { ref, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useLanguageStore } from './useLanguageStore';
import { CONTENT_EN, CONTENT_KO } from '@/assets/constants/test2';
import { getDistance } from '@/shared/lib/getDistance';

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

  const getKeywordsContentList = ({ keywordIdList }) => {
    if (!keywordIdList.value) return null;
    const contentList = [];
    for (const content of contentListRef.value) {
      const contentKeywordList = content.keywordIds;
      for (const contentKeyword of contentKeywordList) {
        const isMatchContent = keywordIdList.value.includes(contentKeyword);
        if (isMatchContent) {
          contentList.push(content);
          break;
        }
      }
    }
    return contentList;
  };

  const getKeywordContentList = ({ keywordId }) => {
    const contentList = [];
    for (const content of contentListRef.value) {
      const { keywordIds: contentKeywordIdList } = content;
      const isContentMatch = contentKeywordIdList.includes(keywordId);
      if (isContentMatch) {
        contentList.push(content);
      }
    }
    return contentList;
  };

  const getFloorContentList = ({ floor }) => {
    if (floor === 0) return contentListRef.value;
    const contentList = contentListRef.value.filter(
      (content) => content.floorLevel === floor,
    );
    return contentList;
  };

  const setDistanceForContentList = ({ lat, lng }) => {
    contentListRef.value.forEach((content) => {
      if (content.latLng) {
        content.distance = +getDistance({
          lat1: lat,
          lon1: lng,
          lat2: content.latLng.lat,
          lon2: content.latLng.lng,
        });
      }
    });
  };

  const getContentListSortedByDistance = ({ contentListParam }) => {
    const contentList = contentListParam.sort((a, b) => {
      if (!a.distance || !b.distance) return;
      return a.distance - b.distance;
    });
    return contentList;
  };

  const getContentListSortedByAlphabet = ({ contentListParam }) => {
    const contentList = contentListParam.sort((a, b) =>
      a.title.localeCompare(b.title),
    );
    return contentList;
  };

  watch(
    () => language.value,
    (newLang) => {
      contentListRef.value =
        newLang === 'ko' ? CONTENT_KO.dataList : CONTENT_EN.dataList;
    },
  );

  getKeywordsContentList({ keywordIdList: selectedKeywordList });

  return {
    contentListRef,
    keywordsContentList,
    keywordContentList,
    setDistanceForContentList,
    getKeywordContentList,
    getFloorContentList,
    getContentListSortedByAlphabet,
    getKeywordsContentList,
    getContentListSortedByDistance,
  };
});
