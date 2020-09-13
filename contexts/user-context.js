import React, { createContext, useState, useEffect } from "react";
import firebase from "utils/firebase";
import { useRouter } from "next/router";

export const UserContext = createContext();

const mapUser = (user) => {
  return {
    email: user.email,
    emailVerified: user.emailVerified,
    metadata: user.metadata,
    phoneNumber: user.phoneNumber,
    uid: user.uid,
  };
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          setUser(mapUser(user));
        } else setUser(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const signIn = (email, password) => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setLoading(false);
        router.push("/");
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  const signOut = () => {
    setLoading(true);
    firebase
      .auth()
      .signOut()
      .then(() => {
        setLoading(false);
        router.push("/");
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  const signUp = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        router.push("/");
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signOut,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
