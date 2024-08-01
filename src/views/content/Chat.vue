<script setup>
  import { ref, onMounted } from 'vue';
  import Header from '@/entities/content/components/Header.vue';
  import Guide from '@/entities/content/components/Guide.vue';
  import ContentList from '@/features/content/components/ContentList.vue';
  import BottomNavigation from '@/entities/content/components/BottomNavigation.vue';
  import useGetConstant from '@/shared/hooks/useGetConstant';
  import { CONTENT_KO, CONTENT_EN } from '@/assets/constants/content';
  import { useContentStore } from '@/app/store/useContentStore';
  import { storeToRefs } from 'pinia';

  const store = useContentStore();
  const { contentList } = storeToRefs(store);

  console.log(contentList.value);
  const dummy = [
    {
      id: 5,
      image: 'https://via.placeholder.com/150',
      place: 'Van Gogh Museum, Amsterdam',
      title: 'Sunflowers',
      name: 'Vincent van Gogh',
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/150',
      place: 'Museo del Prado, Madrid',
      title: 'Las Meninas',
      name: 'Diego Velázquez',
    },
  ];

  const { data } = useGetConstant(CONTENT_KO, CONTENT_EN);
</script>
<template>
  <main class="chat-page">
    <Header />
    <div class="chat-container">
      <p>{{ selectedKeyword }}</p>
      <Guide />
      <ContentList :content-list="dummy" />
      <ContentList :content-list="contentList" />
    </div>
    <BottomNavigation />
  </main>
</template>
<style scoped>
  .chat-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    height: calc(100 * var(--vh));
    background-color: var(--color-gray-10);
  }
  .chat-container {
    position: relative;
    bottom: calc(10 * var(--vh));
    width: 100%;
    height: calc(82 * var(--vh));
    margin-top: calc(8 * var(--vh));
    padding-bottom: calc(10 * var(--vh));
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }
  .chat-keyword {
    position: fixed;
    bottom: calc(12 * var(--vh));
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 9;
  }
  .submit-button {
    position: fixed;
    bottom: calc(12 * var(--vh));
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
