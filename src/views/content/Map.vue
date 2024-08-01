<script setup>
  import { storeToRefs } from 'pinia';

  import { useContentStore } from '../../app/store/useContentStore';
  import { useLanguageStore } from '../../app/store/useLanguageStore.js';

  import useTouchDirection from '@/features/content/hooks/useTouchDirection';
  import Map from '@/entities/content/components/Map.vue';
  import ContentCard from '@/entities/content/components/ContentCard.vue';
  import Button from '@/shared/components/Button.vue';

  const contentStore = useContentStore();
  const languageStore = useLanguageStore();
  const { contentList } = storeToRefs(contentStore);
  const { language } = storeToRefs(languageStore);
  const { setLanguage } = languageStore;

  const { handleTouchStart, handleTouchMove, handleTouchEnd, direction } =
    useTouchDirection();
</script>
<template>
  <main class="map-page">
    <p>{{ direction }}</p>
    <p>{{ language }}</p>
    <header class="header">
      <h1 class="header-title title-16px">지도</h1>
      <nav class="header-nav">
        <Button class="nav-item" label="1층" />
        <Button class="nav-item" label="2층" />
        <Button class="nav-item" label="3층" />
        <button @click="setLanguage">반응형 데이터 테스트 버튼</button>
      </nav>
    </header>
    <Map :dir="direction" />

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
          v-for="content in contentList"
          :key="content.id"
          :content="content"
        />
      </div>
    </section>

    <BottomNavigation />
  </main>
</template>
<style scoped>
  .map-page {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: calc(85 * var(--vh));
    touch-action: none;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 6px 16px;
    z-index: 1;
    gap: 6px;
  }
  .header-title {
    height: calc(10 * var(--vh));
    display: flex;
    align-items: center;
  }

  .header-nav {
    display: flex;
    gap: 4px;
  }

  .nav-item {
    background-color: var(--color-gray-10);
    padding: 7px 12px;
    border-radius: 88px;
  }

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
