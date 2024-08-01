<script setup>
  import SpeakerIcon from '../../../shared/icons/SpeakerIcon.vue';
</script>
<template>
  <header class="header title-16px">
    <h1 class="title-16px">바닐리야</h1>
    <SpeakerIcon class="icon-xs" />
  </header>
</template>
<style scoped>
  .header {
    width: 100%;
    height: calc(8 * var(--vh));
    background-color: var(--color-white);
    color: var(--color-black);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11.5px 16px 12.5px 16px;
    z-index: 999;
  }
</style>
