import { GLOBE_CONFIG } from "@/constants/globe";
import { CountryGeoJSON } from "@/data/countriesGeoJSON";
import { countryToPoints3D } from "@/utils/geoJSON";
import React, { useMemo } from "react";
import * as THREE from "three";

type OverlayState = "hidden" | "preview" | "correct" | "incorrect";

type CountryOverlayProps = {
  country: CountryGeoJSON;
  state: OverlayState;
};

const COLORS = {
  hidden: "#000000",
  preview: "#6B7FFF", // Bleu (comme ta maquette)
  correct: "#4CAF50", // Vert
  incorrect: "#F44336", // Rouge
};

const OPACITY = {
  preview: 0.4,
  correct: 0.6,
  incorrect: 0.6,
  hidden: 0,
};

export const CountryOverlay = ({ country, state }: CountryOverlayProps) => {
  const meshes = useMemo(() => {
    if (state === "hidden") return null;

    const polygons = countryToPoints3D(country, GLOBE_CONFIG.RADIUS + 0.02);

    return polygons.map((points, index) => {
      // Crée un shape 2D projeté
      const shape = new THREE.Shape();

      // Projette les points 3D en 2D local
      const center = new THREE.Vector3();
      points.forEach((p) => center.add(p));
      center.divideScalar(points.length);

      const localPoints = points.map((p) => {
        const local = p.clone().sub(center);
        return new THREE.Vector2(local.x, local.y);
      });

      localPoints.forEach((p, i) => {
        if (i === 0) shape.moveTo(p.x, p.y);
        else shape.lineTo(p.x, p.y);
      });

      const geometry = new THREE.ShapeGeometry(shape);

      return (
        <mesh
          key={`${country.id}-overlay-${index}`}
          geometry={geometry}
          position={center}
          raycast={() => null}
        >
          <meshBasicMaterial
            color={COLORS[state]}
            transparent
            opacity={OPACITY[state]}
            side={THREE.DoubleSide}
          />
        </mesh>
      );
    });
  }, [country, state]);

  return <>{meshes}</>;
};
