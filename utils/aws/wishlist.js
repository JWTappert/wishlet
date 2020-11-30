import {API} from "aws-amplify";
import * as queries from "graphql/queries";
import * as mutations from "graphql/mutations"

async function getWishlist(wishlistId) {
  try {
    const response = await API.graphql({query: queries.getWishlist, variables: {input: wishlistId }})
    return response.data.wishlists;
  } catch(error) {
    console.error(error);
  }
}

async function getWishlists(userId) {
  try {
    const response = await API.graphql({query: queries.listWishlists, variables: {input: userId }})
    return response.data.wishlists;
  } catch(error) {
    console.error(error);
  }
}

async function createWishlist(userID, name) {
  try {
    const response = await API.graphql({query: mutations.createWishlist, variables: {input: { name, userID } }})
    return response.data.createWishlist;
  } catch(error) {
    console.error(error);
  }
}

async function updateWishlist() {
  try {

  } catch(error) {

  }
}

async function deleteWishlist(wishlistID) {
  try {
    const response = await API.graphql({ query: mutations.deleteWishlist, variables: { input: { id: wishlistID}}});
    console.log('result', response.data);
    return response.data.deleteWishlist;
  } catch(error) {
    console.error(error);
  }
}

async function getItem() {
  try {

  } catch(error) {

  }
}

async function listItems(wishlistID) {
  try {
    const response = await API.graphql({query: queries.listItems, variables: {filter: { wishlistID }}});
    return response.data.listItems.items;
  } catch(error) {
    console.error(error);
  }
}

async function createItem(wishlistID, name, link) {
  try {
    const response = await API.graphql({query: mutations.createItem, variables: {input: { wishlistID, name, link } }})
    return response.data.createItem;
  } catch(error) {
    console.error(error);
  }
}

async function updateItem() {
  try {

  } catch(error) {

  }
}

async function deleteItem(itemID) {
  try {
    const response = await API.graphql({query: mutations.deleteItem, variables: {input: { id: itemID } }})
    return response.data.deleteItem;
  } catch(error) {
    console.error(error);
  }
}

export {
  getWishlists,
  createWishlist,
  updateWishlist,
  deleteWishlist,
  getItem,
  listItems,
  createItem,
  updateItem,
  deleteItem,
}