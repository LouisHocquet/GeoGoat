import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface QuitButtonProps {
  onQuit: () => void;
}

export function QuitButton({ onQuit }: QuitButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onQuit}>
      <Text style={styles.buttonText}>✕</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 60,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(26, 35, 46, 0.95)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
  },
});
