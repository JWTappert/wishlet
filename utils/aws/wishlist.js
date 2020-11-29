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

async function deleteWishlist() {
  try {

  } catch(error) {

  }
}

async function getItem() {
  try {

  } catch(error) {

  }
}

async function createItem() {
  try {

  } catch(error) {

  }
}

async function updateItem() {
  try {

  } catch(error) {

  }
}

async function deleteItem() {
  try {

  } catch(error) {

  }
}

export {
  getWishlists,
  createWishlist,
  updateWishlist,
  deleteWishlist,
  getItem,
  createItem,
  updateItem,
  deleteItem,
}