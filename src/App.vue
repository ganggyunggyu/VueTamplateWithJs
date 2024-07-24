<script setup>
  import { useSetVh } from './shared/hooks/useSetVh';

  function onResize() {
    const innerHeight = `${window.innerHeight - 1}px`;
    document.documentElement.style.height = innerHeight;
    document.body.style.height = innerHeight;
  }
  window.addEventListener('resize', onResize);
  useSetVh();
</script>

<template>
  <router-view />
</template>

<style scoped></style>
