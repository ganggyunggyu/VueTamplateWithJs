import { ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const { naver } = window;

const useMap = () => {
  const mapRef = ref(null);
  const markerRef = ref(null);

  const createMap = (object) => {
    const { lat, lng } = object;
    const option = {
      center: new naver.maps.LatLng(lat, lng),
      zoom: 20,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    mapRef.value = new naver.maps.Map('map', option);
  };

  const createMarker = (object) => {
    const { lat, lng } = object;
    const position = new naver.maps.LatLng(lat, lng);
    markerRef.value = new naver.maps.Marker({
      position: position,
      map: mapRef.value,
    });
  };

  const updateMarker = (object) => {
    const { lat, lng } = object;
    const position = new naver.maps.LatLng(lat, lng);
    markerRef.value.setPosition(position);
  };

  const Initialization = (object) => {
    const { lat, lng } = object;
    if (!mapRef.value) createMap({ lat, lng });
    if (!markerRef.value) createMarker({ lat, lng });
  };

  const watchSuccessCallback = (object) => {
    const { lat, lng } = object;
    Initialization({ lat, lng });

    updateMarker({ lat, lng });
  };

  onBeforeRouteLeave(() => {
    mapRef.value = null;
    markerRef.value = null;
  });

  return { mapRef, watchSuccessCallback };
};

export default useMap;
