<script setup>
  import { defineProps } from 'vue';
  const props = defineProps({
    headerTitle: String,
  });
</script>
<template>
  <header class="content-header title-16px">
    <div>X</div>
    <p>{{ props.headerTitle }}</p>
    <div>스피커</div>
  </header>
</template>
<style scoped>
  .content-header {
    height: calc(10 * var(--vh));
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11.5px 16px 12.5px 16px;
  }
</style>
