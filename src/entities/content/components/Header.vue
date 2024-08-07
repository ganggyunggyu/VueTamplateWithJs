<script setup>
  import { storeToRefs } from 'pinia';
  import { useSoundStore } from '@/app/store/useSoundStore';
  import SpeakerIcon from '../../../shared/icons/SpeakerIcon.vue';
  import MuteIcon from '@/shared/icons/MuteIcon.vue';
  import Button from '@/shared/components/Button.vue';
  const soundStore = useSoundStore();
  const { isMuted } = storeToRefs(soundStore);
  const { toggleMute } = soundStore;
</script>
<template>
  <header class="header title-16px">
    <h1 class="title-16px">바닐리야</h1>
    <Button
      class="mute-button"
      @click="toggleMute"
      :icon="isMuted ? MuteIcon : SpeakerIcon"
      icon-size="icon-md"
    />
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
    touch-action: none;
    z-index: 998;
  }
  .mute-button {
    width: 40px;
    height: 40px;
  }
</style>
