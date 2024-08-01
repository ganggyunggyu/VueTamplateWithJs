<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Button from '../../../shared/components/Button.vue';

  const router = useRouter();

  const currentTap = ref(router.currentRoute.value.name);

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
  <footer class="bottom-section">
    <Button v-if="currentTap === 'Chat'" class="bottom-section-button" label="키워드 선택" />
    <nav class="bottom-navigation">
      <Button @click="handleSettingClick" label="설정" />
      <Button @click="handleMapClick" label="지도" />
      <Button @click="handleChatClick" label="채팅" />
    </nav>
  </footer>
</template>
<style scoped>
  .bottom-section {
    height: calc(15 * var(--vh));
    position: relative;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .bottom-section-button {
    position: absolute;
  }
  .bottom-navigation {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
  }
</style>
