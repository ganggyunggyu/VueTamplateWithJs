<script setup>
  import OnboardingForm from '@/entities/onboarding/components/Form.vue';
  import Navigation from '@/entities/onboarding/components/Navigation.vue';
  import Guide from '@/entities/onboarding/components/Guide.vue';
</script>

<template>
  <main class="onboarding-page">
    <Navigation />
    <Guide />
    <OnboardingForm />
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
</style>
