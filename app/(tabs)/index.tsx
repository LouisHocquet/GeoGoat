import { createHomeStyles } from "@/assets/styles/home.styles";
import { GlobeScene } from "@/components/GlobeScene";
import { GLOBE_CONFIG } from "@/constants/globe";
import { useCountryDetection } from "@/hooks/useCountryDetection";
import { useGlobeGestures } from "@/hooks/useGlobeGestures";
import useTheme from "@/hooks/useTheme";
import { Canvas } from "@react-three/fiber/native";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  // Globe states
  const rotationX = useSharedValue(0);
  const rotationY = useSharedValue(0);
  const scale = useSharedValue(1);

  // Gestures
  const composedGestures = useGlobeGestures({
    rotationX,
    rotationY,
    scale,
  });
  const { handleGlobeTap } = useCountryDetection();

  return (
    <GestureDetector gesture={composedGestures}>
      <LinearGradient
        colors={colors.gradients.background}
        style={homeStyles.container}
      >
        <SafeAreaView style={homeStyles.safeArea}>
          {/* HEADER */}
          <View style={homeStyles.header}>
            <View style={homeStyles.titleContainer}>
              <Text style={homeStyles.title}>GeoGoat 🐐</Text>
            </View>
          </View>
          {/* Earth */}
          <Animated.View style={{ flex: 1 }}>
            <Canvas
              camera={{
                fov: GLOBE_CONFIG.CAMERA.FOV,
                near: GLOBE_CONFIG.CAMERA.NEAR,
                far: GLOBE_CONFIG.CAMERA.FAR,
                position: GLOBE_CONFIG.CAMERA.POSITION,
              }}
            >
              <GlobeScene
                rotationX={rotationX}
                rotationY={rotationY}
                scale={scale}
                onGlobeTap={handleGlobeTap}
              />
            </Canvas>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </GestureDetector>
  );
}
