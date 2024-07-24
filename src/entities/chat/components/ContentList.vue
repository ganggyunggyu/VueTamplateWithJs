<script setup>
  import Image from '@/shared/components/Image.vue';
  import { CONTENT_KO, CONTENT_EN } from '@/assets/constants/content';
  import useTransform from '@/shared/hooks/useGetConstant';
  import ContentCard from '@/entities/chat/components/ContentCard.vue';

  const { data } = useTransform(CONTENT_KO, CONTENT_EN);
</script>
<template>
  <section class="content-container">
    <ContentCard v-for="(content, i) in data" :key="i" :content="content" />
  </section>
</template>
<style scoped>
  .content-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 90%;
    height: calc(45 * var(--vh));
    background-color: aqua;
    padding: 10px;
    overflow-y: scroll;
  }
</style>
