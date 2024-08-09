import { onMounted, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import {
  defaultContentMarkerTemplate,
  selectedContentMarkerTemplate,
  userMarkerTemplate,
} from '../lib/createMarkerTemplate';
import { useContentStore } from '@/app/store/useContentStore';

const { naver } = window;
let userMarker;
let map;
const contentMarkerList = [];

const useMap = () => {
  const contentStore = useContentStore();
  const INIT_POSITION = {
    lat: 37.2937501,
    lng: 127.0493446,
    // lat: 37.288993,
    // lng: 127.0043861,
  };

  const positionRef = ref({ lat: null, lng: null });
  const selectedContent = ref(null);

  const createMap = () => {
    const option = {
      center: new naver.maps.LatLng(INIT_POSITION),
      zoom: 20,
      zoomControl: false,
    };
    map = new naver.maps.Map('map', option);
  };

  const createUserMarker = ({ lat, lng }) => {
    const position = new naver.maps.LatLng(lat, lng);
    userMarker = new naver.maps.Marker({
      position: position,
      map: map,
      icon: {
        title: 'userPosition',
        content: userMarkerTemplate({ title: 'userPosition' }),

        size: new naver.maps.Size(38, 58),

        anchor: new naver.maps.Point(19, 58),
      },
    });
    userMarker.setMap(map);
  };

  const updateUserMarker = ({ lat, lng }) => {
    const position = new naver.maps.LatLng(lat, lng);
    userMarker.setPosition(position);
  };

  const deleteContentMarker = () => {
    if (contentMarkerList) {
      for (const marker of contentMarkerList) {
        marker.setMap(null);
      }
      contentMarkerList.splice(0, 0);
    }
  };

  const handleMarkerClick = ({ marker, content, isTagging }) => {
    const selectedContentMarker = {
      title: 'selectedMarker',
      content: selectedContentMarkerTemplate({
        imageUrl: content.image,
      }),
      size: new naver.maps.Size(38, 58),
      anchor: new naver.maps.Point(26, 75),
    };
    const defaultContentMarker = {
      title: 'defaultContentMarker',
      content: defaultContentMarkerTemplate({
        contentType: 'docent',
        isTagging: isTagging,
      }),
      size: new naver.maps.Size(38, 58),
      anchor: new naver.maps.Point(19, 58),
    };
    if (!selectedContent.value) {
      marker.setIcon(selectedContentMarker);
      selectedContent.value = content;
    } else {
      if (content.id === selectedContent.value.id) {
        marker.setIcon(defaultContentMarker);
        selectedContent.value = null;
      } else {
        for (const marker of contentMarkerList) {
          marker.setIcon(defaultContentMarker);
        }
        marker.setIcon(selectedContentMarker);
        selectedContent.value = content;
      }
    }

    map.panTo(marker.getPosition());
  };

  const createContentMarker = ({ contentList, isTagging }) => {
    deleteContentMarker();

    for (const content of contentList) {
      if (!content.latLng) continue;
      const { lat, lng } = content.latLng;
      const position = new naver.maps.LatLng(lat, lng);
      const marker = new naver.maps.Marker({
        position: position,
        map: map,
        icon: {
          title: 'defaultContentMarker',
          content: defaultContentMarkerTemplate({
            contentType: 'docent',
            isTagging: isTagging,
          }),
          size: new naver.maps.Size(38, 58),
          anchor: new naver.maps.Point(19, 58),
        },
      });
      marker.setMap(map);
      naver.maps.Event.addListener(marker, 'click', () =>
        handleMarkerClick({
          marker: marker,
          content: content,
          isTagging: isTagging,
        }),
      );
      contentMarkerList.push(marker);
    }
  };

  const watchSuccessCallback = ({ lat, lng }) => {
    positionRef.value = { lat: lat, lng: lng };
    if (userMarker) {
      updateUserMarker({
        lat: positionRef.value.lat,
        lng: positionRef.value.lng,
      });
    } else {
      createUserMarker({
        lat: positionRef.value.lat,
        lng: positionRef.value.lng,
      });
    }
  };

  onMounted(() => {
    createMap();
    createContentMarker({ contentList: contentStore.contentListRef });
  });

  onBeforeRouteLeave(() => {
    map = null;
    userMarker = null;
    contentMarkerList.splice(0, 0);
    selectedContent.value = null;
  });

  return { watchSuccessCallback, createContentMarker, selectedContent };
};

export default useMap;
