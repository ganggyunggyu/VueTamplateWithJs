<script setup>
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  import ContentGuide from '@/entities/chat/components/ContentGuide.vue';
  import ContentHeader from '@/entities/chat/components/ContentHeader.vue';

  import Modal from '@/shared/components/Modal.vue';

  const router = useRouter();
  const { params } = router.currentRoute.value;

  const toggleModal = () => {
    isModalRef.value = !isModalRef.value;
  };

  console.log(params);
  //id를 활용할 수 있습니다.

  const isModalRef = ref(false);
  const MODAL_TEXT = ['모달1', '모달2'];
  const buttonConfig = [
    { style: '', label: '버튼1', click: toggleModal },
    { style: '', label: '버튼2', click: toggleModal },
  ];

  onMounted(() => {
    isModalRef.value = true;
  });
</script>
<template>
  <transition name="fade">
    <Modal v-if="isModalRef" :modalTextList="MODAL_TEXT" :buttonConfigList="buttonConfig" />
  </transition>
  <main @click="toggleModal" class="content-page">
    <ContentHeader />
    <ContentGuide />
  </main>
</template>
<style scoped>
  .content-page {
    width: 100%;
    height: calc(100 * var(--vh));
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
