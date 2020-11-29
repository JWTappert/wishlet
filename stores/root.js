import UiState from "./UI";

class RootState {
  constructor() {
    this.UI = new UiState();
  }

  stores() {
    return {
      UI: this.UI,
    }
  }
}

const rootInstance = new RootState();

export default rootInstance;