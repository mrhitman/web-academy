import Api from "./api";
import { observable } from "mobx";

export class Store {
  @observable protected towns: any = [];
  constructor(protected readonly _api: Api) {}

  public get api() {
    return this._api;
  }
}

export default Store;
