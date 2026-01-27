export type Country = {
  id: string;
  name: string;
  capital: string;
  lat: number;
  lon: number;
};

export type CountryDetectionResult = {
  country: Country | null;
  distance: number; // Distance du tap au pays (pour debug)
};
