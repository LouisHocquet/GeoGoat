import React, { useMemo } from "react";
import * as THREE from "three";
import { GLOBE_CONFIG } from "../constants/globe";
import { useCountryGeometries } from "../hooks/useCountryGeometries";
import { coordinatesToPositions } from "../utils/geoUtils";
// @ts-ignore
import earcut from "earcut";

interface CountryMeshesProps {
  onCountryClick?: (countryId: string, countryName: string) => void;
  selectedCountryId?: string | null;
  feedbackCountryId?: string | null;
  isCorrect?: boolean | null;
  highlightColor?: string;
  debug?: boolean;
}

export function CountryMeshes({
  onCountryClick,
  selectedCountryId,
  feedbackCountryId,
  isCorrect,
  highlightColor = "#4A90E2",
  debug = false,
}: CountryMeshesProps) {
  const { countries, loading } = useCountryGeometries();

  const countryMeshes = useMemo(() => {
    if (loading) return null;

    const allMeshes: React.ReactElement[] = [];

    for (const country of countries) {
      for (
        let polygonIndex = 0;
        polygonIndex < country.coordinates.length;
        polygonIndex++
      ) {
        const polygonCoords = country.coordinates[polygonIndex];
        const outerRing = polygonCoords[0];

        if (!outerRing || outerRing.length < 3) continue;

        // Convert all coordinates to 3D positions on sphere
        const positions = coordinatesToPositions(
          outerRing as number[][],
          GLOBE_CONFIG.RADIUS,
        );

        if (positions.length < 3) continue;

        // Subdivide long edges to follow sphere curvature
        const subdividedPositions: [number, number, number][] = [];
        for (let i = 0; i < positions.length; i++) {
          const current = positions[i];
          const next = positions[(i + 1) % positions.length];

          subdividedPositions.push(current);

          // Calculate distance between points
          const [x1, y1, z1] = current;
          const [x2, y2, z2] = next;
          const dist = Math.sqrt(
            (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2,
          );

          // If edge is long, add midpoint on sphere surface
          if (dist > 0.5) {
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const midZ = (z1 + z2) / 2;
            const len = Math.sqrt(midX ** 2 + midY ** 2 + midZ ** 2);
            subdividedPositions.push([
              (midX / len) * GLOBE_CONFIG.RADIUS,
              (midY / len) * GLOBE_CONFIG.RADIUS,
              (midZ / len) * GLOBE_CONFIG.RADIUS,
            ]);
          }
        }

        // Calculate centroid for tangent plane
        const centroid = new THREE.Vector3();
        subdividedPositions.forEach(([x, y, z]) => {
          centroid.add(new THREE.Vector3(x, y, z));
        });
        centroid.divideScalar(subdividedPositions.length).normalize();

        // Create local coordinate system (tangent plane)
        const normal = centroid.clone();
        const up = new THREE.Vector3(0, 1, 0);
        const tangent = new THREE.Vector3()
          .crossVectors(up, normal)
          .normalize();
        const bitangent = new THREE.Vector3().crossVectors(normal, tangent);

        // Project 3D positions onto 2D tangent plane
        const vertices: number[] = [];
        const flatCoords: number[] = [];

        subdividedPositions.forEach(([x, y, z]) => {
          const point = new THREE.Vector3(x, y, z);
          // Push outward from globe surface
          const offset = 1.01;
          vertices.push(x * offset, y * offset, z * offset);

          // Project onto tangent plane
          const u = point.dot(tangent);
          const v = point.dot(bitangent);
          flatCoords.push(u, v);
        });

        // Triangulate using earcut
        const indices = earcut(flatCoords, null, 2);

        // Create BufferGeometry
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(vertices, 3),
        );
        geometry.setIndex(indices);
        geometry.computeVertexNormals();

        const key = `${country.id}-${polygonIndex}`;
        const isSelected = country.id === selectedCountryId;
        const isFeedback = country.id === feedbackCountryId;

        // Determine color based on state (priority order matters!)
        let meshColor = debug ? "#00ff00" : "#ffffff";
        let meshOpacity = debug ? 0.5 : 0;

        if (isSelected && !isFeedback) {
          // Show selection (blue) - only if NOT in feedback mode
          meshColor = highlightColor;
          meshOpacity = 0.6;
        } else if (isFeedback) {
          // Show feedback (green for correct, red for incorrect)
          meshColor = isCorrect ? "#22C55E" : "#EF4444";
          meshOpacity = 0.7;
        }

        allMeshes.push(
          <mesh
            key={key}
            geometry={geometry}
            renderOrder={1}
            userData={{ countryId: country.id, countryName: country.name }}
            onClick={(e) => {
              e.stopPropagation();
              onCountryClick?.(country.id, country.name);
            }}
          >
            <meshBasicMaterial
              transparent
              opacity={meshOpacity}
              color={meshColor}
              side={THREE.FrontSide}
              polygonOffset
              polygonOffsetFactor={-2}
              polygonOffsetUnits={-2}
            />
          </mesh>,
        );
      }
    }

    return allMeshes;
  }, [
    countries,
    loading,
    onCountryClick,
    selectedCountryId,
    feedbackCountryId,
    isCorrect,
    highlightColor,
    debug,
  ]);

  if (loading) return null;

  return <group name="country-meshes">{countryMeshes}</group>;
}
