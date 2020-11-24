import UserState from "./User";
import UiState from "./UI";

class RootState {
  constructor() {
    this.User = new UserState();
    this.UI = new UiState();
  }

  stores() {
    return {
      User: this.User,
      UI: this.UI,
    }
  }
}

const rootInstance = new RootState();

export default rootInstance;