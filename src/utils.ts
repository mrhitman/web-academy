import { round } from 'lodash';
import { Units } from './store';

export function KelvinToCelcius(value: number) {
  return value - 273.15;
}

export function KelvinToFahrenheit(value: number) {
  return (value - 273.15) * 9 / 5 + 32;
}

export function convertTemperature(amount: number, toUnit: Units) {
  return round(toUnit === 'C' ? KelvinToCelcius(amount) : KelvinToFahrenheit(amount), 1);
}

export const windSpeed = [
  { speed: 1, name: 'Штиль' },
  { speed: 5, name: 'Тихий' },
  { speed: 11, name: 'Легкий' },
  { speed: 19, name: 'Слабый' },
  { speed: 28, name: 'Умеренный' },
  { speed: 38, name: 'Свежий' },
  { speed: 49, name: 'Сильный' },
  { speed: 61, name: 'Крепкий' },
  { speed: 74, name: 'Очень крепкий' },
  { speed: 88, name: 'Шторм' },
  { speed: 102, name: 'Сильный шторм' },
  { speed: 117, name: 'Жестокий шторм' },
  { speed: 300, name: 'Ураган' }
];

export const windRoses = [
  { name: 'C', angle: 22.3 },
  { name: 'ССВ', angle: 45 },
  { name: 'СВ', angle: 67.3 },
  { name: 'ВВС', angle: 90 },
  { name: 'В', angle: 112.3 },
  { name: 'ВЮВ', angle: 135 },
  { name: 'ЮВ', angle: 157.3 },
  { name: 'ЮЮВ', angle: 180 },
  { name: 'Ю', angle: 202.3 },
  { name: 'ЮЮЗ', angle: 225 },
  { name: 'ЮЗ', angle: 247.3 },
  { name: 'ЗЮЗ', angle: 270 },
  { name: 'З', angle: 292.3 },
  { name: 'ЗСЗ', angle: 315 },
  { name: 'СЗ', angle: 337.3 },
  { name: 'ССЗ', angle: 360 }
];
