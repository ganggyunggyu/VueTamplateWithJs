import { ref } from 'vue';

const { naver } = window;

const useNaverMap = () => {
  const mapRef = ref(null);

  const createMap = (lat, lng) => {
    const option = {
      center: new naver.maps.LatLng(lat, lng),
      zoom: 21, //지도의 초기 줌 레벨
      zoomControl: true, //줌 컨트롤의 표시 여부
      zoomControlOptions: {
        //줌 컨트롤의 옵션
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    mapRef.value = new naver.maps.Map('map', option);
  };

  const createMarker = (lat, lng) => {
    const position = new naver.maps.LatLng(lat, lng);
    const marker = new naver.maps.Marker({
      position: position,
      map: mapRef.value,
    });

    return marker;
  };

  const setCenter = (lat, lng) => {
    // if (mapRef.value) {
    //   const center = new Tmapv2.LatLng(lat, lng);
    //   mapRef.value.setCenter(center);
    //   if (markerRef.value) {
    //     markerRef.value.setElementPosition(center);
    //   } else {
    //     createMarker(lat, lng);
    //   }
    // }
  };
  const updateMarkerPosition = (marker, lat, lng) => {
    const position = new naver.maps.LatLng(lat, lng);
    marker.setPosition(position);
    console.log(marker);
  };

  const init = () => {
    mapRef.value = null;
    markerRef.value = null;
  };

  return { mapRef, createMap, createMarker, setCenter, updateMarkerPosition };
};

export default useNaverMap;
