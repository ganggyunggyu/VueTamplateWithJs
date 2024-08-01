<script setup>
  import { onMounted, ref } from 'vue';
  import useTouchDirection from '../hooks/useTouchDirection';

  const props = defineProps({
    contentList: Array,
  });

  const displayedContentList = ref([]);
  const { handleTouchStart, handleTouchMove, handleTouchEnd, direction } =
    useTouchDirection();

  onMounted(() => {
    displayedContentList.value = [...props.contentList];
  });
</script>
<template>
  <section
    class="content-wrapper"
    :class="{
      'content-wrapper-active': direction === 'Up',
      'content-wrapper-down': direction === 'Down',
      'content-wrapper': direction === 'Mid',
    }"
  >
    <div
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="handleClick"
      class="content-container-header"
    >
      <div class="bar" />
    </div>

    <div class="content-container scroll">
      <ContentCard
        v-for="content in displayedContentList"
        :key="content.id"
        :content="content"
      />
    </div>
  </section>
</template>
<style scoped>
  .content-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    overflow-y: scroll;
    transition: 0.5s all;
    padding: 0 10px;
    background-color: var(--color-white);
    z-index: 1;
  }

  .content-container-header {
    position: sticky;
    top: 0;
    left: 0;
    min-height: 40px;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-white);
    z-index: 2;
  }
  .bar {
    border-radius: 8px;
    background: var(---LIght-030, #e2e2e2);
    width: 32px;
    height: 4px;
    flex-shrink: 0;
  }
  .content-wrapper {
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(30 * var(--vh));
    left: 0;
    bottom: calc(10 * var(--vh));
    transition: all 0.5s;
  }
  .content-wrapper-down {
    height: calc(8 * var(--vh));
  }
  .content-wrapper-active {
    height: calc(70 * var(--vh));
  }
</style>
