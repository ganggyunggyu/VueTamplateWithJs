import { ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useLatLngStore } from '../../app/store/useLatLngStore';
import { userMapMarker, contentMapMarker } from '../lib/createMarker';

const { naver } = window;

const useMap = () => {
  const latLngStore = useLatLngStore();

  const mapRef = ref(null);
  const markerRef = ref(null);
  const markerListRef = ref([]);

  const createMap = ({ lat, lng }) => {
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

  const createMarker = ({ lat, lng }) => {
    const position = new naver.maps.LatLng(lat, lng);
    markerRef.value = new naver.maps.Marker({
      position: position,
      map: mapRef.value,
      icon: {
        title: 'userPosition',
        content: userMapMarker({ title: 'userPosition' }),

        size: new naver.maps.Size(38, 58),

        anchor: new naver.maps.Point(19, 58),
      },
    });
  };
  const createContentMarker = ({ latLngList }) => {
    latLngList.forEach(({ lat, lng }) => {
      const position = new naver.maps.LatLng(lat, lng);
      const marker = new naver.maps.Marker({
        position: position,
        map: mapRef.value,
        icon: {
          title: 'userPosition',
          content: contentMapMarker(),

          size: new naver.maps.Size(38, 58),

          anchor: new naver.maps.Point(19, 58),
        },
      });
      markerListRef.value = [...markerListRef.value, marker];
    });
  };

  const updateMarker = ({ lat, lng }) => {
    const position = new naver.maps.LatLng(lat, lng);
    markerRef.value.setPosition(position);
  };

  const Initialization = ({ lat, lng }) => {
    const latLngList = latLngStore.getLatLngList();
    if (!mapRef.value) createMap({ lat, lng });
    if (!markerRef.value) createMarker({ lat, lng });
    createContentMarker({ latLngList: latLngList });
  };

  const watchSuccessCallback = ({ lat, lng }) => {
    Initialization({ lat, lng });
    updateMarker({ lat, lng });
  };

  onBeforeRouteLeave(() => {
    mapRef.value = null;
    markerRef.value = null;
    markerListRef.value = [];
  });

  return { mapRef, watchSuccessCallback };
};

export default useMap;
