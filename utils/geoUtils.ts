/**
 * Utilities for converting geographic coordinates to 3D sphere positions
 */

/**
 * Converts latitude/longitude to 3D cartesian coordinates on a sphere
 * @param lat - Latitude in degrees (-90 to 90)
 * @param lon - Longitude in degrees (-180 to 180)
 * @param radius - Sphere radius
 * @returns [x, y, z] coordinates
 */
export function latLonToVector3(
  lat: number,
  lon: number,
  radius: number,
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}

/**
 * Converts GeoJSON coordinates array to 3D positions
 * @param coordinates - GeoJSON coordinate array [lon, lat]
 * @param radius - Sphere radius
 * @returns Array of [x, y, z] positions
 */
export function coordinatesToPositions(
  coordinates: number[][],
  radius: number,
): [number, number, number][] {
  return coordinates.map(([lon, lat]) => latLonToVector3(lat, lon, radius));
}
