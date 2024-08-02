import { ref } from 'vue';
import { getVh } from '../lib/getViewPort';

const useResizing = () => {
  const isTouchRef = ref(false);
  const newHeightRef = ref(null);
  const vh = getVh();
  const handleTouchStart = (event) => {
    event.preventDefault();
    isTouchRef.value = true;
  };

  const handleTouchMove = (event) => {
    event.preventDefault();

    if (isTouchRef.value) {
      const totalHeiht = window.innerHeight;
      const newTopHeiht = totalHeiht - event.touches[0].clientY - vh * 7.5;
      console.log(newTopHeiht);
      if (newTopHeiht > vh * 30 && newTopHeiht < vh * 70)
        newHeightRef.value = newTopHeiht;
    }
  };

  const handleTouchEnd = (event) => {
    event.preventDefault();
    isTouchRef.value = false;
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isTouchRef,
    newHeightRef,
  };
};
export default useResizing;
