interface Coordinates {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Wind {
  speed: number;
  deg: number;
}

export interface WeatherResponse {
  id: number;
  name: string;
  cod: number;
  dt: number;
  timezone: number;
  visibility: number;
  coord: Coordinates;
  weather: Array<Weather>;
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
  wind: Wind;
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

export interface ForecastWeather {
  clouds: { all: number };
  dt: number;
  dt_txt: string;
  main: {
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  sys: { pod: string };
  weather: Array<Weather>;
  wind: Wind;
}

export interface ForecastResponse {
  city: {
    coord: Coordinates;
    country: string;
    id: number;
    name: string;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  cnt: number;
  cod: string;
  list: Array<ForecastWeather>;
  message: number;
}
