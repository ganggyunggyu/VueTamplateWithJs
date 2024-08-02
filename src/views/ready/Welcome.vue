<script setup>
  import { useRouter } from 'vue-router';
  import Image from '@/shared/components/Image.vue';
  import Button from '@/shared/components/Button.vue';
  import Slide from '@/entities/ready/components/Slide.vue';
  import { LOGO } from '@/assets/constants/image';

  const router = useRouter();

  const handleStartClick = () => {
    router.push('/onboarding-keyword');
  };
</script>

<template>
  <main class="welcome-page">
    <header class="welcome-header">
      <Image class="logo-image" :src="LOGO" />
      <Image class="logo-image" :src="LOGO" />
    </header>
    <Slide />
    <Button
      :class="'black md submit-button'"
      @click="handleStartClick"
      label="시작하기"
    />
  </main>
</template>

<style scoped>
  .welcome-page {
    width: 100%;
    height: calc(100 * var(--vh));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .welcome-header {
    position: fixed;
    top: calc(5 * var(--vh));
    width: 100%;
    margin: 0 12px;
    height: calc(9 * var(--vh));
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: blue;
  }
  .logo-image {
    height: 100%;
  }
  .submit-button {
    position: fixed;
    bottom: calc(5 * var(--vh));
  }
</style>
