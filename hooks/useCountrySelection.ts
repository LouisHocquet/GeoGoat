import { useCallback } from "react";
import { CountryGeometry } from "./useCountryGeometries";

interface UseCountrySelectionProps {
  onCountrySelect?: (country: CountryGeometry) => void;
  selectedCountryId?: string | null;
  disabled?: boolean;
}

/**
 * Hook to handle country selection logic
 * Provides handlers and state for CountryMeshes component
 */
export function useCountrySelection({
  onCountrySelect,
  selectedCountryId,
  disabled = false,
}: UseCountrySelectionProps) {
  const handleCountryClick = useCallback(
    (countryId: string, countryName: string) => {
      if (disabled) return;

      // Create a minimal CountryGeometry object for the callback
      const country: CountryGeometry = {
        id: countryId,
        name: countryName,
        coordinates: [], // Not needed for game logic
        type: "Polygon",
      };

      onCountrySelect?.(country);
    },
    [disabled, onCountrySelect],
  );

  const isCountrySelected = useCallback(
    (countryId: string): boolean => {
      return countryId === selectedCountryId;
    },
    [selectedCountryId],
  );

  return {
    handleCountryClick,
    isCountrySelected,
  };
}
