import {makeAutoObservable, runInAction, toJS} from "mobx";
import {serialize} from "../utils/aws/serializer";

export default class UserState {
  transportLayer
  userId
  User
  profile
  wishlists
  selectedList = null;
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
      this.User = serialize(user);
      runInAction(() => {
        this.profile = this.User.profile;
        this.wishlists = this.User.wishlists;
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
      const serializedUser = serialize(user);
      runInAction(() => {
        this.profile = serializedUser.profile;
        this.loading = false;
      });
    })
      .catch(error => {
        this.error = error;
        this.loading = false;
      });
  }

  createWishlist(name) {
    this.loading = true;
    this.transportLayer.createWishlist(this.userId, name).then(list => {
      runInAction(() => {
        this.wishlists[list.id] = {...list};
        this.loading = false;
      });
    })
  }

  deleteWishlist(wishlistId) {
    this.loading = true;
    this.transportLayer.deleteWishlist(wishlistId).then(list => {
      delete this.wishlists[wishlistId];
      this.loading = false;
    });
  }

  setSelectedWishlist(list) {
    this.selectedList = list;
  }

  addItemToWishlist(wishlistId, name, link) {
    this.loading = true;
    this.transportLayer.createItem(wishlistId, name, link).then(item => {
      runInAction(() => {
        this.wishlists[wishlistId].items[item.id] = {...item};
        this.loading = false;
      });
    });
  }

  removeItemFromWishlist(itemId) {
    this.loading = true;
    this.transportLayer.deleteItem(itemId).then(() => {
      runInAction(() => {
        this.fetchUser();
        delete this.wishlists[this.selectedList.id].items[itemId];
        this.loading = false;
      });
    });
  }

  /*
    COMPUTED
  */
  get wishlistCount() {
    return this.wishlists.length || 0;
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
