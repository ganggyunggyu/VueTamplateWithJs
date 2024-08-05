import { defineStore } from 'pinia';
import { useContentStore } from './useContentStore.js';

export const useLatLngStore = defineStore('latLng', () => {
  const contentStore = useContentStore();

  const getLatLngList = () => {
    return contentStore.contentListRef
      .filter((content) => content.latLng)
      .map((content) => content.latLng);
  };

  const getLatLng = ({ id }) => {
    const selectedContent = contentStore.contentListRef.find(
      (content) => content.id === id,
    );
    return selectedContent ? selectedContent.latLng : null;
  };

  return {
    getLatLngList,
    getLatLng,
  };
});
