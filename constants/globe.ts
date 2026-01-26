import { GlobeGestureConfig } from "@/types/globe";

export const GLOBE_CONFIG = {
  // Géométrie
  RADIUS: 2.0,
  SEGMENTS_WIDTH: 64,
  SEGMENTS_HEIGHT: 64,

  // Caméra
  CAMERA_FOV: 64, // ✅ Ajouté

  // Limites de rotation
  MAX_ROTATION_X: Math.PI / 2, // 90° (évite le flip)
  MIN_ROTATION_X: -Math.PI / 2,

  // Lumières
  AMBIENT_LIGHT_INTENSITY: 0.5,
  DIRECTIONAL_LIGHT_INTENSITY: 1,
  DIRECTIONAL_LIGHT_POSITION: [5, 3, 5] as [number, number, number],

  // Normal map
  NORMAL_SCALE: 0.8, // Réduit de 5 à 0.8 (plus réaliste)
} as const;

export const GESTURE_CONFIG: GlobeGestureConfig = {
  minScale: 0.5,
  maxScale: 3,
  baseSensitivity: 0.01,
  baseDecayFactor: 0.005,
  minVelocityThreshold: 100,
  deceleration: 0.998,
} as const;
