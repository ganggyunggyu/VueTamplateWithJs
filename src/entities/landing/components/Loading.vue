<script setup>
  import Progress from '@/shared/components/Progress.vue';
  import Image from '@/shared/components/Image.vue';
  import { LOGO } from '@/shared/resources/main';
</script>
<template>
  <main class="loading-page">
    <Image class="logo-image" :src="LOGO" />
    <Progress color="red" :text-list="['광주 비엔날레']" />
  </main>
</template>
<style scoped>
  .loading-page {
    position: fixed;
    width: 100%;
    height: calc(100 * var(--vh));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    z-index: 999;
    background-color: var(--color-white);
  }
  .background-image {
    width: 100%;
    height: calc(100 * var(--vh));
    z-index: -1;
  }
  .logo-image {
    width: 60px;
    height: 60px;
  }
</style>
