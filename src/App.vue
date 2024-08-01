<script setup>
  // import { useCheckUserAgent } from './shared/hooks/useCheckUserAgent';
  import { useSetVh } from './shared/hooks/useSetVh';
  // useCheckUserAgent(true);
  useSetVh();
</script>

<template>
  <router-view />
</template>

<style scoped></style>
