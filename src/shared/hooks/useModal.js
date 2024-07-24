import { ref } from 'vue';

export const useModal = () => {
  const isModalRef = ref(false);

  const toggleModal = () => {
    isModalRef.value = !isModalRef.value;
  };

  return { isModalRef, toggleModal };
};
