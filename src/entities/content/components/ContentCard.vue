<script setup>
  import { useRouter } from 'vue-router';
  import Image from '../../../shared/components/Image.vue';
  import { defineProps } from 'vue';
  import RightArrow from '../../../shared/icons/RightArrow.vue';
  const router = useRouter();
  const props = defineProps({
    content: Object,
  });
  const { content } = props;
  const handleContentClick = () => {
    if (!content) {
      alert('콘텐츠가 없습니다.');
      return;
    }

    if (!content.id) {
      alert('콘텐츠 id가 없습니다.');
      return;
    }

    router.push(`/content/${content.id}`);
  };
</script>
<template>
  <article @click="handleContentClick" class="content-card">
    <Image class="card-image" :src="props.content.image" />
    <div>
      <p class="content-place label-11px">{{ props.content.location }}</p>
      <p class="content-title body-14px">{{ props.content.title }}</p>
      <p class="content-name label-11px">{{ props.content.artistName }}</p>
    </div>
    <RightArrow class="arrow icon-md" />
  </article>
</template>
<style scoped>
  .content-card {
    width: 100%;
    display: flex;
    gap: 12px;
    align-items: center;
    background-color: var(--color-white);
    padding: 8px;
    margin-bottom: 5px;
    border-radius: 8px;
    border: 1px solid var(--color-gray-10);
    box-shadow: 0px 4px 10px rgba(118, 118, 121, 0.3);
    touch-action: pan-y;
  }

  .card-image {
    width: calc(8 * var(--vh));
    height: calc(8 * var(--vh));
    padding: 2px 0;
    border-radius: 3.5px;
  }

  .content-title {
    overflow-x: scroll;
    max-width: fit-content;
    padding: 2px 0;
  }

  .content-place {
    width: 100%;
    overflow-x: scroll;
    color: var(--color-gray-50);
  }

  .content-name {
    color: var(--color-gray-40);
    padding: 3px 0;
  }

  .arrow {
    margin-left: auto;
  }
</style>
