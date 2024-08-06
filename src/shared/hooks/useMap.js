import { ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { userMarker, defaultContentMarker } from '../lib/createMarker';
import { useContentStore } from '@/app/store/useContentStore';

const { naver } = window;

const useMap = () => {
  const contentStore = useContentStore();

  const mapRef = ref(null);
  const markerRef = ref(null);
  const markerListRef = ref(null);

  const createMap = ({ lat, lng }) => {
    const option = {
      center: new naver.maps.LatLng(lat, lng),
      zoom: 20,
      zoomControl: false,
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
        content: userMarker({ title: 'userPosition' }),

        size: new naver.maps.Size(38, 58),

        anchor: new naver.maps.Point(19, 58),
      },
    });
  };
  const deleteContentMarker = ({ markerList }) => {
    for (const marker of markerList) {
      marker.setMap(null);
    }
    markerList = null;
  };

  const createContentMarker = ({ contentList }) => {
    if (markerListRef.value) {
      deleteContentMarker({ markerList: markerListRef.value });
    }
    const markerList = [];

    for (const content of contentList) {
      if (!content.latLng) break;
      console.log(content);
      const { lat, lng } = content.latLng;
      const position = new naver.maps.LatLng(lat, lng);
      const marker = new naver.maps.Marker({
        position: position,
        map: mapRef.value,
        icon: {
          title: 'userPosition',
          content: defaultContentMarker({ contentType: 'docent' }),
          size: new naver.maps.Size(38, 58),
          anchor: new naver.maps.Point(19, 58),
        },
      });
      markerList.push(marker);
    }
    markerListRef.value = [...markerList];
  };

  const updateMarker = ({ lat, lng }) => {
    const position = new naver.maps.LatLng(lat, lng);
    markerRef.value.setPosition(position);
  };

  const Initialization = ({ lat, lng }) => {
    if (!mapRef.value) createMap({ lat, lng });
    if (!markerRef.value) createMarker({ lat, lng });
    createContentMarker({ contentList: contentStore.contentListRef });
  };

  const watchSuccessCallback = ({ lat, lng }) => {
    Initialization({ lat, lng });
    updateMarker({ lat, lng });
  };

  onBeforeRouteLeave(() => {
    mapRef.value = null;
    markerRef.value = null;
    markerListRef.value = null;
  });

  return { mapRef, watchSuccessCallback, createContentMarker };
};

export default useMap;
