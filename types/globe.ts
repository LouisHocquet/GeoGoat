import { SharedValue } from "react-native-reanimated";

export type GlobeProps = {
  rotationX: SharedValue<number>;
  rotationY: SharedValue<number>;
  scale: SharedValue<number>;
  onCountryClick?: (countryId: string, countryName: string) => void;
  selectedCountryId?: string | null;
  highlightColor?: string;
};

export type GlobeGestureConfig = {
  minScale: number;
  maxScale: number;
  baseSensitivity: number;
  baseDecayFactor: number;
  minVelocityThreshold: number;
  deceleration: number;
};
