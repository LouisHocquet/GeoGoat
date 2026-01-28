import { createHomeStyles } from "@/assets/styles/home.styles";
import { GlobeScene } from "@/components/GlobeScene";
import { GLOBE_CONFIG } from "@/constants/globe";
import { useCountryDetection } from "@/hooks/useCountryDetection";
import { useGameState } from "@/hooks/useGameState";
import { useGlobeGestures } from "@/hooks/useGlobeGestures";
import useTheme from "@/hooks/useTheme";
import { Canvas } from "@react-three/fiber/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import * as THREE from "three";

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
  // const { handleGlobeTap } = useCountryDetection();
  const { findCountryByCoordinates } = useCountryDetection();

  const {
    gameState,
    startRound,
    selectCountry,
    confirmSelection,
    nextRound,
    resetGame,
  } = useGameState();

  // Démarre le jeu au mount
  useEffect(() => {
    startRound();
  }, []);

  // Handler pour les taps sur le globe
  const handleGlobeTap = (point: THREE.Vector3) => {
    if (gameState.status !== "playing") return;

    const country = findCountryByCoordinates(point);
    if (country) {
      selectCountry(country);
    }
  };

  // Calcule l'état de l'overlay
  const getOverlayState = () => {
    if (gameState.status === "awaiting_confirmation") return "preview";
    if (gameState.status === "correct") return "correct";
    if (gameState.status === "incorrect") return "incorrect";
    return "hidden";
  };

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <SafeAreaView style={homeStyles.safeArea}>
        {/* HEADER */}
        {/* <View style={homeStyles.header}>
            <View style={homeStyles.titleContainer}>
              <Text style={homeStyles.title}>GeoGoat 🐐</Text>
            </View>
          </View> */}
        {/* Earth */}
        <GestureDetector gesture={composedGestures}>
          <Animated.View style={{ flex: 1 }}>
            <Canvas
              // style={{ backgroundColor: "#f00" }}
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
                selectedCountry={gameState.selectedCountry} // ✅
                overlayState={getOverlayState()} // ✅
              />
            </Canvas>
          </Animated.View>
        </GestureDetector>
      </SafeAreaView>
    </LinearGradient>
  );
}
