import axios, { AxiosInstance, AxiosPromise } from "axios";
import {
  FindResponse,
  ForecastResponse,
  WeatherResponse,
  Coordinates
} from "./types";
import Unsplash from "unsplash-client";

export class Api {
  protected readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://api.openweathermap.org/data/2.5"
    });
  }

  public getByCityName(
    name: string,
    country?: string
  ): AxiosPromise<WeatherResponse> {
    return this.client.get(
      `/weather?q=${name}${country ? `,${country}` : ""}&APPID=${
        process.env.REACT_APP_API_KEY
      }&lang=ru`
    );
  }

  public getByCityID(id: number): AxiosPromise<WeatherResponse> {
    return this.client.get(
      `/weather?id=${id}&appid=${process.env.REACT_APP_API_KEY}&lang=ru`
    );
  }

  public getByGeoCoords(coords: Coordinates) {
    return this.client.get(
      `/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.REACT_APP_API_KEY}&lang=ru`
    );
  }

  public getForecastByCityId(id: number): AxiosPromise<ForecastResponse> {
    return this.client.get(
      `/forecast/?appid=${process.env.REACT_APP_API_KEY}&id=${id}&lang=ru`
    );
  }

  public getDailyForecastByCityId(id: number) {
    return this.client.get(
      `/forecast/daily/?appid=${process.env.REACT_APP_API_KEY}&id=${id}&lang=ru`
    );
  }

  public findTown(name: string): AxiosPromise<FindResponse> {
    return this.client.get(
      `/find?q=${name}&type=like&sort=population&appid=${process.env.REACT_APP_API_KEY}`
    );
  }

  public findImages(query: string) {
    const client = new Unsplash(process.env.REACT_APP_UNSPLASH_KEY!);
    return client.search(query);
  }
}

export default Api;
