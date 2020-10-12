import React, {createContext, useReducer, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "utils/firebase/auth";
import useQueryParam from "../hooks/use-query-param";

export const ProfileContext = createContext([]);

export const ProfileProvider = ({ children }) => {
  const uid = useQueryParam("uid");
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getProfile(uid);
  }, [uid]);

  const getProfile = async (uid) => {
    if (!uid) return;
    try {
      dispatch({ type: LOADING });
      const userProfileDocument = await getUserProfile(uid);
      dispatch({ type: GET, payload: { profile: userProfileDocument }});
      return userProfileDocument;
    } catch(error) {
      dispatch({ type: ERROR });
    }
  }

  const handleUpdateUserProfile = async (uid, updates) => {
    try {
      dispatch({ type: LOADING });
      await updateUserProfile(uid, updates);
      const userProfileDocument = await getProfile(uid);
      dispatch({ type: UPDATE, payload: { profile: userProfileDocument }});
    } catch(error) {
      dispatch({ type: ERROR, payload: { error }});
    }
  };

  const handleUploadProfilePhoto = () => {
    console.log('here');
  }

  return (
    <ProfileContext.Provider value={{
      state,
      handleUpdateUserProfile,
      handleUploadProfilePhoto
    }}>
      {children}
    </ProfileContext.Provider>
  )
};

const GET = "GET";
const UPDATE = "UPDATE";
const PHOTO_UPLOAD = "PHOTO_UPLOAD";
const LOADING = "LOADING";
const ERROR = "ERROR";

const reducer = (state, action) => {
  if (action.type === GET) {
    return {
      profile: action.payload.profile,
      loading: false,
      error: null
    }
  }
  if (action.type === UPDATE) {
    return {
      profile: action.payload.profile,
      loading: false,
      error: null
    }
  }
  if (action.type === PHOTO_UPLOAD) {
    return {
      profile: action.payload.profile,
      loading: false,
      error: null
    }
  }
  if (action.type === LOADING) {
    return {
      profile: null,
      loading: true,
      error: null
    }
  }
  if (action.type === ERROR) {
    return {
      profile: null,
      loading: false,
      error: action.payload.error
    }
  }
  return state;
}

const initialState = {
  profile: null,
  loading: false,
  error: null
}