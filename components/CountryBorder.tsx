import { GLOBE_CONFIG } from "@/constants/globe";
import { CountryGeoJSON } from "@/data/countriesGeoJSON";
import { countryToPoints3D } from "@/utils/geoJSON";
import React, { useMemo } from "react";
import * as THREE from "three";

type CountryBorderProps = {
  country: CountryGeoJSON;
  color?: string;
  opacity?: number;
  offset?: number;
};

export const CountryBorder = ({
  country,
  color = "#ffffff",
  opacity = 0.3,
  offset = 0.01,
}: CountryBorderProps) => {
  const lines = useMemo(() => {
    const polygons = countryToPoints3D(country, GLOBE_CONFIG.RADIUS + offset);

    return polygons.map((points, index) => {
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      return (
        <lineLoop
          key={`${country.id}-border-${index}`}
          geometry={geometry}
          raycast={() => null} // ✅ Désactive le raycast
        >
          <lineBasicMaterial color={color} transparent opacity={opacity} />
        </lineLoop>
      );
    });
  }, [country, color, opacity, offset]);

  return <>{lines}</>;
};
