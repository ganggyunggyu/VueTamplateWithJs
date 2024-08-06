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

  const handleContentListClick = ({ floor }) => {
    const contentList = setFloorContentList({ floor: floor });
    displayContentList.value = [...contentList];
  };

  const handleAllContentClick = () => {
    const contentList = [...contentListRef.value];
    displayContentList.value = [...contentList];
  };

  const headingRef = ref(null);

  const success = (result) => {
    const heading = result.coords.heading;
    const arrow = document.querySelector('.arrow');
    const direction = document.querySelector('.direction');
    headingRef.value = heading;

    if (window.DeviceOrientationEvent) {
      window.addEventListener(
        'deviceorientation',
        (event) => {
          const alpha = event.alpha;
          const heading = headingRef.value;

          if (heading !== null) {
            const correctedAlpha = (alpha - heading) % 360;
            arrow.style.transform = `rotate(${-correctedAlpha}deg)`;
            direction.textContent = `${Math.round(alpha)}°`;
          } else {
            arrow.style.transform = `rotate(${alpha}deg)`;
            direction.textContent = `${Math.round(alpha)}°`;
          }
        },
        true,
      );
    } else {
      alert('Device Orientation API not supported on this device.');
    }
  };
  const error = (error) => {
    alert(error);
  };

  onMounted(() => {
    displayContentList.value = [...contentListRef.value];

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
    });
  });
</script>

<template>
  <main class="map-page">
    <header class="header">
      <h1 class="header-title title-16px">지도</h1>
      <p>{{ headingRef }}</p>
      <nav class="header-nav">
        <Button @click="handleAllContentClick" class="nav-item" label="전체" />
        <Button
          @click="handleContentListClick({ floor: 1 })"
          class="nav-item"
          label="1층"
        />
        <Button
          @click="handleContentListClick({ floor: 2 })"
          class="nav-item"
          label="2층"
        />
        <Button
          @click="handleContentListClick({ floor: 3 })"
          class="nav-item"
          label="3층"
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
  }
  .content-wrapper-down {
    height: calc(8 * var(--vh));
  }
  .content-wrapper-active {
    height: calc(70 * var(--vh));
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
  }
</style>
