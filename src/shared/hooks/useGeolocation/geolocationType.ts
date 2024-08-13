export type Geolocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

export type GeolocationState = {
  geolocation: Geolocation | null;
  error: string | null;
};
