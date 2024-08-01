<script setup>
  import Button from '../../../shared/components/Button.vue';
  import { defineProps } from 'vue';

  const props = defineProps({ guideList: Array });
</script>
<template>
  <div class="guide-container">
    <div class="guide-text-container">
      <p class="guide-text" v-for="(p, i) in props.guideList" :key="i">{{ p }}</p>
    </div>
    <div class="guide-button-container">
      <Button class="guide-button" label="길안내" />
      <Button class="guide-button" label="시작하기" />
    </div>
  </div>
</template>
<style scoped>
  .guide-container {
    position: fixed;
    bottom: 0;
    left: 0;
    height: calc(28 * var(--vh));
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .guide-text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .guide-button-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
</style>
