<script setup>
  const props = defineProps(['label', 'onClick']);
</script>
<template>
  <button @click="props.onClick">{{ props.label }}</button>
</template>
<style scoped>
  button {
    text-align: center;
  }
  /** button 색상과 사이즈를 조합하여 사용 */
  .sm {
    border-radius: 24px;
    padding: 12px 32px 14px 32px;
    font-size: 14px;
    font-weight: 700;
  }
  .md {
    min-width: 144px;
    font-size: 14px;
    font-weight: 700;
    padding: 12px 32px 14px 32px;
    border-radius: 24px;
  }
  .lg {
    width: 100vw;
    padding: 16px;
  }
  .black {
    background-color: var(--color-black);
    color: var(--color-white);
  }
  .gray-xs {
    background-color: var(--color-gray-30);
    color: var(--color-black);
    padding: 8px 14.5px 10px 14.5px;
    font-size: 14px;
    font-weight: 700;
  }
  .gray-20 {
    background-color: var(--color-gray-20);
    color: var(--color-white);
  }
  .gray-10 {
    background-color: var(--color--gray-10);
    border: 1px solid var(--color-gray-30);
    color: var(--color-gray-50);
  }
  /** chip 색상과 사이즈 하나에 통일 */
  .chip-gray-sm {
    font-size: 12px;
    font-weight: 500;
    border-radius: 16px;
    background-color: var(--color-gray-50);
    border: 1px solid var(--color-gray-40);
  }
  .chip-white-sm {
    font-size: 12px;
    font-weight: 500;
    border-radius: 16px;
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-10);
    padding: 7px 12px;
  }
  .chip-gray-10-md {
    background-color: var(--color-gray-10);
    color: var(--color-black);
    border-radius: 24px;
    border: 1px solid var(--color-gray-20);
    padding: 10.5px 24px 11.5px 24px;
    font-size: 12px;
    font-weight: 500;
    min-width: fit-content;
  }
  .chip-gray-50-md {
    background-color: var(--color-gray-50);
    color: var(--color-white);
    border-radius: 24px;
    border: 1px solid var(--color-gray-40);
    font-size: 12px;
    font-weight: 500;
    padding: 10.5px 24px 11.5px 24px;
    min-width: fit-content;
  }
  /* .chip-icon-white {
    background-color: var(--color-white);
    color: var(--color-black);
  } */
</style>
