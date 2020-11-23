import React, { createContext, useState, useEffect } from "react";
import {
  auth,
  getOrCreateUserProfileDocument, sendPasswordResetEmail,
  signIn,
  signInWithGoogle,
  signOut,
  signUp, updateUserProfile
} from "utils/firebase/auth";
import { useRouter } from "next/router";

import {Amplify, Auth, Hub} from "aws-amplify";
import awsconfig from "src/aws-exports";
import {setUserCookie} from "../utils/user";
Amplify.configure(awsconfig);

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const [userState, setUserState] = useState();

  const authListener = (data) => {
    switch (data.payload.event) {
      case 'signIn':
        const cognitoUser = data.payload.data;
        setUser(cognitoUser);
        setUserCookie(cognitoUser);
        setLoading(false);
        break;
      case 'signUp':
        console.log('user signed up');
        break;
      case 'signOut':
        console.log('user signed out');
        break;
      case 'signIn_failure':
        console.log('user sign in failed');
        break;
      case 'configured':
        console.log('the Auth module is configured');
    }
  }

  useEffect(() => {
    Hub.listen('auth', authListener);
    return () => Hub.remove('auth', authListener);
  }, []);

  const handleSignIn = async (email, password) => {
    setLoading(true);
    try {
      await signIn(email, password);
      setLoading(false);
      router.push("/");
    } catch(error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
     await signOut();
      setLoading(false);
      router.push("/");
    } catch(error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      setLoading(false);
      router.push("/");
    } catch(error) {
      setLoading(false);
      setError(error);
    }
  }

  const handleSignUp = async (email, password) => {
    setLoading(true);
    try {
      await signUp(email, password);
      setLoading(false);
      router.push("/");
    } catch(error) {
      setLoading(false);
      setError(error);
    }
  };

  const handlePasswordReset = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(email);
      setLoading(false);
    } catch(error) {
      setLoading(false);
      setError(error);
    }
  }

  const value = {
    user,
    loading,
    error,
    setError,
    handleSignIn,
    handleSignInWithGoogle,
    handleSignOut,
    handleSignUp,
    handlePasswordReset
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
