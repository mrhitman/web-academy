import Api from './api';
import { observable, configure, action } from 'mobx';
import { remove } from 'lodash';

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

  @action.bound
  public addTown(town: Town) {
    this.towns.push(town);
  }

  @action.bound
  public removeTown(name: string) {
    this.towns = remove(this.towns, (town) => town.name !== name);
  }
}

export default Store;
