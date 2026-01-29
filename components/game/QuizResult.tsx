import { GamePhase } from "@/hooks/useGameState";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface GameResultProps {
  gamePhase: GamePhase;
  score: number;
  onBackMenu: () => void;
}

const QuizResult = ({ gamePhase, score, onBackMenu }: GameResultProps) => {
  return (
    <View style={styles.container} pointerEvents="box-none">
      {gamePhase === "result" && (
        <View style={styles.content}>
          <Text
            style={styles.countryName}
          >{`Well done you scored ${score}!`}</Text>
          <View>
            <TouchableOpacity
              style={[styles.button, styles.validateButton]}
              onPress={onBackMenu}
            >
              <Text style={styles.validateButtonText}>Back to Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default QuizResult;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
  },
  countryName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 24,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  validateButton: {
    backgroundColor: "#4A90E2",
  },
  validateButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  feedbackHeader: {
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
});
