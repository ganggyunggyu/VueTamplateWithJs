<script setup>
  import { ref } from 'vue';
  import Input from '@/shared/components/Input.vue';
  import Button from '@/shared/components/Button.vue';
  import router from '@/router';

  const nicknameRef = ref(null);
  const handleChange = (event) => {
    nicknameRef.value = event.target.value;
  };
  const handleClick = () => {
    console.log(nicknameRef);
    router.push('/onboarding/type');
  };
</script>
<template>
  <form class="onboarding-form">
    <Input
      :ref="nicknameRef"
      @change="handleChange"
      class="onboarding-input"
      placeholder="닉네임 (최대 8자)"
      :is-center="true"
    />
    <Button type="button" @click="handleClick" class="onboarding-button" label="작성 완료" />
  </form>
</template>
<style scoped>
  .onboarding-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  .onboarding-input input {
    text-align: center;
  }
  .onboarding-button {
    position: fixed;
    bottom: calc(8 * var(--vh));
  }
</style>
