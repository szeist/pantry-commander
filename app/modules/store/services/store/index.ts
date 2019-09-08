import * as ApplicationSettings from "tns-core-modules/application-settings";

export class Store {
  private _key: string;

  constructor(key: string) {
    this._key = key;
  }

  getStore() : object {
    const json_store: string = ApplicationSettings.getString(this._key);
    if (json_store) {
      return JSON.parse(json_store);
    }
  }

  setStore(data: object) {
    ApplicationSettings.setString(this._key, JSON.stringify(data));
  }
}