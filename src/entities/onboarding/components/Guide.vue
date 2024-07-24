<script setup>
  import Image from '@/shared/components/Image.vue';
  import { LOGO } from '@/assets/constants/image';

  const props = defineProps(['guide']);
</script>
<template>
  <section class="onboarding-section">
    <Image class="logo-image" :src="LOGO" />
    <p v-for="(p, index) in props.guide" :key="index">{{ p }}</p>
  </section>
</template>
<style scoped>
  .onboarding-section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
  }

  .logo-image {
    width: 40px;
    height: 40px;
  }
</style>
