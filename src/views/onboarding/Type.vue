<script setup>
  import Button from '@/shared/components/Button.vue';
  import Navigation from '@/entities/onboarding/components/Navigation.vue';
  import Guide from '@/entities/onboarding/components/Guide.vue';
  import router from '@/router';
  import useTransform from '@/shared/hooks/useGetConstant';
  import { CHARACTER_EN, CHARACTER_KO } from '@/assets/constants/character';

  const ONBOARDING_SECOND_SECTION = ['평화님을 표현하는', '단어를3가지 선택해주세요.'];

  const { data } = useTransform(CHARACTER_KO, CHARACTER_EN);

  const handleClick = () => {
    router.push('/chat');
  };
</script>

<template>
  <main class="onboarding-page">
    <Navigation />
    <Guide :guide="ONBOARDING_SECOND_SECTION" />
    <section class="character-card-container">
      <figure v-for="(c, i) in data" :key="i" class="character-card">
        <p>{{ c }}</p>
      </figure>
    </section>
    <Button @click="handleClick" class="onboarding-button" label="선택 완료" />
  </main>
</template>

<style scoped>
  .onboarding-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100 * var(--vh));
  }
  .character-card-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
    overflow: scroll;
    width: 100%;
  }

  .character-card {
    width: 28vw;
    height: calc(10 * var(--vh));

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 10px;

    background: white;
    border-radius: 40px;
    border: solid 1px #ccc;
  }
  .onboarding-button {
    position: fixed;
    bottom: calc(8 * var(--vh));
    left: 50%;
    transform: translate(-50%, 50%);
  }
</style>
