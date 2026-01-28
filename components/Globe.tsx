import { GLOBE_CONFIG } from "@/constants/globe";
import { Country } from "@/types/country";
import { GlobeProps } from "@/types/globe";
import { useTexture } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native";
import React, { useRef } from "react";
import * as THREE from "three";
import { CountryMeshes } from "./CountryMeshes";

type GlobeComponentsProps = GlobeProps & {
  onTap?: (point: THREE.Vector3) => void;
  showBorders?: boolean;
  selectedCountry?: Country | null;
};

export const Globe = ({
  rotationX,
  rotationY,
  scale,
  onTap,
  showBorders = true,
}: GlobeComponentsProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const [earthTextureMap, normalMap] = useTexture([
    require("@/assets/images/2k_earth_daymap.jpg"),
    require("@/assets/images/2k_earth_normal_map.jpg"),
  ]) as [THREE.Texture, THREE.Texture];

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotationX.value;
      meshRef.current.rotation.y = rotationY.value + Math.PI;
      meshRef.current.scale.setScalar(scale.value);
    }
  });

  // Dans votre composant Globe, ajoutez cette fonction de callback
  const handleCountryClick = (countryId: string, countryName: string) => {
    console.log("Country clicked:", countryName, countryId);
    // TODO: Implémenter la logique d'overlay ici plus tard
  };

  // // Handler pour les taps sur le globe
  // const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
  //   if (onTap && event.point) {
  //     // Le point d'intersection est déjà dans l'espace local du mesh
  //     // On doit juste l'ajuster avec les rotations actuelles
  //     const rotatedPoint = event.point.clone();

  //     // Crée une matrice de rotation inverse
  //     const rotationMatrix = new THREE.Matrix4();
  //     rotationMatrix.makeRotationFromEuler(
  //       new THREE.Euler(rotationX.value, rotationY.value, 0),
  //     );
  //     rotationMatrix.invert();

  //     rotatedPoint.applyMatrix4(rotationMatrix);

  //     onTap(rotatedPoint);
  //   }
  // };

  return (
    // <mesh ref={meshRef} onPointerDown={handlePointerDown}>
    <mesh ref={meshRef} onPointerDown={() => null}>
      <sphereGeometry
        args={[
          GLOBE_CONFIG.RADIUS,
          GLOBE_CONFIG.SEGMENTS_WIDTH,
          GLOBE_CONFIG.SEGMENTS_HEIGHT,
        ]}
      />
      <meshStandardMaterial
        map={earthTextureMap}
        normalMap={normalMap}
        normalScale={
          new THREE.Vector2(
            GLOBE_CONFIG.NORMAL_SCALE,
            GLOBE_CONFIG.NORMAL_SCALE,
          )
        }
      />
      <CountryMeshes
        onCountryClick={handleCountryClick}
        debug={false} // Mettez true pour voir les wireframes
      />
      {/* ✅ Frontières comme enfants du mesh
      {showBorders &&
        COUNTRIES_GEOJSON.map((country) => (
          <CountryBorder
            key={country.id}
            country={country}
            color="#ffffff"
            opacity={0.3}
          />
        ))} */}
    </mesh>
  );
};
