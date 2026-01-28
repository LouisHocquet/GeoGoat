import { GLOBE_CONFIG } from "@/constants/globe";
import { GlobeProps } from "@/types/globe";
import { useTexture } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native";
import React, { useRef } from "react";
import * as THREE from "three";
import { CountryMeshes } from "./CountryMeshes";

type GlobeComponentsProps = GlobeProps & {
  onTap?: (point: THREE.Vector3) => void;
};

export const Globe = ({ rotationX, rotationY, scale }: GlobeProps) => {
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
  };

  return (
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
    </mesh>
  );
};
