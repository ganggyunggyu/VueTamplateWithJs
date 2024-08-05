<script setup>
  const props = defineProps({
    guideList: Array,
  });
</script>
<template>
  <section class="guide-container">
    <div class="bar" />
    <div class="text-container">
      <p
        v-for="(p, i) in props.guideList"
        :key="i"
        class="guide-text body-14px"
      >
        {{ p }}
      </p>
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
    background-color: var(--color-gray-30);
  }
</style>
