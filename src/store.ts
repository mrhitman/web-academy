import Api from './api';
import { observable, configure } from 'mobx';

export type Units = 'C' | 'F';
export interface Town {
  name: string;
  country?: string;
}

export class Store {
  @observable public units: Units = 'C';
  @observable
  public towns: Array<Town> = [
    { name: 'Kharkiv' },
    { name: 'Kiev' },
    { name: 'Moscow' },
    { name: 'New York' },
    { name: 'Mexico' },
    { name: 'Tokio', country: 'JP' },
    { name: 'Berlin' }
  ];

  constructor(protected readonly _api: Api) {
    configure({ enforceActions: 'always' });
  }

  public get api() {
    return this._api;
  }
}

export default Store;
