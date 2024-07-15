<script setup>
import vLazyImage from "v-lazy-image";

const props = defineProps(["src", "placeholder"]);
</script>
<template>
  <v-lazy-image :src="props.src" :src-placeholder="props.placeholder" />
</template>
<style scoped>
.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
  width: 100vw;
  height: 100vh;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
