export interface WeatherResponse {
  id: number;
  name: string;
  cod: number;
  dt: number;
  timezone: number;
  visibility: number;
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    sea_level: number;
    grnd_level: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  rain: { [id: string]: number };
  clouds: {
    all: number;
  };
  sys: {
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
}
