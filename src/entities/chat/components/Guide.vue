<script setup>
  const GUIDE_LIST = [
    '반가워요!',
    '저는 광주 비엔날레 2024의 가이드, 비날리야입니다.',
    '선택하신 키워드에 따라 아래 작품을 추천드려요.',
  ];
</script>
<template>
  <section class="guide-container">
    <p v-for="(p, i) in GUIDE_LIST" :key="i" class="guide-text">{{ p }}</p>
  </section>
</template>
<style scoped></style>
