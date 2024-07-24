<script setup>
  import Header from '@/entities/chat/components/Header.vue';
  import Guide from '@/entities/chat/components/Guide.vue';
  import ContentCard from '@/entities/chat/components/ContentCard.vue';
  import BottomNavigation from '@/entities/chat/components/BottomNavigation.vue';
  import Button from '@/shared/components/Button.vue';
  import useGetConstant from '@/shared/hooks/useGetConstant';

  import { CONTENT_KO, CONTENT_EN } from '@/assets/constants/content';

  const { data: contentList } = useGetConstant(CONTENT_KO, CONTENT_EN);
</script>
<template>
  <main class="chat-page">
    <Header />
    <Guide />
    <section class="content-container scroll">
      <ContentCard v-for="content in contentList" :key="content.id" :content="content" />
    </section>
    <section class="keyword-container">
      <Button class="keyword-button" label="키워드 선택" />
    </section>
    <BottomNavigation />
  </main>
</template>
<style scoped>
  .chat-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    height: calc(85 * var(--vh));
  }
  .chat-container {
    width: 90%;
  }
  .content-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 90%;
    height: calc(50 * var(--vh));
    background-color: aqua;
    padding: 10px;
    overflow-y: scroll;
  }
  .keyword-container {
    width: 90%;
    z-index: 1;
    display: flex;
    flex-direction: column-reverse;
    height: calc(16 * var(--vh));
  }
  .keyword-button {
    width: 100%;
    height: calc(8 * var(--vh));
  }
</style>
