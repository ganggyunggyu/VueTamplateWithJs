import { ref, onMounted, onBeforeUnmount } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { getDistance } from '@/shared/lib/getDistance';
import { useLatLngStore } from '@/app/store/useLatLngStore.js';
const useWatchPosition = ({ callback }) => {
  const latLngStore = useLatLngStore();
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  const posRef = ref({
    accuracy: null,
    latitude: '',
    longitude: '',
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  });
  const watchId = ref(null);
  const distanceRef = ref(null);

  const onSuccess = (result) => {
    const pos = result.coords;
    posRef.value = {
      ...posRef.value,
      accuracy: pos.accuracy,
      latitude: pos.latitude,
      longitude: pos.longitude,
      altitude: pos.altitude,
      altitudeAccuracy: pos.altitudeAccuracy,
      heading: pos.heading,
      speed: pos.speed,
    };

    if (callback) {
      callback({
        lat: posRef.value.latitude,
        lng: posRef.value.longitude,
      });
    } else {
      console.error('callback is undefined or null');
    }

    const latLng = latLngStore.getLatLng({ id: 1 });

    const distance = (
      getDistance({
        lat1: posRef.value.latitude,
        lon1: posRef.value.longitude,
        lat2: latLng.lat,
        lon2: latLng.lng,
      }) * 1000
    ).toFixed(1);

    distanceRef.value = distance;
  };

  const onError = (error) => {
    switch (error.code) {
      case 1:
        alert('위치 정보를 허용해주세요');
        break;
      case 2:
        alert('사용할 수 없는 위치입니다.');
        break;
      case 3:
        alert('타임아웃이 발생하였습니다 ');
        break;
      default:
        alert('오류가 발생하였습니다.');
    }
  };
  const startWatchPosition = () => {
    if (!watchId.value) {
      watchId.value = navigator.geolocation.watchPosition(
        onSuccess,
        onError,
        options,
      );
    }
  };

  const clearWatchPosition = () => {
    if (watchId.value !== null) {
      navigator.geolocation.clearWatch(watchId.value);
      watchId.value = null;
    }
  };
  onMounted(() => {
    startWatchPosition();
  });

  onBeforeUnmount(() => {
    clearWatchPosition();
  });

  onBeforeRouteLeave(() => {
    clearWatchPosition();
  });

  return { posRef, distanceRef };
};

export default useWatchPosition;
