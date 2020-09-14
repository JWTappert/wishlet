import React, {
  createContext,
  useEffect,
  useCallback,
  useReducer,
} from "react";
import { useRouter } from "next/router";
import firebase from "utils/firebase";

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
      firebase
        .firestore()
        .collection("wishlists")
        .where("uid", "==", uid)
        .get()
        .then((querySnapshot) => {
          const wishlists = [];
          querySnapshot.forEach((doc) => wishlists.push({ ...doc.data() }));
          dispatch({ type: GET_WISHLISTS, payload: { wishlists } });
        })
        .catch((error) => dispatch({ type: ERROR, payload: { error } }));
    }
  }, [uid]);

  const addWishlist = useCallback(
    (name, uid) => {
      if (name && uid) {
        dispatch({ type: LOADING });
        const newList = { uid, name, items: [] };
        const wishlists = [];
        firebase
          .firestore()
          .collection("wishlists")
          .add(newList)
          .then((docRef) => {
            firebase
              .firestore()
              .collection("wishlists")
              .where("uid", "==", uid)
              .get()
              .then((snapshot) => {
                snapshot.forEach((doc) => wishlists.push({ ...doc.data() }));
                dispatch({
                  type: ADD_WISHLIST,
                  payload: { wishlists: wishlists },
                });
              });
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
