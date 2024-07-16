<script setup>
const props = defineProps(["label", "onChange", "placeholder"]);
</script>
<template>
  <div>
    <label :for="props.label">{{ props.label }}</label>
    <input type="text" @change="props.onChange" :placeholder="props.placeholder" />
  </div>
</template>
<style scoped></style>
