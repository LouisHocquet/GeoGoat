import { GLOBE_CONFIG } from "@/constants/globe";
import { Country } from "@/types/country";
import { GlobeProps } from "@/types/globe";
import React from "react";
import * as THREE from "three";
import { Globe } from "./Globe";

type GlobeSceneProps = GlobeProps & {
  onGlobeTap?: (point: THREE.Vector3) => void;
  selectedCountry?: Country | null;
  overlayState?: "hidden" | "preview" | "correct" | "incorrect";
};

export const GlobeScene = ({
  rotationX,
  rotationY,
  scale,
  onGlobeTap,
  selectedCountry,
  overlayState,
}: GlobeSceneProps) => {
  return (
    <>
      <ambientLight intensity={GLOBE_CONFIG.AMBIENT_LIGHT_INTENSITY} />
      <directionalLight
        position={GLOBE_CONFIG.DIRECTIONAL_LIGHT_POSITION}
        intensity={GLOBE_CONFIG.DIRECTIONAL_LIGHT_INTENSITY}
      />
      <Globe
        rotationX={rotationX}
        rotationY={rotationY}
        scale={scale}
        onTap={onGlobeTap}
        selectedCountry={selectedCountry} // ✅
        overlayState={overlayState} // ✅
      />
      {/* Test visuel : affiche les frontières */}
      {/* {COUNTRIES_GEOJSON.map((country) => {
        const polygons = countryToPoints3D(country, GLOBE_CONFIG.RADIUS + 0.01);

        return polygons.map((points, index) => {
          const geometry = new THREE.BufferGeometry().setFromPoints(points);

          return (
            <lineLoop key={`${country.id}-${index}`} geometry={geometry}>
              <lineBasicMaterial color="#00FF00" transparent opacity={0.8} />
            </lineLoop>
          );
        });
      })} */}
    </>
  );
};
