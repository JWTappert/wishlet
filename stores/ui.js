import {makeAutoObservable} from "mobx";

export default class UiState {
  language = "en_US";
  theme = "dark";

  constructor() {
    makeAutoObservable(this);
  }

  get language() {
    return this.language;
  }

  get theme() {
    return this.theme;
  }
}