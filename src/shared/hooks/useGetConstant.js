import useMap from '@/entities/content/hooks/useMap';
import { ref, watchEffect } from 'vue';

const useGetConstant = (kData, eData) => {
  const data = ref(null);
  const language = ref(localStorage.getItem('language') || 'ko');
  const latLngList = ref([]);

  const getData = () => {
    if (language.value === 'ko') return kData.dataList;
    if (language.value === 'en') return eData.dataList;

    return kData.dataList;
  };

  const getLatLngList = (dataList) => {
    if (dataList) {
      for (const data of dataList) {
        if (!data) break;
        latLngList.value = [...latLngList.value, data.latLng];
      }
    }
  };

  const toggleLanguage = () => {
    language.value = language.value === 'ko' ? 'en' : 'ko';
    localStorage.setItem('language', language.value);
  };

  watchEffect(() => {
    data.value = getData();
    getLatLngList(data.value);
  });

  return { data, latLngList, toggleLanguage };
};

export default useGetConstant;
