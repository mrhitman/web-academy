import { remove } from 'lodash';
import { action, configure, observable } from 'mobx';
import Api from './api';

export type Units = 'C' | 'F';

export class Store {
  @observable public units: Units = 'C';
  @observable public towns: Array<number> = [ 706483, 703448, 524901, 5128581, 4398103, 1851632, 2950159, 304782 ];

  constructor(protected readonly _api: Api) {
    configure({ enforceActions: 'always' });
  }

  public get api() {
    return this._api;
  }

  @action.bound
  public toggleUnits() {
    this.units = this.units === 'C' ? 'F' : 'C';
  }

  @action.bound
  public addTown(id: number) {
    this.towns.push(id);
  }

  @action.bound
  public removeTown(id: number) {
    this.towns = remove(this.towns, (townId) => id !== townId);
  }
}

export default Store;
