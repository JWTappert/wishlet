import React, {
  createContext,
  useEffect,
  useCallback,
  useReducer,
} from "react";
import { useRouter } from "next/router";
import { addList, getWishlistsForUser } from "utils/firebase/firestore";

export const WishlistsContext = createContext([]);
const LOADING = "LOADING";
const ERROR = "ERROR";
const GET_WISHLISTS = "GET_WISHLISTS";
const ADD_WISHLIST = "ADD_WISHLIST";
const REMOVE_WISHLIST = "REMOVE_WISHLIST";

const initialState = {
  loading: true,
  wishlists: [],
  error: null,
};

export const WishlistsProvider = ({ children }) => {
  const router = useRouter();
  const { uid } = router.query;
  const [state, dispatch] = useReducer(reducer, initialState);

  async function getWishlists(uid) {
    if (!uid) {
      dispatch({ type: ERROR, payload: { error: { message: 'Please provide a user id' } } })
    } else {
      dispatch({ type: LOADING });
      try {
        const wishlists = await getWishlistsForUser(uid);
        dispatch({ type: GET_WISHLISTS, payload: { wishlists }});
      } catch(error) {
        dispatch({ type: ERROR, payload: { error }});
      }
    }
  }

  useEffect(() => {
    if (uid) {
      dispatch({ type: LOADING });
      getWishlists(uid);
    }
  }, [uid]);

  const addWishlist = useCallback(
    async (name, uid) => {
      if (name && uid) {
        dispatch({ type: LOADING });
        try {
          await addList(uid, name)
          await getWishlists(uid);
        } catch(error) {
          dispatch({ type: ERROR, payload: { error } });
        }
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
  if (action.type === ERROR) {
    return {
      loading: false,
      wishlists: [],
      error: action.payload.error,
    };
  }
  return state;
};
