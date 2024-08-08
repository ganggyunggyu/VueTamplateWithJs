import { ref, onMounted, onBeforeUnmount } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useLatLngStore } from '../../app/store/useLatLngStore.js';
import { getDistance } from '../lib/getDistance.js';

const useWatchPosition = ({ callback }) => {
  const latLngStore = useLatLngStore();

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

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const onSuccess = (result) => {
    const pos = result.coords;
    posRef.value = pos;

    if (callback) {
      callback({
        lat: posRef.value.latitude,
        lng: posRef.value.longitude,
        heading: posRef.value.heading,
      });
    } else {
      console.error('callback is undefined');
    }

    const latLng = latLngStore.getLatLng({ id: 3 });

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
    const errorMessages = {
      1: '위치 정보를 허용해주세요',
      2: '사용할 수 없는 위치입니다.',
      3: '타임아웃이 발생하였습니다',
      default: '오류가 발생하였습니다.',
    };
    // alert(errorMessages[error.code] || errorMessages.default);
    console.log(errorMessages[error.code] || errorMessages.default);
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

  return { posRef, distanceRef, startWatchPosition };
};

export default useWatchPosition;
