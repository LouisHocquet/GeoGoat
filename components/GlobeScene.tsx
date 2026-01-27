import { GLOBE_CONFIG } from "@/constants/globe";
import { GlobeProps } from "@/types/globe";
import React from "react";
import * as THREE from "three";
import { Globe } from "./Globe";

type GlobeSceneProps = GlobeProps & {
  onGlobeTap?: (point: THREE.Vector3) => void;
};

export const GlobeScene = ({
  rotationX,
  rotationY,
  scale,
  onGlobeTap,
}: GlobeSceneProps) => {
  return (
    <>
      {/* ✅ Affiche les stats en dev uniquement */}
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
      />
    </>
  );
};
