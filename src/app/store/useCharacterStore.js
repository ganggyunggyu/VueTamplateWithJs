import { CHARACTER_EN, CHARACTER_KO } from '@/assets/constants/character';
import { useLanguageStore } from './useLanguageStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const useCharacterStore = () => {
  const languageStore = useLanguageStore();
  const { language } = storeToRefs(languageStore);
  const characterListRef = ref(
    language.value === 'ko' ? CHARACTER_KO.dataList : CHARACTER_EN.dataList,
  );

  return {
    characterListRef,
  };
};

export default useCharacterStore;
