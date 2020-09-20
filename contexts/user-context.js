import React, { createContext, useState, useEffect } from "react";
import { auth, createUserProfileDocument, signIn, signOut, signUp } from "utils/firebase/auth";
import { useRouter } from "next/router";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // this will be the case when other oAuth providers are used
    const getOrCreateUser = async (incomingUser) => {
      try {
        const user = await createUserProfileDocument(incomingUser);
        setUser(user);
        setLoading(false);
      } catch(error) {
        setError(error);
        setLoading(false);
      }
    }

    const unsubscribe = auth.onAuthStateChanged(async (googleUser) => {
      await getOrCreateUser(googleUser);
    });

    return () => unsubscribe();
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

  const handleSignUp = async (email, password) => {
    try {
      await signUp(email, password);
      setLoading(false);
      router.push("/");
    } catch(error) {
      setLoading(false);
      setError(error);
    }
  };

  const value = {
    user,
    loading,
    error,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
