<script setup>
  import Image from '@/shared/components/Image.vue';
  import { LOGO } from '@/shared/resources/main';

  const props = defineProps(['guide']);
</script>
<template>
  <section class="onboarding-section">
    <Image class="logo-image" :src="LOGO" />
    <div class="guide-text-container">
      <p class="title-16px" v-for="(p, index) in props.guide" :key="index">
        {{ p }}
      </p>
    </div>
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
    margin: 8px 0 8px 0;
  }

  .guide-text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px 0 12px 0;
    line-height: 24px;
  }
</style>
