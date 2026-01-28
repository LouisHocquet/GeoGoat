import { COUNTRIES } from "@/data/countries";
import { Country } from "@/types/country";
import { GameState } from "@/types/game";
import { useCallback, useState } from "react";

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: "idle",
    targetCountry: null,
    selectedCountry: null,
    score: 0,
    round: 0,
  });

  // Démarre une nouvelle manche
  const startRound = useCallback(() => {
    // Choisit un pays aléatoire
    const randomCountry =
      COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];

    setGameState((prev) => ({
      ...prev,
      status: "playing",
      targetCountry: randomCountry,
      selectedCountry: null,
      round: prev.round + 1,
    }));
  }, []);

  // L'utilisateur sélectionne un pays
  const selectCountry = useCallback((country: Country) => {
    setGameState((prev) => ({
      ...prev,
      status: "awaiting_confirmation",
      selectedCountry: country,
    }));
  }, []);

  // L'utilisateur confirme son choix
  const confirmSelection = useCallback(() => {
    setGameState((prev) => {
      if (!prev.targetCountry || !prev.selectedCountry) return prev;

      const isCorrect = prev.targetCountry.id === prev.selectedCountry.id;

      return {
        ...prev,
        status: isCorrect ? "correct" : "incorrect",
        score: isCorrect ? prev.score + 1 : prev.score,
      };
    });
  }, []);

  // Passe à la manche suivante
  const nextRound = useCallback(() => {
    startRound();
  }, [startRound]);

  // Reset le jeu
  const resetGame = useCallback(() => {
    setGameState({
      status: "idle",
      targetCountry: null,
      selectedCountry: null,
      score: 0,
      round: 0,
    });
  }, []);

  return {
    gameState,
    startRound,
    selectCountry,
    confirmSelection,
    nextRound,
    resetGame,
  };
};
