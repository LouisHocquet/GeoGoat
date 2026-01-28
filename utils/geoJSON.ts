import { CountryGeoJSON } from "@/data/countriesGeoJSON";
import * as THREE from "three";
import { latLonToVector3 } from "./coordinates";

/**
 * Convertit un polygone GeoJSON (array de [lon, lat]) en points 3D
 * @param coordinates Array de [longitude, latitude]
 * @param radius Rayon du globe
 * @returns Array de Vector3
 */
export function geoJSONToPoints3D(
  coordinates: number[][],
  radius: number,
): THREE.Vector3[] {
  return coordinates.map(([lon, lat]) => latLonToVector3(lat, lon, radius));
}

/**
 * Convertit toutes les coordonnées d'un pays en points 3D
 * Un pays peut avoir plusieurs polygones (îles, enclaves)
 * @param country Données GeoJSON du pays
 * @param radius Rayon du globe
 * @returns Array de polygones (chaque polygone = array de Vector3)
 */
export function countryToPoints3D(
  country: CountryGeoJSON,
  radius: number,
): THREE.Vector3[][] {
  return country.coordinates.map((polygon) =>
    geoJSONToPoints3D(polygon, radius),
  );
}

/**
 * Calcule le centre géographique approximatif d'un pays
 * (moyenne des coordonnées)
 * @param country Données GeoJSON du pays
 * @returns {lat, lon}
 */
export function getCountryCenter(country: CountryGeoJSON): {
  lat: number;
  lon: number;
} {
  const allCoords = country.coordinates.flat();
  const sumLon = allCoords.reduce((sum, [lon]) => sum + lon, 0);
  const sumLat = allCoords.reduce((sum, [, lat]) => sum + lat, 0);

  return {
    lon: sumLon / allCoords.length,
    lat: sumLat / allCoords.length,
  };
}
