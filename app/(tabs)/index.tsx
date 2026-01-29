import { createHomeStyles } from "@/assets/styles/home.styles";
import { QuestionBottomSheet } from "@/components/game/QuestionBottomSheet";
import { QuestionOverlay } from "@/components/game/QuestionOverlay";
import { GlobeScene } from "@/components/GlobeScene";
import { useCountryGeometries } from "@/hooks/useCountryGeometries";
import { useGameState } from "@/hooks/useGameState";
import { useGlobeGestures } from "@/hooks/useGlobeGestures";
import useTheme from "@/hooks/useTheme";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";

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

  const { countries, loading } = useCountryGeometries();
  const gameState = useGameState(countries, 10);

  const {
    gamePhase,
    targetCountry,
    selectedCountry,
    isCorrect,
    score,
    currentRound,
    totalRounds,
    startQuiz,
    selectCountry,
    validateAnswer,
    nextRound,
    backToMenu,
    cancelSelection,
  } = gameState;

  // Handle country click from globe
  const handleCountryClick = (countryId: string, countryName: string) => {
    if (gamePhase !== "question" && gamePhase !== "confirming") return;

    const country = countries.find((c) => c.id === countryId);
    if (country) {
      selectCountry(country);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <GestureDetector gesture={composedGestures}>
        <Animated.View style={{ flex: 1 }}>
          <GlobeScene
            rotationX={rotationX}
            rotationY={rotationY}
            scale={scale}
            onCountryClick={handleCountryClick}
            selectedCountryId={selectedCountry?.id || null}
            highlightColor="#4A90E2"
          />
        </Animated.View>
      </GestureDetector>

      {/* Start button when idle */}
      {gamePhase === "idle" && !loading && (
        <View style={styles.startContainer}>
          <TouchableOpacity style={styles.startButton} onPress={startQuiz}>
            <Text style={styles.startButtonText}>Commencer le quiz</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Question overlay */}
      {gamePhase !== "idle" && gamePhase !== "result" && targetCountry && (
        <QuestionOverlay
          countryName={targetCountry.name}
          currentRound={currentRound}
          totalRounds={totalRounds}
        />
      )}

      {/* Bottom sheet for confirmation and feedback */}
      <QuestionBottomSheet
        gamePhase={gamePhase}
        selectedCountryName={selectedCountry?.name}
        isCorrect={isCorrect || false}
        correctCountryName={targetCountry?.name}
        onValidate={validateAnswer}
        onNext={nextRound}
        onCancel={cancelSelection}
      />
    </View>
  );

  // <LinearGradient
  //   colors={colors.gradients.background}
  //   style={homeStyles.container}
  // >
  //   <SafeAreaView style={homeStyles.safeArea}>
  //     <GestureDetector gesture={composedGestures}>
  //       <Animated.View style={{ flex: 1 }}>
  //         <Canvas
  //           camera={{
  //             fov: GLOBE_CONFIG.CAMERA.FOV,
  //             near: GLOBE_CONFIG.CAMERA.NEAR,
  //             far: GLOBE_CONFIG.CAMERA.FAR,
  //             position: GLOBE_CONFIG.CAMERA.POSITION,
  //           }}
  //         >
  //           <GlobeScene
  //             rotationX={rotationX}
  //             rotationY={rotationY}
  //             scale={scale}
  //           />
  //         </Canvas>
  //       </Animated.View>
  //     </GestureDetector>
  //   </SafeAreaView>
  // </LinearGradient>
  // );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  startContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
