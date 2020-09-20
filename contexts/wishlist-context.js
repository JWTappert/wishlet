import React, {
  createContext,
  useCallback,
  useReducer,
  useEffect,
  useState
} from "react";
import {addItemToWishlist, listenToWishlistChanges, removeItemFromWishlist} from "utils/firebase/firestore";

export const WishlistContext = createContext([]);
const LOADING = "LOADING";
const ERROR = "ERROR";
const ITEM_ADDED = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE = "UPDATE";

const initialState = {
  wishlist: {},
  loading: null,
  error: null,
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [wishlistId, setWishlistId] = useState(null);

  useEffect(() => {
    let unsubscribe = () => {};
    if (wishlistId) {
      unsubscribe = listenToWishlistChanges(wishlistId, onNext, onError)
    }
    return () => {
      unsubscribe();
    }
  }, [wishlistId]);

  const getWishlist = useCallback((id) => {
    setWishlistId(id);
  }, []);

  const onNext = useCallback((wishlist) => {
    dispatch({ type: UPDATE, payload: { wishlist }});
  }, [dispatch]);

  const onError = useCallback((error) => {
    dispatch({ type: ERROR, payload: { error }});
  }, [dispatch]);

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
    <WishlistContext.Provider value={{ state, getWishlist, addItem }}>
      {children}
    </WishlistContext.Provider>
  );
};

const reducer = (state = {}, action) => {
  if (action.type === UPDATE) {
    return {
      wishlist: action.payload.wishlist,
      loading: false,
      error: null,
    };
  }
  if (action.type === ITEM_ADDED) {
    return {
      wishlist: null,
      loading: false,
      error: null,
    };
  }
  if (action.type === REMOVE_ITEM) {
    return {
      wishlist: null,
      loading: false,
      error: null,
    }
  }
  if (action.type === LOADING) {
    return {
      wishlist: {},
      loading: true,
      error: null,
    };
  }
  if (action.type === ERROR) {
    return {
      wishlist: {},
      loading: false,
      error: action.payload.error,
    };
  }
  return state;
};
