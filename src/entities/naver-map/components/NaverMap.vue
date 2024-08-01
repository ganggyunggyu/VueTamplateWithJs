<script setup>
  import { onMounted, ref } from 'vue';
  import useNaverMap from '../hooks/useNaverMap';
  import { onBeforeRouteLeave } from 'vue-router';

  const lat = ref(null);
  const lng = ref(null);
  const speed = ref(null);
  const heading = ref(null);
  const posRef = ref(null);
  const watchId = ref(null);
  const markerRef = ref(null);

  const { mapRef, createMap, createMarker, setCenter, updateMarkerPosition } = useNaverMap();

  const onSuccess = function (result) {
    console.log('succ');
    const pos = result.coords;
    posRef.value = pos;

    [lat.value, lng.value] = [pos.latitude, pos.longitude];
    [heading.value, speed.value] = [pos.speed, pos.heading];

    if (!mapRef.value) createMap(lat.value, lng.value);
    if (!markerRef.value) markerRef.value = createMarker(lat.value, lng.value);
    setCenter(lat.value, lng.value);
    updateMarkerPosition(markerRef.value, lat.value, lng.value);
  };

  const onError = (error) => {
    console.error(error);
  };

  const startWatchPosition = () => {
    if (!watchId.value) {
      watchId.value = navigator.geolocation.watchPosition(onSuccess, onError);
    }
  };

  const clearWatchPosition = () => {
    if (watchId.value !== null) {
      navigator.geolocation.clearWatch(watchId.value);
      watchId.value = null;
    }
  };

  onMounted(() => {
    console.log('mount');
    startWatchPosition();
  });

  onBeforeRouteLeave(() => {
    console.log('leave');
    clearWatchPosition();
    mapRef.value = null;
  });
</script>

<template>
  <div class="pos">
    <p>{{ lat }}</p>
    <p>{{ lng }}</p>
  </div>
  <div id="map" style="width: 100vw; height: 100vh"></div>
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
