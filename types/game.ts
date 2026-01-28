import { Country } from "./country";

export type GameStatus =
  | "idle"
  | "playing"
  | "awaiting_confirmation"
  | "correct"
  | "incorrect";

export type GameState = {
  status: GameStatus;
  targetCountry: Country | null;
  selectedCountry: Country | null;
  score: number;
  round: number;
};

export type CountryOverlayState =
  | "hidden"
  | "preview"
  | "correct"
  | "incorrect";
