<script setup>
  import { LOGO } from '@/assets/constants/image';
  import Image from '@/shared/components/Image.vue';
  import Button from '@/shared/components/Button.vue';
  import router from '@/router';
  import Swiper from '@/entities/landing/components/Swiper.vue';

  const handleClick = () => {
    router.push('/onboarding-name');
  };

  const onSwiper = (swiper) => {
    console.log(swiper);
  };
  const onSlideChange = () => {
    console.log('slide change');
  };
</script>
<template>
  <main class="welcome-page">
    <Image class="logo-image" :src="LOGO" />
    <Swiper />
    <Button @click="handleClick" label="시작하기" />
  </main>
</template>
<style scoped>
  .welcome-page {
    width: 100%;
    height: calc(100 * var(--vh));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .logo-image {
    width: 300px;
    height: calc(15 * var(--vh));
  }
  .slide-container {
    height: calc(30 * var(--vh));
  }
</style>
