import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { WeatherResponse } from './types';

export class Api {
  protected readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.openweathermap.org/data/2.5'
    });
  }

  public getByCityName(name: string, country?: string): AxiosPromise<WeatherResponse> {
    return this.client.get(`/weather?q=${name}${country ? `,${country}` : ''}&APPID=${process.env.REACT_APP_API_KEY}`);
  }

  public getByCityID(id: number) {
    return this.client.get(`/weather?id=${id}&APPID=${process.env.REACT_APP_API_KEY}`);
  }
}

export default Api;
