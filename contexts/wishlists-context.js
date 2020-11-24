import React, {createContext, useCallback, useEffect, useReducer,} from "react";
import useQueryParam from "hooks/use-query-param";

export const WishlistsContext = createContext([]);
const LOADING = "LOADING";
const ERROR = "ERROR";
const GET_WISHLISTS = "GET_WISHLISTS";
const ADD_WISHLIST = "ADD_WISHLIST";
const REMOVE_WISHLIST = "REMOVE_WISHLIST";
const LIST_SELECTED = "LIST_SELECTED";
const LIST_UPDATED = "LIST_UPDATED";
const ITEM_ADDED = "ITEM_ADDED";
const ITEM_REMOVED = "ITEM_REMOVED";

const initialState = {
  loading: true,
  wishlists: [],
  selectedWishlist: null,
  error: null,
};

export const WishlistsProvider = ({ children }) => {
  const uid = useQueryParam('uid');
  const [state, dispatch] = useReducer(reducer, initialState);

  /*
     list actions
  */
  useEffect(() => {
    if (uid) {
      dispatch({ type: LOADING });
      // getWishlists(uid);
    }
  }, [uid]);

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

  function selectWishlist(wishlist) {
    dispatch({ type: LIST_SELECTED, payload: { selectedWishlist: wishlist }})
  }

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

  const deleteWishlist = useCallback(async (wishlistId, uid) => {
    if (wishlistId) {
      dispatch({ type: LOADING });
      try {
        await deleteList(wishlistId);
        await getWishlists(uid);
      } catch(error) {
        dispatch({ type: ERROR, payload: { error }});
      }
    }
  }, [dispatch]);

  /*
     item actions
  */
  const addItem = useCallback(
    (wishlistId, itemToAdd) => {
      if (wishlistId && itemToAdd) {
        dispatch({ type: LOADING });
        addItemToWishlist(wishlistId, itemToAdd).then((wishlist) => {
          dispatch({ type: ITEM_ADDED, payload: { selectedWishlist: wishlist } });
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
          dispatch({ type: ITEM_REMOVED, payload: { itemId }});
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
    <WishlistsContext.Provider value={{ state, addWishlist, deleteWishlist, selectWishlist, addItem, removeItem }}>
      {children}
    </WishlistsContext.Provider>
  );
};

const reducer = (state = [], action) => {
  if (action.type === GET_WISHLISTS) {
    return {
      loading: false,
      wishlists: action.payload.wishlists,
      selectedWishlist: state.selectedWishlist || null,
      error: null,
    };
  }
  if (action.type === ADD_WISHLIST) {
    return {
      loading: false,
      wishlists: action.payload.wishlists,
      selectedWishlist: state.selectedWishlist || null,
      error: null,
    };
  }
  if (action.type === LIST_SELECTED) {
    return {
      loading: false,
      wishlists: state.wishlists,
      selectedWishlist: action.payload.selectedWishlist,
      error: null
    }
  }
  if (action.type === LIST_UPDATED) {
    return {
      loading: false,
      wishlists: state.wishlists || [],
      selectedWishlist: action.payload.selectedWishlist,
      error: null
    }
  }
  if (action.type === ITEM_ADDED) {
    return {
      loading: false,
      wishlists: state.wishlists || [],
      selectedWishlist: action.payload.selectedWishlist,
      error: null
    }
  }
  if (action.type === ITEM_REMOVED) {
    state.selectedWishlist.items = state.selectedWishlist.items.filter(item => item.id !== action.payload.itemId);
    return {
      loading: false,
      wishlists: state.wishlists || [],
      selectedWishlist: state.selectedWishlist,
      error: null
    }
  }
  if (action.type === LOADING) {
    return {
      loading: true,
      wishlists: state.wishlists || [],
      selectedWishlist: state.selectedWishlist || null,
      error: null,
    };
  }
  if (action.type === ERROR) {
    return {
      loading: false,
      wishlists: state.wishlists || [],
      selectedWishlist: state.selectedWishlist || null,
      error: action.payload.error,
    };
  }
  return state;
};
