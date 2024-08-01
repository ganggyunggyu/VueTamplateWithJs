<script setup>
  import { computed, defineProps, onMounted, ref } from 'vue';
  import ContentCard from '../../../entities/content/components/ContentCard.vue';
  import Button from '../../../shared/components/Button.vue';

  const props = defineProps({
    contentList: Array,
  });

  const displayContentList = ref([]);
  const isButtonActive = computed(
    () => props.contentList.length !== displayContentList.value.length,
  );

  const handleShowContent = () => {
    displayContentList.value = [...props.contentList];
  };

  onMounted(() => {
    if (props.contentList.length < 4) {
      displayContentList.value = [...props.contentList];
    } else {
      displayContentList.value = props.contentList.slice(0, 3);
    }
  });
</script>
<template>
  <section class="content-list-container">
    <ContentCard
      v-for="content in displayContentList"
      :key="content.id"
      :content="content"
    />
    <Button v-if="isButtonActive" @click="handleShowContent" label="더 보기" />
  </section>
</template>
<style>
  .content-list-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: var(--gray-10);
  }
</style>
