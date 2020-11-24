import {makeAutoObservable, runInAction} from "mobx";

export default class UserState {
  transportLayer
  userId
  profile
  error
  loading = true;

  constructor(transportLayer, { username }) {
    this.userId = username;
    this.transportLayer = transportLayer;
    makeAutoObservable(this);
    this.fetchUser();
  }

  /*
    ACTIONS
  */
  fetchUser() {
    this.loading = true;
    this.transportLayer.getUser(this.userId).then(user => {
      runInAction(() => {
        this.profile = user;
        this.loading = false;
      });
    })
      .catch(error => {
        this.error = error;
        this.loading = false;
      });
  }

  updateUser(profile) {
    this.loading = true;
    this.transportLayer.updateUser(profile).then(user => {
      runInAction(() => {
        this.profile = user;
        this.loading = false;
      });
    })
      .catch(error => {
        this.error = error;
        this.loading = false;
      });
  }

  /*
    COMPUTED
  */
  get wishlists() {
    return this.profile?.wishlists.length || 0;
  }

  get items() {
    return 9;
  }

  get following() {
    return 0;
  }

  get followers() {
    return 0;
  }
}