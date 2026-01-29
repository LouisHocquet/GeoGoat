import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface QuestionOverlayProps {
  countryName: string;
  currentRound: number;
  totalRounds: number;
}

export function QuestionOverlay({
  countryName,
  currentRound,
  totalRounds,
}: QuestionOverlayProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.roundText}>
          {currentRound}/{totalRounds}
        </Text>
        <Text style={styles.questionText}>Trouve</Text>
        <Text style={styles.countryText}>{countryName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  content: {
    backgroundColor: "rgba(26, 35, 46, 0.95)",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  roundText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  questionText: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  countryText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
});
