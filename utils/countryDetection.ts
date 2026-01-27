import { Country } from "@/data/countries";
import { getDistanceBetweenCoords } from "./coordinates";

/**
 * Trouve le pays le plus proche d'un point
 */
export function findCountryAtCoordinates(
  lat: number,
  lon: number,
  countries: Country[],
  maxDistance: number = 5,
): Country | null {
  let closestCountry: Country | null = null;
  let minDistance = maxDistance;

  for (const country of countries) {
    const distance = getDistanceBetweenCoords(
      lat,
      lon,
      country.lat,
      country.lon,
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestCountry = country;
    }
  }

  return closestCountry;
}
