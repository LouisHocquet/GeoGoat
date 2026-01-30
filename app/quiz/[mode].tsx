import { createHomeStyles } from "@/assets/styles/home.styles";
import { QuestionBottomSheet } from "@/components/game/QuestionBottomSheet";
import { QuestionOverlay } from "@/components/game/QuestionOverlay";
import { QuitButton } from "@/components/game/QuitButton";
import QuizResult from "@/components/game/QuizResult";
import { GlobeScene } from "@/components/GlobeScene";
import { useCountryGeometries } from "@/hooks/useCountryGeometries";
import { useGameState } from "@/hooks/useGameState";
import { useGlobeGestures } from "@/hooks/useGlobeGestures";
import useTheme from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
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
  const gameState = useGameState(countries, 3);

  const {
    gamePhase,
    targetCountry,
    selectedCountry,
    isCorrect,
    score,
    currentRound,
    totalRounds,
    feedbackCountryId,
    selectCountry,
    validateAnswer,
    nextRound,
    backToMenu,
    cancelSelection,
    startQuiz,
  } = gameState;

  const router = useRouter();

  const handleBackToMenu = () => {
    backToMenu();
    router.back();
  };

  useEffect(() => {
    if (!loading && countries.length > 0) {
      startQuiz();
    }
  }, [loading, countries, startQuiz]);

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
            feedbackCountryId={feedbackCountryId}
            isCorrect={isCorrect}
          />
        </Animated.View>
      </GestureDetector>

      {/* Question overlay */}
      {gamePhase !== "idle" && gamePhase !== "result" && targetCountry && (
        <QuestionOverlay
          countryName={targetCountry.name}
          currentRound={currentRound}
          totalRounds={totalRounds}
        />
      )}

      {/* Quit button */}
      {(gamePhase === "question" ||
        gamePhase === "confirming" ||
        gamePhase === "feedback") && <QuitButton onQuit={handleBackToMenu} />}

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

      <QuizResult
        gamePhase={gamePhase}
        score={score}
        onBackMenu={handleBackToMenu}
      />
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
    left: 0,
    right: 0,
    bottom: 24,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
});
