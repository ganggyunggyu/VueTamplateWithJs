<script setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Loading from '@/entities/landing/components/Loading.vue';

  const router = useRouter();
  const timerRef = ref(null);
  const isLoadingRef = ref(true);

  onMounted(() => {
    timerRef.value = setTimeout(() => {
      router.push('/language');
    }, 3000);
  });

  onUnmounted(() => {
    clearTimeout(timerRef.value);
  });
</script>
<template>
  <Loading v-if="isLoadingRef" />
</template>
