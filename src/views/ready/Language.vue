<script setup>
  import Button from '@/shared/components/Button.vue';
  import router from '@/router';
  import { routes } from '@/router';

  const handleClick = (language) => {
    localStorage.setItem('language', language);
    router.push('welcome');
  };
</script>
<template>
  <main class="language-page">
    <div class="button-container">
      <Button @click="handleClick('ko')" label="한국어" />
      <Button @click="handleClick('en')" label="English" />
      <router-link v-for="(route, i) in routes" :to="route.path" :key="i">{{
        route.name
      }}</router-link>
    </div>
  </main>
</template>
<style scoped>
  .language-page {
    width: 100%;
    height: calc(100 * var(--vh));
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
