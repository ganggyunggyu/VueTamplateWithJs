<script setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';

  import { useContentStore } from '@/app/store/useContentStore';

  import Map from '@/entities/content/components/Map.vue';
  import ContentCard from '@/entities/content/components/ContentCard.vue';
  import BottomNavigation from '@/entities/content/components/BottomNavigation.vue';

  import useResizing from '@/shared/hooks/useResizing';
  import useMap from '@/shared/hooks/useMap';
  import useWatchPosition from '@/shared/hooks/useWatchPosition';
  import Button from '@/shared/components/Button.vue';
  import BottomArrowIcon from '@/shared/icons/BottomArrowIcon.vue';
  import CheckRoundedIcon from '@/shared/icons/CheckRoundedIcon.vue';
  import CrosshairIcon from '@/shared/icons/CrosshairIcon.vue';

  const MAP_TAG_LIST = [
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
  const contentStore = useContentStore();
  const {
    getFloorContentList,
    getContentListSortedByAlphabet,
    getContentListSortedByDistance,
  } = contentStore;
  const { contentListRef } = storeToRefs(contentStore);

  const selectSortedTypeRef = ref('가나다 순');
  const isDropdown = ref(false);
  const floorLevel = ref(0);
  const isTagging = computed(() => {
    if (floorLevel.value === 0) {
      return false;
    } else {
      return true;
    }
  });

  const { createContentMarker } = useMap();

  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isTouchRef,
    newHeightRef,
  } = useResizing();
  const { watchSuccessCallback } = useMap();
  const { handleGetPositionClick } = useWatchPosition({
    callback: watchSuccessCallback,
  });

  const displayContentListRef = computed(() => {
    const contentList = getFloorContentList({ floor: floorLevel.value });

    if (selectSortedTypeRef.value === '가나다 순') {
      const sortedContentList = getContentListSortedByAlphabet({
        contentListParam: contentList,
      });
      createContentMarker({
        contentList: sortedContentList,
        isTagging: isTagging.value,
      });
      return sortedContentList;
    } else if (selectSortedTypeRef.value === '가까운 순') {
      const sortedContentList = getContentListSortedByDistance({
        contentListParam: contentList,
      });
      createContentMarker({
        contentList: sortedContentList,
        isTagging: isTagging.value,
      });
      return sortedContentList;
    }

    createContentMarker({
      contentList: contentList,
      isTagging: isTagging.value,
    });

    return contentList;
  });

  const toggleDropdown = () => {
    isDropdown.value = !isDropdown.value;
  };

  const handleCategoryClick = ({ floor }) => {
    floorLevel.value = floor;
  };

  const handleSortedByAlphabetClick = () => {
    selectSortedTypeRef.value = '가나다 순';
    toggleDropdown();
  };

  const handleSortedByDistanceClick = () => {
    selectSortedTypeRef.value = '가까운 순';
    toggleDropdown();
  };

  onMounted(() => {
    createContentMarker({
      contentList: displayContentListRef.value,
      isTagging: isTagging.value,
    });
    displayContentListRef.value = contentListRef.value;
  });
</script>

<template>
  <main class="map-page">
    <header class="header">
      <h1 class="header-title title-16px">지도</h1>
      <nav class="header-nav">
        <Button
          v-for="nav of MAP_TAG_LIST"
          :key="nav.id"
          @click="handleCategoryClick({ floor: nav.id })"
          class="chip-sm"
          :class="nav.id === floorLevel ? 'chip-gray' : 'chip-white'"
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
      <section class="dropdown-container body-12px">
        <button
          @click="toggleDropdown"
          class="selected-item"
          :class="isDropdown && 'dropdown-item-selected'"
        >
          <p>{{ selectSortedTypeRef }}</p>
          <BottomArrowIcon class="icon-xs" />
        </button>
        <TransitionGroup name="fade">
          <li v-if="isDropdown" class="dropdown-list">
            <ul
              @click="handleSortedByAlphabetClick"
              class="dropdown-item dropdown-item-top"
              :class="
                selectSortedTypeRef === '가나다 순' && 'dropdown-item-selected'
              "
            >
              <p>가나다 순</p>
              <CheckRoundedIcon v-if="selectSortedTypeRef === '가나다 순'" />
              <div v-else class="empty-box" />
            </ul>
            <ul
              @click="handleSortedByDistanceClick"
              class="dropdown-item dropdown-item-bottom"
              :class="
                selectSortedTypeRef === '가까운 순' && 'dropdown-item-selected'
              "
            >
              <p>가까운 순</p>
              <CheckRoundedIcon v-if="selectSortedTypeRef === '가까운 순'" />
              <div v-else class="empty-box" />
            </ul>
          </li>
        </TransitionGroup>
      </section>
      <div class="content-container scroll">
        <ContentCard
          v-for="content in displayContentListRef"
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
    z-index: 2;
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
    position: relative;
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
  .selected-item {
    width: 92px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    padding: 5.5px 0 6.5px 0;
    border-radius: 10px;
    z-index: 3;
  }
  .dropdown-container {
    position: absolute;
    right: 10px;
    top: 5px;
    z-index: 3;
  }
  .dropdown-list {
    border: 1px solid var(--color-gray-20);
    border-radius: 10px;
  }
  .dropdown-item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    width: 90px;
    padding: 5.5px 0 6.5px 0;
    background-color: var(--color-white);
    border-radius: 10px;
  }
  .dropdown-item-selected {
    background-color: var(--color-gray-10);
    transition: 0.5s background-color;
  }
  .dropdown-item-top {
    border-radius: 10px 10px 0 0;
  }
  .dropdown-item-bottom {
    border-radius: 0 0 10px 10px;
  }
  .empty-box {
    width: 16px;
    height: 16px;
  }
</style>
