import { GLOBE_CONFIG } from "@/constants/globe";
import { GlobeProps } from "@/types/globe";
import React from "react";
import { Globe } from "./Globe";

type GlobeSceneProps = GlobeProps;

export const GlobeScene = ({
  rotationX,
  rotationY,
  scale,
}: GlobeSceneProps) => {
  return (
    <>
      {/* ✅ Affiche les stats en dev uniquement */}
      <ambientLight intensity={GLOBE_CONFIG.AMBIENT_LIGHT_INTENSITY} />
      <directionalLight
        position={GLOBE_CONFIG.DIRECTIONAL_LIGHT_POSITION}
        intensity={GLOBE_CONFIG.DIRECTIONAL_LIGHT_INTENSITY}
      />
      <Globe rotationX={rotationX} rotationY={rotationY} scale={scale} />
    </>
  );
};
