import { COUNTRIES } from "@/data/countries";
import { vector3ToLatLon } from "@/utils/coordinates";
import { findCountryAtCoordinates } from "@/utils/countryDetection";
import { useCallback } from "react";
import { Alert } from "react-native";
import * as THREE from "three";

export const useCountryDetection = () => {
  const handleGlobeTap = useCallback((intersectionPoint: THREE.Vector3) => {
    // Convertit le point 3D en lat/lon
    const { lat, lon } = vector3ToLatLon(intersectionPoint);

    console.log(
      `🌍 Tap détecté : lat=${lat.toFixed(2)}°, lon=${lon.toFixed(2)}°`,
    );

    // Trouve le pays le plus proche
    const country = findCountryAtCoordinates(lat, lon, COUNTRIES);

    // Affiche le résultat
    if (country) {
      Alert.alert(
        `${country.name} 🎉`,
        `Capitale : ${country.capital}\nCoordonnées : ${lat.toFixed(1)}°, ${lon.toFixed(1)}°`,
        [{ text: "OK" }],
      );
    } else {
      // Alert.alert(
      //   "Océan 🌊",
      //   "Vous avez tapé sur l'océan ou un pays non référencé.",
      //   [{ text: "Réessayer" }],
      // );
      console;
    }
  }, []);

  return { handleGlobeTap };
};
