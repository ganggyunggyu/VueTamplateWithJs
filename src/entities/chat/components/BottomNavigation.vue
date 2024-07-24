<script setup>
  import { ref } from 'vue';
  import Button from '../../../shared/components/Button.vue';
  import { useRouter } from 'vue-router';

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
      class="bottom-navigation-button"
      :class="tabRef === 'Setting' && 'bottom-navigation-button-active'"
      @click="handleSettingClick"
      label="설정"
    />
    <Button
      class="bottom-navigation-button"
      :class="tabRef === 'Map' && 'bottom-navigation-button-active'"
      @click="handleMapClick"
      label="지도"
    />
    <Button
      class="bottom-navigation-button"
      :class="tabRef === 'Chat' && 'bottom-navigation-button-active'"
      @click="handleChatClick"
      label="채팅"
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
    justify-content: space-around;
    height: calc(15 * var(--vh));
    width: 100%;
    background-color: white;
  }
  .bottom-navigation-button-active {
    background-color: red;
    transform: scale(1.1); /* 예시로 버튼을 확대하는 transform 추가 */
  }
  .bottom-navigation-button {
    padding: 30px;
    transition: background-color 0.5s, transform 0.5s; /* background-color와 transform 속성에 transition 적용 */
  }
  /* .bottom-navigation-button:hover {
    background-color: blue;
  } */
</style>
