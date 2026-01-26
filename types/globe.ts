import { SharedValue } from "react-native-reanimated";

export type GlobeProps = {
  rotationX: SharedValue<number>;
  rotationY: SharedValue<number>;
  scale: SharedValue<number>;
};

export type GlobeGestureConfig = {
  minScale: number;
  maxScale: number;
  baseSensitivity: number;
  baseDecayFactor: number;
  minVelocityThreshold: number;
  deceleration: number;
};
