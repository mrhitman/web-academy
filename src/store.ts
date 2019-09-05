import { pick, remove } from "lodash";
import { action, autorun, configure, observable } from "mobx";
import Api from "./api";
import { defaultTowns } from "./utils";

export type Units = "C" | "F";

export class Store {
  @observable public units: Units = "C";
  @observable public towns: Array<number> = [];

  constructor(protected readonly _api: Api) {
    configure({ enforceActions: "always" });

    this.load();
    this.save();
  }

  @action.bound
  protected load() {
    const json = localStorage.getItem("@weatherapp");
    if (json) {
      const data = JSON.parse(json);
      this.towns = data.towns;
      this.units = data.units;
    } else {
      this.towns = defaultTowns;
    }
  }

  protected save() {
    autorun(() => {
      const json = JSON.stringify(pick(this, ["towns", "units"]));
      localStorage.setItem("@weatherapp", json);
    });
  }

  public get api() {
    return this._api;
  }

  @action.bound
  public toggleUnits() {
    this.units = this.units === "C" ? "F" : "C";
  }

  @action.bound
  public addTown(id: number) {
    this.towns.push(id);
  }

  @action.bound
  public removeTown(id: number) {
    this.towns = remove(this.towns, townId => id !== townId);
  }
}

export default Store;
