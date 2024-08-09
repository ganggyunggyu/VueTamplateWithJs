import { ref, onMounted, onBeforeUnmount } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useLatLngStore } from '../../app/store/useLatLngStore.js';
import { getDistance } from '../lib/getDistance.js';
import { useContentStore } from '@/app/store/useContentStore.js';

const useWatchPosition = ({ callback }) => {
  const contentStore = useContentStore();
  const { setDistanceForContentList } = contentStore;
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

  const permissionState = ref('prompt'); // 'granted', 'prompt', 'denied'

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

    setDistanceForContentList({
      lat: posRef.value.latitude,
      lng: posRef.value.longitude,
    });

    const latLng = latLngStore.getLatLng({ id: 3 });

    const distance = getDistance({
      lat1: posRef.value.latitude,
      lon1: posRef.value.longitude,
      lat2: latLng.lat,
      lon2: latLng.lng,
    });

    distanceRef.value = distance;
  };

  const onError = (error) => {
    watchId.value = null;
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
    } else {
      return false;
    }
  };

  const clearWatchPosition = () => {
    if (watchId.value !== null) {
      navigator.geolocation.clearWatch(watchId.value);
      watchId.value = null;
    }
  };

  const handlePermissionState = (state) => {
    if (state === 'granted') {
      console.log('granted.');
      console.log(watchId);
      startWatchPosition();
    } else if (state === 'prompt') {
      console.log('prompt.');
      startWatchPosition();
    } else if (state === 'denied') {
      console.log('denied.');
      alert('위치 정보 권한을 허용해주세요');
    }
  };

  const handleGetPositionClick = () => {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        permissionState.value = result.state;
        handlePermissionState(result.state);

        result.onchange = () => {
          permissionState.value = result.state;
          handlePermissionState(result.state);
        };
      });
    } else {
      alert('지원되지 않는 브라우저입니다.');
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

  return { posRef, distanceRef, startWatchPosition, handleGetPositionClick };
};

export default useWatchPosition;
