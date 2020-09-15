import React, {
  createContext,
  useEffect,
  useCallback,
  useReducer,
} from "react";
import { useRouter } from "next/router";
import { addList, getWishlistsForUser } from "utils/firebase";

export const WishlistsContext = createContext([]);
const LOADING = "LOADING";
const ERROR = "ERROR";
const GET_WISHLISTS = "GET_WISHLISTS";
const ADD_WISHLIST = "ADD_WISHLIST";
const REMOVE_WISHLIST = "REMOVE_WISHLIST";
const ADD_WISHLIST_ITEM = "REMOVE_WISHLIST_ITEM";

const initialState = {
  loading: true,
  wishlists: [],
  error: null,
};

export const WishlistsProvider = ({ children }) => {
  const router = useRouter();
  const { uid } = router.query;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (uid) {
      dispatch({ type: LOADING });
      getWishlistsForUser(uid)
        .then((wishlists) => {
          dispatch({ type: GET_WISHLISTS, payload: { wishlists } });
        })
        .catch((error) => dispatch({ type: ERROR, payload: { error } }));
    }
  }, [uid]);

  const addWishlist = useCallback(
    (name, uid) => {
      if (name && uid) {
        dispatch({ type: LOADING });
        addList(uid, name)
          .then((docRef) => {
            getWishlistsForUser(uid)
              .then((wishlists) => {
                dispatch({ type: GET_WISHLISTS, payload: { wishlists } });
              })
              .catch((error) => dispatch({ type: ERROR, payload: { error } }));
          })
          .catch((error) => dispatch({ type: ERROR, payload: { error } }));
      }
    },
    [dispatch]
  );

  return (
    <WishlistsContext.Provider value={{ state, addWishlist }}>
      {children}
    </WishlistsContext.Provider>
  );
};

const reducer = (state = [], action) => {
  if (action.type === GET_WISHLISTS) {
    return {
      loading: false,
      wishlists: action.payload.wishlists,
      error: null,
    };
  }
  if (action.type === ADD_WISHLIST) {
    return {
      loading: false,
      wishlists: action.payload.wishlists,
      error: null,
    };
  }
  if (action.type === LOADING) {
    return {
      loading: true,
      wishlists: [],
      error: null,
    };
  }
  if (action.type === LOADING) {
    return {
      loading: false,
      wishlists: [],
      error: action.payload.error,
    };
  }
  return state;
};
