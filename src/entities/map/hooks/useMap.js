import { ref } from 'vue';
import { getPath } from '../api/getPath';

const { Tmapv2 } = window;
console.log(Tmapv2);
export const useMap = () => {
  const mapRef = ref(null);
  const markerRef = ref(null);

  const createMap = (lat, lng) => {
    const option = {
      center: new Tmapv2.LatLng(lat, lng),
      width: '300px',
      height: '300px',
      zoom: 18,
    };
    mapRef.value = new Tmapv2.Map('map-container', option);

    createMarker(lat, lng);
  };

  const createMarker = (lat, lng) => {
    const position = new Tmapv2.LatLng(lat, lng);
    markerRef.value = new Tmapv2.Marker({
      position: position,
      map: mapRef.value,
    });
  };

  const setCenter = (lat, lng) => {
    if (mapRef.value) {
      const center = new Tmapv2.LatLng(lat, lng);
      mapRef.value.setCenter(center);
      if (markerRef.value) {
        markerRef.value.setElementPosition(center);
      } else {
        createMarker(lat, lng);
      }
    }
  };

  const init = () => {
    mapRef.value = null;
    markerRef.value = null;
  };

  return { mapRef, createMap, setCenter };
};
