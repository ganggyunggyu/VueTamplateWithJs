<script setup>
  import BottomNavigation from '@/entities/chat/components/BottomNavigation.vue';
</script>
<template>
  <main class="setting-page">
    <BottomNavigation />
  </main>
</template>
<style scoped>
  .setting-page {
    width: 100%;
    height: calc(85 * var(--vh));
  }
</style>
