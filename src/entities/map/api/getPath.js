import { PATH_REQUEST_URL, TMAP_APP_KEY } from "@/app/config/env-config";
import axios from "axios";

export const getPath = async (cur, end) => {
  const body = {
    startX: cur.lng,
    startY: cur.lat,
    endX: end.value.lng,
    endY: end.value.lat,
    reqCoordType: "WGS84GEO",
    resCoordType: "EPSG3857",
    startName: "출발지",
    endName: end.value.name,
  };
  const headers = {
    appKey: TMAP_APP_KEY,
  };
  try {
    const result = await axios.post(PATH_REQUEST_URL, body, {
      headers: headers,
    });

    return result.data;
  } catch (error) {
    console.error(error);
  }
};
