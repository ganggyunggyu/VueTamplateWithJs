<script setup>
const props = defineProps(["label", "onClick"]);
</script>
<template>
  <button @click="props.onClick">{{ props.label }}</button>
</template>
<style scoped></style>
