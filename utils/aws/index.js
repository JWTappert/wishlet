import * as User from "./user";
import * as Wishlists from "./wishlist";
import * as Events from "./event";

const API = {
  ...User,
  ...Wishlists,
  ...Events,
}

export default API;
