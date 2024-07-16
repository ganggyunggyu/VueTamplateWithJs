import { ref } from "vue";
import { getPath } from "../api/getPath";

const { Tmapv2 } = window;
console.log(Tmapv2);
export const useMap = () => {
  const mapRef = ref(null);
  const markerRef = ref(null);
  const polylineListRef = ref(null);
  const totalTimeRef = ref(null);
  const totalDistanceRef = ref(null);

  const createMap = (lat, lng) => {
    const option = {
      center: new Tmapv2.LatLng(lat, lng),
      width: "300px",
      height: "300px",
      zoom: 18,
    };
    mapRef.value = new Tmapv2.Map("map-container", option);

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
  const createPolyline = async (cur, end) => {
    const result = await getPath(cur, end, mapRef.value);

    const { features } = result;

    const polylineInfoList = [];

    const totalDistance = (features[0].properties.totalDistance / 1000).toFixed(1);
    const totalTime = (features[0].properties.totalTime / 60).toFixed(0);

    console.log(`${totalTime} 분`);
    console.log(`${totalDistance} km`);

    for (const result of features) {
      const geometry = result.geometry;
      if (geometry.type == "LineString") {
        for (const coordinate of geometry.coordinates) {
          const latlng = new window.Tmapv2.Point(coordinate[0], coordinate[1]);
          const convertPoint = new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
          const convertChange = new window.Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
          polylineInfoList.push(convertChange);
        }
      }
    }

    polylineListRef.value = polylineInfoList;
    console.log(polylineListRef.value);
    new window.Tmapv2.Polyline({
      path: polylineListRef.value,
      strokeColor: "blue",
      strokeWeight: 4,
      map: mapRef.value,
    });
  };

  const init = () => {
    mapRef.value = null;
    markerRef.value = null;
    polylineListRef.value = null;
  };

  return { mapRef, createMap, setCenter, createPolyline };
};
