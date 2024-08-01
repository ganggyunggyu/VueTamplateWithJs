<script setup>
  const GUIDE_LIST = [
    '반가워요!',
    '저는 광주 비엔날레 2024의 가이드, 비날리야입니다.',
    '선택하신 키워드에 따라 아래 작품을 추천드려요.',
  ];
</script>
<template>
  <section class="guide-container">
    <div class="bar" />
    <div class="text-container">
      <p v-for="(p, i) in GUIDE_LIST" :key="i" class="guide-text body-14px">{{ p }}</p>
    </div>
  </section>
</template>
<style scoped>
  .guide-container {
    display: flex;
    width: 100%;
    gap: 9px;
    padding: 18px 12px 14px 12px;
  }
  .text-container {
    line-height: 20px;
    letter-spacing: -0.5px;
    color: var(--color-gray-50);
  }
  .bar {
    width: 3px;
    flex-shrink: 0;
    align-self: stretch;
    border-radius: 8px;
    background: #cccccd;
  }
</style>
