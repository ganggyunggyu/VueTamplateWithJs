<script setup>
  import Button from '@/shared/components/Button.vue';
  import BottomNavigation from '@/entities/chat/components/BottomNavigation.vue';
  import useGetConstant from '@/shared/hooks/useGetConstant';
  import { CONTENT_EN, CONTENT_KO } from '@/assets/constants/content';
  import ContentCard from '@/entities/chat/components/ContentCard.vue';
  import { onMounted, ref } from 'vue';
  const { data: contentList } = useGetConstant(CONTENT_KO, CONTENT_EN);

  const contentRef = ref(false);
  const metrics = ref({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    snap: 0,
    isContentAreaTouched: false,
  });
  const newHeightRef = ref(null);

  const handleClick = () => {
    contentRef.value = !contentRef.value;
  };

  onMounted(() => {
    const header = document.querySelector('.content-container-header');
    const container = document.querySelector('.content-container');

    const handleTouchStart = (e) => {
      metrics.value.touchStart.sheetY = container.getBoundingClientRect().height;
      metrics.value.touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const { touchStart } = metrics.value;
      const currentTouch = e.touches[0];
      const touchOffset = currentTouch.clientY - touchStart.touchY;

      newHeightRef.value = touchStart.sheetY - touchOffset;
      container.style.height = `${newHeightRef.value}px`;
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();

      // if (newHeightRef.value < 400) newHeightRef.value = 0;
      if (newHeightRef.value < 100) newHeightRef.value = 0;
      if (newHeightRef.value > 100) newHeightRef.value = 1000;
      container.style.height = `${newHeightRef.value}px`;
    };

    header.addEventListener('touchstart', handleTouchStart);
    header.addEventListener('touchmove', handleTouchMove);
    header.addEventListener('touchend', handleTouchEnd);
  });

  // 선택된 옵션을 관리하는 변수
  const selectedOption = ref('distance');

  // 옵션 변경 핸들러
  const handleOptionChange = () => {
    console.log('Selected option:', selectedOption.value);
    // 여기에 옵션 변경에 따른 로직을 추가할 수 있습니다.
  };
</script>

<template>
  <main class="map-page">
    <header class="header">
      <h1 class="header-title">지도</h1>
      <nav class="header-nav">
        <Button class="nav-item" label="1층" />
        <Button class="nav-item" label="2층" />
        <Button class="nav-item" label="3층" />
      </nav>
    </header>
    <div id="map" style="width: 100vw; height: 100vh" />
    <div @click="handleClick" class="content-container-header">
      <div class="dropdown-container">
        <select v-model="selectedOption" @change="handleOptionChange">
          <option value="distance">가까운 순</option>
          <option value="alphabetical">가나다 순</option>
        </select>
      </div>
    </div>
    <section :class="contentRef && 'content-container-active'" class="content-container scroll">
      <ContentCard v-for="content in contentList" :key="content.id" :content="content" />
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
  }
  .header {
    width: 90%;
    height: calc(8 * var(--vh));
    background-color: mediumspringgreen;
    display: flex;
    flex-direction: column;
  }
  .header-nav {
    display: flex;
    gap: 10px;
  }
  .nav-item {
    background-color: aqua;
    padding: 8px 15px;
    border-radius: 40px;
  }
  .content-container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    background-color: aqua;
    overflow-y: scroll;
    transition: 0.5s all;
  }
  .content-container-header {
    min-height: 40px;
    background-color: brown;
    width: 100vw;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
  .dropdown-container {
    padding: 10px;
    background-color: white;
    z-index: 999;
    position: relative;
    height: 40px;
    width: 100px;
  }
  .dropdown-item {
    padding: 10px;
    background-color: white;
    height: 40px;
    width: 100px;
  }
  .dropdown-list {
    transform: translateY(40px);
  }
  .dropdown-item-selected {
    padding: 10px;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
  }
  .content-container-active {
    height: calc(300 * var(--vh));
  }
  .dropdown-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
  }

  select {
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
    cursor: pointer;
  }
</style>
