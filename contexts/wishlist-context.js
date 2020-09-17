import React, {
  createContext,
  useEffect,
  useCallback,
  useReducer,
} from "react";
import useQueryParam from "hooks/use-query-param";

export const WishlistContext = createContext([]);
const LOADING = "LOADING";
const ERROR = "ERROR";
const GET_WISHLIST = "GET_WISHLIST";
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";

const initialState = {
  loading: true,
  wishlist: {},
  error: null,
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItemToWishlist = useCallback(
    (wishlistId, itemToAdd) => {
      if (wishlistId && itemToAdd) {
        dispatch({ type: LOADING });
        addItemToWishlist(wishlistId, itemToAdd)
          .then((docRef) => {
            dispatch({ type: GET_WISHLIST });
          })
          .catch((error) => dispatch({ type: ERROR, payload: { error } }));
      }
    },
    [dispatch]
  );

  return (
    <WishlistContext.Provider value={{ state, addItemToWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

const reducer = (state = {}, action) => {
  if (action.type === GET_WISHLIST) {
    return {
      loading: false,
      wishlist: action.payload.wishlist,
      error: null,
    };
  }
  if (action.type === ADD_ITEM) {
    return {
      loading: false,
      wishlist: action.payload.wishlist,
      error: null,
    };
  }
  if (action.type === LOADING) {
    return {
      loading: true,
      wishlists: {},
      error: null,
    };
  }
  if (action.type === ERROR) {
    return {
      loading: false,
      wishlists: {},
      error: action.payload.error,
    };
  }
  return state;
};
