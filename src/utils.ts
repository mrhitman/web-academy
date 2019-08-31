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
