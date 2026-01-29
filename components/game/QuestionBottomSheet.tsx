import { GamePhase } from "@/hooks/useGameState";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface QuestionBottomSheetProps {
  gamePhase: GamePhase;
  selectedCountryName?: string;
  isCorrect?: boolean;
  correctCountryName?: string;
  onValidate: () => void;
  onNext: () => void;
  onCancel?: () => void;
}

export function QuestionBottomSheet({
  gamePhase,
  selectedCountryName,
  isCorrect,
  correctCountryName,
  onValidate,
  onNext,
  onCancel,
}: QuestionBottomSheetProps) {
  if (
    gamePhase === "question" ||
    gamePhase === "idle" ||
    gamePhase === "result"
  ) {
    return null;
  }

  return (
    <View style={styles.container}>
      {gamePhase === "confirming" && (
        <View style={styles.content}>
          <Text style={styles.selectedText}>Pays sélectionné</Text>
          <Text style={styles.countryName}>{selectedCountryName}</Text>

          <View style={styles.buttonRow}>
            {onCancel && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onCancel}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.validateButton]}
              onPress={onValidate}
            >
              <Text style={styles.validateButtonText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {gamePhase === "feedback" && (
        <View style={styles.content}>
          <View
            style={[
              styles.feedbackHeader,
              isCorrect ? styles.correctHeader : styles.incorrectHeader,
            ]}
          >
            <Text style={styles.feedbackEmoji}>{isCorrect ? "✅" : "❌"}</Text>
            <Text style={styles.feedbackTitle}>
              {isCorrect ? "Bravo !" : "Raté !"}
            </Text>
          </View>

          {!isCorrect && correctCountryName && (
            <View style={styles.correctAnswerContainer}>
              <Text style={styles.correctAnswerLabel}>
                La bonne réponse était :
              </Text>
              <Text style={styles.correctAnswerText}>{correctCountryName}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={onNext}
          >
            <Text style={styles.nextButtonText}>Continuer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

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
  selectedText: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
    marginBottom: 8,
    textAlign: "center",
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
  cancelButton: {
    backgroundColor: "#F1F5F9",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
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
  correctHeader: {
    backgroundColor: "#DCFCE7",
  },
  incorrectHeader: {
    backgroundColor: "#FEE2E2",
  },
  feedbackEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  feedbackTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
  },
  correctAnswerContainer: {
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  correctAnswerLabel: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },
  correctAnswerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
  },
  nextButton: {
    backgroundColor: "#1E293B",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
