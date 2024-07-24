<script setup>
  import { defineProps } from 'vue';
  const props = defineProps({
    headerTitle: String,
  });

  const CONTENT_HEADER = '거대 압정과 소인국 사진 찍기';
</script>
<template>
  <header class="content-header">
    <div>X</div>
    <p>{{ CONTENT_HEADER }}</p>
    <div>스피커</div>
  </header>
</template>
<style scoped>
  .content-header {
    height: calc(10 * var(--vh));
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: calc(5 * var(--vh));
  }
</style>
