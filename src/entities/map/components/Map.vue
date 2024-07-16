<script setup>
import { onMounted, ref } from "vue";
import { useMap } from "../hooks/useMap";
import { end } from "../constant/CONSTANT";

const lat = ref(null);
const lng = ref(null);
const speed = ref(null);
const heading = ref(null);
const posRef = ref(null);
const { mapRef, createMap, setCenter, createPolyline } = useMap();

onMounted(() => {
  const onSuccess = function (result) {
    const pos = result.coords;
    posRef.value = pos;

    [lat.value, lng.value] = [pos.latitude, pos.longitude];

    [heading.value, speed.value] = [pos.speed, pos.heading];

    if (!mapRef.value) createMap(lat.value, lng.value);

    setCenter(lat.value, lng.value);

    createPolyline({ lat: lat.value, lng: lng.value }, end);

    console.log(mapRef.value);
  };
  const onError = (error) => {
    console.error(error);
  };
  navigator.geolocation.watchPosition(onSuccess, onError);
});
</script>

<template>
  <div id="map-container"></div>
  <div id="pos">{{ lat }} {{ lng }}</div>
  <div id="pos2">{{ speed }} {{ heading }}</div>
</template>

<style scoped>
#pos {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 999;
}
#pos2 {
  position: fixed;
  top: 30px;
  left: 10px;
  z-index: 999;
}
</style>
