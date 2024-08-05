import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useLanguageStore } from './useLanguageStore';
import { CHARACTER_EN, CHARACTER_KO } from '@/assets/constants/character';

const useCharacterStore = () => {
  const languageStore = useLanguageStore();
  const { language } = storeToRefs(languageStore);
  const characterListRef = ref(
    language.value === 'ko' ? CHARACTER_KO.dataList : CHARACTER_EN.dataList,
  );

  console.log(characterListRef.value);

  watch(
    () => language.value,
    (newLang) => {
      characterListRef.value =
        newLang === 'ko' ? CHARACTER_KO.dataList : CHARACTER_EN.dataList;
    },
  );
  return {
    characterListRef,
  };
};

export default useCharacterStore;
