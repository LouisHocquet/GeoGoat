import { GESTURE_CONFIG, GLOBE_CONFIG } from "@/constants/globe";
import { Gesture } from "react-native-gesture-handler";
import {
  SharedValue,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";

type UseGlobeGesturesParams = {
  rotationX: SharedValue<number>;
  rotationY: SharedValue<number>;
  scale: SharedValue<number>;
};

export const useGlobeGestures = ({
  rotationX,
  rotationY,
  scale,
}: UseGlobeGesturesParams) => {
  const lastRotationX = useSharedValue(0);
  const lastRotationY = useSharedValue(0);
  const lastScale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      lastRotationX.value = rotationX.value;
      lastRotationY.value = rotationY.value;
    })
    .onUpdate((e) => {
      "worklet";

      // Sensibilité adaptée au zoom
      const sensitivity =
        GESTURE_CONFIG.baseSensitivity / (2 * Math.pow(scale.value, 2));

      rotationY.value = lastRotationY.value + e.translationX * sensitivity;

      // Limite la rotation verticale
      const newRotationX = lastRotationX.value + e.translationY * sensitivity;
      rotationX.value = Math.max(
        GLOBE_CONFIG.MIN_ROTATION_X,
        Math.min(GLOBE_CONFIG.MAX_ROTATION_X, newRotationX),
      );
    })
    .onEnd((e) => {
      "worklet";

      const velocityMagnitude = Math.sqrt(
        Math.pow(e.velocityX, 2) + Math.pow(e.velocityY, 2),
      );

      if (velocityMagnitude < GESTURE_CONFIG.minVelocityThreshold) return;

      const ratioX = e.velocityX / velocityMagnitude;
      const ratioY = e.velocityY / velocityMagnitude;

      const decayFactor =
        GESTURE_CONFIG.baseDecayFactor / (2 * Math.pow(scale.value, 2));

      rotationY.value = withDecay({
        velocity: velocityMagnitude * ratioX * decayFactor,
        deceleration: GESTURE_CONFIG.deceleration,
      });

      rotationX.value = withDecay({
        velocity: velocityMagnitude * ratioY * decayFactor,
        deceleration: GESTURE_CONFIG.deceleration,
      });
    });

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      "worklet";
      lastScale.value = scale.value;
    })
    .onUpdate((e) => {
      "worklet";
      const newScale = lastScale.value * e.scale;
      scale.value = Math.max(
        GESTURE_CONFIG.minScale,
        Math.min(GESTURE_CONFIG.maxScale, newScale),
      );
    });

  return Gesture.Simultaneous(panGesture, pinchGesture);
};
