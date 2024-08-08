<script setup>
  import { computed, nextTick, onMounted, ref, watch } from 'vue';
  import ContentCard from '@/entities/content/components/ContentCard.vue';

  import Button from '@/shared/components/Button.vue';
  import Guide from '@/entities/content/components/Guide.vue';

  const props = defineProps({
    contentList: Array,
    guideList: Array,
  });

  const displayedContentList = ref([]);
  const isButtonActive = computed(
    () => props.contentList.length !== displayedContentList.value.length,
  );

  const handleShowContent = () => {
    displayedContentList.value = [...props.contentList];
  };

  onMounted(() => {
    if (props.contentList.length < 4) {
      displayedContentList.value = [...props.contentList];
    } else {
      displayedContentList.value = props.contentList.slice(0, 3);
    }
  });

  // const scrollToBottom = () => {
  //   const chatContainer = document.querySelector('.chat-container');
  //   chatContainer.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  // };
  // watch(displayedContentList, async () => {
  //   await nextTick();
  //   scrollToBottom();
  // });
</script>
<template>
  <Guide v-if="props.guideList" :guide-list="props.guideList" />
  <section class="content-list-container">
    <ContentCard
      v-for="content in displayedContentList"
      :key="content.id"
      :content="content"
    />
    <Button
      v-if="isButtonActive"
      @click="handleShowContent"
      label="더 보기"
      class="gray-20 md"
    />
  </section>
</template>
<style>
  .content-list-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px;
    background-color: var(--gray-10);
  }
</style>
