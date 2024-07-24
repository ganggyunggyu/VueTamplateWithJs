<script setup>
  import Image from '@/shared/components/Image.vue';
  import { defineProps } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const props = defineProps({
    content: Object,
  });

  const handleContentClick = () => {
    if (!props.content) alert('콘텐츠가 없습니다.');
    if (!props.content.id) alert('콘텐츠 id가 없습니다.');
    if (props.content.id) router.push(`/content/${props.content.id}`);
  };
</script>
<template>
  <article @click="handleContentClick" class="content-card">
    <Image class="card-image" :src="props.content.image" />
    <div>
      <p class="content-place">{{ props.content.place }}</p>
      <p class="content-title">{{ props.content.title }}</p>
      <p class="content-name">{{ props.content.name }}</p>
    </div>
  </article>
</template>
<style scoped>
  .content-card {
    width: 100%;
    height: calc(15 * var(--vh));
    background-color: beige;
    padding: 10px;
    display: flex;
  }
  .card-image {
    width: 60px;
    height: 60px;
  }
  .content-place {
    width: 100%;
    overflow-x: scroll;
  }
</style>
