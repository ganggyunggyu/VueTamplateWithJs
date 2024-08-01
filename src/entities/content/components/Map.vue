<script setup>
  import useMap from '../hooks/useMap';
  import useWatchPosition from '../hooks/useWatchPosition';

  const props = defineProps({
    dir: String,
  });

  const { watchSuccessCallback } = useMap();

  const { posRef, distanceRef } = useWatchPosition({
    callback: watchSuccessCallback,
  });
</script>

<template>
  <div class="pos">
    <p>{{ posRef.latitude }}</p>
    <p>{{ posRef.longitude }}</p>
    <p>{{ distanceRef }}미터</p>
  </div>
  <div
    id="map"
    :style="{
      width: '100vw',
      height:
        props.dir === 'Down' ? 'calc(90 * var(--vh))' : 'calc(60 * var(--vh))',
    }"
  ></div>
</template>

<style scoped>
  .pos {
    position: fixed;
    z-index: 999;
    left: 30px;
    top: 200px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
