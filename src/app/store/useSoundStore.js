import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSoundStore = defineStore('sound', () => {
  const isMuted = ref(false);

  const toggleMute = () => {
    isMuted.value = !isMuted.value;
  };

  return {
    isMuted,
    toggleMute,
  };
});
