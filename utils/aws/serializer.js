import omit from "lodash/omit";

const serialize = (user) => {
  // take all fields and map them over except wishlists
  const profile = omit(user, ['wishlists']);
  // turn wishlists into a hash
  const wishlists = {};
  user.wishlists.items.forEach(wishlist => {
    const items = wishlist.items?.items || [];
    const itemsHash = {};
    items.forEach(item => {
      itemsHash[item.id] = {
        ...item,
      }
    });
    wishlists[wishlist.id] = {
      ...omit(wishlist, ['items']),
      items: itemsHash,
    }
  });
  return {
    profile,
    wishlists
  }
};

export {
  serialize
}