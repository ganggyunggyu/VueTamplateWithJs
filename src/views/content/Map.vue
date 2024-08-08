<script setup>
  import { onMounted, ref } from 'vue';
  import { storeToRefs } from 'pinia';

  import { useContentStore } from '../../app/store/useContentStore';

  import Map from '../../entities/content/components/Map.vue';
  import ContentCard from '../../entities/content/components/ContentCard.vue';
  import BottomNavigation from '../../entities/content/components/BottomNavigation.vue';

  import Button from '../../shared/components/Button.vue';
  import useResizing from '@/shared/hooks/useResizing';
  import CrosshairIcon from '@/shared/icons/CrosshairIcon.vue';
  import useMap from '@/shared/hooks/useMap';

  const { createContentMarker } = useMap();

  const contentStore = useContentStore();
  const { setFloorContentList } = contentStore;
  const { contentListRef } = storeToRefs(contentStore);
  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isTouchRef,
    newHeightRef,
  } = useResizing();

  const displayContentList = ref([]);
  const selectChipRef = ref('전체');

  const handleGetPositionClick = () => {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          console.log(result);
        } else if (result.state === 'prompt') {
          console.log(result);
        } else if (result.state === 'denied') {
          console.log(result);
        }
        result.onchange = () => {
          if (result.state === 'granted') {
            console.log(result);
          }
        };
      });
    }
  };
  const handleCategoryClick = ({ floor }) => {
    // 이건 앞으로 들어오는 데이터에 따라 floor가 아니라 type or id와 같은 로직으로 변경 예정
    if (floor === 0) {
      const contentList = [...contentListRef.value];
      displayContentListRef.value = [...contentList];
      createContentMarker({ contentList: contentList });
      selectCategoryRef.value = '전체';
      return;
    } else {
      const contentList = setFloorContentList({ floor: floor });
      displayContentListRef.value = [...contentList];
      createContentMarker({ contentList: contentList });
      selectCategoryRef.value = `${floor}층`;
    }
  };

  onMounted(() => {
    displayContentList.value = [...contentListRef.value];
  });
  const NAVIGATION_INFO = [
    {
      id: 0,
      label: '전체',
      category: '전체',
    },
    {
      id: 1,
      label: '1층',
      category: '1층',
    },
    {
      id: 2,
      label: '2층',
      category: '2층',
    },
    {
      id: 3,
      label: '3층',
      category: '3층',
    },
  ];
</script>

<template>
  <main class="map-page">
    <header class="header">
      <h1 class="header-title title-16px">지도</h1>
      <nav class="header-nav">
        <Button
          v-for="nav of NAVIGATION_INFO"
          :key="nav.id"
          @click="handleCategoryClick({ floor: nav.id })"
          class="chip-sm"
          :class="nav.category === selectChipRef ? 'chip-gray' : 'chip-white'"
          :label="nav.label"
        />
      </nav>
    </header>
    <Map />

    <section class="content-wrapper" :style="{ height: `${newHeightRef}px` }">
      <div
        class="content-container-header"
        :class="isTouchRef && 'content-container-header-active'"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div class="bar" />
      </div>
      <div class="content-container scroll">
        <ContentCard
          v-for="content in displayContentList"
          :key="content.id"
          :content="content"
        />
      </div>
    </section>
    <Button
      @click="handleGetPositionClick"
      class="cross-hair button"
      :icon="CrosshairIcon"
      icon-size="icon-md"
    />
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
    z-index: 1;
  }
  .header-title {
    padding: 15px 17px 16px 16px;
  }

  .header-nav {
    display: flex;
    gap: 4px;
    padding-left: 16px;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    overflow-y: scroll;
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
    transition: 0.5s background-color;
    z-index: 2;
    touch-action: none;
    box-shadow: 0 -10px 10px -10px rgba(0, 0, 0, 0.2);
    border-radius: 12px 12px 0 0;
  }
  .content-container-header-active {
    background-color: var(--color-gray-20);
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
    z-index: 1;
    transition: 0.15s height;
    background-color: var(--color-white);
    border-radius: 12px 12px 0 0;
  }
  .cross-hair {
    z-index: 999;
    position: fixed;
    right: 20px;
    bottom: calc(45 * var(--vh));
    width: 40px;
    height: 40px;
    background-color: var(--color-white);
    border-radius: 50%;
    z-index: 0;
  }
</style>
