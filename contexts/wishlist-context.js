import React, {
  createContext,
  useCallback,
  useReducer,
} from "react";
import {addItemToWishlist, removeItemFromWishlist } from "utils/firebase";

export const WishlistContext = createContext([]);
const LOADING = "LOADING";
const ERROR = "ERROR";
const ITEM_ADDED = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";

const initialState = {
  loading: null,
  error: null,
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = useCallback(
    (wishlistId, itemToAdd) => {
      if (wishlistId && itemToAdd) {
        dispatch({ type: LOADING });
        addItemToWishlist(wishlistId, itemToAdd).then(() => {
          dispatch({ type: ITEM_ADDED });
        }).catch(error => {
          dispatch({ type: ERROR, payload: { error }})
        });
      } else {
        dispatch({ type: ERROR, payload: { error: "You must provide a wishlist id and an item to add" }});
      }
    },
    [dispatch]
  );

  const removeItem = useCallback(
    (wishlistId, itemId) => {
      if (wishlistId && itemId) {
        dispatch({ type: LOADING });
        removeItemFromWishlist(wishlistId, itemId).then(() => {
          dispatch({ type: ITEM_ADDED });
        }).catch(error => {
          dispatch({ type: ERROR, payload: { error }})
        });
      } else {
        dispatch({ type: ERROR })
      }
    },
    [dispatch]
  );

  return (
    <WishlistContext.Provider value={{ state, addItem }}>
      {children}
    </WishlistContext.Provider>
  );
};

const reducer = (state = {}, action) => {
  if (action.type === ITEM_ADDED) {
    return {
      loading: false,
      error: null,
    };
  }
  if (action.type === REMOVE_ITEM) {
    return {
      loading: false,
      error: null,
    }
  }
  if (action.type === LOADING) {
    return {
      loading: true,
      error: null,
    };
  }
  if (action.type === ERROR) {
    return {
      loading: false,
      error: action.payload.error,
    };
  }
  return state;
};
