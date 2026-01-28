import { COUNTRIES_GEOJSON } from "@/data/countriesGeoJSON";
import { countryToPoints3D, getCountryCenter } from "@/utils/geoJSON";

// Test de conversion
COUNTRIES_GEOJSON.forEach((country) => {
  const points3D = countryToPoints3D(country, 2.0);
  const center = getCountryCenter(country);

  console.log(`${country.id}:`);
  console.log(`  - ${points3D[0].length} points de frontière`);
  console.log(
    `  - Centre approximatif: ${center.lat.toFixed(2)}°N, ${center.lon.toFixed(2)}°E`,
  );
});

// Devrait afficher :
// FR: 42 points, Centre: 46.5°N, 2.6°E
// CN: 200+ points, Centre: 35.0°N, 103.0°E
// BR: 300+ points, Centre: -14.0°N, -54.0°E
