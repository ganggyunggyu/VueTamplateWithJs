import { setVh } from '../lib/setViewPort';
import { onMounted } from 'vue';
export const useSetVh = () => {
  onMounted(() => {
    setVh();
    window.addEventListener('resize', setVh);
  });
};
