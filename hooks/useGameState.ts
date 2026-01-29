import { useCallback, useState } from "react";
import { CountryGeometry } from "./useCountryGeometries";

export type GamePhase =
  | "idle"
  | "question"
  | "confirming"
  | "feedback"
  | "result";

interface GameState {
  gamePhase: GamePhase;
  targetCountry: CountryGeometry | null;
  selectedCountry: CountryGeometry | null;
  isCorrect: boolean | null;
  score: number;
  totalRounds: number;
  currentRound: number;
  quizCountries: CountryGeometry[];
  feedbackCountryId: string | null;
}

export function useGameState(
  countries: CountryGeometry[],
  roundsPerGame: number = 5,
) {
  const [state, setState] = useState<GameState>({
    gamePhase: "idle",
    targetCountry: null,
    selectedCountry: null,
    isCorrect: null,
    score: 0,
    totalRounds: roundsPerGame,
    currentRound: 0,
    quizCountries: [],
    feedbackCountryId: null,
  });

  // Start a new quiz
  const startQuiz = useCallback(() => {
    if (countries.length === 0) return;

    // Shuffle and pick countries for this quiz
    const shuffled = [...countries].sort(() => Math.random() - 0.5);
    const quizCountries = shuffled.slice(
      0,
      Math.min(roundsPerGame, countries.length),
    );

    // const randomCountry =
    //   countries[Math.floor(Math.random() * countries.length)];

    setState({
      gamePhase: "question",
      targetCountry: quizCountries[0],
      selectedCountry: null,
      isCorrect: null,
      score: 0,
      totalRounds: roundsPerGame,
      currentRound: 1,
      quizCountries: quizCountries,
      feedbackCountryId: null,
    });
  }, [countries, roundsPerGame]);

  // User selects a country (taps on globe)
  const selectCountry = useCallback((country: CountryGeometry) => {
    setState((prev) => ({
      ...prev,
      gamePhase: "confirming",
      selectedCountry: country,
      feedbackCountryId: null,
    }));
  }, []);

  // User confirms their answer
  const validateAnswer = useCallback(() => {
    setState((prev) => {
      if (!prev.selectedCountry || !prev.targetCountry) return prev;

      const correct = prev.selectedCountry.id === prev.targetCountry.id;

      return {
        ...prev,
        gamePhase: "feedback",
        isCorrect: correct,
        score: correct ? prev.score + 1 : prev.score,
        feedbackCountryId: prev.selectedCountry.id, // Show feedback on selected country
      };
    });
  }, []);

  // Move to next round or show results
  const nextRound = useCallback(() => {
    setState((prev) => {
      const isLastRound = prev.currentRound >= prev.totalRounds;

      if (isLastRound) {
        return {
          ...prev,
          gamePhase: "result",
          feedbackCountryId: null,
          selectedCountry: null,
          isCorrect: null,
        };
      }

      // Get next country from quiz list
      const nextCountry = prev.quizCountries[prev.currentRound];

      return {
        ...prev,
        gamePhase: "question",
        targetCountry: nextCountry,
        selectedCountry: null,
        isCorrect: null,
        currentRound: prev.currentRound + 1,
        feedbackCountryId: null,
      };
    });
  }, []);

  // Return to idle/menu
  const backToMenu = useCallback(() => {
    setState({
      gamePhase: "idle",
      targetCountry: null,
      selectedCountry: null,
      isCorrect: null,
      score: 0,
      totalRounds: roundsPerGame,
      currentRound: 0,
      quizCountries: [],
      feedbackCountryId: null,
    });
  }, [roundsPerGame]);

  // Cancel selection (user wants to pick another country)
  const cancelSelection = useCallback(() => {
    setState((prev) => ({
      ...prev,
      gamePhase: "question",
      selectedCountry: null,
    }));
  }, []);

  return {
    ...state,
    startQuiz,
    selectCountry,
    validateAnswer,
    nextRound,
    backToMenu,
    cancelSelection,
  };
}
