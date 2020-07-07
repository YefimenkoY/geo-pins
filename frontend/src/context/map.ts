import { useState, useEffect } from "react";
import createUseContext from "constate";
import { GET_PINS_QUERY_GetPins } from "../types/GET_PINS_QUERY";

interface IPosition {
  longitude: number;
  latitude: number;
  zoom: number;
}

export const DEFAULT_ZOOM = 6;
const DEFAULT_MAP_POSITION: IPosition = {
  longitude: 13.4322,
  latitude: 23.4413,
  zoom: DEFAULT_ZOOM
};

export default createUseContext(() => {
  const [currentPosition, setCurrentPosition] = useState<IPosition | null>(
    null
  );
  const [mapPosition, setMapPosition] = useState<IPosition | null>(
    DEFAULT_MAP_POSITION
  );
  const [currentPin, setCurrentPin] = useState<GET_PINS_QUERY_GetPins | null>(
    null
  );
  const [pins, setPins] = useState<GET_PINS_QUERY_GetPins[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setMapPosition({
          longitude,
          latitude,
          zoom: DEFAULT_ZOOM
        });
      }
    );
  }, []);

  return {
    currentPosition,
    setCurrentPosition,
    mapPosition,
    setMapPosition,
    currentPin,
    setCurrentPin,
    pins,
    setPins,
    reset: () => {
      setCurrentPosition(null);
      setMapPosition(null);
      setCurrentPin(null);
    }
  };
});
