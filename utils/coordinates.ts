import * as THREE from "three";

/**
 * Convertit lat/lon en position 3D sur une sphère
 */
export function latLonToVector3(
  lat: number,
  lon: number,
  radius: number,
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

/**
 * Convertit un point 3D en lat/lon
 */
export function vector3ToLatLon(point: THREE.Vector3): {
  lat: number;
  lon: number;
} {
  const radius = point.length();
  const lat = 90 - (Math.acos(point.y / radius) * 180) / Math.PI;
  const lon =
    ((270 + (Math.atan2(point.x, point.z) * 180) / Math.PI) % 360) - 180;

  return { lat, lon };
}

/**
 * Calcule la distance entre deux coordonnées (Haversine)
 * @returns Distance en degrés
 */
export function getDistanceBetweenCoords(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return c * (180 / Math.PI);
}
