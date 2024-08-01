<script setup>
  import { ref } from 'vue';
  import Button from '../../../shared/components/Button.vue';
  import { useRouter } from 'vue-router';
  import SettingIcon from '../../../shared/icons/SettingIcon.vue';
  import MapIcon from '../../../shared/icons/MapIcon.vue';
  import ChatIcon from '@/shared/icons/ChatIcon.vue';

  const router = useRouter();
  const tabRef = ref(router.currentRoute.value.name);

  const handleSettingClick = () => {
    router.push('/content-setting');
  };
  const handleMapClick = () => {
    router.push('/content-map');
  };
  const handleChatClick = () => {
    router.push('/content-chat');
  };
</script>
<template>
  <nav class="bottom-navigation">
    <Button
      :class="tabRef === 'Setting' ? 'bottom-navigation-button-active' : 'bottom-navigation-button'"
      @click="handleSettingClick"
      label="설정"
      :icon="SettingIcon"
      iconSize="icon-md"
    />
    <Button
      :class="tabRef === 'Map' ? 'bottom-navigation-button-active' : 'bottom-navigation-button'"
      @click="handleMapClick"
      label="지도"
      :icon="MapIcon"
      iconSize="icon-md"
    />
    <Button
      :class="tabRef === 'Chat' ? 'bottom-navigation-button-active' : 'bottom-navigation-button'"
      @click="handleChatClick"
      label="채팅"
      :icon="ChatIcon"
      iconSize="icon-md"
    />
  </nav>
</template>
<style scoped>
  .bottom-navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: calc(10 * var(--vh));
    width: 100%;
    padding: 0 40px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
    background-color: white;
    z-index: 2;
  }
  .bottom-navigation-button-active {
    color: var(--color-black);
    fill: var(--color-black);
    height: 100%;
    width: 64px;
  }
  .bottom-navigation-button {
    height: 100%;
    width: 64px;
    color: var(--color-gray-30);
    fill: var(--color-gray-30);
  }
</style>
