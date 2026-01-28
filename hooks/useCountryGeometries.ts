import countriesData from "@/data/countries.json";
import { useEffect, useState } from "react";

export interface CountryGeometry {
  id: string;
  name: string;
  coordinates: number[][][][]; // Array of polygons, each with rings, each with points
  type: "Polygon" | "MultiPolygon";
}

/**
 * Hook to load and parse country geometries from GeoJSON
 */
export function useCountryGeometries() {
  const [countries, setCountries] = useState<CountryGeometry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Handle both direct import and { default: ... } wrapper
      const data = (countriesData as any).default || countriesData;

      if (!data.features) {
        console.error("No features in GeoJSON:", data);
        setLoading(false);
        return;
      }

      const parsed: CountryGeometry[] = data.features.map((feature: any) => {
        const { geometry, properties } = feature;

        // Normalize: extract all polygons as array
        let coordinates: number[][][][] = [];

        if (geometry.type === "Polygon") {
          // Polygon: [[[lon,lat]...]] → wrap in array
          coordinates = [geometry.coordinates];
        } else if (geometry.type === "MultiPolygon") {
          // MultiPolygon: [[[[lon,lat]...]]] → already array of polygons
          coordinates = geometry.coordinates;
        }

        return {
          id: properties.ISO_A2 || properties.name,
          name: properties.name,
          coordinates,
          type: geometry.type,
        };
      });

      setCountries(parsed);
      setLoading(false);
    } catch (error) {
      console.error("Error loading country geometries:", error);
      setLoading(false);
    }
  }, []);

  return { countries, loading };
}
