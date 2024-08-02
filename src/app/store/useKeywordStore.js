import { ref } from 'vue';
import useCharacterStore from './useCharacterStore';

const useKeywordStore = () => {
  const { characterListRef } = useCharacterStore();

  const keywordListRef = ref([]);
  const keywordRef = ref(null);

  const setKeywordList = () => {};
  const setKeyword = () => {};

  console.log(characterListRef);
};

export default useKeywordStore;
