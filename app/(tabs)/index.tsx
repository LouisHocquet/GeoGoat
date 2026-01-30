import { createHomeStyles } from "@/assets/styles/home.styles";
import { GlobeScene } from "@/components/GlobeScene";
import { useGlobeGestures } from "@/hooks/useGlobeGestures";
import useTheme from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";

export default function Index() {
  const router = useRouter();

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

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <GestureDetector gesture={composedGestures}>
        <Animated.View style={{ flex: 1 }}>
          <GlobeScene
            rotationX={rotationX}
            rotationY={rotationY}
            scale={scale}
          />
        </Animated.View>
      </GestureDetector>

      {/* Start button when idle */}

      <View style={styles.startContainer} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push("../quiz/country")}
        >
          <Text style={styles.startButtonText}>Commencer le quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  startContainer: {
    position: "absolute",
    // top: 0,
    left: 0,
    right: 0,
    bottom: 24,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  startButton: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
