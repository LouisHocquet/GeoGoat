import { GLOBE_CONFIG } from "@/constants/globe";
import { GlobeProps } from "@/types/globe";
import { Canvas } from "@react-three/fiber/native";
import React from "react";
import { Globe } from "./Globe";

export const GlobeScene = ({
  rotationX,
  rotationY,
  scale,
  onCountryClick,
  selectedCountryId,
  highlightColor,
}: GlobeProps) => {
  return (
    <Canvas
      camera={{
        fov: GLOBE_CONFIG.CAMERA.FOV,
        near: GLOBE_CONFIG.CAMERA.NEAR,
        far: GLOBE_CONFIG.CAMERA.FAR,
        position: GLOBE_CONFIG.CAMERA.POSITION,
      }}
    >
      <ambientLight intensity={GLOBE_CONFIG.AMBIENT_LIGHT_INTENSITY} />
      <directionalLight
        position={GLOBE_CONFIG.DIRECTIONAL_LIGHT_POSITION}
        intensity={GLOBE_CONFIG.DIRECTIONAL_LIGHT_INTENSITY}
      />
      <Globe
        rotationX={rotationX}
        rotationY={rotationY}
        scale={scale}
        onCountryClick={onCountryClick}
        selectedCountryId={selectedCountryId}
        highlightColor={highlightColor}
      />
    </Canvas>
  );
};
