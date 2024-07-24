<script setup>
  import { LOGO } from '@/assets/constants/image';
  import Image from '@/shared/components/Image.vue';
  import Button from '@/shared/components/Button.vue';

  const ONBOARDING_NAVIGATION = [1, 2];
</script>

<template>
  <section class="onboarding-navigation">
    <figure class="onboarding-navigation-item" v-for="(f, i) in ONBOARDING_NAVIGATION" :key="i">
      {{ f }}
    </figure>
  </section>
</template>

<style scoped>
  .onboarding-navigation-item {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: gray;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .onboarding-navigation {
    display: flex;
    gap: 10px;
    padding-top: 20px;
    padding-bottom: 40px;
  }
</style>
